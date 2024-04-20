'use client';
import { useState } from 'react';
import '@/app/auth/registro/styles.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


async function obtenerEmpresa(clave: string) {
    const claveValida = await fetch(process.env.NEXT_PUBLIC_API_URL + 'empresa-clave/' + clave,
        {
            cache: 'no-store'
        });
    return await claveValida.json();
}

async function obtenerRoles(id: string) {
    const roles = await fetch(process.env.NEXT_PUBLIC_API_URL + 'roles/roles-empresa/' + id,
        {
            cache: 'no-store'
        });
    return await roles.json() || [];
}

async function registrarUsuario(data: FormData, empresaId: string) {
    const respuesta = await fetch(process.env.NEXT_PUBLIC_API_URL + 'usuarios/usuarios-empresa/' + empresaId + '/' + data.get('role'),
        {
            method: 'POST',
            body: JSON.stringify({
                nombre: data.get('nombre'),
                apellido: data.get('lastName'),
                cedula: data.get('numeroCedula'),
                email: data.get('email'),
                telefono: data.get('phoneNumber'),
                password: data.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

    return await respuesta.json();
}

function Registro() {
    const [claveAccesoValida, setClaveAccesoValida] = useState(false); // Estado para la validación de la clave de acceso
    const [roles, setRoles] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    // Función para manejar la validación de la clave de acceso
    const validarClaveAcceso = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        const respuesta = await obtenerEmpresa(data);
        if (respuesta?.clave_acceso) {
            setClaveAccesoValida(true);
            setEmpresa(respuesta);
            const dataRoles = await obtenerRoles(respuesta.id);
            if (dataRoles.length > 0) {
                setRoles(dataRoles);
            } else {
                setRoles([]);
            }
        } else {
            setClaveAccesoValida(false);
            setRoles([]);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // si no hay nada en empresa, no se puede registrar
        if (empresa.length === 0) {
            setError('Clave de acceso inválida');
        } else {
            const respuesta = await registrarUsuario(data, empresa.id);
            if (respuesta?.error) {
                setError(respuesta.error);
            } else {
                router.push('/');
            }
        }
    }

    return (
        <section id="registro" className="font-sans bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="container">
                <div className="w-full max-h-lg">
                    <div className="leading-loose">
                        <form className="max-w-2xl m-auto p-10 bg-black bg-opacity-35 rounded shadow-xl overflow-hidden" onSubmit={onSubmit}>
                            {error && (
                                <p className="bg-red-500 text-lg text-white p-3 rounded mb-2 text-center">{error}</p>
                            )}
                            <p className="text-white text-center text-lg font-bold">REGISTRO</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="mt-2 col-span-2">
                                    <label className="block text-sm text-white" htmlFor="firstName">Clave de acceso a la empresa</label>
                                    <input
                                        name="clave_acceso"
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password"
                                        id="clave_acceso"
                                        placeholder="xxxxxxxxxxxxxxxxxxxxxxxxx"
                                        aria-label="nombre"
                                        onChange={validarClaveAcceso}
                                        required
                                    />
                                </div>
                                {/* Otros campos del formulario */}
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="firstName">Nombre</label>
                                    <input
                                        name="nombre"
                                        className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                            }`}
                                        type="text"
                                        id="nombre"
                                        placeholder="Nombre"
                                        aria-label="nombre"
                                        required
                                        disabled={!claveAccesoValida} // Deshabilitar si la clave de acceso no es válida
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="lastName">Apellido</label>
                                    <input name='lastName' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="text" id="lastName" placeholder="Apellido" aria-label="apellido" required disabled={!claveAccesoValida} />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="phoneNumber">Número de Cédula</label>
                                    <input name='numeroCedula' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="text" id="numeroCedula" placeholder="XXXXXXXXXX" aria-label="cédula" required disabled={!claveAccesoValida} />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="email">E-mail</label>
                                    <input name='email' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="email" id="email" placeholder="example@email.com" aria-label="email" required disabled={!claveAccesoValida} />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="phoneNumber">Número de Teléfono</label>
                                    <input name='phoneNumber' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="text" id="phoneNumber" placeholder="XXX-XX-XXXX-XXX" aria-label="teléfono" required disabled={!claveAccesoValida} />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="role">Rol</label>
                                    <select name='role' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'}`} id="role" aria-label="rol" required disabled={!claveAccesoValida}>
                                        {claveAccesoValida && Array.isArray(roles) && roles.map((rol) => (<option key={rol.id} value={rol.id}>{rol.nombre}</option>))}
                                        {/* <option value="admin">Administrador</option>
                                        <option value="user">Usuario</option> */}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="password">Contraseña</label>
                                    <input name='password' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="password" id="password" placeholder="********" aria-label="password" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input name='confirmPassword' className={`w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white ${!claveAccesoValida && 'opacity-50 cursor-not-allowed'
                                        }`} type="password" id="confirmPassword" placeholder="********" aria-label="confirmar contraseña" required />
                                </div>
                            </div>
                            <div className="mt-4 items-center flex justify-center">
                                <button className={`px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded ${!claveAccesoValida && 'bg-red-500 hover:bg-red-600 cursor-not-allowed'
                                    }`} type="submit" disabled={!claveAccesoValida}>Registrarse</button>
                            </div>{/* px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded */}
                            <div className="text-center mt-2">
                                <span className="text-white">¿Ya tienes una cuenta? </span>
                                <Link href="/" className="text-white underline hover:text-red-500">Inicia Sesión</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registro