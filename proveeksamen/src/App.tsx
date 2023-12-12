import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './Test';
import Layout from './Layout';
import Create from './Create';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<></>} />
            <Route path="test" element={<Test />} />
            <Route path="ticket/create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App