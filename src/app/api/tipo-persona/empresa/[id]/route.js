import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const tipos_personas = await prisma.empresaTipoPersona.findMany({
    where: {
      empresaId: parseInt(params.id),
    },
  });
  if (tipos_personas.length === 0) {
    return NextResponse.json(
      { error: "No se encontraron tipos de persona para la empresa" },
      { status: 404 }
    );
  }

  const personas = await prisma.tipoPersona.findMany({
    where: {
      id: {
        in: tipos_personas.map((tc) => tc.tipoPersonaId),
      },
    },
  });
  return NextResponse.json(personas);
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

  const tipoPersonaFind = await prisma.tipoPersona.findUnique({
    where: {
      nombre: body.nombre,
    },
  });

  if (tipoPersonaFind) {
    const empresa_tipo_persona = await prisma.empresaTipoPersona.findFirst({
      where: {
        empresaId: parseInt(params.id),
        tipoPersonaId: tipoPersonaFind.id,
      },
    });

    if (empresa_tipo_persona) {
      return NextResponse.json(tipoPersonaFind);
    }

    const empresa_tipo_calculo = await prisma.empresaTipoPersona.create({
      data: {
        empresaId: parseInt(params.id),
        tipoPersonaId: tipoPersonaFind.id,
      },
    });
    return NextResponse.json(tipoPersonaFind);
  }

  try {
    const tipo_calculo = await prisma.tipoPersona.create({
      data: {
        ...body,
      },
    });

    const empresa_tipo_calculo = await prisma.empresaTipoPersona.create({
      data: {
        empresaId: parseInt(params.id),
        tipoPersonaId: tipo_calculo.id,
      },
    });

    return NextResponse.json(tipo_calculo);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear El tipo de persona" },
      { status: 500 }
    );
  }
}
