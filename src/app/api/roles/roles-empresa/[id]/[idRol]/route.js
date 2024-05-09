import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function DELETE(request, { params }) {
  const empresaFind = await prisma.empresa.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!empresaFind) {
    return NextResponse.json(
      { error: "Empresa no encontrada" },
      { status: 404 }
    );
  }

  const rolFind = await prisma.rol.findUnique({
    where: {
      id: parseInt(params.idRol),
    },
  });
  if (!rolFind) {
    return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
  }

  const rolesEmpresaFind = await prisma.empresaRolUsuario.findFirst({
    where: {
      empresaId: parseInt(params.id),
      rolId: parseInt(params.idRol),
    },
  });
  if (!rolesEmpresaFind) {
    return NextResponse.json(
      { error: "Rol no encontrado en la empresa" },
      { status: 404 }
    );
  }

  try {
    const rol_delete = await prisma.empresaRolUsuario.deleteMany({
      where: {
        empresaId: parseInt(params.id),
        rolId: parseInt(params.idRol),
      },
    });
    return NextResponse.json(rolFind);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el rol de la empresa" },
      { status: 500 }
    );
  }
}
