"use client"
import { signOut } from 'next-auth/react'

function Inicio() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut(
        { callbackUrl: 'http://localhost:3000/' }
      )}>Cerrar sesión</button>
    </div>

  )
}

export default Inicio