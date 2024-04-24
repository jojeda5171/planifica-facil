import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!usuario) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(usuario);
}

export async function DELETE(request, { params }) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!usuario) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }
  await prisma.empresaRolUsuario.updateMany({
    where: {
      usuarioId: parseInt(params.id),
    },
    data: {
      usuarioId: null,
    },
  });
  await prisma.usuario.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(usuario);
}
