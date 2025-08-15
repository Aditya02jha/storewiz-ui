// src/types/product.ts
import type { BaseEntity } from './common';

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  code: string;
}

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  sku: string;
  unitPrice: number;
  unit: string;
  minStockLevel: number;
  maxStockLevel: number;
  category: Category;
  createdBy: string;
  active: boolean;
  // Additional fields for compatibility with components
  price?: number;
  stock?: number;
  status?: 'active' | 'inactive';
}

export interface ProductFormData {
  name: string;
  description?: string;
  sku: string;
  unitPrice: number;
  unit: string;
  minStockLevel: number;
  maxStockLevel: number;
  categoryId: number;
}

// Simple product interface for components
export interface SimpleProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
}
