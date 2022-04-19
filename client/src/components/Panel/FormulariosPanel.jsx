import React from "react";
import style from "./FormulariosPanel.module.css";
import FormProductos from "./FormProductos";
import FormUbicaciones from "./FormUbicaciones";
import Nav from "./Nav";

export default function FormulariosPanel() {
    return(
        <div className={style.panel}>
            <Nav />
            <h1>items</h1>
            <div className={style.gridForms}>
                <div>
                    <FormProductos />
                </div>
                <div>
                    <FormUbicaciones />
                </div>
            </div>
        </div>
    )
}