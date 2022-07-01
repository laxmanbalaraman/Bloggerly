import Home from "./pages/home/Home";
import TopBar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/register"
            element={user ? <Home /> : <Register />}
          />
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
          <Route exact path="/write" element={user ? <Write /> : <Login />} />
          <Route exact path="/post/:postId" element={<Single />} />
          <Route
            exact
            path="/settings"
            element={user ? <Settings /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
