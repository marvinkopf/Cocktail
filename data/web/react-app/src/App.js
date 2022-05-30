import RoomComponent from "./RoomComponent"
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/room/:id" element={<RoomComponent />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;