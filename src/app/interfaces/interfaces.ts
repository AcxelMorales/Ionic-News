export interface IRespTopHeadlines {
  status:       string;
  totalResults: number;
  articles:     IArticle[];
}

export interface IArticle {
  source:      ISource;
  author:      null | string;
  title:       string;
  description: string;
  url:         string;
  urlToImage:  string;
  publishedAt: string;
  content:     string;
}

export interface ISource {
  id:   null | string;
  name: string;
}
