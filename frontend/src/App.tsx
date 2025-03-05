import Authorization from './featuries/components/pages/Authorization/Authorization/Authorization';
import core from './core/core';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { checkAuthToken } from './utils/authorizationUtils/checkAuthToken';

const ProtectedRoute: React.FC = () => {
  if (!checkAuthToken()) {
    return <Navigate to={core.frontendEndpoints.login} />;
  }

  return <Outlet />;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={core.frontendEndpoints.login} element={<Authorization />} />
        <Route path={core.frontendEndpoints.home} element={<ProtectedRoute />}>
          {/* <Route index element={<Home />} /> */}
          {/* Ваши защищенные маршруты */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
