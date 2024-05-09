import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const idUsuarios = await prisma.empresaRolUsuario.findMany({
    where: {
      empresaId: parseInt(params.idEmpresa),
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