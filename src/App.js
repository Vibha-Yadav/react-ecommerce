import Home from './pages/Home';
import './App.css';
import ProductList from './features/product/components/ProductList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
      </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
      </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
      </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
      </Protected>,
  },
  {
    path: "/order-success",
    element: <OrderSuccessPage></OrderSuccessPage>
      
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
      
  },
]);

function App() {

  const dispatch = useDispatch();
  const user=useSelector(selectLoggedInUser);

  useEffect(()=>{
      if(user)
        {
          dispatch(fetchItemsByUserIdAsync(user.id))
        }
      
  },[dispatch,user])

  return (
    <div className="App">
      {/* <Home></Home> */}
      {/* <LoginPage></LoginPage> */}
      {/* <SignupPage></SignupPage> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
