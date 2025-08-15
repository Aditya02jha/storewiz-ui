import React from 'react';

const Categories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Organize your products with categories.
        </p>
      </div>
      
      <div className="border rounded-lg p-6">
        <p className="text-center text-muted-foreground">
          Category management functionality coming soon...
        </p>
      </div>
    </div>
  );
};

export default Categories;