import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import WebSeriesList from './pages/WebSeriesList'
import AdminForm from './pages/AdminForm'
import AdminPanel from './pages/AdminPanel'
import WebSeriesForm from './pages/WebSeriesForm'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/watch' element={<WebSeriesList/>} />
        <Route path='/admin' element={<AdminForm/>} />
        <Route path='/admin-profile' element={<AdminPanel/>} /> 
        <Route path='/add-series' element={<WebSeriesForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
