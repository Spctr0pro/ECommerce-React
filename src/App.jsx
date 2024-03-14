import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { NavBar } from './components/NavBar';
import { ItemListContainer } from './components/ItemListContainer';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="Pronto te mostraremos nuestros productos" />
    </>
  );
}

export default App
