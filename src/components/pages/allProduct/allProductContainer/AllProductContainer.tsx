import { useState } from "react";
import { useGetProductQuery } from "@/redux/api/api";
import FilterAndSearchField from "./FilterAndSearchField";
import ProductContainer from "./ProductContainer";
import Loader from "../../shared/loader/Loader";
import { TProduct } from "../../home/featuredProduct/FeatureProductType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AllProductContainer = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const [page, setPage] = useState(1);
  const limit = 9; // Or any other number you want for items per page

  const { data, isLoading, isError } = useGetProductQuery({
    page,
    limit,
    ...filters,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const products: TProduct[] = data?.data?.products ?? [];

  const totalProducts: number = data?.data?.totalProducts ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

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
          <>
            <ProductContainer products={products} />
            {totalProducts > limit && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!hasPreviousPage}
                  className="px-4 py-2 bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!hasNextPage}
                  className="px-4 py-2 bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div>No Product Found</div>
        )}
      </div>
    </div>
  );
};

export default AllProductContainer;
