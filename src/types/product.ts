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
