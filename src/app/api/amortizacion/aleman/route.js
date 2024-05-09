import { NextResponse } from "next/server";
import { parse } from "path/win32";

export async function POST(request, { params }) {
  const body = await request.json();

  const capital = body.monto / body.tiempo;

  let saldo = body.monto;
  let seguro_mesual = 0;

  if (body.seguro != 0) {
    seguro_mesual = body.seguro / body.tiempo;
  }

  const fechaCadena = body.fecha_inicio;
  const partesFecha = fechaCadena.split("/");
  const fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

  let amortizacion = [];
  amortizacion.push({
    numero_cuota: 0,
    fecha: `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
    cuota: 0,
    seguro: 0,
    cuota_total: 0,
    interes: 0,
    capital: 0,
    saldo: saldo,
  });

  for (let i = 1; i <= body.tiempo; i++) {
    const interes = (saldo * (body.interes / 100)) / 12;
    const cuota = capital + interes;
    saldo = saldo - capital;
    fecha.setMonth(fecha.getMonth() + 1);

    const amortizacion_mensual = {
      numero_cuota: i,
      fecha: `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`,
      cuota: parseFloat(cuota).toFixed(2),
      seguro: parseFloat(seguro_mesual).toFixed(2),
      cuota_total: parseFloat(cuota + seguro_mesual).toFixed(2),
      interes: parseFloat(interes).toFixed(2),
      capital: parseFloat(capital).toFixed(2),
      saldo: parseFloat(saldo).toFixed(2),
    };
    amortizacion.push(amortizacion_mensual);
  }

  return NextResponse.json(amortizacion);
}
