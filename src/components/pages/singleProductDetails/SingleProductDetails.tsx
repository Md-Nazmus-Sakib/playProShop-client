import { useGetSingleProductQuery } from "@/redux/api/api";
import { Loader } from "lucide-react";

const SingleProductDetails = () => {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductQuery(undefined);
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (isError) {
    return isError;
  }
  console.log(product);
  //   const {
  //     _id,
  //     productName,
  //     description,
  //     category,
  //     stockQuantity,
  //     brand,
  //     rating,
  //     price,
  //     image,
  //   } = Product;
  return (
    <div>
      <h1>Product Details by id</h1>
    </div>
  );
};

export default SingleProductDetails;
