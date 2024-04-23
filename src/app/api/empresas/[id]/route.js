import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import path from "path";

import { writeFile } from "fs/promises";

export async function GET(request, { params }) {
  const empresas = await prisma.empresa.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (empresas === null) {
    return NextResponse.json(
      { error: "No se encontró la empresa" },
      { status: 404 }
    );
  }
  return NextResponse.json(empresas);
}

export async function PUT(request, { params }) {
  const data = await request.formData();

  const empresa = await prisma.empresa.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (empresa === null) {
    return NextResponse.json(
      { error: "No se encontró la empresa" },
      { status: 404 }
    );
  }

  const file = data.get("logo");
  if (!file) {
    return NextResponse.json(
      { error: "No se subió ningún archivo" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}_${file.name}`;

  const filePath = path.join(process.cwd(), "public/uploads", `${fileName}`);
  await writeFile(filePath, buffer);

  try {
    const updatedEmpresa = await prisma.empresa.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...Object.fromEntries(data),
        logo: `uploads/${fileName}`,
      },
    });
    return NextResponse.json(updatedEmpresa);
  } catch (error) {
    return NextResponse.json(
      { error: "Uno de los datos de la empresa ya esta/n registrados" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  const empresa = await prisma.empresa.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (empresa === null) {
    return NextResponse.json(
      { error: "No se encontró la empresa" },
      { status: 404 }
    );
  }

  try {
    const deletedEmpresa = await prisma.empresa.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(deletedEmpresa);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo eliminar la empresa" },
      { status: 400 }
    );
  }
}
