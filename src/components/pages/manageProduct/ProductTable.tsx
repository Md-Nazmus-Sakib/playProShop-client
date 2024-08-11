import { useEffect, useState } from "react";
import { TProduct } from "../home/featuredProduct/FeatureProductType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeleteProductMutation } from "@/redux/api/api";

import { toast } from "sonner";

interface ProductTableProps {
  allProducts: TProduct[];
  onEdit: (product: TProduct) => void;
  //   onDelete: (productId: string) => void;
}

const ProductTable = ({ allProducts, onEdit }: ProductTableProps) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete).unwrap();

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const confirmDeleteProduct = (id: string) => {
    setProductToDelete(id);
  };
  useEffect(() => {
    if (productToDelete) {
      toast(
        <div>
          <h1 className="text-red-500 mb-4 text-xl">
            Are you sure you want to delete this product?
          </h1>
          <div>
            <div className="flex justify-between">
              <Button onClick={() => toast.dismiss()}>No</Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => {
                  handleDeleteProduct();
                  toast.dismiss();
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>,
        {
          duration: Infinity,
        }
      );
    }
  }, [productToDelete]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allProducts?.map((product) => (
          <TableRow key={product._id}>
            <TableCell>
              {" "}
              <img src={product.image} alt={product.productName} width="50" />
            </TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => confirmDeleteProduct(product._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
