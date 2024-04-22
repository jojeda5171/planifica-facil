/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";

const simuCreditoPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwordActual, setPasswordActual] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [containsSymbol, setContainsSymbol] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState({
    id: "",
    cedula_usu: "",
    nombre_usu: "",
    apellido_usu: "",
    telefono_usu: "",
    fecha_ingreso: "",
    fecha_nacimiento: "",
    correo: "",
    clave: "",
    rol: "",
    id_depa_asig: "",
    id_contra_asig: "",
    estado: "",
  });

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordActualChange = (e: any) => {
    setPasswordActual(e.target.value);
  };

  const handlePasswordConfirmChange = (e: any) => {
    setPasswordConfirm(e.target.value);
  };

  const getColorClass = (length: any) => {
    if (length <= 3) {
      return "bg-red-500";
    } else if (length <= 7) {
      return "bg-orange-300";
    } else {
      return "bg-green-500";
    }
  };
  const tieneLetraMayuscula = (texto: any) => {
    return /[A-Z]/.test(texto);
  };

  const tieneNumero = (texto: any) => {
    return /\d/.test(texto);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setContainsSymbol(hasSymbol);
  }, [password]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id_user");
      const response = await fetch(`http://localhost:5000/usuario/${id}`);
      if (response.ok) {
        const data = await response.json();

        setUserData(data);
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleGuardar = async (e: any) => {
    e.preventDefault();

    if (passwordActual !== userData?.clave) {
      mostrarMensajeToast("Verifique que su contraseña actual sea correcta");
      return;
    }

    if (password !== passwordConfirm) {
      mostrarMensajeToast("Verifique que las contraseñas coincidan");
      return;
    }

    if (password.length < 8) {
      mostrarMensajeToast(
        "Verifique que su contraseña tenga al menos 8 caracteres"
      );
      return;
    }

    const verificarMayuscula = tieneLetraMayuscula(password);

    if (!verificarMayuscula) {
      mostrarMensajeToast(
        "Verifique que su contraseña tenga al menos una mayuscula"
      );
      return;
    }
    const verificarNumero = tieneNumero(password);

    if (!verificarNumero) {
      mostrarMensajeToast(
        "Verifique que su contraseña tenga al menos un numero"
      );
      return;
    }

    const verificarSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!verificarSimbolo) {
      mostrarMensajeToast(
        "Verifique que su contraseña tenga al menos un símbolo especial"
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/usuarios/actualizar-clave/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clave: password,
          }),
        }
      );

      if (response.ok) {
        mostrarMensajeToast("Contraseña actualizada correctamente");
        setPassword("");
        setPasswordActual("");
        setPasswordConfirm("");
      } else {
        console.error("Error al actualizar la contraseña");
        mostrarMensajeToast("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      mostrarMensajeToast("Error al actualizar la contraseña");
    }
  };

  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");

  const mostrarMensajeToast = (mensaje: string) => {
    setMensajeToast(mensaje);
    setMostrarToast(true);

    // Ocultar el toast después de cierto tiempo (por ejemplo, 5 segundos)
    setTimeout(() => {
      setMostrarToast(false);
    }, 5000);
  };

  return (
    <>
      <div className="text-center font-bold my-4 mb-16 text-black">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">
          Simulador de credito
        </h2>
      </div>

      <div className="grid grid-cols-2">
        <form className="ml-28 mr-10">
          <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  htmlFor="tipo_peticion"
                >
                  Tipo de credito
                </label>
                <div className="relative">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tipo_peticion"
                    /* value={formData.id_tipo_pet_asig}
                    onChange={handleTipoPeticionChange} */
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    {/* {tiposPeticion.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))} */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
          <div className="mb-6">
            <label
              htmlFor="passwordNew"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Monto solicitado $
            </label>
            <input
              type="number"
              id="passwordNew"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Plazo en meses
            </label>
            <input
              type="number"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              required
            />
          </div>
          <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  htmlFor="tipo_peticion"
                >
                  Tipo de Amortización
                </label>
                <div className="relative">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tipo_peticion"
                    /* value={formData.id_tipo_pet_asig}
                    onChange={handleTipoPeticionChange} */
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    {/* {tiposPeticion.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))} */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
          <button
            type="submit"
            onClick={handleGuardar}
            className="mr-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Limpiar
          </button>
          <button
            type="submit"
            onClick={handleGuardar}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Calcular
          </button>
        </form>

        <div
          role="tooltip"
          className="ml-20 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-[500px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        >
          <div className="grid grid-cols-2 p-5 ml-12 mt-16">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-10">
              Saldo a financiar $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              0.0 $
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Cuota mensual $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              0.0 $
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tasa de Interes %
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              0.0 $
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Seguro $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              0.0 $
            </h3>


          </div>
          <div data-popper-arrow></div>
        </div>
      </div>

      {mostrarToast && (
        <div
          id="toast-default"
          className="fixed top-8 right-8 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{mensajeToast}.</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => setMostrarToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default simuCreditoPage;
