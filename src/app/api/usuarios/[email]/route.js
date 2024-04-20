import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request, {params}){
    const usuario = await prisma.usuario.findUnique({
        where:{
            email: params.email
        }
    })
    return NextResponse.json(usuario)
}