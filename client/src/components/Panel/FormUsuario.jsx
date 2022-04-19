import React,{useState, useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { postUsuario } from "../../redux/action";
import style from "./Forms.module.css";
import Nav from "./Nav";
export default function FormUsuario(){
    const dispatch = useDispatch();
    const mensaje = useSelector(state => state.mensaje);
    const [state, setState] = useState({
        nombre: '',
        apellido: '',
        legajo: '',
        password: '',
        tipo: 2,
    });
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postUsuario(state));
    }

/*     useEffect(() => {
        if(mensaje){
            alert('mensaje')
        }
    }, [mensaje]) */



    return(
       <div className={style.panel} >
              <Nav />
        <div className={style.contenedorFormUser}>
            <h1>Agregar Usuario</h1>
            <form className={style.formUsuario}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={state.nombre} onChange={(e) => { handleChange(e) }} />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" value={state.apellido} onChange={(e) => { handleChange(e) }} />
                </label>
                <label>
                    Legajo:
                    <input type="text" name="legajo" value={state.legajo} onChange={(e) => { handleChange(e) }} />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" value={state.password} onChange={(e) => { handleChange(e) }} />
                </label>
                
            </form>
            <button className={style.botonn} onClick={handleSubmit}>Agregar</button>
        </div>
        </div>
    )    
}