// src/services/productService.ts
import { apiService } from './api';
import type { Product, ProductFormData } from '../types/common';
import type { PaginatedResponse } from '../types/common';

export interface ProductSearchParams {
  page?: number;
  size?: number;
  search?: string;
  categoryId?: number;
  active?: boolean;
}

export const productService = {
  // Get all products with pagination and search
  async getProducts(params: ProductSearchParams = {}): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params.active !== undefined) queryParams.append('active', params.active.toString());

    return apiService.get<PaginatedResponse<Product>>(`/products?${queryParams.toString()}`);
  },

  // Get single product
  async getProduct(id: number): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`);
  },

  // Create product
  async createProduct(data: ProductFormData): Promise<Product> {
    return apiService.post<Product>('/products', data);
  },

  // Update product
  async updateProduct(id: number, data: ProductFormData): Promise<Product> {
    return apiService.put<Product>(`/products/${id}`, data);
  },

  // Delete product
  async deleteProduct(id: number): Promise<void> {
    return apiService.delete(`/products/${id}`);
  },

  // Get low stock products
  async getLowStockProducts(): Promise<Product[]> {
    return apiService.get<Product[]>('/products/low-stock');
  },
};