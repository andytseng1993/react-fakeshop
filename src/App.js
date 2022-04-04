import axios from 'axios';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import Layout from './component/layout/Layout';

const axiosData = ()=>{
    return axios.get('https://fakestoreapi.com/products')
    .then((res) => {
      console.log(res.data);
      return res.data
    })
    .catch(err=>console.error(err))
  }
  
function App() {
  
  useEffect(()=>{
    axiosData()
  },[])
  
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='store' element={<ShopPage/>}/>
        </Routes>
      </Layout>
      
    </div>
  );
}

export default App;
