import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const roles = await prisma.empresaRolUsuario.findMany({
    where: {
      empresaId: parseInt(params.id),
    },
  });
  if (roles.length === 0) {
    return NextResponse.json([], { status: 404 });
  }
  const rolesEmpresa = await prisma.rol.findMany({
    where: {
      id: {
        in: roles.map((rol) => rol.rolId),
      },
    },
  });
  if (rolesEmpresa.length === 0) {
    return NextResponse.json([], { status: 404 });
  }
  return NextResponse.json(rolesEmpresa);
}

export async function POST(request, { params }) {
  const body = await request.json();

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
      nombre: body.nombre,
    },
  });

  if (rolFind) {
    const empresa_rol = await prisma.empresaRolUsuario.findFirst({
        where: {
            empresaId: parseInt(params.id),
            rolId: rolFind.id,
        },
    });

    if (empresa_rol) {
        return NextResponse.json(rolFind);
    }

    const empresa_rol_create = await prisma.empresaRolUsuario.create({
      data: {
        empresaId: parseInt(params.id),
        rolId: rolFind.id,
      },
    });
    return NextResponse.json(rolFind);
  }

  try {
    const rol = await prisma.rol.create({
      data: {
        ...body,
      },
    });

    const empresa_rol_usuario = await prisma.empresaRolUsuario.create({
      data: {
        empresaId: parseInt(params.id),
        rolId: rol.id,
      },
    });

    return NextResponse.json(rol);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la categoría de cálculo" },
      { status: 500 }
    );
  }
}
