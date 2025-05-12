// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Read from './components/Read';
import Write from './components/Write';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/read" element={<Read />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  );
}

export default App;
