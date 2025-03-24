import Authorization from './featuries/components/pages/Authorization/Authorization/Authorization';
import core from './core/core';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { checkAuthToken } from './utils/authorizationUtils/checkAuthToken';
import Home from './featuries/components/pages/Home/Home';
import Profile from './featuries/components/pages/profile/Profile';
import ConfirmCode from './featuries/components/pages/confirmCode/ConfirmCode';

const ProtectedRoute: React.FC = () => {
  if (!checkAuthToken()) {
    return <Navigate to={core.frontendEndpoints.login} />;
  }

  return <Outlet />;
};

function App() {

  return (
    <BrowserRouter 
      future={{
        v7_relativeSplatPath: true, // Включаем флаг для разрешения предупреждения
        v7_startTransition: true
      }}
    >
      <Routes>
        <Route path={'/verify/:id'} element={<ConfirmCode/>} />
        <Route path={core.frontendEndpoints.login} element={<Authorization />} />
        <Route path={core.frontendEndpoints.home} element={<ProtectedRoute />}> {/* прод */}
        {/* <Route path={core.frontendEndpoints.home} element={<ProtectedRoute />}> тест без поднятия /бека */}
          <Route index element={<Home/>} />
          <Route path={core.frontendEndpoints.profile} element={<Profile/>}/>
          {/* Ваши защищенные маршруты */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
