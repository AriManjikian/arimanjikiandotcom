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
                href="AriManjikian-Resume.pdf"
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
            I’m a developer and Applied Physics student at Georgia Tech, with hands-on experience across SaaS, embedded
            systems, and scalable backend platforms. I enjoy on building real-world tools, learning interesting tech,
            and bringing ideas to life.
          </p>
        </MarkdownSection>

        <Error_Block />

        {/* Featured Projects */}
        <section id="projects">
          <MarkdownSection title="Featured Projects">
            <div className="space-y-6">
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

              <div className="p-4 bg-card rounded border">
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-muted-foreground">### </span>
                  BuzzPathway
                </h3>
                <p className="text-muted-foreground mb-3">
                  Personalized transfer plan generator used by 500+ students. Collected and maintained course data
                  across 1,700+ schools via web scraping + Vercel cron jobs. Built with MongoDB and automated pipelines.
                </p>
                <div className="flex gap-2 text-sm">
                  <span className="bg-green-100 text-yellow-800 px-2 py-1 rounded">MongoDB</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Cron Jobs</span>
                  <span className="bg-yellow-100 text-green-800 px-2 py-1 rounded">Web Scraping</span>
                </div>
              </div>
            </div>
          </MarkdownSection>
        </section>

        {/* Familiar Tech */}
        <MarkdownSection title="What I use">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Programming Languages</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- JavaScript</li>
                <li>- TypeScript</li>
                <li>- Python</li>
                <li>- Go</li>
                <li>- Dart</li>
                <li>- C++</li>
                <li>- Solidity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Databases & Infra</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- PostgreSQL</li>
                <li>- Firebase</li>
                <li>- MongoDB</li>
                <li>- Supabase</li>
                <li>- Docker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Tools & Technologies</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- Git</li>
                <li>- Figma</li>
                <li>- TensorFlow</li>
                <li>- AWS(S3,EC2)</li>
                <li>- SEO tools</li>
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
            <a href="mailto:arikevorkmanjikian@gmail.com" className="hover:text-primary underline">
              arikevorkmanjikian@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
