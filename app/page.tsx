'use client';
import Error_Block from './components/Error_Block';
import { MarkdownSection } from './components/MarkdownComponents';
import Terminal from './components/Terminal';
import { Github, NotebookText } from 'lucide-react';
const Index = () => {
  return (
    <div className="min-h-screen bg-bakcground font-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <MarkdownSection title="Ari Manjikian" level={1}>
            <nav className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm hover:bg-black hover:text-white transition-colors"
              >
                Projects
              </a>
              <a
                href="#terminal"
                className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm hover:bg-black hover:text-white  transition-colors"
              >
                Terminal
              </a>
              <a
                href="AriManjikianResume.pdf"
                target="_blank"
                className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm hover:bg-black hover:text-white  transition-colors"
              >
                Resume
              </a>
              <a
                href="/notebook"
                className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm hover:bg-black hover:text-white  transition-colors"
              >
                Notebook
              </a>
            </nav>
          </MarkdownSection>
        </div>

        {/* About Section */}
        <MarkdownSection title="About">
          <p className="mb-4">
            I&apos;m an Electrical Engineering student at Georgia Tech working in FPGA, RTL, and digital system design.
            I&apos;m interested in low-latency, high-throughput systems. I enjoy working with both hardware and
            software, designing custom logic. building testbenches, and creating tooling. When I&apos;m not working on
            hardware, I&apos;m usually tweaking my neovim config, cooking, or playing chess.
          </p>
          <p>Feel free to reach out - amanjikian3 [at] gatech [dot] edu</p>
        </MarkdownSection>

        <Error_Block />

        {/* Featured Projects */}
        <section id="projects">
          <MarkdownSection title="Featured Projects">
            <div className="space-y-6">
              <div className="p-4 bg-card rounded border">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground">### </span>
                  <span>Jane Street Advent of FPGA - AOC Solution in Hardcaml</span>{' '}
                  <span className="flex gap-2 items-center ml-auto">
                    <a
                      href="https://github.com/AriManjikian/advent-of-fpga-2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      <Github className="size-4" />
                    </a>
                  </span>
                </h3>
                <p className="text-muted-foreground mb-3">
                  Advent of FPGA 2025 solution: AOC Day 1 implemented in Hardcaml with Go golden model
                </p>
                <div className="flex gap-2 text-sm">
                  <span className="bg-orange-100 text-blue-800 px-2 py-1 rounded">OCaml</span>
                  <span className="bg-blue-100 text-green-800 px-2 py-1 rounded">Hardcaml</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Golang</span>
                </div>
              </div>

              <div className="p-4 bg-card rounded border">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground">### </span>
                  <span>RISC-V Single-Cycle CPU</span>{' '}
                  <span className="flex gap-2 items-center ml-auto">
                    <a
                      href="https://github.com/AriManjikian/core0_riscv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      <Github className="size-4" />
                    </a>
                  </span>
                </h3>
                <p className="text-muted-foreground mb-3">
                  A single-cycle RISC-V processor core supporting the full RV32I instruction set, including ALU ops,
                  branching, and memory access, with instruction-level testing with cocotb.
                </p>
                <div className="flex gap-2 text-sm">
                  <span className="bg-green-100 text-blue-800 px-2 py-1 rounded">SystemVerilog</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">cocotb</span>
                  <span className="bg-blue-100 text-green-800 px-2 py-1 rounded">Verilator</span>
                </div>
              </div>

              <div className="p-4 bg-card rounded border">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground">### </span>
                  <span>Senence Clustering</span>{' '}
                  <span className="flex gap-2 items-center ml-auto">
                    <a
                      href="https://github.com/AriManjikian/sentence-clustering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      <Github className="size-4" />
                    </a>
                    <a
                      href="https://medium.com/@A_Manjikian/sentence-embedding-and-clustering-with-openai-and-tensorflow-in-javascript-5d9bc794e273"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      <NotebookText className="size-4" />
                    </a>
                  </span>
                </h3>
                <p className="text-muted-foreground mb-3">
                  JavaScript platform using OpenAI + TensorFlow for semantic clustering of 5,000+ sentences. Saved 100%
                  of cost by leveraging open-source models. Used K-means, DBSCAN, and HAC, visualized with elbow method.
                </p>
                <div className="flex gap-2 text-sm">
                  <span className="bg-green-100 text-blue-800 px-2 py-1 rounded">OpenAI</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">TensorFlow</span>
                  <span className="bg-blue-100 text-green-800 px-2 py-1 rounded">Python</span>
                </div>
              </div>
            </div>
          </MarkdownSection>
        </section>

        {/* Familiar Tech */}
        <MarkdownSection title="What I use">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Languages & HDL</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- SystemVerilog</li>
                <li>- Verilog</li>
                <li>- VHDL</li>
                <li>- C++</li>
                <li>- Python</li>
                <li>- Bash</li>
                <li>- MATLAB</li>
                <li>- Tcl</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-primary">FPGA & ASIC Tooling</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- Vivado</li>
                <li>- Quartus</li>
                <li>- Lattice</li>
                <li>- Verilator</li>
                <li>- Static Timing Analysis</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-primary">Systems & Infrastructure</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- Linux</li>
                <li>- Git</li>
                <li>- Docker</li>
                <li>- Networking (TCP/UDP)</li>
              </ul>
            </div>
          </div>
        </MarkdownSection>
        <section id="terminal">
          <Terminal />
        </section>
        <section className="h-fit"></section>
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            <a href="mailto:amanjikian3@gatech.edu" className="hover:text-primary underline">
              amanjikian3@gatech.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
