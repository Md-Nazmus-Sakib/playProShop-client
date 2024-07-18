import { useGetProductQuery } from "@/redux/api/api";
import Loader from "../../shared/loader/Loader";
import FeaturedProductCard from "./FeaturedProductCard";
import { TProduct } from "./FeatureProductType";

const FeaturedProduct = () => {
  const {
    data: featuredProducts,
    isLoading,
    isError,
  } = useGetProductQuery({ sort: "-createdAt", limit: 6 });
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (isError) {
    return isError;
  }

  return (
    <div className="my-12">
      <div className="flex justify-center items-center">
        <hr className="border border-orange-500 w-full" />
        <h1 className="text-center text-5xl font-extrabold mx-4">
          Featured Product
        </h1>
        <hr className="border border-orange-500 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
        {featuredProducts?.data?.map((featuredProduct: TProduct) => (
          <FeaturedProductCard
            key={featuredProduct?._id}
            featuredProduct={featuredProduct}
          ></FeaturedProductCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
