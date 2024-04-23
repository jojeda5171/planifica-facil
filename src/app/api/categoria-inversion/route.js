import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request){
    const categorias = await prisma.categoriaInversion.findMany()
    return NextResponse.json(categorias)
}