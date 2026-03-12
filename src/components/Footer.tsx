import { Github, Linkedin, Mail } from 'lucide-react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full h-full relative bg-white flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="font-mono text-xs text-gray-400">
          © {currentYear} John Doe. All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-gray-400">
          <a
            href="#"
            className="hover:text-black transition-colors"
            aria-label="GitHub">
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors"
            aria-label="LinkedIn">
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:hello@example.com"
            className="hover:text-black transition-colors"
            aria-label="Email">
            <Mail size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>);

}