import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Panel.module.css";
import { getTotalPolvoID } from "../../redux/action";

export default function BotonesPolvo() {
    const productos = useSelector(state => state.productos);
    const totalBuscado = useSelector(state => state.totalBuscadoPolvo);
    const dispatch = useDispatch();

    function buscarTotal(id) {
        dispatch(getTotalPolvoID(id))
        modal()
    }
    function buscarPro(id) {
        let producto = productos?.filter(item => item.id === parseInt(id, 10))
        return producto[0]?.nombre
        
    }
    function modal(){
        const modal = document.getElementById('modalPolvo');     
        modal.classList.toggle(`${style.activo}`);   
    }
    return (
        <div>
            <div>
                {productos.map(item => (
                    <button className={style.botonesGalleta} key={item.id} onClick={() => { buscarTotal(item.id) }}>{item.name}</button>
                ))}
                <div className={style.modal} id="modalPolvo">
                    <div className={style.contenidoModal} >
                        <div className={style.botonCerrar}>
                        <button onClick={modal}>x</button>
                        </div>
                        <h1>{buscarPro(totalBuscado.idGalleta)}</h1>
                        <h1>{totalBuscado.total}Kg</h1>

                    </div>
                </div>
            </div>

        </div>
    )
}
