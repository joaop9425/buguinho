export const isVideo = (url: string = "") => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const videoHosts = ['youtube.com', 'youtu.be', 'vimeo.com', 'facebook.com', 'instagram.com/p/'];
    return (
        videoExtensions.some(ext => url.toLowerCase().endsWith(ext)) ||
        videoHosts.some(host => url.toLowerCase().includes(host))
    );
};

export const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};
