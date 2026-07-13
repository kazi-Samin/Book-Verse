export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn?: string;
  price: number;
  stock: number;
  rating: number;
  coverImage?: string;
  description: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
