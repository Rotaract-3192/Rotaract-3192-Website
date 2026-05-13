import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveBackground from "@/components/WaveBackground";
import RippleProvider from "@/components/RippleProvider";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Portal-specific background effects */}
      <WaveBackground />
      <RippleProvider />
      
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow flex flex-col">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </div>
  );
}
