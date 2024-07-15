import { useGetProductQuery } from "@/redux/api/api";
import FilterAndSearchField from "./FilterAndSearchField";
import ProductContainer from "./ProductContainer";
import Loader from "../../shared/loader/Loader";
import { TProduct } from "../../home/featuredProduct/FeatureProductType";

const AllProductContainer = () => {
  const { data, isLoading, isError } = useGetProductQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  // Ensure products is an array
  const products: TProduct[] = data?.data ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-12">
      <FilterAndSearchField />
      <ProductContainer products={products} />
    </div>
  );
};

export default AllProductContainer;
