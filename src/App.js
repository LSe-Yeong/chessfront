import { Routes, Route,Router } from "react-router-dom";
import './App.css';
import ChessBoard from "./page/chess/ChessBoard";
import MainPage from "./page/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage></MainPage>}></Route>
      <Route path="/chessboard" element={<ChessBoard></ChessBoard>}></Route>
    </Routes>
  );
}

export default App;
