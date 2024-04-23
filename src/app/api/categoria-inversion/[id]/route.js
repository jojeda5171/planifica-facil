import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  const categoria = await prisma.categoriaInversion.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (categoria === null) {
    return NextResponse.json(
      { error: "Categoría no encontrada!" },
      { status: 404 }
    );
  }
  return NextResponse.json(categoria);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const categoriaFind = await prisma.categoriaInversion.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!categoriaFind) {
    return NextResponse.json(
      { error: "Categoría no encntrada!" },
      { status: 404 }
    );
  }
  const categoria = await prisma.categoriaInversion.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json(categoria);
}

export async function DELETE(request, { params }) {
  const categoriaFind = await prisma.categoriaInversion.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  console.log(categoriaFind);
  if (!categoriaFind) {
    console.log("Categoria no encontrada!");
    return NextResponse.json(
      { error: "Categoría no encntrada!" },
      { status: 404 }
    );
  }
  console.log("Categoria encontrada!");
  const categoria = await prisma.categoriaInversion.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(categoria);
}

// Aqui se inserta la categoria pero el parametro es el id de la empresa
export async function POST(request, { params }) {
  const body = await request.json();
  body.empresaId = parseInt(params.id);
  const empresaFind = await prisma.empresa.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!empresaFind) {
    return NextResponse.json(
      { error: "Empresa no encontrada!" },
      { status: 404 }
    );
  }
  console.log(body);
  const categoria = await prisma.categoriaInversion.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json(categoria);
}
