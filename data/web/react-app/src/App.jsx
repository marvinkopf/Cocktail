import logoUrl from "./assets/mixbar.png";
import Home from "./view/Home";
import { Link, Route, Routes } from "react-router-dom";
import CocktailDetails from "./view/CocktailDetails";
import SearchResults from "./view/SearchResults";
import PartyJoin from "./view/PartyJoin";
import PartyCreate from "./view/PartyCreate";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logoUrl} alt="Mixbar" />
        </Link>
        <div className="party-buttons">
          <Button href="/party/create">Party Erstellen</Button>
          <Button href="/party/join">Party Beitreten</Button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<SearchResults />} />
          <Route path="/cocktails/:id" element={<CocktailDetails />} />
          <Route path="/party/create" element={<PartyCreate />} />
          <Route path="/party/join" element={<PartyJoin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
