import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavSide from './component/nav/NavSide';
import Dashboard from './component/screen/dashboard/Dashboard';
import Drivers from './component/screen/drivers/Drivers';
import Orders from './component/screen/orders/Orders';
import Restaurants from './component/screen/restaurants/Restaurants';
import Products from './component/screen/products/Products';
import { UserProvider } from './component/context/UserProvider';
import { Provider } from 'react-redux';
import store from './component/redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <div className="flex">
          <NavSide />
            <div className="grow">
              <Routes >
                <Route path='/' element={<Navigate to="/products" />} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/orders' element={<Orders/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/restaurants' element={<Restaurants/>} />
                <Route path='/drivers' element={<Drivers/>} />
              </Routes>
            </div>
            </div>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
