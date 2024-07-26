import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink } from "react-router-dom";
import logo from "@/assets/images/PlayProLogo.jpg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppSelector } from "@/redux/hook";
import { selectCartItems } from "@/redux/features/cartSlice";

const components = [
  { title: "Home", link: "/" },
  { title: "Product", link: "/product" },
  { title: "About", link: "/about" },
  { title: "Create Product", link: "/create-product" },
  { title: "Cart", link: "/cart" },
  { title: "Tooltip", link: "/docs/primitives/tooltip" },
];

export default function Navbar() {
  const cartItems = useAppSelector(selectCartItems);
  return (
    <div className="">
      <div className="flex items-center justify-between border-b-2 border-[#F14902] py-3">
        <NavLink to="/" className="flex items-center">
          <img
            className="w-20 h-20 rounded-full ml-5"
            src={logo}
            alt="PlayProLogo"
          />
        </NavLink>
        <div className="hidden md:block mr-5">
          <NavigationMenu>
            <NavigationMenuList className="flex justify-end">
              {components.map((component, index) => (
                <NavigationMenuItem key={index}>
                  <NavLink to={component.link}>
                    <NavigationMenuLink asChild>
                      <button className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-[#F14902] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#F14902] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        {component.title === "Cart" ? (
                          <div className="relative">
                            <svg
                              viewBox="0 0 27.97 25.074"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 fill-black relative"
                            >
                              <path
                                d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
                                id="cart-shopping-solid"
                              ></path>
                            </svg>
                            {cartItems.length > 0 && (
                              <span className="absolute -top-4 -right-4 text-orange-500">
                                {cartItems.length}
                              </span>
                            )}
                          </div>
                        ) : (
                          component.title
                        )}
                      </button>
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:hidden mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 left-0 mt-2 md:hidden">
              {components.map((component, index) => (
                <DropdownMenuItem key={index} className="w-full">
                  <NavLink to={component.link}>{component.title}</NavLink>
                  <DropdownMenuSeparator className="w-full hover:bg-gray-200 active:bg-blue-500" />
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
