"use client";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../credito/EditIcon";
import { DeleteIcon } from "../credito/DeleteIcon";

export interface Departamento {
  id: string;
  nombre: string;
  tasaInteres: string;
}
function InversionPage() {
  const [departamentos, setDepartamentos] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((departamentos?.length || 1) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [showFormulario, setShowFormulario] = useState(false);
  const [userEmpresa, setUserEmpresa] = useState<string | null>(null);
  const [selectedDepartamento, setSelectedDepartamento] =
    useState<Departamento | null>(null);

  const currentItems = (departamentos || []).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [formData, setFormData] = useState({
    id: "0",
    nombre: "",
    tasaInteres: "",
  });
  const fetchDepartamentos = async (userEmpresaData: any) => {
    console.log(userEmpresaData);

    try {
      const response = await fetch(
        `http://localhost:3000/api/categoria-inversion/empresa/${userEmpresaData}`
      );
      /* const response = await fetch(
        `http://localhost:3000/api/categoria-inversion/`
      ); */
      if (response.ok) {
        const data = await response.json();
        setDepartamentos(data);
      } else {
        throw new Error("Error fetching departamentos");
      }
    } catch (error) {
      console.error("Error fetching departamentos:", error);
    }
  };
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (departamentos !== null && departamentos.length > 0) {
        mostrarMensajeToast("Solo puede haber una tasa por Empresa");
    }else {
        const data = {
            nombre: formData.nombre,
            tasaInteres: Number(formData.tasaInteres) 
          };
          
          console.log(data);
          try {
            let url = `http://localhost:3000/api/categoria-inversion/${userEmpresa}`;
            let method = "POST";
            const response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (!response.ok) {
              throw new Error("Failed to register la peticion");
            }
            fetchDepartamentos(userEmpresa);
            setFormData({
              id: "0",
              nombre: "",
              tasaInteres: "",
            });
            mostrarMensajeToast("Tasa registrada con éxito!");
            setSelectedDepartamento(null); // Limpiar selectedPeticion después de la operación
            setShowFormulario(false);
          } catch (error) {
            console.error("Error al registrar el departamento:", error);
            mostrarMensajeToast("Error al registrar la categoria!");
          }
    }

    
  };
  const handleDelete = (id: any) => {
    fetch(`http://localhost:3000/api/categoria-inversion/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDepartamentos((prevDepartamento) =>
            prevDepartamento.filter(
              (Departamento: Departamento) => Departamento.id !== id
            )
          );
          mostrarMensajeToast("Tasa eliminada correctamente");
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => console.error("Error deleting:", error));
    mostrarMensajeToast("Error al Eliminar");
  };
  const handleEdit = (departamento: any) => {
    setSelectedDepartamento({
      ...departamento,
    });
    setShowFormulario(true);
  };
  const handleUpdate = async (e: any, departamentoId: any) => {
    e.preventDefault();
    console.log(selectedDepartamento);

    const data = {
      nombre: selectedDepartamento!.nombre,
      tasaInteres: Number(selectedDepartamento!.tasaInteres) 
    };

    console.log(data);
    
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/categoria-inversion/${departamentoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data),
        }
      );
      fetchDepartamentos(userEmpresa);
      // Cerrar el formulario después de la actualización exitosa
      setShowFormulario(false);
      mostrarMensajeToast("Tasa actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      mostrarMensajeToast("Error al actualizar");
      // Manejar el error, mostrar un mensaje de error, etc.
    }
  };
  const handleFormularioToggle = () => {
    setShowFormulario((prevState) => !prevState);
    setSelectedDepartamento(null); // Cambia el estado para mostrar u ocultar el formulario
  };
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    if (selectedDepartamento) {
      setSelectedDepartamento((prevSelectedDepartamento) => {
        if (!prevSelectedDepartamento) {
          return null; // Manejo del caso cuando el estado es null
        }
        return {
          ...prevSelectedDepartamento,
          [id]: value,
        };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  

  useEffect(() => {
    const userEmpresadata = localStorage.getItem("userEmpresa");

    setUserEmpresa(userEmpresadata);

    fetchDepartamentos(userEmpresadata);
  }, []);

  return (
    <>
      <div className="text-center font-bold my-4 mb-8">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
          Crear Tasa Inversión
        </h2>
      </div>
      <div className="ml-4 mr-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tipo de credito
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                % tasa de interes
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((departamento: Departamento) => (
              <tr
                key={departamento.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {departamento.nombre}
                </td>
                <td className="px-6 py-4">{departamento.tasaInteres}</td>

                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(departamento)}
                  >
                    <EditIcon />
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={() => handleDelete(departamento.id)}
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginator */}
      <nav aria-label="Page navigation example" className="ml-4 mt-2">
        <ul className="inline-flex -space-x-px text-sm">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === index + 1
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
                style={{ marginTop: "8px" }}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* BUTTON ADD */}
      <div className="fixed bottom-8 right-8 z-10">
        <button
          data-tooltip-target="tooltip-new"
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 font-medium bg-cyan-500 rounded-full hover:bg-sky-900 group"
          onClick={handleFormularioToggle} // Manejador de clic para abrir/cerrar el formulario
        >
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">New item</span>
        </button>
      </div>
      {/* MODAL ADD */}
      {showFormulario && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex justify-center items-center h-screen">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[350px]"
              onSubmit={handleSubmit} // Asegúrate de tener una función handleSubmit para manejar el envío del formulario
            >
              {/* Nombre del departamento */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre tipo de interes:
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingrese el nombre del departamento"
                  required
                />
              </div>
              {/* Hora de inicio */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tasaInteres"
                >
                  % tasa de interés:
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tasaInteres"
                    type="number"
                    placeholder="Ingrese el % de interés"
                    value={formData.tasaInteres}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleFormularioToggle}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showFormulario && selectedDepartamento && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex justify-center items-center h-screen">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[350px]"
              onSubmit={(e) => handleUpdate(e, selectedDepartamento.id)}
            >
              {/* Nombre del departamento */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre tipo de interes:
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  value={selectedDepartamento.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingrese el nombre del departamento"
                  required
                />
              </div>
              {/* Hora de inicio */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tasaInteres"
                >
                  % tasa de interés:
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tasaInteres"
                    type="number"
                    value={selectedDepartamento.tasaInteres}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              

              <div className="flex items-center justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleFormularioToggle}
                >
                  Cerrar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* TOAST */}
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
}

export default InversionPage;
