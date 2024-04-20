import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const empresa = await prisma.empresa.findUnique({
    where: {
      clave_acceso: params.clave,
    },
  });
  if (!empresa) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }
  return NextResponse.json(empresa);
}
