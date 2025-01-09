export interface Blog {
    id: number;
    title: string;
    created_at: string;
    html_file: string;
    img_file: string;
}

export type BlogListResponse = Blog[];