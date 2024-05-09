import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const tipos_calculos = await prisma.empresaCategoriaCalculo.findMany({
    where: {
      empresaId: parseInt(params.id),
    },
  });
  if (tipos_calculos.length === 0) {
    return NextResponse.json(
      { error: "No se encontraron categorías de calculo para la empresa" },
      { status: 404 }
    );
  }

  const categorias = await prisma.categoriaCalculo.findMany({
    where: {
      id: {
        in: tipos_calculos.map((tc) => tc.categoriaId),
      },
    },
  });
  return NextResponse.json(categorias);
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

  const categoriaFind = await prisma.categoriaCalculo.findUnique({
    where: {
      nombre: body.nombre,
    },
  });

  if (categoriaFind) {

    const empresa_categoria_calculo = await prisma.empresaCategoriaCalculo.findFirst({
        where: {
            empresaId: parseInt(params.id),
            categoriaId: categoriaFind.id,
        },
    });

    if (empresa_categoria_calculo) {
        return NextResponse.json(categoriaFind);
    }

    const empresa_tipo_calculo = await prisma.empresaCategoriaCalculo.create({
      data: {
        empresaId: parseInt(params.id),
        categoriaId: categoriaFind.id,
      },
    });
    return NextResponse.json(categoriaFind);
  }

  try {
    const tipo_calculo = await prisma.categoriaCalculo.create({
      data: {
        ...body,
      },
    });

    const empresa_tipo_calculo = await prisma.empresaCategoriaCalculo.create({
      data: {
        empresaId: parseInt(params.id),
        categoriaId: tipo_calculo.id,
      },
    });

    return NextResponse.json(tipo_calculo);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la categoría de cálculo" },
      { status: 500 }
    );
  }
}