import FilterAndSearchField from "./FilterAndSearchField";
import ProductContainer from "./ProductContainer";

const AllProductContainer = () => {
  return (
    <div className="grid grid-cols-4 my-12">
      <FilterAndSearchField></FilterAndSearchField>
      <ProductContainer></ProductContainer>
    </div>
  );
};

export default AllProductContainer;
