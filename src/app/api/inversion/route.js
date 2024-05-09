import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const interes_bruto = parseFloat(
    body.monto * (body.interes / 100) * (body.tiempo / 12)
  ).toFixed(2);
  const interes_mensual = parseFloat(interes_bruto / body.tiempo).toFixed(2);
  const total = (parseFloat(body.monto) + parseFloat(interes_bruto)).toFixed(2);

  const fechaCadena = body.fecha_inicio;
  const partesFecha = fechaCadena.split("/");
  const fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
  console.log("fechaInicio", fecha);
  fecha.setMonth(fecha.getMonth() + parseInt(body.tiempo));

  const fecha_final_str = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  const respuesta = {
    interes_bruto,
    interes_mensual,
    total,
    fecha: fecha_final_str,
  };
  return NextResponse.json(respuesta);
}
