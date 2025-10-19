import { title } from "process";
import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/class.png",
        label: "Asset",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Document",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];


const Menu = () => (
  <div className="mt-4 text-sm">
    {menuItems.map((i) => (
      <div className="flex flex-col gap-2" key={i.title}>
        <span className="hidden lg:block text-gray-400 font-light my-4">
          {i.title}
        </span>
        {i.items.map((item) =>{ 
            if (item.visible.includes(role)){
              return (
                <Link 
                  href={item.href} 
                  key={item.label} 
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md md:px-2 hover:bg-lamaSkyLight" 
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
            }      
          } )}
      </div>
    ))}
  </div>
)

export default Menu

