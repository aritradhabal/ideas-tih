import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="shadow-[0_2px_10px_rgb(0,0,0,0.2)] hidden fixed top-0 w-screen md:flex flex-row justify-between items-center px-7 py-2 bg-background z-50">
      <Link to="/">
        <div className=" flex flex-row items-center gap-x-2">
          <p className="font-semibold tracking-tighter">IDEAS</p>
          <div className="cursor-pointer flex items-center">
            <img
              src="/ideas_tih.jpg"
              alt="logo"
              width={100}
              height={100}
              className="object-contain w-10 h-10"
              loading="lazy"
            />
          </div>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6 w-px bg-foreground/20"
          />
          <div className="px-1">
            <p className="font-semibold">NCPYF</p>
            <p className="text-xs text-slate-600">
              National Platform for Crop Yield Forecasting
            </p>
          </div>
        </div>
      </Link>

      {/* Right section */}
      <div className="flex flex-row justify-center items-center gap-x-2 ">
        <MdAccountCircle color={"#a1a1aa"} size={40} />
      </div>
    </div>
  );
}
