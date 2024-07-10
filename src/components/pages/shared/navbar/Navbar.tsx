import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/PlayProLogo.jpg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const components = [
  { title: "Home", link: "/" },
  { title: "Product", link: "/product" },
  { title: "About", link: "/about" },
  { title: "Create Product", link: "/create-product" },
  { title: "Tabs", link: "/docs/primitives/tabs" },
  { title: "Tooltip", link: "/docs/primitives/tooltip" },
];

export default function Navbar() {
  return (
    <div className="">
      <div className="flex items-center justify-between border-b-2 border-[#F14902] py-3">
        <Link to="/" className="flex items-center">
          <img className="w-20 h-20 rounded-full ml-5 " src={logo} alt="" />
        </Link>
        <div className="hidden md:block mr-5">
          <NavigationMenu>
            <NavigationMenuList className="flex justify-end">
              {components.map((component, index) => (
                <NavigationMenuItem key={index}>
                  <NavLink to={component.link}>
                    <NavigationMenuLink>
                      <button className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-[#F14902] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#F14902] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                        {component.title}
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
            <DropdownMenuSeparator />
            <DropdownMenuContent className="w-56 left-0 mt-2 md:hidden">
              {components.map((component, index) => (
                <DropdownMenuItem key={index} className="w-full">
                  <NavLink to={component.link}>
                    <span>{component.title}</span>
                    <DropdownMenuSeparator className="w-full hover:bg-gray-200 active:bg-blue-500" />
                  </NavLink>
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
