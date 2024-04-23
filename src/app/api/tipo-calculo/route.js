import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request){
    const calculos = await prisma.categoriaCalculo.findMany()
    return NextResponse.json(calculos)
}