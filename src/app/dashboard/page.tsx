"use client"
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

function Dashboard() {
  const [userApellido, setUserApellido] = useState<string | null>(null);
  const [userNombre, setUserNombre] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id_user");
    const cedula = localStorage.getItem("cedula_user");
    const nombre = localStorage.getItem("userNombre");
    const apellido = localStorage.getItem("apellido_user");
    const rol = localStorage.getItem("rol_user");

    const userApellidodata = localStorage.getItem("userApellido");
    setUserNombre(nombre);
    setUserApellido(userApellidodata);


  }, []);
  return (
    <>
    <div className="fondo h-full w-full">
    <div className="flex justify-center flex-col pt-36 pl-10">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Bienvenido/a
          </span>{" "}
          {userNombre + " " + userApellido}
        </h1>
        <p className="mb-4 text-lg font-normal text-sky-800 dark:text-sky-900 pr-72 pt-4">
          Bienvenido en este sistema, tendrás la capacidad de simular creditos e inversiones del banco.
          </p>
          
      </div>
    

    </div>
    
      
    </>

  )
}

export default Dashboard