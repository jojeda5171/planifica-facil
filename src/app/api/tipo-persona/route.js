import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request){
    const tipos_persona = await prisma.tipoPersona.findMany()
    return NextResponse.json(tipos_persona)
}