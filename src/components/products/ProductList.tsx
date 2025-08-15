import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Package, Edit, Trash2 } from 'lucide-react';

import { SimpleProduct } from '../../types/product';

interface Product extends SimpleProduct {}

interface ProductListProps {
  data?: {
    products: Product[];
    total: number;
    page: number;
    size: number;
  };
  isLoading: boolean;
  error: any;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const ProductList: React.FC<ProductListProps> = ({
  data,
  isLoading,
  error,
  onPageChange,
  currentPage,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500">Error loading products: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data?.products?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil(data.total / data.size);

  return (
    <div className="space-y-4">
      {data.products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">{product.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">${product.price}</span>
              <span className="text-muted-foreground">Stock: {product.stock}</span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;