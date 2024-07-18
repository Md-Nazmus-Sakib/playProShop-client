import { TProduct } from "../../home/featuredProduct/FeatureProductType";
import AllPRoductCard from "./AllPRoductCard";
// Adjust the path according to your folder structure

interface ProductContainerProps {
  products: TProduct[];
}

const ProductContainer = ({ products }: ProductContainerProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
        {products.map((product: TProduct) => (
          <AllPRoductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
