import React, { useState, useEffect } from 'react';
import style from './FormIngreso.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { facookie } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import molino from '../../img/molino.png';
import galleta from '../../img/cookie3.png'
import { verificar , getProductos, getUbicaciones } from '../../redux/action';

export default function FormIngreso() {

    const usuario = useSelector(state => state.userLog);
    const productos = useSelector(state => state.productos);
    const ubicaciones = useSelector(state => state.ubicaciones);
    const mensaje = useSelector(state => state.mensaje);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const types = [
        { name: 'abajo', value: 'sonrisas' },
        { name: 'arriba', value: 'traviatas' },
        { name: 'izquierda', value: 'criollitas' },
    ]

    
    useEffect(() => {
        if (productos.length === 0) {
            dispatch(getProductos())
        }
        if (ubicaciones.length === 0) {
            dispatch(getUbicaciones())
        }
    }, [productos,ubicaciones])


    const [check, setCheck] = useState('');

    useEffect(() => {
        setState({
            ...state,
            tipoIngreso: check
        })
        console.log(state, 'state')
    }, [check])

    const [state, setState] = useState({
        idUsuario: usuario.id,
        codigoCarga: '',
        idProducto: 0,
        cantidad: 0,
        ubicacion: 0,
        tipoOperacion: 'ingreso',
        tipoIngreso: '',

    });

    function handleChange(e) {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(verificar(state))
        console.log(state)
        navigate('/VerificarIngreso')
    }


    /*  console.log(state) */
    return (
        <div className={style.global_cont}>
          
            <div className={style.userName}>
                <h1>Hola </h1>
                <h1 className={style.nombre}>{usuario?.nombre}</h1>
            </div>
            <div className={style.cont}>
                <div className={style.container}>
                    <form action="" className={style.formulario}>
                        <div className={style.formGrid}>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>Codigo de carga</span></label>
                                <input type="text" name="codigoCarga" id="codigo" value={state.codigoCarga} onChange={handleChange} />
                            </div>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>Producto:</span></label>
                                <select className="select-filtros" name="idProducto" id="seleccion" placeholder="hola" onChange={handleChange} value={state.idProducto}>
                                    <option selected>Seleccione un tipo</option>
                                    {
                                        productos.map(tipo =>
                                            <option value={tipo.id} name='idProducto' onChange={handleChange}>{tipo.name}</option>
                                        )
                                    }

                                </select>
                            </div>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>Cantidad: (Kg)</span></label>
                                <input type="number" name="cantidad" value={state.cantidad} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div className={style.opcion}>
                                <div className={`${style.check} ${check === 'galleta' ? style.activo : null}`} onClick={(e) => { setCheck('galleta') }}>
                                    <span ><img src={galleta} className={style.icono} alt="" /></span>
                                    <h3>Galleta</h3>
                                </div>
                                <div className={`${style.check} ${check === 'polvo' ? style.activo : null}`} onClick={(e) => { setCheck('polvo') }}>
                                    <span className={style.icono}><img src={molino} alt="" /></span>
                                    <h3>Polvo</h3>
                                </div>
                            </div>

                            <div className={style.campo}>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>Ubicacion:</span></label>
                                <select className="select-filtros" name="ubicacion" id="seleccion" placeholder="hola" onChange={handleChange} value={state.ubicacion}>
                                    <option selected>Seleccione un tipo</option>
                                    {
                                        ubicaciones.map(tipo =>
                                            <option value={tipo.id} name='ubicacion' onChange={handleChange}>{tipo.name}</option>
                                        )
                                    }

                                </select>
                            </div>
                            <div className={style.btn_cont}>
                            <button className={style.btn_submit} onClick={handleSubmit}>Guardar</button>
                        </div>
                        </div>
                    

                    </form>

                </div>
            </div>
        </div>


    )

}