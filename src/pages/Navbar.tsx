import React, { Fragment } from "react";
import { Outlet, useLocation, Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { MdAccountCircle } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <div className="shadow-[0_2px_10px_rgb(0,0,0,0.2)] hidden fixed top-0 w-screen md:flex flex-row justify-between items-center px-7 py-2 bg-background z-50">
        <div className="flex flex-row items-center gap-x-2.5">
          <Link to="/">
            <img
              src="https://img.icons8.com/?size=100&id=XrEFnp33pJYw&format=png&color=000000"
              alt="logo"
              width={100}
              height={100}
              className="object-contain w-10 h-10 cursor-pointer"
              loading="lazy"
            />
          </Link>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6 w-px bg-foreground/20"
          />
          <NavbarBreadcrumb />
        </div>

        <div className="flex flex-row justify-center items-center gap-x-4 ">
          <Link to="/home/cart">
            <MdShoppingCart color={"#a1a1aa"} size={30} />
          </Link>
          <Link to="/home/profile">
            <MdAccountCircle color={"#a1a1aa"} size={30} />
          </Link>
        </div>
      </div>
      <div className="w-screen pt-23 pb-10 flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;

export const NavbarBreadcrumb = () => {
  const location = useLocation();
  const params = useParams();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");

    const label =
      segment === params.id
        ? "Product Details " + params.id
        : segment.charAt(0).toUpperCase() + segment.slice(1);

    const isLast = index === pathSegments.length - 1;

    return (
      <Fragment key={path}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={path}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </Fragment>
    );
  });

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
