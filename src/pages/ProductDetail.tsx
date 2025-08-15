import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
        <p className="text-muted-foreground">
          View and edit product information for ID: {id}
        </p>
      </div>
      
      <div className="border rounded-lg p-6">
        <p className="text-center text-muted-foreground">
          Product detail functionality coming soon...
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;