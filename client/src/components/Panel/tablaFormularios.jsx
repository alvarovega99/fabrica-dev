import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  eliminarProductos,
  eliminarUbicacion,
  getProductos,
  getUbicaciones,
} from "../../redux/action";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mesesVencimiento", headerName: "Meses Vencimiento", width: 100 },
  { field: "eliminar", headerName: "Eliminar", width: 100 },
];

export default function TablaFormulario({ ubi }) {
  const [state, setState] = useState({ array: [] });
  const ubicaciones = useSelector((state) => state.ubicaciones);
  const productos = useSelector((state) => state.productos);
  const rows = ubi === 'ubicaciones'? ubicaciones : productos.map((e, key) => ({
    id: e.id,
    name: e.name,
    mesesVencimiento: e.mesesVencimiento,
  }));


  
  const dispatch = useDispatch();
  const [cargando, setCargando] = useState(false);
  async function eliminar() {
    setCargando(true);
    if (ubi === "ubicaciones") {
      dispatch(eliminarUbicacion(state));
      setCargando(false);
      dispatch(getUbicaciones());
      
      setState({ array: [] });
    }
    if (ubi === "productos") {
      dispatch(eliminarProductos(state));
      dispatch(getProductos());
      setTimeout(() => {
        dispatch(getProductos());
        setCargando(false);
        setState({ array: [] });
      }, 1000);
    }
  }

  return (
    <div style={{ height: "100%", width: "80%" }}>
      {cargando ? (
        <div>
          {" "}
          <h1>Cargaando...</h1>{" "}
        </div>
      ) : (
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
          checkboxSelection
          //eliminar seleccionado

          onSelectionModelChange={(e) => {
            setState({
              ...state,
              array: e,
            });
            console.log(state);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      )}
      <div>
        {state !== [] ? (
          <button
            onClick={() => {
              eliminar();
            }}
          >
            Eliminar
          </button>
        ) : null}
      </div>
    </div>
  );
}
