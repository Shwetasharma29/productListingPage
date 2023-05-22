import {BrowserRouter, Routes, Route } from "react-router-dom"
import ProductListingPage from "./ProductListingPage";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<ProductListingPage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
