/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Rol {
  id: string;
  nombre: string;
  tasaInteres: string;
  empresaId: string;
}

interface Amortizacion {
  id: string;
  nombre: string;
}

export interface Cuota {
  numero_cuota: string;
  capital: string;
  cuota: string;
  cuota_total: string;
  fecha: string;
  interes: string;
  saldo: string;
  seguro: string;
}

const simuCreditoPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pdfRef = useRef<HTMLDivElement>(null);
  const [amortizacionTipo, setAmortizacionTipo] = useState("");
  const [monto, setMonto] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [seguro, setSeguro] = useState("");
  const [cuotaMensual, setCuotaMensual] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [containsSymbol, setContainsSymbol] = useState(false);
  const [rol, setRol] = useState<Rol[] | null>(null);
  const [amortizacion, setAmortizacion] = useState<Amortizacion[] | null>(null);
  const [userEmpresa, setUserEmpresa] = useState<string | null>(null);
  const [cuotas, setCuotas] = useState([]);
  const itemsPerPage = 1000;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((cuotas?.length || 1) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = (cuotas || []).slice(indexOfFirstItem, indexOfLastItem);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState({
    monto: "",
    interes: "",
    tiempo: "",
    fecha_inicio: "",
    seguro: "",
  });

  const [formData, setFormData] = useState({
    monto: "",
    interes: 0,
    tiempo: "",
    fecha_inicio: "",
    seguro: "",
  });

  useEffect(() => {
    const userEmpresadata = localStorage.getItem("userEmpresa");

    setUserEmpresa(userEmpresadata);
    fetchRol(userEmpresadata);
    fetchAmortizacion();
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

  const fetchRol = async (userEmpresaData: any) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categoria-creditos/empresa/${userEmpresaData}`
      );
      if (response.ok) {
        const data = await response.json();
        setRol(data);
      } else {
        throw new Error("Error fetching Departamentos");
      }
    } catch (error) {
      console.error("Error fetching Departamentos:", error);
    }
  };
  const fetchAmortizacion = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tipo-calculo`);
      if (response.ok) {
        const data = await response.json();
        setAmortizacion(data);
      } else {
        throw new Error("Error fetching Departamentos");
      }
    } catch (error) {
      console.error("Error fetching Departamentos:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleGuardar = async (e: any) => {
    e.preventDefault();

    const fechanew = formatDate(formData.fecha_inicio);
    console.log(fechanew);

    const data = {
      monto: formData.monto,
      interes: formData.interes,
      tiempo: formData.tiempo,
      fecha_inicio: fechanew,
      seguro: formData.seguro,
    };

    setMonto(formData.monto);
    setTasaInteres(formData.interes.toString());
    setSeguro(formData.seguro);

    if (amortizacionTipo === "1") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/amortizacion/frances`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const data = await response.json();

          setCuotaMensual(data[1].cuota_total);
          console.log(data[1].cuota_total);

          setCuotas(data);
          console.log(data);
        } else {
          console.error("Error al actualizar la contraseña");
          mostrarMensajeToast("Error al actualizar la contraseña");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        mostrarMensajeToast("Error al actualizar la contraseña");
      }
    } else if (amortizacionTipo === "2") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/amortizacion/aleman`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCuotaMensual(data[1].cuota_total);
          setCuotas(data);
          console.log(data);
        } else {
          console.error("Error al actualizar la contraseña");
          mostrarMensajeToast("Error al actualizar la contraseña");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        mostrarMensajeToast("Error al actualizar la contraseña");
      }
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

  /* const downloadPdf = () => {
  if (formData===null) {
    mostrarMensajeToast("Ingrese datos primero")
    return;
  }

    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("reporteTotal.pdf");
      });
    } else {
      console.error(
        "El elemento referenciado por pdfRef.current es undefined."
      );
    }
  }; */

  const downloadPdf = () => {
    // Verificar si alguno de los campos en formData está vacío o no definido
    if (
      !formData.monto ||
      formData.monto.trim() === "" ||
      formData.interes === null ||
      formData.tiempo === null ||
      !formData.fecha_inicio ||
      formData.fecha_inicio.trim() === "" ||
      !formData.seguro ||
      formData.seguro.trim() === ""
    ) {
      mostrarMensajeToast("Ingrese todos los datos antes de generar el PDF");
      return;
    }
  
    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("reporteTotal.pdf");
      });
    } else {
      console.error(
        "El elemento referenciado por pdfRef.current es undefined."
      );
    }
  };
  

  const handleRolChange = (event: any) => {
    const selectedRolId = parseInt(event.target.value, 10);
    setFormData({ ...formData, interes: selectedRolId });
  };

  const handleLimpiar = () => {
    setFormData({
      monto: "",
      interes: 0,
      tiempo: "",
      fecha_inicio: "",
      seguro: "",
    });

    setAmortizacionTipo("");


  };

  const handleAmortizacionChange = (event: any) => {
    const selectedRolId = event.target.value;
    setAmortizacionTipo(selectedRolId);
    console.log(selectedRolId);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Agrega ceros delante si es necesario para que todos tengan dos dígitos
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    // Formatea la fecha como "dd/mm/yyyy"
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <>
      <div className="text-center font-bold my-4 mb-16 text-black">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">
          Simulador de credito
        </h2>
      </div>

      <div className="grid grid-cols-2 mb-16">
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
                value={formData.interes}
                onChange={handleRolChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                {rol &&
                  rol.map((role) => (
                    <option key={role.id} value={role.tasaInteres}>
                      {role.nombre}
                    </option>
                  ))}
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
              htmlFor="monto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Monto solicitado $
            </label>
            <input
              type="number"
              id="monto"
              value={formData.monto}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="tiempo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Plazo en meses
            </label>
            <input
              type="number"
              id="tiempo"
              value={formData.tiempo}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="fecha_inicio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Fecha Inicio
            </label>
            <input
              type="date"
              id="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="seguro"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Seguro
            </label>
            <input
              type="number"
              id="seguro"
              value={formData.seguro}
              onChange={handleInputChange}
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
                value={amortizacionTipo}
                onChange={handleAmortizacionChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                {amortizacion &&
                  amortizacion.map((amortiza) => (
                    <option key={amortiza.id} value={amortiza.id}>
                      {amortiza.nombre}
                    </option>
                  ))}
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
            onClick={ handleLimpiar}
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
          <div className="pt-6">
            <button
              type="button"
              className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-600"
              onClick={downloadPdf}
            >
              Descargar
            </button>
          </div>
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
              $ {monto}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Cuota mensual $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              $ {cuotaMensual}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tasa de Interes %
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              {tasaInteres} %
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Seguro $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              $ {seguro}
            </h3>
          </div>
          <div data-popper-arrow></div>
        </div>
      </div>
                

      <div ref={pdfRef} className="mb-10">

      <div className="text-center font-bold my-4 mb-8">
      <h3 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
          Tabla de Amortización 
        </h3>
      </div>
      
      <div className="ml-4 mr-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                N°
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Cuota
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Cuota total
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Seguro
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Interes
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Saldo
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cuota: Cuota) => (
              <tr
                key={cuota.numero_cuota}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {cuota.numero_cuota}
                </td>
                <td className="px-6 py-4">{cuota.cuota}</td>
                <td className="px-6 py-4">{cuota.cuota_total}</td>
                <td className="px-6 py-4">{cuota.seguro}</td>
                <td className="px-6 py-4">{cuota.fecha}</td>
                <td className="px-6 py-4">{cuota.interes}</td>
                <td className="px-6 py-4">{cuota.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
