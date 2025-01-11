import './App.css'
import Login from './pages/Login/Login'
import firebaseConfig from "./components/Authentication/firebase.config";
import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from './pages/Home/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/Login' element={<Login/>} />
      <Route path='/Home' element={<Home/>} />
      <Route path='*' element={<Login/>} />
    </Route>
  )
);
function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
