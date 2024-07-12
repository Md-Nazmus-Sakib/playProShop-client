import Category from "../category/Category";
import ContactUs from "../contactus/ContactUs";
import FeaturedProduct from "../featuredProduct/FeaturedProduct";
import Header from "../header/Header";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <FeaturedProduct></FeaturedProduct>
      <Category></Category>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
