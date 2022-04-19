import React, { useState, useEffect } from "react";
import style from "./Panel.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOperaciones,
  getTotalGalleta,
  getTotalPolvo,
  getTotalGalletaID,
  getTotalPolvoID,
  getProductos,
  getUbicaciones,
} from "../../redux/action";
import BotonesGalleta from "./botonesGalletas";
import BotonesPolvo from "./botonesPolvo";
import { useNavigate } from "react-router-dom";
import TablaCheta from "./tablaCheta";
import Nav from "./Nav";

export default function Panel() {
  const dispatch = useDispatch();
  const totalGalleta = useSelector((state) => state.totalGalleta);
  const totalPolvo = useSelector((state) => state.totalPolvo);
  const operaciones = useSelector((state) => state.operaciones);
  const totalBuscado = useSelector((state) => state.totalBuscado);
  const productos = useSelector((state) => state.productos);
  const ubicaciones = useSelector((state) => state.ubicaciones);
  const navigate = useNavigate();
  let date = new Date();
  /* let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') */
  useEffect(() => {
    dispatch(getOperaciones());
    dispatch(getTotalGalleta());
    dispatch(getTotalPolvo());
    dispatch(getProductos());
    dispatch(getUbicaciones());

    setInterval(() => {
      dispatch(getOperaciones());
      dispatch(getTotalGalleta());
      dispatch(getTotalPolvo());

      console.log("actualizando");
    }, 60000);
  }, []);


  function buscarUbi(id) {
    let ubicacion = ubicaciones?.filter((item) => item.id === parseInt(id, 10));
    return ubicacion[0]?.name;
  }
  function buscarPro(id) {
    let producto = productos?.filter((item) => item.id === parseInt(id, 10));
    return producto[0]?.nombre;
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

  return (
    <div className={style.panel}>
      <Nav />
      <div className={style.contenedorCubos}>
        <div>
          <div className={style.cuboTotal}>
            <h2>Total de galletas</h2>
            <h3>{totalGalleta.total}Kg</h3>
          </div>
          <div className={style.conteBotones}>
            <BotonesGalleta />
          </div>
        </div>

        <div>
          <div className={style.cuboTotal}>
            <h2>Total de Polvo</h2>
            <h3>{totalPolvo.total}Kg</h3>
          </div>
          <div className={style.conteBotones}>
            <BotonesPolvo />
          </div>
        </div>
      </div>
      {operaciones?.length > 0 ? 
        <div style={{ height: "80vh", width: "100%" }}>
            <TablaCheta info={operaciones}/>
        </div>
        :
        <h1>cargando tabla</h1>
        }
      {/* <div className={style.containerTabla}>
        <table className={style.tabla}>
          <thead className={style.titulos}>
            <tr>
              <th>Codigo de carga</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Ubicacion</th>
              <th>Operacion</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody className={style.cuerpoTabla}>
            {operaciones.map((operacion) => (
              <tr key={operacion?.id}>
                <td>{operacion?.codigoCarga}</td>
                <td>{buscarPro(operacion?.idProducto)}</td>
                <td>{operacion?.cantidad}Kg</td>
                <td>{buscarUbi(operacion?.ubicacion)}</td>
                <td>{operacion?.tipoOperacion}</td>
                <td>{operacion?.tipoIngreso}</td>
                <td>{operacion?.status}</td>
                <td>{sacarFecha(operacion.createdAt)}</td>
                <td>{sacarHora(operacion.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
        
    </div>
  );
}
