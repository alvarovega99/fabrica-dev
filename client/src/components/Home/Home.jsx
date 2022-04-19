import React from 'react';
import style from './Home.module.css';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function Home() {

    const usuario = useSelector(state => state.userLog);
    const navigate = useNavigate();

    return (
        <div className={style.global_cont}>
            <div className={style.userName}>
                <h1>Hola </h1>
                <h1 className={style.nombre}>{usuario?.nombre}</h1>
            </div>
            <div className={style.cont}>
                <div className={style.container}>
                    <div className={style.containerInputs} onClick={()=> {navigate('/Ingresar')}}>
                        <h1>Ingresar Carga</h1>
                        <div className={style.iconoHome1}>

                        </div>
                    </div>
                    <div className={style.containerInputs} onClick={()=> {navigate('/Retirar')}}>
                        <h1>Retirar Carga</h1>
                        <div className={style.iconoHome2}>

                        </div>
                    </div>
                    <div className={style.containerInputs} onClick={()=> {navigate('/Tirar')}}>
                        <h1>Tirar Carga</h1>
                        <div className={style.iconoHome2}>

                        </div>
                    </div>

                </div>
            </div>
        </div>


    )

}