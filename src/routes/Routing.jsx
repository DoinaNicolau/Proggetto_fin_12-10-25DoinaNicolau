import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/";
import Layout from "../layout/Layout";  
import GamePage from "../pages/Game/";
import GenrePage from "../pages/genre/";
import ErrorPage from "../pages/error";
import SearchPage from "../pages/search";
import RegisterPage from "../pages/register/Register";
import LoginPage from "../pages/login/LoginPage";
import ProfilePage from "../pages/profile/ProfilePage";


export default function Routing(){
    return (
    <BrowserRouter>
      <Routes>
     
        <Route element={<Layout />}>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/games/:genre" element={<GenrePage />} />
          <Route path="/games/:slug/:id" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    );
}