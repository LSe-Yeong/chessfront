import { Routes, Route,Router } from "react-router-dom";
import './App.css';
import ChessBoard from "./game/page/ChessBoard";
import MainPage from "./MainPage";
import GamePage from "./game/page/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage></MainPage>}></Route>
      <Route path="/chessboard/*" element={<GamePage></GamePage>}></Route>
    </Routes>
  );
}

export default App;
