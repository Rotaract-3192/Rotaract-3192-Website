import { SignUp } from "@/lib/mockAuthClient";

export default function Page() {
  return (
    <main className="min-h-screen relative flex items-center justify-center py-20 px-6">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>
      
      <div className="w-full max-w-md space-y-12 relative z-10">
        <div className="text-center space-y-4">
           <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Account Registration</span>
           <h1 className="text-5xl font-black text-on-surface tracking-tighter font-display uppercase italic">
             District <span className="text-primary not-italic">Portal.</span>
           </h1>
        </div>
        
        <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3rem] p-4 border border-outline-variant/30 shadow-ambient overflow-hidden">
           <SignUp 
             appearance={{
               elements: {
                 card: "bg-transparent shadow-none border-none",
                 headerTitle: "hidden",
                 headerSubtitle: "hidden",
                 socialButtonsBlockButton: "bg-surface-container-high border-outline-variant/30 text-on-surface hover:bg-white transition-all rounded-2xl py-4",
                 formButtonPrimary: "bg-primary text-white hover:bg-primary/90 transition-all rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.2em]",
                 footerActionLink: "text-primary hover:text-primary/80 transition-colors",
                 formFieldInput: "bg-surface-container-high/50 border-outline-variant/30 rounded-xl focus:border-primary/30 outline-none transition-all",
                 formFieldLabel: "text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-2",
                 dividerLine: "bg-outline-variant/30",
                 dividerText: "text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30"
               }
             }}
           />
        </div>
        
        <p className="text-[10px] font-black text-center text-on-surface-variant/40 uppercase tracking-[0.4em] italic">
          Authorized Registration • Rotaract District 3192
        </p>
      </div>
    </main>
  );
}
