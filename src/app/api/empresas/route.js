import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request, {params}){
    const empresas = await prisma.empresa.findMany()
    return NextResponse.json(empresas)
}