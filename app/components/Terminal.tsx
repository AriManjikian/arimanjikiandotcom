import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { getUserIp, getSystemInfo } from '../lib/systeminfo';
interface Command {
  input: string;
  output: string[];
  timestamp: Date;
}

const TerminalComponent: React.FC = () => {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [userIp, setUserIp] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      const ip = await getUserIp();
      setUserIp(ip);
    };
    fetchUserIp();
  }, []);
  const commands = {
    help: [
      'Available commands:',
      '  help        - Show this help message',
      '  whoami      - Display system and user information',
      '  projects    - View my projects',
      '  experience  - View my work experience',
      '  contact     - Get my contact information',
      '  clear       - Clear the terminal',
      '',
      'Type any command to get started!',
    ],
    whoami: async () => await getSystemInfo(userIp),
    projects: [
      'Featured Projects:',
      '=================',
      '',
      '1. RISC-V Single-Cycle CPU Core',
      '   - Designed and implemented a single-cycle RV32I processor core in SystemVerilog.',
      '   - Supports ALU operations, branching, and memory access.',
      '   - Built a cocotb verification framework and ran instruction-level tests in Verilator.',
      '   - Achieved 99.4% code coverage and uncovered multiple decode and control-logic edge cases.',
      '',
      '2. SaaS — Sentence Clustering',
      '   - Developed sentence embedding and clustering pipeline using TensorFlow Universal Sentence Encoder.',
      '   - Achieved 100% cost savings by transitioning away from paid OpenAI APIs.',
      '   - Clustered over 5,000 sentences using K-means, DBSCAN, and HAC.',
      '   - Improved clustering accuracy by 15% using elbow method and iterative testing.',
      '   - Integrated clustering into a React SaaS platform for organizing Q&A sessions.',
    ],
    experience: [
      'Work Experience:',
      '===============',
      '',
      'Digital Design Engineer @ SiliconJackets (Aug 2025 – Nov 2025)',
      '  - Designed and implemented a superscalar pipelined RISC-V core with full RV32I support, including custom CSR logic for tapeout.',
      '  - Built and maintained a SystemVerilog verification suite, achieving 99.8% code coverage.',
      '  - Validated functionality using SimVision and Verdi, resolving critical decode, memory, and control-path edge cases.',
      '  - Collaborated with physical design to refine floorplanning and verify clocking and reset strategies prior to final layout.',
    ],
    contact: [
      'Contact Information:',
      '===================',
      '',
      'Email:    amanjikian3@gatech.edu',
      'Phone:    (404) 654-0033',
      'LinkedIn: linkedin.com/in/arimanjikian',
      'GitHub:   github.com/arimanjikian',
    ],
    clear: [],
  };

  const executeCommand = async (input: string) => {
    const command = input.toLowerCase().trim();
    const commandFunction = commands[command as keyof typeof commands];

    let output: string[];
    if (typeof commandFunction === 'function') {
      output = await commandFunction();
    } else if (commandFunction) {
      output = commandFunction;
    } else {
      output = [`Command not found: ${input}`, 'Type "help" to see available commands.'];
    }

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    setHistory(prev => [
      ...prev,
      {
        input,
        output,
        timestamp: new Date(),
      },
    ]);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setIsTyping(true);

    // Add to command history if it's not the same as the last command
    setCommandHistory(prev => {
      if (prev[prev.length - 1] !== currentInput.trim()) {
        return [...prev, currentInput.trim()];
      }
      return prev;
    });

    executeCommand(currentInput);
    setCurrentInput('');
    setHistoryIndex(-1); // Reset history index

    setTimeout(() => setIsTyping(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const banner = [
      ' █████  ██████  ██ ███    ███  █████  ███    ██      ██ ██ ██   ██ ██  █████  ███    ██ ',
      '██   ██ ██   ██ ██ ████  ████ ██   ██ ████   ██      ██ ██ ██  ██  ██ ██   ██ ████   ██ ',
      '███████ ██████  ██ ██ ████ ██ ███████ ██ ██  ██      ██ ██ █████   ██ ███████ ██ ██  ██ ',
      '██   ██ ██   ██ ██ ██  ██  ██ ██   ██ ██  ██ ██  ██  ██ ██ ██  ██  ██ ██   ██ ██  ██ ██ ',
      '██   ██ ██   ██ ██ ██      ██ ██   ██ ██   ████  ██  ██ ██ ██  ██  ██ ██   ██ ██   ████ ',
      '██   ██ ██   ██ ██ ██      ██ ██   ██ ██    ███   ████  ██ ██   ██ ██ ██   ██ ██    ███ ',
      '',
    ];

    setHistory([
      {
        input: '',
        output: [...banner, 'Type "help" to see available commands.'],
        timestamp: new Date(),
      },
    ]);
  }, []);

  const isBannerLine = (line: string) => line.includes('█');

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <Terminal className="w-4 h-4 text-green-400" />
        <span className="text-gray-300 text-sm font-mono">ari@terminal:~$</span>
      </div>

      <div ref={terminalRef} className="h-[60dvh] overflow-y-auto terminal-scroll p-4 cursor-text" onClick={focusInput}>
        {history.map((cmd, index) => (
          <div key={index} className="mb-2">
            {cmd.input && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-400 font-mono text-sm">$</span>
                <span className="text-white font-mono text-sm">{cmd.input}</span>
              </div>
            )}
            {cmd.output.map((line, lineIndex) => {
              const bannerColorMap = [
                'text-red-500',
                'text-red-500',
                'text-blue-500',
                'text-blue-500',
                'text-orange-400',
                'text-orange-400',
              ];

              const isBanner = isBannerLine(line);
              const bannerColorClass = isBanner ? bannerColorMap[lineIndex % bannerColorMap.length] : 'text-gray-300';
              if (line == '') {
                return <div key={`empty-${index}-${lineIndex}`} className="h-2" />;
              }
              return (
                <div
                  key={lineIndex}
                  className={`font-mono leading-tight ${isBanner
                    ? `flex text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] tracking-tight ${bannerColorClass}`
                    : 'text-gray-300 text-sm'
                    }`}
                  style={isBanner ? { fontFamily: '"Fira Mono", monospace' } : {}}
                >
                  {isBanner ? (
                    [...line].map((char, charIndex) => (
                      <span key={charIndex} className="font-bold leading-none">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))
                  ) : (
                    <code>{line}</code>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex items-center gap-2">
          {' '}
          <span className="text-green-400 font-mono text-sm">$</span>{' '}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
