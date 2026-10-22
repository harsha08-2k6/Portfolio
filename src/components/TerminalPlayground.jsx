import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check } from 'lucide-react'
import './TerminalPlayground.css'

const HELP_COMMANDS = [
  { cmd: 'help', desc: 'List all available terminal commands' },
  { cmd: 'about', desc: 'Brief bio and background' },
  { cmd: 'skills', desc: 'Display technical skills matrix' },
  { cmd: 'projects', desc: 'List featured repositories & projects' },
  { cmd: 'stats', desc: 'Show live GitHub telemetry' },
  { cmd: 'contact', desc: 'Reach out via email & socials' },
  { cmd: 'resume', desc: 'Open my resume in a new tab' },
  { cmd: 'clear', desc: 'Clear the terminal output history' },
]

export default function TerminalPlayground() {
  const [inputVal, setInputVal] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'SHVR Terminal v2.4 (x86_64-portfolio-linux)\nType "help" to view available commands, or click any suggested pill below.',
    },
  ])
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const terminalBodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIdx(-1)

    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }]
    const command = trimmed.toLowerCase()

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: HELP_COMMANDS.map(
            (c) => `  ${c.cmd.padEnd(10, ' ')} - ${c.desc}`
          ).join('\n'),
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          text: `Tamlampudi Siva Harsha Vardhan Reddy (.SHVR)
Full-Stack Developer & Creative Technologist.
Focused on high-performance React architectures, Node.js/Python backends, and modern animated web experiences.`,
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Frontend]  React, Next.js, JavaScript, TypeScript, Tailwind CSS, HTML5, CSS3
[Backend]   Node.js, Express.js, Python, FastAPI, MongoDB, PostgreSQL
[DevOps]    Git, GitHub, Docker, AWS, Linux, GitHub Actions
[Creative]  Figma, Adobe Photoshop, CapCut, DaVinci Resolve`,
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Projects:
  1. Full-Stack Modern Portfolio (React + Vite + Framer Motion + Sanity CMS)
  2. Public Open Source Repositories on github.com/harsha08-2k6 (15+ repos)
  3. Interactive UI Libraries & Demonstrations

Type "stats" to view live GitHub stats or scroll to the Projects section above.`,
        })
        break

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `GitHub Telemetry (@harsha08-2k6):
  - Commits (Past Year): 315+
  - Public Repositories: 15
  - Active branches & deployments live on Vercel`,
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Let's connect:
  - GitHub:   https://github.com/harsha08-2k6
  - LinkedIn: https://www.linkedin.com/in/siva-harsha-vardhan-reddy/
  - Twitter:  https://x.com/harsha08_2k6`,
        })
        break

      case 'resume':
        window.open('/resume.html', '_blank')
        newHistory.push({
          type: 'output',
          text: 'Opening resume in a new tab... (resume.html)',
        })
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'sudo':
      case 'sudo rm -rf /':
        newHistory.push({
          type: 'output',
          text: 'Permission denied: Nice try! But you do not have root privileges here :)',
        })
        break

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" for a list of available commands.`,
        })
        break
    }

    setHistory(newHistory)
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(nextIdx)
      setInputVal(cmdHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === -1) return
      const nextIdx = historyIdx + 1
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1)
        setInputVal('')
      } else {
        setHistoryIdx(nextIdx)
        setInputVal(cmdHistory[nextIdx])
      }
    }
  }

  const copyHistory = () => {
    const textToCopy = history.map((h) => h.text).join('\n\n')
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="terminal-section" id="terminal">
      <div className="section-inner">
        {/* Consistent section header styling */}
        <div className="projects-header-grid">
          <div className="projects-header-left slash-reveal reveal-left visible">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">Playground</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up visible">
            <h2>Interactive Terminal</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left visible">
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Terminal Window */}
        <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
          {/* Top Title Bar */}
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
            </div>

            <div className="terminal-title">
              <TerminalIcon size={14} className="terminal-title-icon" />
              <span>harsha@shvr-portfolio:~</span>
            </div>

            <div className="terminal-actions">
              <button
                type="button"
                className="terminal-action-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  copyHistory()
                }}
                title="Copy Terminal Logs"
              >
                {copied ? <Check size={13} color="#78ED95" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="terminal-body" ref={terminalBodyRef}>
            {history.map((line, idx) => (
              <div key={idx} className={`terminal-line line-${line.type}`}>
                <pre>{line.text}</pre>
              </div>
            ))}

            {/* Input Line */}
            <div className="terminal-input-row">
              <span className="terminal-prompt">
                <span className="prompt-user">harsha</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">shvr</span>
                <span className="prompt-colon">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-dollar">$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command... (e.g. help)"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                className="terminal-submit-btn"
                onClick={() => handleCommand(inputVal)}
                title="Execute command"
              >
                <CornerDownLeft size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
