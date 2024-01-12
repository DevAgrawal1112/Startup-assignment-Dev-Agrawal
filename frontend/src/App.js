import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Detail } from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}></Route>
        <Route path={`/:userId`} element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
