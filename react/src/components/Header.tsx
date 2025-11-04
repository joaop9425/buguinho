import { Bug } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Bug className="w-6 h-6 text-background" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Buguinho <span className="text-primary">Memes</span>
            </h1>
            <p className="text-xs text-muted-foreground">Memes4Devs</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Início
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Top Memes
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contribuir
          </a>
        </nav>
      </div>
    </header>
  );
};
