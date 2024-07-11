import mobileImg from "@/assets/images/phoneIcon.png";
import emailImg from "@/assets/images/email.png";
import socialImg from "@/assets/images/social.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./ContactInfo.css";
const ContactInfo = () => {
  return (
    <div>
      <h1 className="text-5xl my-12 text-center">Contact Us </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* By Mobile */}
        <div className=" rounded-lg border-2 border-indigo-500 bg-gray-800 p-4 text-center shadow-lg ">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full  bg-white">
            <img src={mobileImg} alt="" />
          </figure>
          <h2 className="mt-4 text-3xl font-bold text-[#F14902]">By Mobile</h2>
          <p className="mb-4 text-gray-300">Contact Us By Mobile</p>
          <div className="flex items-center justify-center">
            <a
              href="#"
              className="rounded-full px-4 py-2 text-white  bg-[#F14902] hover:bg-[#F15950]"
            >
              +88017********
            </a>
          </div>
        </div>
        {/* By Email */}
        <div className=" rounded-lg border-2 border-indigo-500 bg-gray-800 p-4 text-center shadow-lg ">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full  bg-white">
            <img src={emailImg} alt="" />
          </figure>
          <h2 className="mt-4 text-xl font-bold text-[#F14902]">By Email</h2>
          <p className="mb-4 text-gray-300">Contact Us By Email</p>
          <div className="flex items-center justify-center">
            <a
              href="#"
              className="rounded-full px-4 py-2 text-white  bg-[#F14902] hover:bg-[#F15950]"
            >
              playproshop@domain.com
            </a>
          </div>
        </div>
        {/* By Social Media */}
        <div className=" rounded-lg border-2 border-indigo-500 bg-gray-800 p-4 text-center shadow-lg ">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full  bg-white">
            <img src={socialImg} alt="" />
          </figure>
          <h2 className="mt-4 text-xl font-bold text-[#F14902]">
            By Social Media
          </h2>
          <p className="mb-4 text-gray-300">Contact Us By Social Media.</p>
          <div className="flex justify-center">
            <div className="social-card text-white">
              <button className="Btn-social-icon facebook">
                <span className="svgContainer text-lg ">
                  <FaFacebook></FaFacebook>
                </span>
                <span className="BG"></span>
              </button>

              <button className="Btn-social-icon whatsapp">
                <span className="svgContainer text-lg">
                  <FaWhatsapp></FaWhatsapp>
                </span>
                <span className="BG"></span>
              </button>

              <button className="Btn-social-icon instagram">
                <span className="svgContainer text-lg">
                  <FaInstagram></FaInstagram>
                </span>
                <span className="BG"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
