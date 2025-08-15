// src/components/products/ProductList.tsx
import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';

import ProductForm from './ProductForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import type{ Product } from '../types/product';
import type{ PaginatedResponse } from '../types/common';
import { useDeleteProduct } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';

interface ProductListProps {
  data?: PaginatedResponse<Product>;
  isLoading: boolean;
  error: any;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function ProductList({ data, isLoading, error, onPageChange, currentPage }: ProductListProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  const deleteProductMutation = useDeleteProduct();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Loading products...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load products. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.content.length) {
    return (
      <Card>
        <CardContent className="text-center py-16">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
        </CardContent>
      </Card>
    );
  }

  const handleDelete = async (product: Product) => {
    try {
      await deleteProductMutation.mutateAsync(product.id);
      setDeletingProduct(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Products ({data.totalElements})</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.content.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {product.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {product.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(product.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">-</span>
                      <span className="text-xs text-gray-500">/{product.unit}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.active ? "default" : "secondary"}>
                      {product.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeletingProduct(product)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {[...Array(Math.min(5, data.totalPages))].map((_, i) => {
              const pageNum = currentPage <= 2 ? i : currentPage - 2 + i;
              if (pageNum >= data.totalPages) return null;
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={pageNum === currentPage}
                    className="cursor-pointer"
                  >
                    {pageNum + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                className={currentPage === data.totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSuccess={() => setEditingProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingProduct}
        onOpenChange={() => setDeletingProduct(null)}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deletingProduct && handleDelete(deletingProduct)}
        isLoading={deleteProductMutation.isPending}
        variant="destructive"
      />
    </>
  );
}