import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const rol = await prisma.rol.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!rol) {
    return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
  }
  return NextResponse.json(rol);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const rol = await prisma.rol.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!rol) {
    return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
  }

  try {
    const updated_rol = await prisma.rol.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updated_rol);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el rol" },
      { status: 500 }
    );
  }
}
