import React, { useEffect } from 'react';
import './App.scss';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import {
  Outlet,
  useNavigate,
  Routes,
  Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useSelector } from 'react-redux';
import { ProductList } from './pages/ProductList';
import { Error } from './pages/Error';
import { Product } from './pages/Product';
import { NewProduct } from './pages/NewProduct';
import { UserList } from './pages/UserList';
import { User } from './pages/User';
import { NewUser } from './pages/NewUser';

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
        <Route path="/" element={<Root />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<Error />} />
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
