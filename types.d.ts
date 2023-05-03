export interface post {
    id: string;
    duckType: number;
    userId: string;
    time: Date;
}

export interface postProps {
    post: post
}

export interface userInfo {
    id: string;
    image: string;
    name: string;
    favoriteDuck: number | null
}
