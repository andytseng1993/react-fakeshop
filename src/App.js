import HomePage from './pages/HomePage';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import Layout from './component/layout/Layout';
import ProductDetail from './component/shopPage/ProductDetail';

  
function App() {
  
  
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='shop' element={<ShopPage/>}/>
          <Route path='product/:productId' element={<ProductDetail/>}/>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Layout>
      <Outlet/>
    </div>
  );
}

export default App;
