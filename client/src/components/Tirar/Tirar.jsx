
import React, { useState } from 'react';
import style from './Tirar.module.css';
import { useDispatch } from 'react-redux';
import { buscarCodigo } from '../../redux/action';
import { useNavigate } from 'react-router-dom';

export default function Tirar() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        codigoCarga: '',
    })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(buscarCodigo(state)) 
        navigate('/VerificarCargaTirar')
    }
    return (
        <div className={style.global_cont}>


            <div className={style.cont}>
                <div className={style.container}>
                    <form action="" className={style.formulario}>
                        <div className={style.formGrid}>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>Codigo de carga:</span></label>
                                <input type="text" name="codigoCarga" id="codigo" value={state.codigoCarga} onChange={handleChange} />
                            </div>
                        </div>
                        <div className={style.btn_cont}>
                            <button className={style.btn_submit} onClick={handleSubmit}>Verificar</button>
                        </div>

                    </form>


                </div>
            </div>
        </div>


    )
}
