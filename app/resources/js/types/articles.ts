export type Comment = {
  id: number;
  article_id?: number;
  author_name: string;
  content: string;
  created_at: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  comments?: Comment[];
  comments_count?: number;
};

