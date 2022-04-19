import React from "react";
import { useSelector} from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "codigoCarga", headerName: "Codigo", width: 150 },
  { field: "producto", headerName: "Producto", width: 130 },
  { field: "cantidad", headerName: "Cantidad", width: 80 },
  { field: "ubicacion", headerName: "Ubicacion", width: 130 },
  { field: "tipoOperacion", headerName: "Operacion", width: 130 },
  { field: "tipoIngreso", headerName: "Tipo", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "fecha", headerName: "Fecha", width: 100 },
  { field: "hora", headerName: "Hora", width: 80 },
  { field: "vencimiento", headerName: "Vencimiento", width: 150 },
  { field: "idUsuario", headerName: "Usuario", width: 90 },
];

export default function TablaCheta({ info }) {
  const productos = useSelector((state) => state.productos);
  const ubicaciones = useSelector((state) => state.ubicaciones);


  console.log(info,'esto es lo que llega');
  function buscarUbi(id) {
    let ubicacion = ubicaciones?.filter((item) => item.id === parseInt(id, 10));
    return ubicacion[0]?.name;
  }
  function buscarPro(id) {
    let producto = productos?.filter((item) => item.id === parseInt(id, 10));
    return producto[0]?.name;
  }
  function sacarFecha(fecha) {
    let fecha2 = fecha.split("T");
    return fecha2[0];
  }
  function sacarHora(fecha) {
    let fecha2 = fecha.split("T");
    let hora = fecha2[1].split(":");
    return hora[0] + ":" + hora[1];
  }

  const rows = info.map((e, key) => ({
    id: key,
    codigoCarga: e.codigoCarga,
    producto: buscarPro(e.idProducto),
    cantidad: e.cantidad,
    ubicacion: buscarUbi(e.ubicacion),
    tipoOperacion: e.tipoOperacion,
    tipoIngreso: e.tipoIngreso,
    status: e.status,
    fecha: sacarFecha(e.createdAt),
    hora: sacarHora(e.createdAt),
    vencimiento:e.vencimiento,
    idUsuario:e.usuario?.legajo
  }));
  return (
    <div style={{ height: "100%", width: "100%", marginTop:"5%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[10]}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
