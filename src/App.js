import './App.css';
import { useRef } from "react";
import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { UserDataContextProvider } from "./context/UserDataContext";
import Layout from './component/layout/Layout';
import HomePage from './pages/HomePage';
import ProductDetail from './component/shopPage/ProductDetail';
import ProtectedRoute from './component/layout/ProtectedRoute';
import AccountPage from './pages/AccountPage';
import FavoritePage from "./pages/FavoritePage";
import Cart from './pages/Cart';
import Profile from './component/account/Profile';
import Address from './component/address/Address';
import AccountLists from './component/account/AccountLists';
import useWrapper from './component/address/AddressWrapper';

  
function App() {
  const myRef = useRef(null)
  function scrollToProduct(){
        window.scrollTo({ 
        top:myRef.current.offsetTop-50,
        behavior: 'smooth'
      })
  }
  const GoogleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
  const [scriptLoaded,AdressAuto] = useWrapper(GoogleMapsUrl,Address)
  return (
    <div className="App">
      <UserAuthContextProvider>
        <UserDataContextProvider>
        <Layout scroll={scrollToProduct}>
          <Routes>
            <Route path='/' element={<HomePage refProp={myRef}/>} exact/>
            <Route path='product/:productId' element={<ProductDetail/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='account' element={<AccountPage/>} >
                <Route index element={<AccountLists />} />
                <Route path='profile' element={<Profile />} />
                <Route path='address' element={<AdressAuto/>} />
                <Route path='favorites' element={<FavoritePage/>}/>
              </Route>
            </Route>
            <Route path='cart' element={<Cart/>}/>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" , marginTop: 100}}>
                  <h1>There's nothing here!</h1>
                </main>
              }
            />
          </Routes>
        </Layout>
        </UserDataContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
