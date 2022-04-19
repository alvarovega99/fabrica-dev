import React,{useEffect} from 'react'
import style from '../Login/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setMensaje } from '../../redux/action'
import Swal from 'sweetalert2'



const Login = () => {
    const mensaje = useSelector(state => state.mensaje)
    const user =  useSelector(state => state.userLog)
    const [state, setState] = useState({
        legajo: '',
        password: ''
    })

    const dispatch = useDispatch();
    const history = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (mensaje !== '') {
            Swal.fire({
                position: 'center',
                icon: mensaje === 'confirmado' ? 'success' : 'error',
                title: mensaje === '' ? 'Cargando' : mensaje.message,
            })
            if (mensaje === 'confirmado' && user.tipo === 1) {
                dispatch(setMensaje())
                history('/panel')
               
            }
            else if (mensaje === 'confirmado' && user.tipo === 2) {
                dispatch(setMensaje())
                history('/Home')
                
            }else{
                dispatch(setMensaje())
                history('/Login')
                
            }
            
        }
    }, [mensaje])

    const handleSumbit = (e) => {
        e.preventDefault();
        dispatch(loginUser(state));
    }

    return (
        <div className={style.global_cont}>

            <form onSubmit={handleSumbit} className={style.container} autoComplete='off'>

                <div className={style.conecta}>
                    <div className={style.titulo}>

                    </div>
                    <div className={style.cohete}>

                    </div>

                </div>

                <div className={style.containerInputs}>

                    <div>
                        <h1>Iniciar sesión</h1>
                    </div>

                    <div className={style.input_form}>

                        <label className={style.lbl_nombre}>
                            <span className={style.text_nomb}>
                                N° de legajo
                            </span>
                        </label>
                        <input
                            type='text'
                            value={state.legajo}
                            name='legajo'
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className={style.input_form}>
                        <label className={style.lbl_nombre}>
                            <span className={style.text_nomb}>
                                Contraseña
                            </span>
                        </label>
                        <input
                            type='password'
                            value={state.password}
                            name='password'
                            onChange={handleChange}
                            required
                        />
                    </div>



                    <div className={style.containerbtn}>

                        <div className={style.contbtn}>
                            <button className={style.btninicio}>Iniciar Sesion</button>
                        </div>


                    </div>

                </div>

            </form>
        </div>
    )
}

export default Login;