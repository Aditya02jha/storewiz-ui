// src/types/vendor.ts
// src/types/vendor.ts
import type { BaseEntity } from './common';
import type { Product } from './product';
export type VendorStatus = 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED';

export interface Vendor extends BaseEntity {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  status: VendorStatus;
  creditLimit: number;
  paymentTermsDays: number;
  vendorProducts?: VendorProduct[];
}

export interface VendorProduct extends BaseEntity {
  vendor: Vendor;
  product: Product;
  vendorPrice: number;
  vendorProductCode?: string;
  leadTimeDays: number;
  minimumOrderQuantity: number;
}

export interface VendorFormData {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  status: VendorStatus;
  creditLimit: number;
  paymentTermsDays: number;
}

