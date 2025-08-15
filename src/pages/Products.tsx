import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import PageHeader from '../components/common/PageHeader';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

export default function Products() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const debouncedSearch = useDebounce(search, 300);
  
  const { data: productsData, isLoading, error } = useProducts({
    search: debouncedSearch,
    page,
    size: 20,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog"
      >
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSuccess={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ProductList
        data={productsData}
        isLoading={isLoading}
        error={error}
        onPageChange={setPage}
        currentPage={page}
      />
    </div>
  );
}