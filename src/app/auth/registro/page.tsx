import '@/app/auth/registro/styles.css'
import Link from "next/link";

function Registro() {
    return (
        <section id="registro" className="font-sans bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="container">
                <div className="w-full max-h-lg">
                    <div className="leading-loose">
                        <form className="max-w-2xl m-auto p-10 bg-black bg-opacity-35 rounded shadow-xl overflow-hidden">
                            <p className="text-white  text-center text-lg font-bold">REGISTRO</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="mt-2 col-span-2">
                                    <label className="block text-sm text-white" htmlFor="firstName">Clave de acceso a la empresa</label>
                                    <input name='clave_acceso' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="clave_acceso" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxx" aria-label="nombre" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="firstName">Nombre</label>
                                    <input name='nombre' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="nombre" placeholder="Nombre" aria-label="nombre" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="lastName">Apellido</label>
                                    <input name='lastName' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="lastName" placeholder="Apellido" aria-label="apellido" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="phoneNumber">Número de Cédula</label>
                                    <input name='numeroCedula' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="numeroCedula" placeholder="XXXXXXXXXX" aria-label="cédula" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="email">E-mail</label>
                                    <input name='email' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email" placeholder="example@email.com" aria-label="email" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="phoneNumber">Número de Teléfono</label>
                                    <input name='phoneNumber' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="text" id="phoneNumber" placeholder="XXX-XX-XXXX-XXX" aria-label="teléfono" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="role">Rol</label>
                                    <select name='role' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" id="role" aria-label="rol" required>
                                        <option value="admin">Administrador</option>
                                        <option value="user">Usuario</option>
                                        {/* Agrega más opciones según tus necesidades */}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="password">Contraseña</label>
                                    <input name='password' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="password" id="password" placeholder="********" aria-label="password" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-white" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input name='confirmPassword' className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="password" id="confirmPassword" placeholder="********" aria-label="confirmar contraseña" required />
                                </div>

                            </div>
                            <div className="mt-4 items-center flex justify-center">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">Registrarse</button>
                            </div>
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