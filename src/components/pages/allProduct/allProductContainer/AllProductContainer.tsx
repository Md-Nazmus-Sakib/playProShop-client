/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductQuery } from "@/redux/api/api";
import FilterAndSearchField from "./FilterAndSearchField";
import ProductContainer from "./ProductContainer";
import Loader from "../../shared/loader/Loader";
import { TProduct } from "../../home/featuredProduct/FeatureProductType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AllProductContainer = () => {
  const filters = useSelector((state: RootState) => (state as any).filters);

  const { data, isLoading, isError } = useGetProductQuery(filters);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const products: TProduct[] = data?.data ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-12 gap-4">
      <div className="col-span-1 h-full md:sticky top-0">
        <FilterAndSearchField />
      </div>
      <div className="col-span-3">
        {data?.success === false && data?.message === "No Data Found" ? (
          <div className="mt-12 font-extrabold text-3xl text-center">
            <h1>No Product Found !!!</h1>
          </div>
        ) : products.length > 0 ? (
          <ProductContainer products={products} />
        ) : (
          <div>No Product Found</div>
        )}
      </div>
    </div>
  );
};

export default AllProductContainer;
