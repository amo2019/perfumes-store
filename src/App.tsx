import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import  product from "./perfumes";

import ProductList from './ProductList';
import  Header  from "./Header";

function App() {
  return (
    <>
  <Router>
      <div className="App">
      <Header />
      <Routes> <Route path="/" element={<ProductList/>} />
      </Routes>
    </div>
  </Router>
</>
  );
}

export default App;
