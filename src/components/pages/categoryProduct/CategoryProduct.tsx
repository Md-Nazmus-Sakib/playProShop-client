import { useGetProductQuery } from "@/redux/api/api";
import Loader from "../shared/loader/Loader";
import { TProduct } from "../home/featuredProduct/FeatureProductType";

import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import CategoryProductContainer from "./CategoryProductContainer";
import { selectCategory } from "@/redux/features/categorySlice";

const CategoryProduct = () => {
  const category = useAppSelector((state: RootState) => selectCategory(state));

  const { data, isLoading, isError } = useGetProductQuery("");

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const products: TProduct[] = data?.data?.products ?? [];
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-12">
        Found Available product By this category: {category} is{" "}
        {filteredProducts.length}
      </h1>
      <div>
        {data?.success === false && data?.message === "No Data Found" ? (
          <div className="mt-12 font-extrabold text-3xl text-center">
            <h1>No Product Found !!!</h1>
          </div>
        ) : filteredProducts?.length > 0 ? (
          <CategoryProductContainer filteredProducts={filteredProducts} />
        ) : (
          <div>No Product Found</div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
