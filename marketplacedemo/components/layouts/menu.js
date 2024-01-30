import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Menu = (props) => {
  const router = useRouter();
  const menuList = [
    {
      link: "/market",
      name: "Marketplace",
      status: "open",
    },
    {
      link: "/collection",
      name: "Collection",
      status: "open",
    },
    {
      link: "/mystery-box",
      name: "Mystery Box",
      status: "open",
    },
    {
      link: "/map",
      name: "Map",
      status: "close",
    },
  ];
  return (
    <div className="menu-sidebar px-2 sm:px-4 py-2">
      <nav className="flex-grow md:block md:overflow-y-auto">
        {menuList.map((element, key) => {
          return (
            <Link href={element.link} key={key}>
              <div
                className={`btn btn-sidebar-menu ${element.status} ${
                  router.pathname == element.link ? "active" : ""
                }`}
                style={
                  key == 0
                    ? { top: "40px" }
                    : { top: "calc(80px * " + key + " + 40px)" }
                }
              >
                <span>{element.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
export default Menu;
