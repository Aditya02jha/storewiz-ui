// src/services/inventoryService.ts
import { apiService } from './api';
import type {
    CurrentStock,
    InventoryTransaction,
    StockMovementData,
    LowStockAlert
} from '../types/inventory';
import type { PaginatedResponse } from '../types/common';

export const inventoryService = {
  // Get current stock for a product
  async getCurrentStock(productId: number): Promise<CurrentStock> {
    return apiService.get<CurrentStock>(`/inventory/stock/${productId}`);
  },

  // Get all current stocks
  async getAllCurrentStocks(): Promise<CurrentStock[]> {
    return apiService.get<CurrentStock[]>('/inventory/stock');
  },

  // Add stock
  async addStock(data: StockMovementData): Promise<InventoryTransaction> {
    return apiService.post<InventoryTransaction>('/inventory/stock/add', data);
  },

  // Remove stock
  async removeStock(data: StockMovementData): Promise<InventoryTransaction> {
    return apiService.post<InventoryTransaction>('/inventory/stock/remove', data);
  },

  // Adjust stock
  async adjustStock(data: StockMovementData): Promise<InventoryTransaction> {
    return apiService.post<InventoryTransaction>('/inventory/stock/adjust', data);
  },

  // Get inventory transactions
  async getTransactions(
    productId?: number, 
    page: number = 0, 
    size: number = 20
  ): Promise<PaginatedResponse<InventoryTransaction>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (productId) params.append('productId', productId.toString());
    
    return apiService.get<PaginatedResponse<InventoryTransaction>>(`/inventory/transactions?${params.toString()}`);
  },

  // Get low stock alerts
  async getLowStockAlerts(): Promise<LowStockAlert[]> {
    return apiService.get<LowStockAlert[]>('/inventory/low-stock-alerts');
  },
};

