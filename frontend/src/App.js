import Home from './components/Home';
import Sobre from './components/Sobre';
import Cadastros from './components/Cadastros';
import { BrowserRouter, Link, Routes, Route, } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <h1>Home page React</h1>
      <BrowserRouter>

        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/alunos">Cadastro de Alunos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/alunos" element={<Cadastros />}></Route>
          <Route path="/sobre" element={<Sobre />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
