import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo' ;

function App() {
  //console.dir(Todo());
  return (
    <div className="App d-flex justify-content-center">
      
     <Router>
      <Routes>
         <Route path='/:search' element={<Todo/>} /> 
         <Route  path='/' element={<Todo/>} /> 
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
