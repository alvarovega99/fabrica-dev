import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Panel.module.css";
export default function Nav() {
    const navigate = useNavigate();
    let date = new Date();
    return (
        <div className={style.nav}>
        <h1          onClick={() => {
            navigate("/Panel");
          }}>Panel</h1>
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/FormulariosPanel");
          }}
        >
          Items
        </h3>
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/FormularioUsuario");
          }}
        >
          Agregar Usuario
        </h3>
        <h2>{date.toLocaleDateString()}</h2>
      </div>
    )
}