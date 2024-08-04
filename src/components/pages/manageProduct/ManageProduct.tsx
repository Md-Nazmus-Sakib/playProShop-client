import React, { useState } from "react";
import ProductTable from "./ProductTable";
import { TProduct } from "../home/featuredProduct/FeatureProductType";

import { useGetProductQuery } from "@/redux/api/api";
import Loader from "../shared/loader/Loader";

import ProductModal from "./ProductModal";

const ManageProduct: React.FC = () => {
  const { data, isLoading, isError } = useGetProductQuery("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }
  const allProducts: TProduct[] = data?.data ?? [];

  const handleEditClick = (product: TProduct) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      <h1>Product Management System</h1>
      <div className="overflow-x-auto">
        <ProductTable allProducts={allProducts} onEdit={handleEditClick} />
      </div>
      <div>
        <ProductModal
          product={currentProduct}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
