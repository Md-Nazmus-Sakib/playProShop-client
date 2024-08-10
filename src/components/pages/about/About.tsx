import ContactInfo from "./ContactInfo";
import Mission from "./Mission";
import MyLocation from "./MyLocation";
import Overview from "./Overview";

const About = () => {
  return (
    <div>
      <Overview></Overview>
      <Mission></Mission>
      <ContactInfo></ContactInfo>
      <MyLocation></MyLocation>
    </div>
  );
};

export default About;
