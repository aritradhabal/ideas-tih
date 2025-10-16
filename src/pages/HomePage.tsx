import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdAccountCircle } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-y-clip bg-white dark:bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 cursor-pointer">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://img.icons8.com/?size=100&id=XrEFnp33pJYw&format=png&color=000000"
                className="h-10 w-auto dark:hidden"
              />
              <img
                alt=""
                src="https://img.icons8.com/?size=100&id=XrEFnp33pJYw&format=png&color=000000"
                className="h-10 w-auto not-dark:hidden"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/home/profile">
              <MdAccountCircle color={"#a1a1aa"} size={35} />
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 cursor-pointer">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://img.icons8.com/?size=100&id=XrEFnp33pJYw&format=png&color=000000"
                  className="h-10 w-auto dark:hidden"
                />
                <img
                  alt=""
                  src="https://img.icons8.com/?size=100&id=XrEFnp33pJYw&format=png&color=000000"
                  className="h-10 w-auto not-dark:hidden"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="py-6">
                  <MdAccountCircle color={"#a1a1aa"} size={35} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-accent via-primary to-accent opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
              <span className="font-extralight hover:font-extrabold transition-all duration-300">
                Shop
              </span>{" "}
              <span className="font-seirf italic hover:font-extrabold transition-all duration-300">
                anything
              </span>{" "}
              <span className="font-extralight hover:font-extrabold transition-all duration-300">
                you need
              </span>{" "}
              <span className="font-extralight hover:font-extrabold transition-all duration-300">
                at one place
              </span>
            </h1>
            <p className="mt-8 text-lg text-pretty font-medium text-slate-700 sm:text-xl/8 dark:text-slate-700">
              Discover a seamless shopping experience designed to bring all your
              favorite products together. Explore, compare, and purchase.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/home/products">
                <Button
                  variant={"outline"}
                  className="cursor-pointer text-slate-800"
                >
                  Start Browsing
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-accent via-primary to-accent-foreground opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}
