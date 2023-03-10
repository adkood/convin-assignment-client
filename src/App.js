import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBucket from './components/AddBucket';

import {Routes , Route} from 'react-router-dom';
import BucketInside from './components/BucketInside';
import AddCard from './components/AddCard';
import CardInside from './components/CardInside';
import History from './components/History';
import MoveTo from './components/MoveTo';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <CardInside></CardInside>
      <BucketInside></BucketInside>
      <MoveTo></MoveTo>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/addBucket' element={<AddBucket/>}/>
        <Route exact path='/addCard' element={<AddCard/>}/>
        <Route exact path='/yourHistory' element={<History/>}></Route>
      </Routes>
    </>
  );
}

export default App;
