// src/types/common.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

// src/types/product.ts
