import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
    const roles = await prisma.rol.findMany();
    return NextResponse.json(roles);
}