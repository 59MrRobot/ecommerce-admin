import React, { useEffect } from 'react';
import './App.scss';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { 
  Route,
  Outlet,
  Routes,
  useNavigate
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useSelector } from 'react-redux';
import { ProductList } from './pages/ProductList';

function App() {
  const user: User = useSelector((state: any) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [navigate, user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newProduct" element={<NewProduct />} /> */}
        </Route>

        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

const Root = () => {
  return (
    <>
      <Topbar />

      <div className="container">
        <Sidebar />

        <Outlet />
      </div>
    </>
  )
}

export default App;
