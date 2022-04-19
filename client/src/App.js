import './App.css';
import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import FormIngreso from './components/FormIngreso/FormIngreso';
import DetalleIngreso from './components/DetalleIngreso/DetalleIngreso';
import FormSalida from './components/FormSalida/FormSalida';
import DetalleSalida from './components/DetalleSalida/DetalleSalida';
import { Route, Routes, Link  } from 'react-router-dom'
import Panel from './components/Panel/Panel';
import FormUbicaciones from './components/Panel/FormUbicaciones';
import FormProductos from './components/Panel/FormProductos';
import FormulariosPanel from './components/Panel/FormulariosPanel';
import FormUsuario from './components/Panel/FormUsuario';
import Tirar from './components/Tirar/Tirar';
import DetalleTirar from './components/DetalleTirar/DetalleTirar';
import { useSelector } from 'react-redux'
function App() {
  const user =  useSelector(state => state.userLog);
  return (
    <div className='App'>

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Home' element={user.tipo === 2 ? <Home/> : <Login/>}/>
      <Route path='/Ingresar' element={user.tipo === 2 ? <FormIngreso/> : <Login/>}/>
      <Route path='/VerificarIngreso' element={user.tipo === 2 ? <DetalleIngreso/> : <Login/>}/>
      <Route path='/Retirar' element={user.tipo === 2 ? <FormSalida/> : <Login/>}/>
      <Route path='/VerificarRetiro' element={user.tipo === 2 ? <DetalleSalida/> : <Login/>}/>
      <Route path='/Panel' element={user.tipo === 1 ? <Panel/> : <Login/>}/>
      <Route path='/FormUbicaciones' element={user.tipo === 1 ?<FormUbicaciones/>: <Login/>}/>
      <Route path='/FormProductos' element={user.tipo === 1 ?<FormProductos/>: <Login/>}/>
      <Route path='/FormulariosPanel' element={user.tipo === 1 ?<FormulariosPanel/>: <Login/>}/>
      <Route path='/FormularioUsuario' element={user.tipo === 1 ?<FormUsuario/>: <Login/>}/>
     
      <Route path='/VerificarCargaTirar' element={<DetalleTirar/>}/>
      <Route path='/Tirar' element={<Tirar/>}/>

    </Routes>

    </div>

  );
}

export default App;
