"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 229;
const FRAME_PATH = (n: number) =>
  `https://pub-f72e8bfcb18c4aa7aefcbcc5529aaaf1.r2.dev/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
const VIDEO_PATH = `https://pub-f72e8bfcb18c4aa7aefcbcc5529aaaf1.r2.dev/waves.mp4`;

export default function WaveBackground() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile === null) {
    // Initial SSR / Hydration state - just render a plain background
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "#F8F9FA",
        }}
      />
    );
  }

  if (isMobile) {
    return <MobileVideoBackground />;
  }

  return <DesktopCanvasBackground />;
}

function MobileVideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <>
      {!isVideoLoaded && (
        <LoadingOverlay progress={0} isDeterminate={false} />
      )}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "#F8F9FA",
        }}
      >
        <video
          src={VIDEO_PATH}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
    </>
  );
}

function DesktopCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | ImageBitmap | null)[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Draw a specific frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha
    if (!ctx) return;

    // Find nearest loaded frame
    let nearest = Math.round(index);
    if (nearest >= TOTAL_FRAMES) nearest = TOTAL_FRAMES - 1;
    if (nearest < 0) nearest = 0;

    let img = imagesRef.current[nearest];
    
    // If current is missing, search outwards
    if (!img) {
      let offset = 1;
      while (offset < 20) { // Look up to 20 frames away
        if (nearest + offset < TOTAL_FRAMES && imagesRef.current[nearest + offset]) {
          img = imagesRef.current[nearest + offset];
          break;
        }
        if (nearest - offset >= 0 && imagesRef.current[nearest - offset]) {
          img = imagesRef.current[nearest - offset];
          break;
        }
        offset++;
      }
    }

    if (!img) return;
    
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = (img as HTMLImageElement).naturalWidth || (img as ImageBitmap).width;
    const ih = (img as HTMLImageElement).naturalHeight || (img as ImageBitmap).height;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Ultra-optimized preloading
  useEffect(() => {
    const images: (HTMLImageElement | ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    const loadQueue = async () => {
      // 1. Load first frame immediately
      const first = new Image();
      first.src = FRAME_PATH(1);
      
      let loadedCount = 0;
      const framesToLoad = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 1) { // Desktop always loads all frames
        framesToLoad.push(i);
      }
      const totalToLoad = framesToLoad.length + 1; // plus the first frame
      
      await new Promise((resolve) => {
        first.onload = async () => {
          if ("createImageBitmap" in window) {
            images[0] = await createImageBitmap(first);
          } else {
            images[0] = first;
          }
          drawFrame(0);
          loadedCount++;
          setProgress(Math.round((loadedCount / totalToLoad) * 100));
          resolve(null);
        };
      });

      // 2. Load others in batches to prevent main-thread choking
      const batchSize = 10;
      for (let i = 0; i < framesToLoad.length; i += batchSize) {
        const batch = framesToLoad.slice(i, i + batchSize);
        await Promise.all(batch.map(async (frameNum) => {
          const img = new Image();
          img.src = FRAME_PATH(frameNum);
          return new Promise((resolve) => {
            img.onload = async () => {
              const idx = frameNum - 1;
              if ("createImageBitmap" in window) {
                images[idx] = await createImageBitmap(img);
              } else {
                images[idx] = img;
              }
              loadedCount++;
              resolve(null);
            };
            img.onerror = () => {
              loadedCount++;
              resolve(null);
            };
          });
        }));
        
        setProgress(Math.round((loadedCount / totalToLoad) * 100));
        
        // Small breathing room for UI
        await new Promise(r => setTimeout(r, 20));
      }
      
      // Give a tiny buffer so the user sees 100%
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    loadQueue();
  }, [drawFrame]);

  // Resolution and Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Scrubbing logic
  useEffect(() => {
    // High lerp for mobile to bridge the gap between fewer frames, but this is desktop only now
    const lerpFactor = 0.15;

    const update = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * lerpFactor;
        drawFrame(currentFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    rafRef.current = requestAnimationFrame(update);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <>
      {isLoading && <LoadingOverlay progress={progress} isDeterminate={true} />}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "#F8F9FA", // Match site background to hide canvas clears
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            willChange: "transform",
            opacity: 0.3,
            imageRendering: "auto", // Ensure smoothing
          }}
        />
      </div>
    </>
  );
}

function LoadingOverlay({ progress, isDeterminate }: { progress: number, isDeterminate: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      <div className="flex flex-col items-center max-w-md w-full px-6">
        <h2 className="text-2xl font-bold mb-6 text-[#0B2149] tracking-tight">
          Loading District 3192
        </h2>
        
        {isDeterminate ? (
          <>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-[#0B2149] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-sm font-medium text-gray-400">
              {progress}%
            </div>
          </>
        ) : (
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-[#0B2149] w-1/2"
              style={{
                animation: "slide 1.5s ease-in-out infinite alternate"
              }}
            />
            <style>{`
              @keyframes slide {
                0% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
