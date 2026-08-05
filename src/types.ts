export type User={
    id: string;
    username: string;
    name: string;
    image:string;
    avatar_url: string | null;
}

export type Post={
    id: string;
    created_at: string;
    content: string;
    user_id: string;
    user: User;
    parent_id:string | null;
    parent: Post | null;
    replose: Post[];

};