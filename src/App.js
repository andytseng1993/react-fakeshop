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
import AddressList from './component/address/AddressLists';
import AddressEdit from './component/address/AddressEdit';
import CheckOutPage from './pages/CheckOutPage';

  
function App() {
  const myRef = useRef(null)
  function scrollToProduct(){
        window.scrollTo({ 
        top:myRef.current.offsetTop-50,
        behavior: 'smooth'
      })
  }
  const GoogleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
  const AdressAuto = useWrapper(GoogleMapsUrl,Address)
  const AdressEditAuto = useWrapper(GoogleMapsUrl,AddressEdit)
  const CheckoutAddress = useWrapper(GoogleMapsUrl,CheckOutPage)
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
                <Route path='home' element={<AccountLists />} />
                <Route path='profile' element={<Profile />} />
                <Route path='addresses' element={<AddressList/>}/> 
                <Route path='addresses/newaddress' element={<AdressAuto/>} />
                <Route path='addresses/editaddress/:productKey' element={<AdressEditAuto/>} />
                <Route path='favorites' element={<FavoritePage/>}/>
              </Route>
            </Route>
            <Route path='cart' element={<Cart/>}/>
            <Route path='checkout' element={<CheckoutAddress/>}/>
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
