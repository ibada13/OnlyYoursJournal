export interface JournalCardInterface { 
    id:string ,
    title: string, 
    created_at: string, 
    updated_at: string, 
    
}
export interface JournalContent { 
  content: string, 
  salt: string, 
  iv:string ,
}

export interface JounalPageInterface { 
    id: string,
    content:string ,
    created_at: string, 
    updated_at: string, 
}


export interface Salt {
  salt: string;
  iv: string;
}

export interface Journal {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  salt: Salt;
}

export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface JournalApiResponse {
  current_page: number;
  data: Journal[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
