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
