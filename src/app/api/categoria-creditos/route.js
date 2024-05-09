import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request){
    const categorias = await prisma.categoriaCredito.findMany()
    return NextResponse.json(categorias)
}