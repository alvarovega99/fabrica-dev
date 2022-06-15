import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./DetalleSalida.module.css";
import molino from '../../img/molino.png';
import galleta from '../../img/cookie3.png'
import {getProductos, getUbicaciones, postSalida, setMensaje } from "../../redux/action";
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

export default function DetalleSalida(){
    const info = useSelector(state => state.verifica);
    const usuario = useSelector(state => state.userLog);
    const dispatch = useDispatch()
    const productos = useSelector(state => state.productos);
    const ubicaciones = useSelector(state => state.ubicaciones);
    const navigate = useNavigate();
    const producto = productos.find(e => e.id === parseInt(info.idProducto, 10))
    const ubicacion = ubicaciones.find(e => e.id === parseInt(info.ubicacion, 10))
    const mensaje = useSelector(state => state.mensaje);

    useEffect(() => {
       
            dispatch(getProductos())
       
       
            dispatch(getUbicaciones())
     
        
    }, [dispatch])
    
  /*   useEffect(() => {
        if (mensaje !== '') {
            Swal.fire({
                position: 'center',
                icon: mensaje.message === 'confirmado' ? 'success' : 'error',
                title: mensaje === '' ? 'Cargando' : mensaje.message,
              })
            dispatch(setMensaje())
            navigate('/Home')
            
        }
    }, [mensaje, dispatch, navigate])
 */

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postSalida({id: info.codigoCarga, status:'salida', idUsuario:usuario.id})).then((res) => {
            console.log(res, "res -este es el res");
            if (res.payload.message === "confirmado") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Operación realizada con éxito",
              });
              navigate("/Home");
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al realizar la operación",
              });
            }
          });
    }
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
                                <label className={style.lbl_nombre1}> <span className={style.text_nomb}>Codigo de carga</span></label>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>{info.codigoCarga}</span></label>

                            </div>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre1}> <span className={style.text_nomb}>Producto:</span></label>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>{producto?.name}</span></label>

                            </div>
                            <div className={style.campo}>
                                <label className={style.lbl_nombre1}> <span className={style.text_nomb}>Cantidad: (Kg)</span></label>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>{info.cantidad}</span></label>
                            </div>
                        </div>
                        <div>
                            <div className={style.opcion}>
                                <div className={`${style.check} ${info.tipo === 'galleta' ? style.activo : null}`}>
                                    <span ><img src={galleta} className={style.icono} alt="" /></span>
                                    <h3>Galleta</h3>
                                </div>
                                <div className={`${style.check} ${info.tipo === 'polvo' ? style.activo : null}`}>
                                    <span className={style.icono}><img src={molino} alt="" /></span>
                                    <h3>Polvo</h3>
                                </div>
                            </div>

                            <div className={style.campo}>
                                <label className={style.lbl_nombre1}> <span className={style.text_nomb}>Ubicacion:</span></label>
                                <label className={style.lbl_nombre}> <span className={style.text_nomb}>{ubicacion?.name}</span></label>

                               
                            </div>
                            <div className={style.btn_cont}>
                            <button className={style.btn_submit} onClick={handleSubmit}>Confirmar Retiro</button>
                        </div>
                        </div>
                    

                    </form>

                </div>
            </div>
        </div>


    )


}