import { Header } from "@/components/Header";
import { MemeCard } from "@/components/MemeCard";

const memes = [
  {
    id: "1",
    title: "Se funciona...",
    image:
      "https://i.pinimg.com/1200x/e0/f1/76/e0f17677a6274b61b37d5251d0df2684.jpg",
    caption: "Mexe não... Ta funcionando assim!",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "06:52:43",
    },
  },
  {
    id: "2",
    title: "👀",
    image:
      "https://i.pinimg.com/736x/5c/fe/6b/5cfe6b81a3f3a4086efe179750726b86.jpg",
    caption: "🤦‍♀️",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "há 2 horas",
    },
  },
  {
    id: "3",
    title: "Does this shit even fucking make sense?",
    image:
      "https://i.pinimg.com/736x/f8/23/8a/f8238a3e6a7564797e0d9dbab53ba61e.jpg",
    caption:
      "Eu realmente vi que não entendo de memes, vou procurar outro hobby",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "há 5 horas",
    },
  },
  {
    id: "4",
    title: "Antes X Depois",
    image:
      "https://i.pinimg.com/1200x/3a/f2/94/3af2948aa416f4038d97b195b494df63.jpg",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "há 1 dia",
    },
  },
  {
    id: "5",
    title: "Estrutura CMS",
    image:
      "https://i.pinimg.com/736x/3f/72/79/3f7279dfaf0e8c9fa0a11578ac0007bd.jpg",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "há 2 dias",
    },
  },
  {
    id: "6",
    title: "Compre uma revista na banca mais próxima de você",
    image:
      "https://i.pinimg.com/736x/b6/b2/4c/b6b24c3c81768bb03b392e5f10e72277.jpg",
    caption: "E tenha o mais novo sucesso da internet",
    author: {
      name: "Jota",
      avatar:
        "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4",
      timestamp: "há 3 dias",
    },
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">
                🐛 Onde bugs viram risada
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Os melhores{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                memes tech
              </span>{" "}
              do momento
            </h2>
            <p className="text-lg text-muted-foreground">
              Porque programar já é difícil, pelo menos a gente pode rir dos
              bugs
            </p>
          </div>
        </div>
      </section>

      {/* Memes Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme) => (
              <MemeCard
                key={meme.id}
                id={meme.id}
                title={meme.title}
                image={meme.image}
                caption={meme.caption}
                author={meme.author}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 🐛 Buguinho Memes Tech 🐛
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Início
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
