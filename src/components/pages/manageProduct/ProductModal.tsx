/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { TProduct } from "../home/featuredProduct/FeatureProductType";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateProductMutation } from "@/redux/api/api";
import { toast } from "sonner";

interface ProductDialogProps {
  product: TProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductDialogProps) => {
  const initialFormData: TProduct = {
    _id: "",
    productName: "",
    description: "",
    category: "",
    stockQuantity: 0,
    brand: "",
    rating: 0,
    price: 0,
    image: "",
    details: "",
  };

  const [formData, setFormData] = useState<TProduct>(initialFormData);
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { _id, createdAt, updatedAt, ...dataToSend } = formData as any;
    try {
      const res = await updateProduct({
        id: formData._id,
        data: dataToSend,
      }).unwrap();

      if (res.success) {
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
    onClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="container h-2/3 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSaveChanges}>
          <div>
            <label>Image URL</label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Name</label>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category</label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Stock Quantity</label>
            <Input
              name="stockQuantity"
              value={formData.stockQuantity}
              type="number"
              readOnly
            />
          </div>
          <div>
            <label>Brand</label>
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Rating</label>
            <Input
              name="rating"
              value={formData.rating}
              type="number"
              readOnly
            />
          </div>
          <div>
            <label>Price</label>
            <Input name="price" value={formData.price} type="number" readOnly />
          </div>
          <div>
            <label>Details</label>
            <Input
              name="details"
              value={formData.details}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
