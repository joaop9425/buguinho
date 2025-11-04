import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface MemeCardProps {
  id: string;
  title: string;
  image: string;
  caption?: string;
  author: {
    name: string;
    avatar: string;
    timestamp: string;
  };
}

export const MemeCard = ({
  id,
  title,
  image,
  caption,
  author,
}: MemeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 animate-fade-in cursor-pointer"
      onClick={() => navigate(`/meme/${id}`)}
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="relative overflow-hidden rounded-lg mb-3 bg-muted/20">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {caption && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {caption}
          </p>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-border/30">
          <Avatar className="w-8 h-8 ring-2 ring-primary/20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {author.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.timestamp}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
