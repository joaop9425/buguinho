import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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

const MemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meme = memes.find((m) => m.id === id);

  if (!meme) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Meme não encontrado 😢
          </h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <article className="max-w-4xl mx-auto animate-fade-in">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {meme.title}
              </h1>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/30">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                  <AvatarImage
                    src={meme.author.avatar}
                    alt={meme.author.name}
                  />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {meme.author.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {meme.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {meme.author.timestamp}
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-muted/20 mb-6">
                <img
                  src={meme.image}
                  alt={meme.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {meme.caption && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {meme.caption}
                </p>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default MemeDetail;
