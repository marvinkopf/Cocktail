import logoUrl from "./assets/mixbar.png";
import Home from "./view/Home";
import { Link, Route, Routes } from "react-router-dom";
import CocktailDetails from "./view/CocktailDetails";
import CocktailList from "./view/CocktailList";
import PartyJoin from "./view/PartyJoin";
import PartyCreate from "./view/PartyCreate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logoUrl} alt="Mixbar" />
        </Link>
        <Link className="signin-button" to="/signin">
          Sign In
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<CocktailList />} />
          <Route path="/cocktails/:id" element={<CocktailDetails />} />
          <Route path="/party/create" element={<PartyCreate />} />
          <Route path="/party/join" element={<PartyJoin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
