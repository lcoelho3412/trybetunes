import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import Album from "./Pages/Album";
import Favorites from "./Pages/Favorites";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import NotFound from "./Pages/NotFound";

class App extends React.Component {
  render() {
    return (
      <div>
        <NextUIProvider>
          
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/album/:id" element={<Album />} />
              <Route exact path="/favorites" element={<Favorites />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/profile/edit" element={<ProfileEdit />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          
        </NextUIProvider>
      </div>
    );
  }
}

export default App;
