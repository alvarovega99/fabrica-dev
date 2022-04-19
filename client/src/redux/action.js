import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const VERIFICAR = 'VERIFICAR'
export const GET_PRODUCTOS = 'GET_PRODUCTOS';
export const GET_UBICACIONES = 'GET_UBICACIONES';
export const GET_LOTE = 'GET_LOTE';
export const GET_OPERACIONES = 'GET_OPERACIONES';
export const GET_TOTAL_GALLETA = 'GET_TOTAL_GALLETA';
export const GET_TOTAL_POLVO = 'GET_TOTAL_POLVO';
export const GET_TOTAL_GALLETA_ID = 'GET_TOTAL_GALLETA_ID';
export const GET_TOTAL_POLVO_ID = 'GET_TOTAL_POLVO_ID';
export const POST_UBICACIONES = 'POST_UBICACIONES';
export const POST_PRODUCTOS = 'POST_PRODUCTOS';
export const POST_USUARIOS = 'POST_USUARIOS';
export const POST_OPERACIONES_INGRESO = 'POST_OPERACIONES_INGRESO';
export const POST_SALIDA  = 'POST_SALIDA';
export const SET_MENSAJE = 'SET_MENSAJE';
export const ELIMINAR_UBICACION = 'ELIMINAR_UBICACION';
export const ELIMINAR_PRODUCTO = 'ELIMINAR_PRODUCTO';
// Language: javascript


export function loginUser(payload) {
    return async (dispatch) => {
        try {
            var json = await axios.post('http://35.190.137.182/apiusuarios/loginUser', payload);
            return dispatch({
                type: LOGIN_USER,
                payload: json.data,
            });
        }
        catch (error) {
            return dispatch({
                type: LOGIN_USER,
                payload: "400",
            });
        }
    };
}
export function setMensaje() {
    return {

        type: SET_MENSAJE,
        payload: 'data',

    }

}
export function eliminarProductos(data) {
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apiproductos/delete', data);
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: res.data
        })
  }
}
export function eliminarUbicacion(data) {
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apiubicaciones/delete', data);
        dispatch({
            type: ELIMINAR_UBICACION,
            payload: res.data
        })
  }
}
export function verificar(data) {
    return {

        type: VERIFICAR,
        payload: data,

    }

}
export function ingresarOperacion(data) {
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apioperaciones', data);
        dispatch({
            type: POST_OPERACIONES_INGRESO,
            payload: res.data
        })
  }
}

export function buscarCodigo(data) {
    return async function (dispatch) {
        const res =  await axios.get(`http://35.190.137.182/apioperaciones/${data.codigoCarga}`);
        dispatch({
            type: GET_LOTE,
            payload: res.data
        })
  }
}

export function retirarLote(data) {

}



///// traer la info para los formularios

export function getProductos() {
    return async function (dispatch) {
        const res =  await axios.get('http://35.190.137.182/apiproductos');
        dispatch({
            type: GET_PRODUCTOS,
            payload: res.data
        })
  }
}

export function getUbicaciones() {
    return async function (dispatch) {
        const res =  await axios.get('http://35.190.137.182/apiubicaciones');
        dispatch({
            type: GET_UBICACIONES,
            payload: res.data
        })
  }
}

export function getOperaciones() {
    return async function (dispatch) {
        const res =  await axios.get('http://35.190.137.182/apioperaciones');
        dispatch({
            type: GET_OPERACIONES,
            payload: res.data
        })
  }
}

export function getTotalGalleta() {
    return async function (dispatch) {
        const res =  await axios.get('http://35.190.137.182/apioperaciones/galleta/total');
        dispatch({
            type: GET_TOTAL_GALLETA,
            payload: res.data
        })
  }
}

export function getTotalPolvo() {
    return async function (dispatch) {
        const res =  await axios.get('http://35.190.137.182/apioperaciones/polvo/total');
        dispatch({
            type: GET_TOTAL_POLVO,
            payload: res.data
        })
  }
}


export function getTotalGalletaID(id) {
    return async function (dispatch) {
        const res =  await axios.get(`http://35.190.137.182/apioperaciones/galleta/id/${id}`);
        dispatch({
            type: GET_TOTAL_GALLETA_ID,
            payload: res.data
        })
  }
}


export function getTotalPolvoID(id) {
    return async function (dispatch) {
        const res =  await axios.get(`http://35.190.137.182/apioperaciones/polvo/id/${id}`);
        dispatch({
            type: GET_TOTAL_POLVO_ID,
            payload: res.data
        })
  }
}

export function postUbicaciones(name){
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apiubicaciones', name);
        dispatch({
            type: POST_UBICACIONES,
            payload: res.data
        })
  }
}
export function postProductos(name){
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apiproductos', name);
        dispatch({
            type: POST_PRODUCTOS,
            payload: res.data
        })
  }
}

export function postUsuario(name){
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apiusuarios', name);
        dispatch({
            type: POST_USUARIOS,
            payload: res.data
        })
  }
}

export function postSalida(obj){
    return async function (dispatch) {
        const res =  await axios.post('http://35.190.137.182/apioperaciones/status', obj);
        dispatch({
            type: POST_SALIDA,
            payload: res.data
        })
  }
}