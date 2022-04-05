import HomePage from './pages/HomePage';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import Layout from './component/layout/Layout';

  
function App() {
  
  
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
