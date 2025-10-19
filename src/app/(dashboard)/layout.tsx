import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-(8%) lg:w-(16%) p-4" >
        
        <Link href="/" className="flex item-center justify-center lg:justify-start gap-2">
                {/* <Image src="/logo.png" alt="logo" width={32} height={32}/> */}
          <span className="hidden lg:block">TMJ</span>
        </Link>
        <Menu/>
      </div>
        
      {/* RIGHT */}
      <div className="w-[86%] md:w-(92%) lg:w-(84%) bg-[#F7F8FA] overflow-scroll" >
        <Navbar />
          {children}
      </div>

    </div>
  );
}
