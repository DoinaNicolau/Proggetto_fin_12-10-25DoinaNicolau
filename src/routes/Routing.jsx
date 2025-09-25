import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";  


export function Routing(){
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter> 
    );
}