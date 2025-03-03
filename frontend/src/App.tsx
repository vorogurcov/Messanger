import './App.css';
import Authorization from './featuries/components/pages/Authorization/Authorization/Authorization';

function App() {
  return (
    <div>
      {localStorage.getItem("access_token") ? <></> 
      : <Authorization/>
      }
    </div>
  );
}

export default App;
