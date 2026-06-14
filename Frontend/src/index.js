import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import './assets/styles/bootstrap-custom.css';
import './assets/styles/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route index={true} path='/' element={<HomeScreen />} />

      <Route path='/product/:id' element={<ProductScreen />} />

      <Route path='/cart' element={<CartScreen />} />

      <Route path='/login' element={<LoginScreen />} />

      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin' element={<AdminScreen />} />
        <Route path='/admin/products' element={<ProductListScreen />} />
        <Route path='/admin/orders' element={<OrderListScreen />} />
        <Route path='/admin/users' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      </Route>

    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();