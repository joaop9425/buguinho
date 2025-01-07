export type Memes = Meme[];

export type Meme = {
    title: string;
    text: string;
    mediaUrl: string;
    username: string | null;
    userPhoto: string | null
}
