/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface Cuota {
  interes_bruto: string;
  interes_mensual: string;
  total: string;
  fecha: string;
}

export interface Departamento {
  id: string;
  nombre: string;
  tasaInteres: string;
}

const simuInversionPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pdfRef = useRef<HTMLDivElement>(null);
  const [passwordActual, setPasswordActual] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [userEmpresa, setUserEmpresa] = useState<string | null>(null);
  const [departamentos, setDepartamentos] = useState([] as Departamento[]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [containsSymbol, setContainsSymbol] = useState(false);
  const [cuotas, setCuotas] = useState<Cuota | null>(null);
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

  const [formData, setFormData] = useState({
    monto: "",
    interes: 0,
    tiempo: "",
    fecha_inicio: "",
  });
  useEffect(() => {
  const userEmpresadata = localStorage.getItem("userEmpresa");

    setUserEmpresa(userEmpresadata);
    fetchData(userEmpresadata);
  }, []);

  const fetchData = async (userEmpresadata: any) => {
    try {
      const id = localStorage.getItem("id_user");
      const response = await fetch(`http://localhost:3000/api/categoria-inversion/empresa/${userEmpresadata}`);
      if (response.ok) {
        const data = await response.json();

        setDepartamentos(data);
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleGuardar = async (e: any) => {
    e.preventDefault();

    const fechanew = formatDate(formData.fecha_inicio);
    console.log(fechanew);

    //setTasaInteres("9");
    console.log(departamentos);
    

    const data = {
      monto: formData.monto,
      interes: departamentos[0].tasaInteres,
      tiempo: formData.tiempo,
      fecha_inicio: fechanew,
    };

    console.log(data);

    try {
      const response = await fetch(
        `http://localhost:3000/api/inversion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data1 = await response.json();
        setCuotas(data1);
        console.log(data1);
        

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

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
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

  const handleLimpiar = () => {
    setFormData({
      monto: "",
      interes: 0,
      tiempo: "",
      fecha_inicio: "",
    });

    setTasaInteres("");

    setCuotas(null);


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
      // Verificar si todos los campos en formData están vacíos o no definidos
      const formDataKeys = Object.keys(formData);
      const formDataValues = Object.values(formData);
    
      if (formDataKeys.some((key, index) => {
        const value = formDataValues[index];
        // Verificar si el valor es null, una cadena vacía o una cadena con solo espacios en blanco (para strings)
        return value === null ||
               (typeof value === "string" && value.trim() === "");
      })) {
        // Al menos un campo está vacío o no definido, mostrar mensaje de advertencia
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
    
    

  return (
    <>
      <div className="text-center font-bold my-4 mb-16 text-black">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">
          Simulador de inversión
        </h2>
      </div>

      <div className="grid grid-cols-2">
        <form className="ml-28 mr-10">
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
              Fecha de inicio
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
          
          <button
            type="submit"
            onClick={handleLimpiar}
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

        <div ref={pdfRef}
          role="tooltip"
          className="ml-20 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-[500px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        >

          <div >
          <div className="text-center  my-4 mb-8">
              <h3 className="mb-4 text-xs font-serif leading-none tracking-tight text-gray-200 md:text-4xl ">
                  Información de Inversión 
                </h3>
              </div>
          <div className="grid grid-cols-2 p-5 ml-12 mt-10">
            
            <h3 className="font-semibold text-gray-900 dark:text-white mb-10">
              Tasa de Interes %
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              % {departamentos[0]?.tasaInteres}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Interes bruto $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              $ {cuotas?.interes_bruto}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Interes mensual $
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              $ {cuotas?.interes_mensual}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
            Fecha de vencimiento 
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              {cuotas?.fecha}
            </h3>
            <h3 className="font-semibold text-gray-900 dark:text-white">
             Total $ 
            </h3>
            <h3 className="font-light text-gray-900 dark:text-white mb-10">
              $ {cuotas?.total}
            </h3>


          </div>
          <div data-popper-arrow></div>
          </div>

        
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

export default simuInversionPage;
