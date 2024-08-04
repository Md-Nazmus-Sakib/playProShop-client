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

interface ProductDialogProps {
  product: TProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductDialogProps) => {
  const [formData, setFormData] = useState<TProduct>(
    product || {
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
    }
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    console.log(formData); // Log the form data or perform any other action here
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
        <div>
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
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
