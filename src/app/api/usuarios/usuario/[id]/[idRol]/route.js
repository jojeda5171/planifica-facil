import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {
  const body = await request.json();
  const rolFind = await prisma.rol.findUnique({
    where: {
      id: parseInt(params.idRol),
    },
  });
  if (!rolFind) {
    return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
  }
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const usuario = await prisma.usuario.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...body,
      },
    });

    const usuarioRol = await prisma.empresaRolUsuario.updateMany({
      where: {
        rolId: parseInt(params.idRol),
        usuarioId: parseInt(params.id),
      },
      data: {
        rolId: parseInt(params.idRol),
      },
    });
    const { password: _, ...user } = usuario;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
