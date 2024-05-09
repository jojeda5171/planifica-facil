import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function DELETE(request, { params }) {
  const tipo_calculo = await prisma.categoriaCalculo.findUnique({
    where: {
      id: parseInt(params.idTipoCalculo),
    },
  });
  if (!tipo_calculo) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }

  const empresa_tipo_calculo = await prisma.empresaCategoriaCalculo.findFirst({
    where: {
      empresaId: parseInt(params.id),
      categoriaId: parseInt(params.idTipoCalculo),
    },
  });

  if (!empresa_tipo_calculo) {
    return NextResponse.json(
      { error: "Tipo de calculo no encontrado" },
      { status: 404 }
    );
  }

  console.log("empresa_tipo_calculo", empresa_tipo_calculo);

  const tipo_calculo_deleted = await prisma.empresaCategoriaCalculo.delete({
    where: {
      id: empresa_tipo_calculo.id,
    },
  });

  return NextResponse.json(tipo_calculo_deleted);
}
