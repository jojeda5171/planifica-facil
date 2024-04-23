import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const tipo_calculo = await prisma.categoriaCalculo.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!tipo_calculo) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(tipo_calculo);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const tipo_calculo = await prisma.categoriaCalculo.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!tipo_calculo) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }

  const updated_tipo_calculo = await prisma.categoriaCalculo.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updated_tipo_calculo);
}
