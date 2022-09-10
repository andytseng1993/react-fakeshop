import { useRef } from "react";
import HomePage from './pages/HomePage';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './component/layout/Layout';
import ProductDetail from './component/shopPage/ProductDetail';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Profile from './component/logIn/Profile';
import ProtectedRoute from './component/layout/ProtectedRoute';
import Cart from './pages/Cart';
import FavoritePage from "./pages/FavoritePage";

  
function App() {
  const myRef = useRef(null)
  function scrollToProduct(){
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Layout scroll={scrollToProduct}>
          <Routes>
            <Route path='/' element={<HomePage refProp={myRef}/>} exact/>
            <Route path='product/:productId' element={<ProductDetail/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='profile' element={<Profile/>}/>
              <Route path='favorite' element={<FavoritePage/>}/>
            </Route>
            <Route path='cart' element={<Cart/>}/>
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
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
