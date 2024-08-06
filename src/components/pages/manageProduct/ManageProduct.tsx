import React, { useState } from "react";
import ProductTable from "./ProductTable";
import { TProduct } from "../home/featuredProduct/FeatureProductType";
import { useGetProductQuery } from "@/redux/api/api";
import Loader from "../shared/loader/Loader";
import ProductModal from "./ProductModal";

const ManageProduct: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 12; // Or any other number you want for items per page

  const { data, isLoading, isError } = useGetProductQuery({
    page,
    limit,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const allProducts: TProduct[] = data?.data?.products ?? [];
  const totalProducts: number = data?.data?.totalProducts ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

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
      <h1 className="text-2xl text-center my-8 font-extrabold">
        Product Management System
      </h1>
      <h2 className="text-xl text-center my-8">
        Total Product is <span className="font-bold">{totalProducts}</span>
      </h2>
      <div className="overflow-x-auto">
        <ProductTable allProducts={allProducts} onEdit={handleEditClick} />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPreviousPage}
          className="px-3 py-1 mx-1 border bg-white text-black hover:bg-gray-200"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className="px-3 py-1 mx-1 border bg-white text-black hover:bg-gray-200"
        >
          Next
        </button>
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
