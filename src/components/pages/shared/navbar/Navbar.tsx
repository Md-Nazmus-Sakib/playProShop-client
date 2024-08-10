import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/images/PlayProLogo.jpg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppSelector } from "@/redux/hook";
import { selectCartItems } from "@/redux/features/cartSlice";

// Define the main navigation components
const components = [
  { title: "Home", link: "/" },
  { title: "Product", link: "/product" },
  { title: "About", link: "/about" },
  { title: "Product Management", link: "" }, // Placeholder for dropdown
  { title: "Cart", link: "/cart" },
];

// Define the Product Management dropdown options
const productManagementComponents = [
  { title: "Add Product", link: "/create-product" },
  { title: "Manage Product", link: "/manage-product" },
];

export default function Navbar() {
  const cartItems = useAppSelector(selectCartItems); // Get cart items from Redux
  const [isProductManagementOpen, setIsProductManagementOpen] = useState(false); // Track dropdown state
  const productManagementRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown
  const location = useLocation(); // Track current route

  // Toggle Product Management dropdown
  const handleToggle = () => {
    setIsProductManagementOpen((prevState) => !prevState);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      productManagementRef.current &&
      !productManagementRef.current.contains(event.target as Node)
    ) {
      setIsProductManagementOpen(false);
    }
  };

  // Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the current path is active
  const isActivePath = (paths: string[]) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  // Handle clicking a dropdown item
  const handleDropdownItemClick = () => {
    setIsProductManagementOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          {/* Logo */}
          <div className="flex w-full">
            <NavLink to="/" className="flex items-center">
              <img
                className="h-20 w-20 rounded-full"
                src={logo}
                alt="PlayProLogo"
              />
            </NavLink>
            {/* Desktop Navigation */}
            <div className="hidden md:flex w-full justify-end space-x-4 ml-10">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                  {components.map((component, index) => (
                    <NavigationMenuItem key={index}>
                      {/* Product Management Dropdown */}
                      {component.title === "Product Management" ? (
                        <div className="relative">
                          <NavigationMenuTrigger
                            onClick={handleToggle}
                            className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                              isProductManagementOpen ||
                              isActivePath([
                                "/create-product",
                                "/manage-product",
                              ])
                                ? "text-white bg-gray-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            Product Management
                          </NavigationMenuTrigger>
                          {isProductManagementOpen && (
                            <div
                              className="absolute bg-white border rounded-md shadow-lg z-50 mt-2"
                              ref={productManagementRef}
                            >
                              {productManagementComponents.map(
                                (pmComponent) => (
                                  <NavLink
                                    to={pmComponent.link}
                                    key={pmComponent.link}
                                    onClick={handleDropdownItemClick}
                                    className={`block px-4 py-2 text-sm ${
                                      location.pathname.startsWith(
                                        pmComponent.link
                                      )
                                        ? "text-white bg-gray-900"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    {pmComponent.title}
                                  </NavLink>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ) : component.title === "Cart" ? (
                        // Cart Icon with item count
                        <NavLink
                          to={component.link}
                          className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700"
                        >
                          <div className="relative flex items-center">
                            <svg
                              viewBox="0 0 27.97 25.074"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 fill-current"
                            >
                              <path
                                d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
                                id="cart-shopping-solid"
                              ></path>
                            </svg>
                            {cartItems.length > 0 && (
                              <span className="absolute -top-4 -right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {cartItems.length}
                              </span>
                            )}
                          </div>
                        </NavLink>
                      ) : (
                        // Other navigation links
                        <NavLink
                          to={component.link}
                          className={({ isActive }) =>
                            isActive
                              ? "relative px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
                              : "relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {component.title}
                        </NavLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 left-0 mt-2">
                {components.map((component, index) => (
                  <DropdownMenuItem key={index} className="w-full">
                    {component.title === "Product Management" ? (
                      <span
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default behavior
                          handleToggle();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      >
                        {component.title}
                      </span>
                    ) : component.title === "Cart" ? (
                      // Cart Icon with item count
                      <NavLink
                        to={component.link}
                        className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700"
                      >
                        <div className="relative flex items-center">
                          <svg
                            viewBox="0 0 27.97 25.074"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 fill-current"
                          >
                            <path
                              d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
                              id="cart-shopping-solid"
                            ></path>
                          </svg>
                          {cartItems.length > 0 && (
                            <span className="absolute -top-4 -right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                              {cartItems.length}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={component.link}
                        className={({ isActive }) =>
                          isActive
                            ? "block px-4 py-2 text-sm text-white bg-gray-900"
                            : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {component.title}
                      </NavLink>
                    )}
                    {component.title === "Product Management" &&
                      isProductManagementOpen && (
                        <div
                          className="absolute bg-white border rounded-md shadow-lg z-50 mt-2"
                          ref={productManagementRef}
                        >
                          {productManagementComponents.map((pmComponent) => (
                            <NavLink
                              to={pmComponent.link}
                              key={pmComponent.link}
                              onClick={handleDropdownItemClick}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {pmComponent.title}
                            </NavLink>
                          ))}
                        </div>
                      )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
