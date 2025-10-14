import { useNavPage } from "@/store/navPages";
import { Link } from "react-router";

import journey from "../assets/journey.png";
import bag from "../assets/bag.png";
import door from "../assets/door.png";
import hat from "../assets/hat.png";

export function NavBar() {
  const { page, changePage } = useNavPage();

  const navBar = [
    {
      name: "Jornada",
      icon: <img src={journey} alt="" className="w-10" />,
      href: "/home",
    },
    {
      name: "Perfil",
      icon: <img src={bag} alt="" className="w-12" />,
      href: "/profile",
    },
  ];

  function handleLogout() {}

  return (
    <div className="flex w-full flex-col border-t border-neutral-700 py-2 lg:h-screen lg:w-70 lg:space-y-12 lg:border-r lg:px-4 lg:py-8">
      <h1 className="hidden px-4 text-3xl font-bold text-purple-600 lg:block">
        LevelUpCode
      </h1>
      <nav className="flex-1">
        <ul className="flex items-center justify-center space-x-10 px-6 lg:flex-col lg:items-start lg:justify-start lg:space-y-8 lg:space-x-0 lg:px-0 lg:py-0">
          {navBar.map((item, index) => (
            <Link to={item.href} key={index} className="w-full">
              <li
                className={`group relative flex w-full cursor-pointer flex-col-reverse items-center justify-center rounded-md p-3 text-xl transition duration-150 ease-in hover:bg-zinc-700/50 lg:flex-row lg:justify-start lg:space-x-6 ${page === index ? "border-2 border-neutral-600/80 bg-zinc-700/50 font-semibold text-white" : ""}`}
                onClick={() => changePage(index)}
              >
                {item.icon}
                <p className="absolute -top-12 hidden rounded-sm bg-zinc-700/50 px-2.5 text-center group-hover:block sm:-top-8 lg:static lg:block lg:bg-transparent lg:px-0">
                  {item.name}
                </p>
              </li>
            </Link>
          ))}
          <Link to={"/teacher"} className="w-full">
            <li
              className={`group relative flex w-full cursor-pointer flex-col-reverse items-center justify-center rounded-md p-3 text-xl transition duration-150 ease-in hover:bg-zinc-700/50 lg:flex-row lg:justify-start lg:space-x-6 ${page === 2 ? "border-2 border-neutral-600/80 bg-zinc-700/50 font-semibold text-white" : ""}`}
              onClick={() => changePage(2)}
            >
              <img src={hat} alt="" className="w-12" />
              <p className="absolute -top-12 hidden rounded-sm bg-zinc-700/50 px-2.5 text-center group-hover:block sm:-top-8 lg:static lg:block lg:bg-transparent lg:px-0">
                Professor
              </p>
            </li>
          </Link>
          <li
            className={`group relative flex w-full cursor-pointer flex-col-reverse items-center justify-center rounded-md p-3 text-xl transition duration-150 ease-in hover:bg-zinc-700/50 lg:hidden lg:flex-row lg:justify-start lg:space-x-3 ${page === 3 ? "border-2 border-neutral-600/80 bg-zinc-700/50 font-semibold text-white" : ""}`}
          >
            <img src={door} alt="" className="w-10" />
            <button
              className="absolute -top-12 hidden rounded-sm bg-zinc-700/50 px-2.5 text-center group-hover:block sm:-top-8 lg:static lg:block lg:bg-transparent lg:px-0"
              onClick={handleLogout}
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>

      <div className="hidden space-y-4 lg:block">
        <div className="h-[1px] w-full bg-neutral-600" />
        <button
          className="flex cursor-pointer items-center space-x-2 px-3 text-zinc-400 transition duration-200 ease-in-out hover:scale-105 hover:text-zinc-200"
          onClick={handleLogout}
        >
          <img src={door} alt="" className="w-10" />
          <p className="text-lg font-bold text-amber-700">Sair</p>
        </button>
      </div>
    </div>
  );
}
