// Adjust the path according to your folder structure

import { TProduct } from "../home/featuredProduct/FeatureProductType";
import CategoryProductCard from "./CatrgoryProductCard";

interface ProductContainerProps {
  filteredProducts: TProduct[];
}

const CategoryProductContainer = ({
  filteredProducts,
}: ProductContainerProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
        {filteredProducts.map((product: TProduct) => (
          <CategoryProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductContainer;
