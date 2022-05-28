import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import MenuBar from './components/MenuBar';
import TransBox from './components/TransBox';

function App() {
  return (
    <>
  <MenuBar/>
  <TransBox/>
  <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
