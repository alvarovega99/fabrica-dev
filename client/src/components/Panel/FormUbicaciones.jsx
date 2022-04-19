import React, { useState, useEffect } from "react";
import { postUbicaciones, getUbicaciones } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import style from "./Forms.module.css";
import TablaFormulario from "./tablaFormularios";
export default function FormUbicaciones() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((state) => state.ubicaciones);

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    dispatch(getUbicaciones());
  }, []);

  const [state, setState] = useState({
    nombre: ""
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(state);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postUbicaciones(state));
    modal();
    setCargando(true);
    setTimeout(() => {
      dispatch(getUbicaciones());
      setCargando(false);
    }, 600);
  }

  function modal() {
    const modal = document.getElementById("modalUbicaciones");
    modal.classList.toggle(`${style.activo}`);
  }

  return (
    <div className={style.containerForm}>
      <button onClick={modal} className={style.botonn}>
        Agregar Ubicacion
      </button>
      <div className={style.modalForm} id="modalUbicaciones">
        <div className={style.formulario}>
          <div className={style.botonCerrar}>
            <button onClick={modal}>x</button>
          </div>
          <h2>Agregar Ubicacion</h2>
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
          <button className={style.enviar} onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>
      {cargando === true ? (
        <h1>Cargando...</h1>
      ) : (
        <div style={{ height: "50vh", width: "100%" }}>
          <TablaFormulario ubi={'ubicaciones'} />
        </div>
      )}
    </div>
  );
}
