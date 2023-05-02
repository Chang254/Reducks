export interface post {
    id: string;
    duckType: number;
    userId: string;
    time: Date;
}

export interface postProps {
    post: post
}