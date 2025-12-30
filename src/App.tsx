import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Terminal, User, Code, Gamepad2, Globe, X, Minus, Maximize2, Minimize2, 
  Github, Instagram, Linkedin, BookOpen, Search, Wifi, Battery, Play, RotateCcw, 
  Aperture, Download, Twitter, Monitor, Mail, Music, UserPlus
} from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';


type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeContext.Provider');
  }
  return ctx;
};

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface AppIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconSrc?: string; // Path to macOS icon image
  color: string;
}

// --- Content Components ---

const AboutContent = () => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === 'dark'
          ? 'p-8 font-sans h-full overflow-y-auto bg-(--bg-subtle) text-(--text-color)'
          : 'p-8 font-sans h-full overflow-y-auto bg-white text-gray-800'
      }
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-xl flex items-center justify-center text-white text-4xl font-bold border-4 border-white overflow-hidden relative">
          <span className="z-10">
            <img src="/portimage.png" alt="image" />
          </span>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <h1
          className={
            theme === 'dark'
              ? 'text-4xl font-bold tracking-tight text-(--text-color)'
              : 'text-4xl font-bold tracking-tight text-gray-900'
          }
        >
          Ashish Kumar Nanda
        </h1>
        <p className="text-blue-500 font-medium mt-1">
          Research Intern @ IIT(BHU) | CS @ MUJ ‘27
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 pb-8">
        <section className="bg-(--card-bg) p-6 rounded-2xl shadow-sm border border-(--card-border)">
          <h2 className="text-xl font-bold border-b pb-3 mb-4 text-(--text-color) flex items-center gap-2">
            👋 About Me
          </h2>
          <p className="leading-relaxed text-(--text-muted) text-lg">
            I am a Computer Science graduate from Manipal University with a CGPA of 9.22/10.
            Currently working as a{' '}
            <span className="font-semibold text-green-500">Research Intern at IIT (BHU)</span>.
            I specialize in building full-stack applications, scalable backend systems, and integrating
            AI models into production. If you need someone who can write code and hit high notes, I'm
            your person.
          </p>
        </section>

        <section className="bg-(--card-bg) p-6 rounded-2xl shadow-sm border border-(--card-border)">
          <h2 className="text-xl font-bold border-b pb-3 mb-4 text-(--text-color) flex items-center gap-2">
            🏆 Achievements
          </h2>
          <ul className="space-y-3 text-(--text-muted)">
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full shrink-0" />
              <span>Finalist - International Innovation Challenge (IIC)</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-purple-500 rounded-full shrink-0" />
              <span>National Semifinalist - Flipkart GRiD 7.0</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-green-500 rounded-full shrink-0" />
              <span>4x Dean’s List of Excellence: Recognized for academic excellence.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-green-500 rounded-full shrink-0" />
              <span>Solved 300+ DSA problems on platforms like LeetCode and GeeksforGeeks</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const SkillsExperienceContent = () => (
  <div className="bg-[#1e1e1e] h-full text-gray-300 font-mono text-sm flex flex-col">
    <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#1e1e1e] select-none">
      <span className="text-blue-400 mr-2 flex items-center gap-1"><Code size={12}/> resume.json</span>
      <span className="text-xs text-gray-500 ml-auto">UTF-8</span>
    </div>
    <div className="flex-1 overflow-auto p-4 cursor-text selection:bg-blue-500/30">
      <div className="space-y-1">
        <span className="text-purple-400">const</span> <span className="text-yellow-300">profile</span> <span className="text-white">=</span> <span className="text-yellow-300">{`{`}</span>
        
        <div className="pl-6">
          <span className="text-blue-300">"skills"</span>: [<br/>
            <span className="pl-4 text-green-300">"C++", "Python","Java", "SQL", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "HTML", "TailwindCSS", "AWS", "Docker", "Redis", "CI/CD" "Git", "GitHub", "Postman"</span><br/>
          ],
        </div>

        <div className="pl-6 mt-2">
          <span className="text-blue-300">"experience"</span>: [
          <div className="pl-4 group hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-yellow-300">{`{`}</span><br/>
            <span className="pl-4 text-sky-300">"company"</span>: <span className="text-orange-300">"Indian Institute of Technology(Banaras Hindu College)"</span>,<br/>
            <span className="pl-4 text-sky-300">"role"</span>: <span className="text-orange-300">"Research Intern"</span>,<br/>
            <span className="pl-4 text-sky-300">"duration"</span>: <span className="text-orange-300">"Present"</span>,<br/>
            <span className="pl-4 text-sky-300">"impact"</span>: <span className="text-orange-300">"Mathematical Model for Integrating Net Zero Practices in MSMEs"</span><br/>
            <span className="text-yellow-300">{`},`}</span>
          </div>
          <div className="pl-4 group hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-yellow-300">{`{`}</span><br/>
            <span className="pl-4 text-sky-300">"company"</span>: <span className="text-orange-300">"Google Developer Groups"</span>,<br/>
            <span className="pl-4 text-sky-300">"role"</span>: <span className="text-orange-300">"Technical Member"</span>,<br/>
            <span className="pl-4 text-sky-300">"duration"</span>: <span className="text-orange-300">"Sept 2023 - Oct 2025"</span>,<br/>
            <span className="pl-4 text-sky-300">"impact"</span>: <span className="text-orange-300">"Organized technical workshops and coding sessions for the community."</span><br/>
            <span className="text-yellow-300">{`}`}</span>
          </div>
          ],
        </div>

        <div className="pl-6 mt-2">
          <span className="text-blue-300">"education"</span>: [
          <div className="pl-4 group hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-yellow-300">{`{`}</span><br/>
            <span className="pl-4 text-sky-300">"college"</span>: <span className="text-orange-300">"Manipal University Jaipur"</span>,<br/>
            <span className="pl-4 text-sky-300">"degree"</span>: <span className="text-orange-300">"B.Tech CSE(IoT)"</span>,<br/>
            <span className="pl-4 text-sky-300">"cgpa"</span>: <span className="text-orange-300">"9.22/10"</span><br/>
            <span className="text-yellow-300">{`}`}</span>
          </div>
          ],
        </div>
        <span className="text-yellow-300">{`}`}</span>;
      </div>
    </div>
  </div>
);

const BrowserContent = () => (
  <div className="flex flex-col h-full bg-[var(--bg-elevated)] text-[var(--text-color)]">
    <div className="bg-[var(--chrome-bg)] border-b border-[var(--border-subtle)] p-3 flex items-center space-x-3 shadow-sm z-10">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-[var(--bg-input)] rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm text-[var(--text-muted)] flex items-center shadow-inner">
        <Search size={14} className="mr-3 text-[var(--icon-muted)]" />
        portfolio.ashish-nanda.dev
      </div>
    </div>

    <div className="flex-1 overflow-auto p-6 bg-[var(--bg-subtle)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        
        {/* Research */}
        <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--card-border)] hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--text-color)]">
            <BookOpen className="text-blue-500" /> Research Intern
          </h2>
          <div className="block group">
            <h3 className="font-bold text-lg text-[var(--text-color)] group-hover:text-blue-500 transition-colors"> Indian Institute of Technology (BHU)</h3>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mt-1">Dec 2025 • Present</p>
            <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">Mathematical Model for Integrating Net Zero Practices in MSMEs.</p>
          </div>
        </div>

        {/* Socials */}
        <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--card-border)] hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--text-color)]">
            <Globe className="text-green-500" /> Socials
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://www.linkedin.com/in/ashishnanda19/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center p-3 rounded-lg transition-colors gap-3 social-card social-card--linkedin"
            >
              <Linkedin size={20} className="text-blue-700" /> <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="https://github.com/ashishnanda19"
              target="_blank"
              rel="noreferrer"
              className="flex items-center p-3 rounded-lg transition-colors gap-3 social-card social-card--github"
            >
              <Github size={20} className="text-gray-900" /> <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/ashish19nanda/"
              className="flex items-center p-3 rounded-lg transition-colors gap-3 social-card social-card--instagram"
            >
              <Instagram size={20} className="text-pink-600" /> <span className="text-sm font-medium">@ashish19nanda</span>
            </a>
             <a
              href="https://x.com/ashish19n"
              className="flex items-center p-3 rounded-lg transition-colors gap-3 social-card social-card--twitter"
            >
              <Twitter size={20} className="text-sky-500" /> <span className="text-sm font-medium">@ashish19n</span>
             </a>
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-1 md:col-span-2 bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--card-border)] hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="border border-[var(--card-border)] rounded-xl p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-lg text-blue-600 flex items-center justify-between gap-2">
                <span>Video Transcoder</span>
                <a
                  href="https://github.com/ashishnanda19/video-transcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--link-muted)] hover:text-blue-500 underline-offset-2 hover:underline"
                >
                  GitHub
                </a>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 mb-2">Node.js, Express.js, AWS (S3, Lambda, ECS, EventBridge), Redis, MongoDB, Docker, ffmpeg</p>
              <p className="text-sm text-[var(--text-muted)]">Engineered a distributed AWS-based video transcoding pipeline with Redis queues, leaky-bucket rate limiting, and multi-resolution output generation.</p>
            </div>

            <div className="border border-[var(--card-border)] rounded-xl p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-lg text-blue-600 flex items-center justify-between gap-2">
                <span>InvoSync</span>
                <a
                  href="https://github.com/ashishnanda19/InvoSync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--link-muted)] hover:text-blue-500 underline-offset-2 hover:underline"
                >
                  GitHub
                </a>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 mb-2">React.js, Vite, Flask, Python, Tesseract OCR, RapidFuzz, Pandas, TailwindCSS</p>
              <p className="text-sm text-[var(--text-muted)]">Engineered an automated invoice–PO reconciliation platform with OCR-based data extraction and fuzzy matching, improving accuracy to 98%+ and reducing verification time and operational effort by over 75%.</p>
            </div>

            <div className="border border-[var(--card-border)] rounded-xl p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-bold text-lg text-blue-600 flex items-center justify-between gap-2">
                <span>SafeTrail</span>
                <a
                  href="https://github.com/ashishnanda19/SafeTrail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--link-muted)] hover:text-blue-500 underline-offset-2 hover:underline"
                >
                  GitHub
                </a>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 mb-2">React.js, React Native, Node.js, Express, MongoDB, Python, JWT, TailwindCSS</p>
              <p className="text-sm text-[var(--text-muted)]">Developed a scalable backend safety platform with 25+ APIs, real-time location tracking, and ML-based threat analysis, improving system reliability by 40% and enabling sub-second inference.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);

const MailContent = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = 'ashish.nanda1902@gmail.com';
    const mailSubject = subject || 'Message from AshishOS Mail';
    const bodyLines = [
      `From: ${name || 'Anonymous'}`,
      `Email: ${email || 'not provided'}`,
      '',
      message || '',
    ];
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)] text-[var(--text-color)]">
      {/* Mail chrome */}
      <div className="bg-[var(--chrome-bg)] border-b border-[var(--border-subtle)] px-4 py-2 flex items-center gap-3 text-sm">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-3 font-semibold">Inbox</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1 rounded-md bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-1">
            <Mail size={14} /> New Message
          </button>
          <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-lg px-2 py-1 text-xs text-[var(--text-muted)]">
            <Search size={12} className="mr-1 text-[var(--icon-muted)]" />
            Search
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-3 text-xs">
          <div className="mb-4">
            <p className="uppercase text-[10px] tracking-wide text-[var(--text-muted)] mb-1">FAVOURITES</p>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">
              <span>Inbox</span>
              <span className="text-[10px] bg-blue-500 text-white rounded-full px-1.5">1</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] mt-1">
              <span>Sent</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] mt-1">
              <span>Archive</span>
            </button>
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-wide text-[var(--text-muted)] mb-1">MAILBOXES</p>
            <p className="px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]">All Inboxes</p>
            <p className="px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]">AshishOS</p>
          </div>
        </aside>

        {/* Message list */}
        <section className="w-72 border-r border-[var(--card-border)] bg-[var(--bg-subtle)] overflow-auto text-sm">
          <div className="px-3 py-2 border-b border-[var(--card-border)] text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
            Today
          </div>
          <div className="px-3 py-3 space-y-3">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">AshishOS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Now</span>
              </div>
              <p className="text-xs font-medium mt-1">New message for Ashish</p>
              <p className="text-[11px] text-[var(--text-muted)] truncate">
                Use the composer on the right to send me a message for roles, collaborations, or questions.
              </p>
            </div>
          </div>
        </section>

        {/* Message / composer */}
        <main className="flex-1 bg-[var(--bg-elevated)] p-6 overflow-auto">
          <div className="max-w-2xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm">
            <div className="border-b border-[var(--card-border)] px-5 py-3 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">New Message</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  This will open your default mail app with the details you fill in.
                </p>
              </div>
              {sent && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
                  Ready to send
                </span>
              )}
            </div>

            <form className="px-5 py-4 space-y-3 text-sm" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  To
                </label>
                <div className="flex-1 text-[13px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 border border-blue-500/30">
                    {theme === 'dark' ? 'ashish.nanda1902@gmail.com' : 'Ashish Kumar Nanda'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Who is reaching out?"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="For follow-ups"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Role, collaboration, question..."
                />
              </div>

              <div className="flex items-start gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none resize-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Write your message as if you were emailing me directly."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-[var(--text-muted)]">
                  Clicking **Send** opens your mail client with everything pre‑filled.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors"
                >
                  <Mail size={14} />
                  Send
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

const PhotoBooth = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setError('');
      } catch (err) {
        setError('Camera access denied or unavailable.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setPhoto(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center p-4">
      {error ? (
        <div className="text-red-400 text-center">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">Please allow camera permissions.</p>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
             {!photo ? (
               <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto transform scale-x-[-1]" />
             ) : (
               <img src={photo} alt="Captured" className="w-full h-auto transform scale-x-[-1]" />
             )}
          </div>
          
          <div className="mt-6 flex space-x-4">
            {!photo ? (
              <button 
                onClick={takePhoto} 
                className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 shadow-lg hover:bg-gray-200 transition-colors flex items-center justify-center active:scale-95"
              >
                <div className="w-12 h-12 rounded-full border-2 border-black/10"></div>
              </button>
            ) : (
              <div className="flex space-x-4">
                <button 
                  onClick={() => setPhoto(null)} 
                  className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
                >
                  Retake
                </button>
                <a 
                  href={photo} 
                  download="photo-booth.png" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition flex items-center gap-2"
                >
                  <Download size={16} /> Save
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SpotifyContent = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // Helper function to extract playlist ID from URL
  const extractPlaylistId = (url: string): string => {
    // Try to match playlist ID in URL
    const match = url.match(/playlist\/([a-zA-Z0-9]{22})/);
    if (match && match[1]) {
      return match[1];
    }
    // If URL format is different, try alternative patterns
    const altMatch = url.match(/\/([a-zA-Z0-9]{22})(?:\?|$)/);
    if (altMatch && altMatch[1]) {
      return altMatch[1];
    }
    // If it's already just an ID (22 characters), return as is
    if (url.length === 22 && /^[a-zA-Z0-9]+$/.test(url)) {
      return url;
    }
    // Fallback: return empty string to show error
    console.error('Could not extract playlist ID from:', url);
    return '';
  };

  // Playlists with Spotify URLs - IDs will be extracted automatically
  const playlists = [
    {
      id: 'coding-focus',
      name: 'Hindi Music',
      description: 'Chandani & Chai',
      spotifyUrl: 'https://open.spotify.com/playlist/59jMJYSo97Dy5JTXuaAQrK?si=rsrKZ4SpSWSjT-Zse-3n6A&pi=4_pUzpe5SsO-6'
    },
    {
      id: 'chill-vibes',
      name: 'English Music',
      description: 'Clouded Coffeehouse',
      spotifyUrl: 'https://open.spotify.com/playlist/5Q59GgXHjOzY5vjeUBStbb?si=_sTg0OsuTCmoczXybYs4aQ'
    },
    {
      id: 'workout',
      name: 'Rap Music',
      description: 'Drip & Drop',
      spotifyUrl: 'https://open.spotify.com/playlist/477IgA9QgtRaxQ7s6LiFLR?si=QGMogWbpShWIzhEp-F-38w&pi=XnaY64pRTKq0V'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)] text-[var(--text-color)]">
      {/* Spotify chrome */}
      <div className="bg-[var(--chrome-bg)] border-b border-[var(--border-subtle)] p-3 flex items-center space-x-3 shadow-sm z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-[var(--bg-input)] rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm text-[var(--text-muted)] flex items-center shadow-inner">
          <Music size={14} className="mr-3 text-[var(--icon-muted)]" />
          open.spotify.com/user/ashishnanda19
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[var(--bg-subtle)]">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          
          {/* Profile Section */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                <Music size={40} />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[var(--text-color)] mb-1">Ashish Kumar Nanda</h1>
                <p className="text-[var(--text-muted)] mb-4">@ashishnanda19</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://open.spotify.com/user/31l75eh4gpxsbgm4w4ocm23mtqem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-full text-sm font-medium hover:bg-[#1ed760] transition-colors"
                  >
                    <UserPlus size={16} />
                    Send Friend Request
                  </a>
                  <a
                    href="https://open.spotify.com/user/31l75eh4gpxsbgm4w4ocm23mtqem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--link-muted)] hover:text-[#1DB954] underline"
                  >
                    View on Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Playlists Section */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-color)]">My Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="border border-[var(--card-border)] rounded-xl p-4 hover:border-[#1DB954] transition-colors cursor-pointer group"
                  onClick={() => setSelectedPlaylist(playlist.id === selectedPlaylist ? null : playlist.id)}
                >
                  <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-3 flex items-center justify-center text-white text-4xl font-bold shadow-md group-hover:scale-105 transition-transform">
                    <Music size={48} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--text-color)] mb-1">{playlist.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spotify Player */}
          {selectedPlaylist && (() => {
            const playlist = playlists.find(p => p.id === selectedPlaylist);
            if (!playlist) return null;
            
            const playlistId = extractPlaylistId(playlist.spotifyUrl);
            
            if (!playlistId) {
              return (
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6">
                  <div className="text-center py-8">
                    <p className="text-[var(--text-muted)] mb-4">Unable to load playlist. Please check the playlist URL.</p>
                    <a
                      href={playlist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-full text-sm font-medium hover:bg-[#1ed760] transition-colors"
                    >
                      Open in Spotify
                    </a>
                  </div>
                </div>
              );
            }
            
            return (
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">
                  Now Playing: {playlist.name}
                </h2>
                <div className="bg-black rounded-lg p-4">
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify playlist: ${playlist.name}`}
                  ></iframe>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
                  Click "Open in Spotify" to add me as a friend and follow my playlists!
                </p>
              </div>
            );
          })()}

          {/* Instructions */}
          {!selectedPlaylist && (
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center flex-shrink-0">
                  <Music size={24} className="text-[#1DB954]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-color)] mb-2">How to Connect</h3>
                  <ol className="text-sm text-[var(--text-muted)] space-y-2 list-decimal list-inside">
                    <li>Click on any playlist above to start listening</li>
                    <li>Click "Open in Spotify" in the player to view on Spotify</li>
                    <li>Send me a friend request using the button above</li>
                    <li>Follow my playlists to stay updated with my music taste!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const SystemPreferencesContent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={
        theme === 'dark'
          ? 'h-full p-8 font-sans bg-(--card-bg) text-(--text-color)'
          : 'h-full p-8 font-sans bg-white text-gray-900'
      }
    >
      <h1 className="text-2xl font-semibold mb-2">System Preferences</h1>
      <p className="text-xs text-gray-500 mb-6">Customize how AshishOS looks and feels.</p>
      <h2 className="text-sm font-semibold mb-3">Appearance</h2>
      <p className="text-sm text-(--text-muted) mb-4">
        Choose between light and dark appearance for AshishOS.
      </p>
      <div className="flex gap-6">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex-1 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
            theme === 'light'
              ? 'border-blue-500 bg-slate-900 text-white shadow-md ring-2 ring-blue-500/60'
              : 'border-(--card-border) bg-slate-900 text-white opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Light</span>
            {theme === 'light' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Default macOS-style light appearance. Current design is preserved.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex-1 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
            theme === 'dark'
              ? 'border-blue-500 bg-slate-900 text-white shadow-md ring-2 ring-blue-500/60'
              : 'border-(--card-border) bg-slate-900 text-white opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Dark</span>
            {theme === 'dark' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            A macOS-like dark appearance with dimmed surfaces and light text.
          </p>
        </button>
      </div>
    </div>
  );
};

const TerminalContent = () => {
  const [history, setHistory] = useState<string[]>(["Welcome to AshishOS", "Type 'help' to see commands."]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `➜  ~ ${input}`];
      
      switch (cmd) {
        case 'help':
          newHistory.push("  about     - Bio", "  skills    - Tech Stack", "  projects  - My Work", "  socials   - Contact", "  clear");
          break;
        case 'about':
  newHistory.push(
    "Ashish Kumar Nanda | CS Undergrad | Web Developer\n\n" +
    "Third year CS student at Manipal University Jaipur who codes by day and plays guitar by night.\n" +
    "I build full-stack web apps, grind LeetCode for fun, and occasionally debug with emotional support from my music."
  );
  break;
        case 'projects':
          newHistory.push("1. Distributed Video Transcoding Platform - Engineered a distributed AWS-based video transcoding pipeline with Redis queues, leaky-bucket rate limiting, and multi-resolution output generation.\n\n", "2. InvoSync - Engineered an automated invoice–PO reconciliation platform with OCR-based data extraction and fuzzy matching, improving accuracy to 98%+ and reducing verification time and operational effort by over 75%.\n\n", "3. SafeTrail - Developed a scalable backend safety platform with 25+ APIs, real-time location tracking, and ML-based threat analysis, improving system reliability by 40% and enabling sub-second inference.");
          break;
        case 'skills':
          newHistory.push("Languages: C++, Python, Java, C, SQL, HTML, CSS, JavaScript", "Frameworks & Libraries: React, Node.js, Express.js, Tailwind CSS", "Cloud & Distributed Systems: AWS, Redis, Docker, CI/CD", "Tools & Platforms: Git, GitHub, Postman, Vite, MongoDB, REST APIs");
          break;
        case 'socials':
        newHistory.push(...([
    <a
      href="https://github.com/ashishnanda19"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:underline"
      key="github"
    >
      GitHub: ashishnanda19
    </a>,
    <a
      href="https://www.linkedin.com/in/ashishnanda19/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:underline"
      key="linkedin"
    >
      LinkedIn: ashishnanda19
    </a>,
    <a
      href="https://www.leetcode.com/ashishnanda19"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:underline"
      key="leetcode"
    >
      LeetCode: ashishnanda19
    </a>,
    // <a
    //   href="https://www.x.com/in/ashish19n"
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className="text-green-400 hover:underline"
    //   key="x"
    // >
    //   X: ashish19n
    // </a>,
    <a
      href="https://www.instagram.com/ashish19nanda"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:underline"
      key="instagram"
    >
      Instagram: ashish19nanda
    </a>
  ] as any));
  break;
        case 'clear':
          setHistory([]);
          setInput("");
          return;
        default:
          if (cmd) newHistory.push(`zsh: command not found: ${cmd}`);
      }
      
      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div className="bg-[#1e1e1e] text-green-400 font-mono p-4 h-full overflow-auto text-sm">
      {history.map((line, i) => (
        <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex items-center">
        <span className="mr-2 text-blue-400">➜  ~</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none flex-1 text-green-400"
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

const SnakeGame = () => {
  const GRID_SIZE = 20;
  const SPEED = 100;
  
  const [snake, setSnake] = useState([{x: 10, y: 10}]);
  const [food, setFood] = useState({x: 15, y: 5});
  const [dir, setDir] = useState({x: 0, y: -1});
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const moveSnake = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(moveSnake);
  }, [isPlaying, gameOver, dir, food]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': if(dir.y !== 1) setDir({x: 0, y: -1}); break;
        case 'ArrowDown': if(dir.y !== -1) setDir({x: 0, y: 1}); break;
        case 'ArrowLeft': if(dir.x !== 1) setDir({x: -1, y: 0}); break;
        case 'ArrowRight': if(dir.x !== -1) setDir({x: 1, y: 0}); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir]);

  const startGame = () => {
    setSnake([{x: 10, y: 10}]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setDir({x: 0, y: -1});
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4 relative overflow-hidden">
      <div className="absolute top-4 left-4 font-mono text-xl text-green-400">SCORE: {score}</div>
      <div className="relative bg-black border-4 border-gray-700 rounded-lg shadow-2xl" 
           style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1', display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
         {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;
            return <div key={i} className={`${isSnake ? 'bg-green-500 rounded-sm' : isFood ? 'bg-red-500 rounded-full' : 'bg-gray-800/30'} border border-white/5`}></div>;
         })}
         {(!isPlaying || gameOver) && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
             <h2 className="text-3xl font-bold mb-4 text-green-400 font-mono">{gameOver ? 'GAME OVER' : 'SNAKE OS'}</h2>
             <button onClick={startGame} className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition">
               {gameOver ? <RotateCcw size={18}/> : <Play size={18}/>} {gameOver ? 'Retry' : 'Start'}
             </button>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Menu Bar Component ---

type MenuSeparator = {
  type: "separator";
};

type MenuActionItem = {
  type?: undefined;
  label: string;
  action?: () => void;
  shortcut?: string;
};

type MenuItem = MenuSeparator | MenuActionItem;

type TopBarProps = {
  title: string;
  activeMenu: string | null;
  setActiveMenu: (m: string | null) => void;
  onOpenSystemPreferences: () => void;
  onNewWindow: () => void;
  onCloseAllWindows: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onEnterFullScreen: () => void;
  onActualSize: () => void;
};

const TopBar = ({ 
  title, 
  activeMenu, 
  setActiveMenu, 
  onOpenSystemPreferences,
  onNewWindow,
  onCloseAllWindows,
  onUndo,
  onRedo,
  onEnterFullScreen,
  onActualSize
}: TopBarProps) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menus: Record<string, MenuItem[]> = {
    "": [
      { label: "About This Portfolio", action: () => alert("Ashish's Portfolio") },
      { label: "System Preferences...", action: () => onOpenSystemPreferences() },
      { type: "separator" },
      { label: "Sleep", action: () => alert("Zzz...") },
      { label: "Restart", action: () => window.location.reload() },
      { label: "Shut Down", action: () => window.close() },
    ],

    File: [
      { label: "New Window", shortcut: "⌘N", action: () => onNewWindow() },
      { label: "Close Window", shortcut: "⌘W", action: () => onCloseAllWindows() },
      { type: "separator" },
      { label: "Download Resume", action: () => window.open("https://drive.google.com/file/d/1ln5ZruwH_u-QLrTHfz-pgZiiZt-vmECd/view?usp=sharing", "_blank") },
    ],

    Edit: [
      { label: "Undo", shortcut: "⌘Z", action: () => onUndo() },
      { label: "Redo", shortcut: "⇧⌘Z", action: () => onRedo() },
      { type: "separator" },
      { label: "Cut", shortcut: "⌘X" },
      { label: "Copy", shortcut: "⌘C" },
      { label: "Paste", shortcut: "⌘V" },
    ],

    View: [
      { label: "Enter Full Screen", shortcut: "^⌘F", action: () => onEnterFullScreen() },
      { label: "Actual Size", shortcut: "⌘0", action: () => onActualSize() },
    ],

    Help: [
      { label: "Portfolio Help", action: () => alert("Mail me at ashish.nanda1902@gmail.com if you find any bug!") },
      { label: "View Source Code", action: () => window.open("https://github.com/ashishnanda19", "_blank") },
    ],
  };

  return (
    <div
      className="h-8 w-full bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 text-white text-sm fixed top-0 z-50 shadow-sm border-b border-white/5 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center space-x-4 h-full">
        {Object.entries(menus).map(([key, items]) => (
          <div key={key} className="relative h-full flex items-center">
            <span
              className={`cursor-default px-2.5 py-1 rounded transition-colors font-medium ${
                activeMenu === key ? "bg-white/20" : "hover:bg-white/10"
              } ${key === "" ? "text-base font-bold pb-1.5" : "text-xs"}`}
              onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            >
              {key}
            </span>

            {activeMenu === key && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 py-1.5 z-50 text-black animate-in fade-in slide-in-from-top-1 duration-100">
                {items.map((item, idx) =>
                  item.type === "separator" ? (
                    <div key={idx} className="h-[1px] bg-black/10 my-1 mx-2" />
                  ) : (
                    <div
                      key={idx}
                      className="px-4 py-1.5 hover:bg-blue-500 hover:text-white flex justify-between items-center cursor-default group"
                      onClick={() => {
                        item.action?.();
                        setActiveMenu(null);
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-gray-400 group-hover:text-white/80 text-xs">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
        {title && <span className="font-bold text-xs ml-2 opacity-80 hidden sm:block">{title}</span>}
      </div>

      <div className="flex items-center space-x-4 text-xs font-medium text-white/90">
        <div className="hidden sm:flex items-center space-x-3 opacity-80">
          <Battery size={16} /> <Wifi size={16} /> <Search size={16} />
        </div>
        <span>
          {date.toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

// macOS-style Mail Icon Component - Blue gradient with white envelope
const MailIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className="drop-shadow-md">
    <defs>
      <linearGradient id="mailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="50%" stopColor="#00B8FF" />
        <stop offset="100%" stopColor="#00D4FF" />
      </linearGradient>
    </defs>
    {/* Rounded square background with blue-to-cyan vertical gradient */}
    <rect width="512" height="512" rx="102" fill="url(#mailGradient)"/>
    
    {/* White envelope - clean minimalist design, horizontal orientation */}
    <g transform="translate(256, 256)">
      {/* Main envelope body - horizontal rectangle */}
      <rect x="-170" y="-60" width="340" height="150" fill="#FFFFFF" rx="8"/>
      
      {/* Envelope flap - V shape formed by two diagonal lines meeting at bottom center */}
      <path 
        d="M -170 -60 L 0 60 L 170 -60" 
        fill="#FFFFFF" 
        stroke="none"
      />
      
      {/* Subtle curved line running horizontally across lower half */}
      <path
        d="M -150 50 Q 0 40 150 50"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </g>
  </svg>
);

// macOS-style System Settings Icon Component - Metallic gear with 3D effect
const SettingsIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className="drop-shadow-md">
    <defs>
      {/* Metallic silver/gray gradient - light source from top-left */}
      <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8F8F8" />
        <stop offset="20%" stopColor="#E8E8E8" />
        <stop offset="40%" stopColor="#D0D0D0" />
        <stop offset="60%" stopColor="#B8B8B8" />
        <stop offset="80%" stopColor="#A0A0A0" />
        <stop offset="100%" stopColor="#8E8E8E" />
      </linearGradient>
      {/* Top-left highlight for 3D metallic effect */}
      <radialGradient id="gearHighlight" cx="25%" cy="25%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      {/* Shadow gradient */}
      <radialGradient id="gearShadow" cx="60%" cy="70%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Rounded square background - solid black */}
    <rect width="512" height="512" rx="102" fill="#000000"/>
    
    {/* Gear with metallic 3D appearance */}
    <g transform="translate(256, 256)">
      {/* Outer gear with distinct sharp triangular teeth around circumference */}
      <path
        d="M 0 -195
           L 8 -195 L 12 -215 L 16 -195 L 24 -195
           L 22 -182 L 30 -178 L 24 -165 L 34 -152 L 22 -148
           L 24 -135 L 16 -135 L 12 -115 L 8 -135 L 0 -135
           L -8 -135 L -12 -115 L -16 -135 L -24 -135
           L -22 -148 L -34 -152 L -24 -165 L -30 -178 L -22 -182
           L -24 -195 L -16 -195 L -12 -215 L -8 -195 L 0 -195 Z"
        fill="url(#gearGradient)"
        stroke="#AAAAAA"
        strokeWidth="1"
      />
      
      {/* Inner rings with smaller teeth */}
      <circle cx="0" cy="0" r="152" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="2"/>
      <circle cx="0" cy="0" r="132" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="1.5"/>
      <circle cx="0" cy="0" r="112" fill="none" stroke="#AAAAAA" strokeWidth="1" opacity="0.6"/>
      
      {/* Three thick Y-shaped spokes connecting hub to outermost gear */}
      {/* Top spoke */}
      <path
        d="M 0 -112 L 0 -152 
           M -22 -112 L 22 -112"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom left spoke */}
      <path
        d="M -79 -79 L -108 -108
           M -79 -58 L -58 -79"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom right spoke */}
      <path
        d="M 79 -79 L 108 -108
           M 79 -58 L 58 -79"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Solid smooth circular hub */}
      <circle cx="0" cy="0" r="58" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="2"/>
      <circle cx="0" cy="0" r="42" fill="#D0D0D0" opacity="0.25"/>
      
      {/* 3D highlight from top-left light source */}
      <ellipse cx="-40" cy="-40" rx="190" ry="190" fill="url(#gearHighlight)" opacity="0.7"/>
    </g>
    
    {/* Soft shadow beneath gear for depth */}
    <ellipse cx="280" cy="290" rx="175" ry="55" fill="url(#gearShadow)" opacity="0.35"/>
  </svg>
);

// --- Main App Component ---

const App = () => {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isMobile, setIsMobile] = useState(false); // Mobile state check
  const [closedWindowsHistory, setClosedWindowsHistory] = useState<WindowState[]>([]); // For undo/redo
  const [redoStack, setRedoStack] = useState<WindowState[]>([]); // For redo
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dragRef = useRef<{ id: string; startX: number; startY: number; initialLeft: number; initialTop: number } | null>(null);

  useEffect(() => {
    // Apply theme class to body for global styling
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  useEffect(() => {
    // Check screen size on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common tablet/mobile breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Icon component with error handling
  const IconWithFallback = ({ app, size }: { app: AppIcon; size: number }) => {
    const [imageError, setImageError] = useState(false);
    
    if (app.iconSrc && !imageError) {
      return (
        <img 
          src={app.iconSrc} 
          alt={app.name} 
          className="object-contain drop-shadow-md" 
          style={{ 
            width: size, 
            height: size, 
            maxWidth: '100%', 
            maxHeight: '100%', 
            display: 'block', 
            flexShrink: 0,
            objectFit: 'contain'
          }}
          loading="eager"
          draggable={false}
          onError={() => {
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`Icon loaded: ${app.iconSrc}`);
          }}
        />
      );
    }
    return <>{app.icon}</>;
  };

  // Helper function to render app icon (image or fallback React icon)
  const renderAppIcon = (app: AppIcon, size: number = 28) => {
    return <IconWithFallback app={app} size={size} />;
  };

  const appIcons: AppIcon[] = [
    { 
      id: 'finder', 
      name: 'Finder', 
      icon: <User size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/finder.png',
      color: 'bg-transparent' 
    },
    { 
      id: 'safari', 
      name: 'Safari', 
      icon: <Globe size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/safari.png',
      color: 'bg-transparent' 
    },
    { 
      id: 'vscode', 
      name: 'Code', 
      icon: <Code size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/vscode.png',
      color: 'bg-transparent' 
    },
    { 
      id: 'terminal', 
      name: 'Terminal', 
      icon: <Terminal size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/terminal.png',
      color: 'bg-transparent' 
    },
    { 
      id: 'camera', 
      name: 'Camera', 
      icon: <Aperture size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/photobooth.png',
      color: 'bg-transparent' 
    },
    { 
      id: 'arcade', 
      name: 'Arcade', 
      icon: <Gamepad2 size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/game-center.png',
      color: 'bg-transparent' 
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: <MailIcon size={28} />,
      iconSrc: '/icons/mail.png',
      color: 'bg-transparent'
    },
    {
      id: 'settings',
      name: 'System Preferences',
      icon: <SettingsIcon size={28} />,
      iconSrc: '/icons/system-preferences.png',
      color: 'bg-transparent'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <Music size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/spotify.png',
      color: 'bg-transparent'
    },
  ];

  const [windows, setWindows] = useState<WindowState[]>([]);
  
  // Initialize first window after appIcons is defined
  useEffect(() => {
    const finderApp = appIcons.find(a => a.id === 'finder');
    if (finderApp && windows.length === 0) {
      setWindows([{ 
        id: 'finder', 
        title: 'Ashish Kumar Nanda', 
        icon: renderAppIcon(finderApp, 18), 
        component: <AboutContent />, 
        isOpen: true, 
        isMinimized: false, 
        isMaximized: false,
        zIndex: 1, 
        position: { x: 50, y: 50 }, 
        size: { width: 800, height: 600 } 
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optimized Drag Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      const { id, startX, startY, initialLeft, initialTop } = dragRef.current;
      setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x: initialLeft + (e.clientX - startX), y: Math.max(32, initialTop + (e.clientY - startY)) } } : w));
    };
    const handleMouseUp = () => {
      dragRef.current = null;
      setDraggedWindow(null);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, []);

  const openApp = (appId: string) => {
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w));
        setActiveWindow(appId);
        setZIndexCounter(prev => prev + 1);
      } else if (activeWindow === appId) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: true } : w));
        setActiveWindow(null);
      } else {
        setActiveWindow(appId);
        setZIndexCounter(prev => prev + 1);
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, zIndex: zIndexCounter + 1 } : w));
      }
    } else {
      const appData = appIcons.find(a => a.id === appId);
      let content, title = appData?.name || 'App', size = { width: 800, height: 600 };
      switch(appId) {
        case 'finder': content = <AboutContent />; title = 'Ashish Kumar Nanda'; break;
        case 'safari': content = <BrowserContent />; title = 'Safari'; size = { width: 950, height: 680 }; break;
        case 'mail': content = <MailContent />; title = 'Mail'; size = { width: 980, height: 640 }; break;
        case 'vscode': content = <SkillsExperienceContent />; title = 'VS Code'; break;
        case 'terminal': content = <TerminalContent />; title = 'Terminal'; size = { width: 600, height: 400 }; break;
        case 'camera': content = <PhotoBooth />; title = 'Photo Booth'; size = { width: 500, height: 600 }; break;
        case 'arcade': content = <SnakeGame />; title = 'Arcade'; size = { width: 440, height: 520 }; break;
        case 'settings': content = <SystemPreferencesContent />; title = 'System Preferences'; size = { width: 520, height: 260 }; break;
        case 'spotify': content = <SpotifyContent />; title = 'Spotify'; size = { width: 1000, height: 750 }; break;
        default: content = <div>Content not found</div>;
      }
      setWindows(prev => [...prev, { id: appId, title, icon: appData ? renderAppIcon(appData, 18) : undefined, component: content, isOpen: true, isMinimized: false, isMaximized: false, zIndex: zIndexCounter + 1, position: { x: 80 + (windows.length * 30), y: 80 + (windows.length * 30) }, size }]);
      setZIndexCounter(prev => prev + 1);
      setActiveWindow(appId);
    }
  };

  const closeWindow = (id: string, e?: React.MouseEvent) => { 
    e?.stopPropagation(); 
    const windowToClose = windows.find(w => w.id === id);
    if (windowToClose) {
      // Add to closed windows history for undo
      setClosedWindowsHistory(prev => [windowToClose, ...prev]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    }
    setWindows(prev => prev.filter(w => w.id !== id)); 
    if (activeWindow === id) setActiveWindow(null); 
  };
  const minimizeWindow = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)); setActiveWindow(null); };
  const maximizeWindow = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)); };
  const focusWindow = (id: string) => { if (activeWindow !== id) { setZIndexCounter(prev => prev + 1); setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w)); setActiveWindow(id); } };
  const startDrag = (e: React.MouseEvent, id: string) => { if (windows.find(w => w.id === id)?.isMaximized) return; focusWindow(id); setDraggedWindow(id); const wObj = windows.find(w => w.id === id); if (wObj) dragRef.current = { id, startX: e.clientX, startY: e.clientY, initialLeft: wObj.position.x, initialTop: wObj.position.y }; };

  const getDockIconPos = (appId: string) => {
    const index = appIcons.findIndex(a => a.id === appId);
    if (index === -1) return '50%';
    const total = appIcons.length;
    return `calc(50vw + ${(index - (total - 1) / 2) * 76}px)`;
  };

  // Menu action handlers
  const handleNewWindow = () => {
    openApp('finder');
  };

  const handleCloseAllWindows = () => {
    // Save all windows to history for undo
    setClosedWindowsHistory(prev => [...windows, ...prev]);
    setRedoStack([]);
    setWindows([]);
    setActiveWindow(null);
  };

  const handleUndo = () => {
    if (closedWindowsHistory.length > 0) {
      const windowToRestore = closedWindowsHistory[0];
      // Remove from history
      setClosedWindowsHistory(prev => prev.slice(1));
      // Add to redo stack
      setRedoStack(prev => [windowToRestore, ...prev]);
      // Restore the window with updated z-index
      setZIndexCounter(prev => prev + 1);
      const restoredWindow = { ...windowToRestore, zIndex: zIndexCounter + 1 };
      setWindows(prev => [...prev, restoredWindow]);
      setActiveWindow(windowToRestore.id);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const windowToClose = redoStack[0];
      // Remove from redo stack
      setRedoStack(prev => prev.slice(1));
      // Add back to closed history
      setClosedWindowsHistory(prev => [windowToClose, ...prev]);
      // Close the window
      setWindows(prev => prev.filter(w => w.id !== windowToClose.id));
      if (activeWindow === windowToClose.id) setActiveWindow(null);
    }
  };

  const handleEnterFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
  };

  const handleActualSize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // If mobile, show restriction message
  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-gray-700">
          <Monitor size={48} className="text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Desktop Only Experience</h2>
        <p className="text-gray-400 max-w-md leading-relaxed text-lg">
          This portfolio OS is designed for larger screens. <br/>
          <span className="text-gray-500 text-base mt-2 block">
            Kindly view on a laptop or desktop for the best interactive experience.
          </span>
        </p>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className="h-screen w-screen overflow-hidden font-sans select-none relative text-gray-900 bg-gray-900 app-root"
        onClick={() => {
          setActiveWindow(null);
          setActiveMenu(null);
        }}
      >
  
        {isFullscreen && (
          <div className="absolute top-10 right-6 z-50 bg-black/70 text-white px-3 py-1 rounded text-xs">
            Fullscreen mode
          </div>
        )}
  
        {/* Interactive Background */}
        <InteractiveBackground />
  
      
      {/* Top Menu Bar */}
      <TopBar
        title={activeWindow ? windows.find(w => w.id === activeWindow)?.title || '' : 'Finder'}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onOpenSystemPreferences={() => openApp('settings')}
        onNewWindow={handleNewWindow}
        onCloseAllWindows={handleCloseAllWindows}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onEnterFullScreen={handleEnterFullScreen}
        onActualSize={handleActualSize}
      />

      {/* Desktop Area */}
      <div className="relative w-full h-full pt-8 pb-24 z-10 pointer-events-none">
        
        {/* Desktop Icons */}
        <div className="absolute right-4 top-12 flex flex-col items-end gap-6 p-2 z-0 pointer-events-auto">
           <div className="group flex flex-col items-center cursor-pointer w-20" onDoubleClick={() => openApp('safari')}>
             <div className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
               {(() => {
                 const safariApp = appIcons.find(a => a.id === 'safari');
                 return safariApp ? renderAppIcon(safariApp, 56) : <Globe className="text-white/90 w-6 h-6" />;
               })()}
             </div>
             <span className="text-white text-xs mt-1 font-medium bg-black/20 px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">Projects</span>
           </div>
           <div className="group flex flex-col items-center cursor-pointer w-20" onDoubleClick={() => window.open("https://drive.google.com/file/d/1ln5ZruwH_u-QLrTHfz-pgZiiZt-vmECd/view?usp=sharing", "_blank")}>
             <div className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
               {(() => {
                 const vscodeApp = appIcons.find(a => a.id === 'vscode');
                 return vscodeApp ? renderAppIcon(vscodeApp, 56) : <Code className="text-white/90 w-6 h-6" />;
               })()}
             </div>
             <span className="text-white text-xs mt-1 font-medium bg-black/20 px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">Resume</span>
           </div>
        </div>

        {/* Windows */}
        {windows.map((win) => {
             const isDragging = draggedWindow === win.id;
             return (
               <div
                 key={win.id}
                 className={`absolute flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/10 ${isDragging ? '' : 'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
                 style={{ 
                   width: win.isMaximized ? '100vw' : win.size.width, 
                   height: win.isMaximized ? 'calc(100vh - 32px)' : win.size.height,
                   transformOrigin: `${getDockIconPos(win.id)} bottom`,
                   transform: win.isMinimized ? `translateY(100vh) scale(0)` : 'translateY(0) scale(1)',
                   opacity: win.isMinimized ? 0 : 1,
                   top: win.isMaximized ? 32 : win.position.y,
                   left: win.isMaximized ? 0 : win.position.x,
                   zIndex: win.zIndex,
                   pointerEvents: win.isMinimized ? 'none' : 'auto'
                 }}
                 onMouseDown={() => focusWindow(win.id)}
               >
                 <div className="h-9 bg-[#f3f3f3] border-b border-[#d1d1d1] flex items-center px-4 justify-between select-none" onMouseDown={(e) => startDrag(e, win.id)} onDoubleClick={(e) => maximizeWindow(win.id, e)}>
                    <div className="flex space-x-2 group">
                      <button onClick={(e) => closeWindow(win.id, e)} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:bg-[#ff5f57]/80 flex items-center justify-center transition-colors"><X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" /></button>
                      <button onClick={(e) => minimizeWindow(win.id, e)} className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] hover:bg-[#febc2e]/80 flex items-center justify-center transition-colors"><Minus size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" /></button>
                      <button onClick={(e) => maximizeWindow(win.id, e)} className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] hover:bg-[#28c840]/80 flex items-center justify-center transition-colors">{win.isMaximized ? <Minimize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" /> : <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />}</button>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 flex items-center gap-2">{win.icon && <span className="text-gray-400">{win.icon}</span>} {win.title}</div>
                    <div className="w-14"></div>
                 </div>
                 <div className="flex-1 overflow-hidden bg-white relative">{win.component}</div>
               </div>
             );
        })}
      </div>

      {/* Dock */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-[10000]">
        <div className="flex items-end space-x-3 px-4 pb-3 pt-3 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-300">
          {appIcons.map((app) => {
            // const isOpen = windows.some(w => w.id === app.id && !w.isMinimized);
            const isRunning = windows.some(w => w.id === app.id);
            return (
              <div key={app.id} className="group relative flex flex-col items-center">
                 <div className="absolute -top-14 bg-gray-800/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg pointer-events-none mb-2">{app.name}</div>
                 <button onClick={() => openApp(app.id)} className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ease-out transform hover:scale-110 hover:-translate-y-2 active:scale-95 active:translate-y-0 ring-1 ring-white/20 overflow-hidden`}>{renderAppIcon(app, 48)}</button>
                 <div className={`w-1 h-1 rounded-full bg-gray-800 mt-2 transition-all duration-300 ${isRunning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;