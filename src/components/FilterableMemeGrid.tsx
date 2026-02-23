import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemeCard } from './MemeCard';
import * as gtag from '../lib/gtag';

interface MemeGridProps {
    groupedMemes: Record<string, any[]>;
    sortedDates: string[];
}

export const FilterableMemeGrid = ({ groupedMemes, sortedDates }: MemeGridProps) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [visibleGroups, setVisibleGroups] = useState(3);

    const filterDates = useMemo(() => {
        if (selectedDate) return [selectedDate];
        return sortedDates.slice(0, visibleGroups);
    }, [selectedDate, sortedDates, visibleGroups]);

    const hasMore = !selectedDate && visibleGroups < sortedDates.length;

    const loadMore = () => {
        gtag.event({
            action: 'load_more',
            category: 'engagement',
            label: 'timeline_load_more',
            value: visibleGroups + 3
        });
        setVisibleGroups(prev => prev + 3);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get('date');
        if (dateParam && sortedDates.includes(dateParam)) {
            setSelectedDate(dateParam);
            // Longer delay for initial mount to ensure layout is ready
            setTimeout(() => scrollToDate(dateParam), 800);
        }
    }, []);

    const scrollToDate = (date: string) => {
        const element = document.getElementById(`date-${date}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="w-full relative">
            {/* Floating Temporal Navigator */}
            {!selectedDate && (
                <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
                    <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                    {filterDates.map((date) => (
                        <button
                            key={`nav-${date}`}
                            onClick={() => scrollToDate(date)}
                            className="group relative w-2 h-2 rounded-full bg-primary/20 hover:bg-primary transition-all duration-300"
                            title={date}
                        >
                            <span className="absolute right-full mr-4 px-2 py-1 bg-card border border-border text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {(() => {
                                    const [year, month, day] = date.split('-').map(Number);
                                    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                                })()}
                            </span>
                        </button>
                    ))}
                    <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
                </div>
            )}

            {/* Date Filter Navigation */}
            <div className="mb-16 border-b border-border/50 pb-8 flex flex-col items-center gap-6">
                <div className="text-center w-full">
                    <h2 className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        Archives / Timeline
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => {
                                gtag.event({
                                    action: 'filter_date',
                                    category: 'filter',
                                    label: 'all_time'
                                });
                                setSelectedDate(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedDate === null
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary'
                                }`}
                        >
                            All Time
                        </button>
                        {sortedDates.slice(0, 7).map((date) => (
                            <button
                                key={date}
                                onClick={() => {
                                    gtag.event({
                                        action: 'filter_date',
                                        category: 'filter',
                                        label: date
                                    });
                                    setSelectedDate(date);
                                    // Small delay to allow current filtering animation if any, then scroll
                                    setTimeout(() => scrollToDate(date), 50);
                                }}
                                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedDate === date
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                    : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary'
                                    }`}
                            >
                                {(() => {
                                    const [year, month, day] = date.split('-').map(Number);
                                    return new Date(year, month - 1, day).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                                })()}
                            </button>
                        ))}
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-center">
                        {selectedDate ? `Viewing: ${(() => {
                            const [year, month, day] = selectedDate.split('-').map(Number);
                            return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
                        })()}` : 'Latest Collections'}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="space-y-24 w-full">
                <AnimatePresence mode="popLayout">
                    {filterDates.map((date, groupIndex) => (
                        <motion.div
                            key={date}
                            id={`date-${date}`}
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: (groupIndex % 3) * 0.15
                            }}
                            className="group/date scroll-mt-32"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-12 h-[1px] bg-primary/30"></span>
                                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                                    {(() => {
                                        const [year, month, day] = date.split('-').map(Number);
                                        return new Date(year, month - 1, day).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
                                    })()}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {groupedMemes[date].map((meme, index) => (
                                    <MemeCard
                                        key={meme.slug}
                                        title={meme.data.title}
                                        text={meme.data.text || ""}
                                        mediaUrl={meme.data.mediaUrl || ""}
                                        userPhoto={meme.data.userPhoto || ""}
                                        username={meme.data.username}
                                        slug={meme.slug}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Surprise "Dive Deeper" Interaction */}
                {hasMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="pt-12 flex justify-center"
                    >
                        <button
                            onClick={loadMore}
                            className="group relative px-12 py-6 overflow-hidden bg-transparent border border-primary/20 hover:border-primary transition-colors duration-500"
                        >
                            <span className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.3em] text-primary group-hover:text-white transition-colors duration-500">
                                Discover More Artifacts
                            </span>
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />

                            {/* Decorative elements */}
                            <span className="absolute top-0 left-0 w-1 h-1 bg-primary"></span>
                            <span className="absolute bottom-0 right-0 w-1 h-1 bg-primary"></span>
                        </button>
                    </motion.div>
                )}

                {!hasMore && !selectedDate && (
                    <div className="pt-24 text-center">
                        <span className="inline-block w-8 h-[1px] bg-border mb-4"></span>
                        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                            End of Known History
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
