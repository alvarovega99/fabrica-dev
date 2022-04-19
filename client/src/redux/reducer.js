import { LOGIN_USER, VERIFICAR, GET_PRODUCTOS, GET_UBICACIONES, GET_LOTE, GET_TOTAL_GALLETA, GET_TOTAL_POLVO_ID, GET_TOTAL_POLVO, GET_OPERACIONES ,GET_TOTAL_GALLETA_ID, POST_USUARIOS, POST_OPERACIONES_INGRESO, POST_SALIDA,SET_MENSAJE, ELIMINAR_PRODUCTO, ELIMINAR_UBICACION } from "./action";


const inicialState = {
    userLog: [],
    verifica:[],
    productos:[],
    ubicaciones:[],
    totalGalleta:[],
    totalPolvo:[],
    totalBuscado:[],
    totalBuscadoPolvo:[],
    operaciones:[],
    mensaje:''
};

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userLog: action.payload.user,
                mensaje: action.payload.message
            };
        case SET_MENSAJE:
            return {
                ...state,
                mensaje: ''
            };
        case VERIFICAR:
            return{
                ...state,
                verifica: action.payload
            }
        case GET_PRODUCTOS:
            return{
                ...state,
                productos: action.payload
            }
        case GET_UBICACIONES:
            return{
                ...state,
                ubicaciones: action.payload
            }
        case GET_LOTE:
            return{
                ...state,
                verifica: action.payload
            }
        case GET_TOTAL_GALLETA:
            return{
                ...state,
                totalGalleta: action.payload
            }
        case GET_TOTAL_POLVO:
            return{
                ...state,
                totalPolvo: action.payload
            }
        case GET_TOTAL_POLVO_ID:
            return{
                ...state,
                totalBuscadoPolvo: action.payload
            }
        case GET_TOTAL_GALLETA_ID:
            return{
                ...state,
                totalBuscado: action.payload
            }
        case GET_OPERACIONES:
            return{
                ...state,
                operaciones: action.payload
            }
        case POST_USUARIOS:
            return{
                ...state,
                mensaje: action.payload
            }
        case POST_OPERACIONES_INGRESO:
            return{
                ...state,
                mensaje: action.payload
            }
        case POST_SALIDA:
            return{
                ...state,
                mensaje: action.payload
            }
        case ELIMINAR_UBICACION:
            return{
                ...state,
                mensaje: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
        return state

    }
}

export default rootReducer;