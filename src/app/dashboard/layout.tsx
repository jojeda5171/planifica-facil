"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [userApellido, setUserApellido] = useState<string | null>(null);
  const [userNombre, setUserNombre] = useState<string | null>(null);
  const [userRol, setUserRol] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id_user");
    const cedula = localStorage.getItem("cedula_user");
    const nombre = localStorage.getItem("userNombre");
    const apellido = localStorage.getItem("apellido_user");
    const rol = localStorage.getItem("userRol");

    const userApellidodata = localStorage.getItem("userApellido");
    setUserNombre(nombre);
    setUserRol(rol);
    setUserApellido(userApellidodata);
  }, []);

  /* const toggleSidebar = () => {
    console.log("Estoy presionando el menu", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  }; */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen && isReportOpen) {
      setIsReportOpen(false);
    }
  };
  const toggleReport = () => {
    if (!isSidebarOpen) {
      setIsReportOpen(!isReportOpen);
      selectedItem === "Reportes"
        ? setSelectedItem("")
        : setSelectedItem("Reportes");
    }
  };
  const [selectedItem, setSelectedItem] = useState("");
  // Función para manejar el clic en el ítem del sidebar
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-[#101f3e] border-b border-[#101f3e] dark:bg-[#101f3e] dark:border-[#101f3e]">
        <div className="px-3  lg:px-3 lg:pl-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/dashboard" className="flex ms-2 md:me-24">
                <Image
                  src="/deuda2.png"
                  className="rounded-full me-3"
                  width={50}
                  height={50}
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl text-white whitespace-nowrap dark:text-white">
                  Simulador amortización e inversión
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="mr-2">
                  <button
                    type="button"
                    className="flex text-sm  rounded-full "
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    {/* <Image
                      className="w-10 h-10 rounded-full"
                      src="/user.jpg"
                      alt="user photo"
                      width={70}
                      height={70}
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[40px] h-[40px] text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <div className="pl-1  flex flex-col items-start text-white">
                      <h1>{userNombre + " " + userApellido}</h1>
                      <Link href="/">
                        <span className="text-[#e23b76]">Cerrar Sesión</span>
                      </Link>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-20 h-screen pt-20 transition-all ${
          isSidebarOpen ? "w-20" : "w-64"
        } bg-[#101f3e] border-r border-gray-700 sm:translate-x-0 dark:bg-[#101f3e] dark:border-gray-700 transition-all`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full px-5 pb-4 pt-3 overflow-y-auto bg-[#101f3e] dark:bg-[#101f3e] transition-all ${
            isSidebarOpen ? "w-20" : "w-64"
          }`}
        >
          <ul className="space-y-6 font-medium h-full ">

            {userRol === "1" && 
            <>
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group ${
                    selectedItem === "Inicio" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleItemClick("Inicio")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "Inicio"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Inicio
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/credito"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group  ${
                    selectedItem === "TiposInteres" ? "bg-gray-700 group" : ""
                  }`}
                  onClick={() => handleItemClick("TiposInteres")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "Aprobaciones"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Tipos de Credito
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/inversion"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group  ${
                    selectedItem === "TiposInversion" ? "bg-gray-700 group" : ""
                  }`}
                  onClick={() => handleItemClick("TiposInversion")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "TiposInversion"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Interes de Inversion
                  </span>
                </Link>
              </li>
            </>}

            {userRol === "2" && 
            <>
            <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group ${
                    selectedItem === "Inicio" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleItemClick("Inicio")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "Inicio"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Inicio
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/simuInversion"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group  ${
                    selectedItem === "simuladorInversion"
                      ? "bg-gray-700 group"
                      : ""
                  }`}
                  onClick={() => handleItemClick("simuladorInversion")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "simuladorInversion"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Simulador de Inversión
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/simuCredito"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group  ${
                    selectedItem === "simuladorCreditos"
                      ? "bg-gray-700 group"
                      : ""
                  }`}
                  onClick={() => handleItemClick("simuladorCreditos")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "simuladorCreditos"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Simulador de Créditos
                  </span>
                </Link>
              </li>

            </>}
            {userRol === "3" && 
            <>
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group ${
                    selectedItem === "Inicio" ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleItemClick("Inicio")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "Inicio"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Inicio
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/empresa"
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group  ${
                    selectedItem === "Empresas" ? "bg-gray-700 group" : ""
                  }`}
                  onClick={() => handleItemClick("Empresas")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white mx-auto block ${
                      selectedItem === "Empresas"
                        ? "text-white dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  <span
                    className={`${
                      isSidebarOpen ? "hidden" : "block"
                    } flex-1 ms-3 whitespace-nowrap`}
                  >
                    Empresas
                  </span>
                </Link>
              </li>

            </>}

            <li className="mt-50 absolute bottom-10 ">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Abrir menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div
        className={`text-black pt-20 ${isSidebarOpen ? "pl-20" : "pl-64"} ${
          isSidebarOpen ? "sm:ml-0" : ""
        } bg-white h-screen overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
}
