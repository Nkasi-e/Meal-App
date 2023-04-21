import './App.css';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useGlobalContext } from './store';

function App() {
  const { showModal, favourites } = useGlobalContext();
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
