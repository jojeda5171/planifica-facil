import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const tipo_persona = await prisma.tipoPersona.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!tipo_persona) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(tipo_persona);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const tipo_persona = await prisma.tipoPersona.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!tipo_persona) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }

  const updated_tipo_persona = await prisma.tipoPersona.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updated_tipo_persona);
}
