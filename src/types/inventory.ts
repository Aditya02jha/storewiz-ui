// src/types/inventory.ts
import { BaseEntity } from './common';
import { Product } from './product';

export enum TransactionType {
  STOCK_IN = 'STOCK_IN',
  STOCK_OUT = 'STOCK_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  DAMAGED = 'DAMAGED',
  RETURN = 'RETURN'
}

export interface CurrentStock {
  productId: number;
  product: Product;
  availableQuantity: number;
  reservedQuantity: number;
  averageCost: number;
  lastUpdated: string;
}

export interface InventoryTransaction extends BaseEntity {
  product: Product;
  type: TransactionType;
  quantity: number;
  unitCost?: number;
  reference?: string;
  notes?: string;
  transactionDate: string;
  performedBy: string;
  stockBefore: number;
  stockAfter: number;
}

export interface StockMovementData {
  productId: number;
  type: TransactionType;
  quantity: number;
  unitCost?: number;
  reference?: string;
  notes?: string;
}

export interface LowStockAlert {
  product: Product;
  currentStock: number;
  minStockLevel: number;
  stockShortage: number;
}

// src/types/auth.ts
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  active: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}