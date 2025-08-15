import React from 'react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Track and manage your inventory levels.
        </p>
      </div>
      
      <div className="border rounded-lg p-6">
        <p className="text-center text-muted-foreground">
          Inventory management functionality coming soon...
        </p>
      </div>
    </div>
  );
};

export default Inventory;