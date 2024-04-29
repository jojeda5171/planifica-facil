"use client";
import "@/app/auth/login/styles.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const respuesta = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    if (respuesta?.error) {
      setError(respuesta.error);
    } else {
      const usuario = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "usuarios/" + data.get("email"),
        {
          cache: "no-store",
        }
      );
      const usuarioJSON = await usuario.json();
      console.log(usuarioJSON);
      const response = await fetch(
        `http://localhost:3000/api/usuarios/usuario/${usuarioJSON.id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        localStorage.setItem("userEmpresa", data.empresaId); 
        localStorage.setItem("userApellido", data.apellido); 
        localStorage.setItem("userNombre", data.nombre); 
        localStorage.setItem("userRol", data.rolId);

      } else {
        throw new Error("Error fetching departamentos");
      }

      router.push("/dashboard");
    }
  };

  return (
    <div id="login" className="h-screen font-sans login bg-cover">
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form
              className="max-w-sm m-4 p-10 bg-black bg-opacity-35 rounded shadow-xl"
              onSubmit={onSubmit}
            >
              {error && (
                <p className="bg-red-500 text-lg text-white p-3 rounded mb-2 text-center">
                  {error}
                </p>
              )}
              <p className="text-white  text-center text-lg font-bold">
                Inicio de Sesión
              </p>
              <div className="">
                <label className="block text-sm text-white" htmlFor="email">
                  E-mail
                </label>
                <input
                  name="email"
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  aria-label="email"
                  required
                ></input>
              </div>
              <div className="mt-2">
                <label className="block  text-sm text-white">Contraseña</label>
                <input
                  name="password"
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="password"
                  id="password"
                  placeholder="********"
                  arial-label="password"
                  required
                ></input>
              </div>

              <div className="mt-4 items-center flex justify-between">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                  type="submit"
                >
                  Entrar
                </button>
                <a
                  className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-500"
                  href="#"
                >
                  ¿Olvido su contraseña?
                </a>
              </div>
              <div className="text-center">
                <Link
                  href="/auth/registro"
                  className="inline-block right-0 align-baseline font-light text-sm text-500 text-white hover:text-red-500"
                >
                  Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
