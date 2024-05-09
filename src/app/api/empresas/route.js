import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import path from "path";

import { writeFile } from "fs/promises";

export async function GET(request, { params }) {
  const empresas = await prisma.empresa.findMany();
  return NextResponse.json(empresas);
}

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("logo");

  if (!file) {
    return NextResponse.json(
      { error: "No se subió ningún archivo" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    `${Date.now()}_${file.name}`
  );
  await writeFile(filePath, buffer);

  try {
    const empresa = await prisma.empresa.create({
      data: {
        ...Object.fromEntries(data),
        logo: `uploads/${Date.now()}_${file.name}`,
      },
    });
    return NextResponse.json(empresa, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "La empresa ya existe" },
      { status: 400 }
    );
  }
}
