import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function DELETE(request, { params }) {
  const tipo_persona = await prisma.tipoPersona.findUnique({
    where: {
      id: parseInt(params.idTipoPersona),
    },
  });
  if (!tipo_persona) {
    return NextResponse.json(
      { error: "Tipo de persona no encontrado" },
      { status: 404 }
    );
  }

  const empresa_tipo_persona = await prisma.empresaTipoPersona.findFirst({
    where: {
      empresaId: parseInt(params.id),
      tipoPersonaId: parseInt(params.idTipoPersona),
    },
  });

  if (!empresa_tipo_persona) {
    return NextResponse.json(
      { error: "Tipo de persona no encontrado" },
      { status: 404 }
    );
  }

  const tipo_persona_deleted = await prisma.empresaTipoPersona.delete({
    where: {
      id: empresa_tipo_persona.id,
    },
  });

  return NextResponse.json(tipo_persona_deleted);
}
