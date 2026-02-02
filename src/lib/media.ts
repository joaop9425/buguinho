export const isVideo = (url: string = "") => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const videoHosts = ['youtube.com', 'youtu.be', 'vimeo.com', 'facebook.com', 'instagram.com', 'tiktok.com', 'pinterest.com', 'pin.it', 'x.com', 'twitter.com'];
    return (
        videoExtensions.some(ext => url.toLowerCase().endsWith(ext)) ||
        videoHosts.some(host => url.toLowerCase().includes(host))
    );
};

export const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const getMediaType = (url: string) => {
    if (!url) return 'image';
    const trimmed = url.trim();
    if (trimmed.startsWith('<')) return 'raw-html';

    const lowUrl = url.toLowerCase();
    if (lowUrl.includes('youtube.com') || lowUrl.includes('youtu.be')) return 'youtube';
    if (lowUrl.includes('instagram.com/reel/')) return 'instagram-reel';
    if (lowUrl.includes('instagram.com/')) return 'instagram';
    if (lowUrl.includes('vimeo.com/')) return 'vimeo';
    if (lowUrl.includes('pinterest.com') || lowUrl.includes('pin.it')) return 'pinterest';
    if (lowUrl.includes('x.com') || lowUrl.includes('twitter.com')) return 'twitter';
    if (lowUrl.endsWith('.mp4') || lowUrl.endsWith('.webm')) return 'direct-video';
    return 'image';
};

export const getEmbedUrl = (url: string) => {
    if (!url || url.trim().startsWith('<')) return null;
    const lowUrl = url.toLowerCase();

    // YouTube
    const ytId = getYouTubeID(url);
    if (ytId) return `https://www.youtube.com/embed/${ytId}`;

    // Instagram
    if (lowUrl.includes('instagram.com/')) {
        const cleanUrl = url.split('?')[0];
        return `${cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/'}embed/`;
    }

    // Vimeo
    if (lowUrl.includes('vimeo.com/')) {
        const vimeoId = url.split('/').pop();
        return `https://player.vimeo.com/video/${vimeoId}`;
    }

    // Pinterest
    if (lowUrl.includes('pinterest.com/ext/embed.html')) return url;
    if (lowUrl.includes('pinterest.com/pin/')) {
        const pinIdArr = url.split('/pin/');
        if (pinIdArr.length > 1) {
            const pinId = pinIdArr[1].split('/')[0];
            return `https://assets.pinterest.com/ext/embed.html?id=${pinId}`;
        }
    }

    return null;
};

export const getThumbnailUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800';

    if (url.trim().startsWith('<')) {
        return 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=800'; // Placeholder para Widgets
    }

    const lowUrl = url.toLowerCase();

    const ytId = getYouTubeID(url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;

    if (lowUrl.includes('x.com') || lowUrl.includes('twitter.com')) {
        return 'https://abs.twimg.com/errors/logo46x38.png';
    }

    return url;
};
