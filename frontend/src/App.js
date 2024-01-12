import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useParams} from "react-router-dom";
import { Layout } from './components/Layout';
import { Detail } from './components/Detail';

function App() {
  const userId = useParams();
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
