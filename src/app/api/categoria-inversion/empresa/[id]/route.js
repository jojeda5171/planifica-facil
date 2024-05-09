import {NextResponse} from "next/server"
import prisma from "@/libs/db"

export async function GET(request, {params}){
    const categorias = await prisma.categoriaInversion.findMany({
        where: {
            empresaId: parseInt(params.id)
        }
    })
    if (categorias.length === 0) {
        return NextResponse.json(
            {error: "No se encontraron categorías para la empresa"},
            {status: 404}
        )
    }
    return NextResponse.json(categorias)
}