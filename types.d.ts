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

export interface userImage {
    image: string;
}

export type userInfoData = userInfo[]
export type userPostData = userPost[]
export type userImageData = userImage[]
    
