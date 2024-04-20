import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {
  const idUsuarios = await prisma.empresaRolUsuario.findMany({
    where: {
      empresaId: parseInt(params.idEmpresa),
      rolId: parseInt(params.idRol),
      usuarioId: {
        not: null,
      },
    },
  });
  if (idUsuarios.length === 0) {
    return NextResponse.json([], { status: 404 });
  }
  console.log(idUsuarios);
  const usuarios = await prisma.usuario.findMany({
    where: {
      id: {
        in: idUsuarios.map((usuario) => usuario.usuarioId),
      },
    },
  });
  console.log(usuarios);
  return NextResponse.json(usuarios);
}

export async function POST(request, { params }) {
  const datos = await request.json();
  try {
    const hashedPassword = await bcrypt.hash(datos.password, 10);
    datos.password = hashedPassword;
    console.log(datos);
    const usuario = await prisma.usuario.create({
      data: {
        ...datos,
      },
    });
    if (!usuario) throw new Error("El usuario ya existe!");
    const empresaRol = await prisma.empresaRolUsuario.findMany({
      where: {
        empresaId: parseInt(params.idEmpresa),
        rolId: parseInt(params.idRol),
        usuarioId: null,
      },
    });
    if (empresaRol.length === 0) {
      await prisma.empresaRolUsuario.create({
        data: {
          empresaId: parseInt(params.idEmpresa),
          rolId: parseInt(params.idRol),
          usuarioId: usuario.id,
        },
      });
    } else {
      await prisma.empresaRolUsuario.update({
        where: {
          id: empresaRol[0].id,
        },
        data: {
          usuarioId: usuario.id,
        },
      });
    }
    const { password: _, ...user } = usuario;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Usuario ya existe!' }, { status: 400 });
  }
}
