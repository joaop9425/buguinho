import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MemeCardProps {
  title: string;
  text: string;
  mediaUrl: string;
  userPhoto: string;
  username: string;
  slug: string;
  index: number;
}

export const MemeCard = ({
  title,
  text,
  mediaUrl,
  userPhoto,
  username,
  slug,
  index
}: MemeCardProps) => {
  const [currentOrigin, setCurrentOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative bg-card border border-border overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
    >
      <a href={`/meme/${slug}`} className="absolute inset-0 z-10 pointer-events-auto mb-20">
        <span className="sr-only">View {title}</span>
      </a>

      {/* Media Source Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {(mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm')) ? (
          <video
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')
              ? `https://img.youtube.com/vi/${mediaUrl.split('v=')[1]?.split('&')[0] || mediaUrl.split('/').pop()}/maxresdefault.jpg`
              : mediaUrl
            }
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800';
            }}
          />
        )}

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content Meta */}
      <div className="p-6 flex flex-col flex-1 relative z-20">
        <div className="flex items-center gap-2 mb-4">
          <img
            src={userPhoto}
            alt={username}
            className="w-6 h-6 rounded-full border border-border object-cover"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{username}</span>
        </div>

        <h3 className="font-display text-lg md:text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-xs md:text-sm font-medium line-clamp-2 mb-6">
          {text}
        </p>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + currentOrigin + "/meme/" + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#25D366] transition-colors p-1"
              title="Share on WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentOrigin + "/meme/" + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#1877F2] transition-colors p-1"
              title="Share on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentOrigin + "/meme/" + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Share on X"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
          <svg className="w-4 h-4 text-primary transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
