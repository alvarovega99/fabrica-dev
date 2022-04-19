import React, { useState, useEffect } from "react";
import { postProductos, getProductos, setMensaje } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import style from "./Forms.module.css";
import Swal from "sweetalert2";
import TablaFormulario from "./tablaFormularios";
export default function FormProductos() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const mensaje = useSelector((state) => state.mensaje);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    dispatch(getProductos());
  }, []);

  const [state, setState] = useState({
    nombre: "",
    mesesVencimiento: 0,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(state);
  }
  /*     useEffect(() => {
        if (mensaje !== '') {
            Swal.fire({
                position: 'center',
                icon: mensaje.message === 'confirmado' ? 'success' : 'error',
                title: mensaje === '' ? 'Cargando' : mensaje.message,
              })
            dispatch(setMensaje())
            
        }
    }, [mensaje])
 */
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postProductos(state));
    modal();
    setCargando(true);
    setTimeout(() => {
      dispatch(getProductos());
      setCargando(false);
    }, 600);
  }

  function modal() {
    const modal = document.getElementById("modalProductos");
    modal.classList.toggle(`${style.activo}`);
  }

  return (
    <div className={style.containerForm}>
      <button onClick={modal} className={style.botonn}>
        Agregar Producto
      </button>
      <div className={style.modalForm} id="modalProductos">
        <div className={style.formulario}>
          <div className={style.botonCerrar}>
            <button onClick={modal}>x</button>
          </div>
          <h2>Agregar Productos</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={state.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Meses Vencimiento:
            <input
              type="number"
              name="mesesVencimiento"
              value={state.mesesVencimiento}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <button className={style.enviar} onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>
      {cargando === true ? (
        <h1>Cargando...</h1>
      ) : (
        <div style={{ height: "50vh", width: "100%" }}>
          <TablaFormulario ubi={'productos'} />
        </div>
      )}
    </div>
  );
}
