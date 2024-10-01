
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Page/Home'

function App() {
  
  const shanto = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home/>}/>
      </Route>
    )
  )

  return (
    <>

    <RouterProvider router={shanto}/>
      
    </>
  )
}

export default App
