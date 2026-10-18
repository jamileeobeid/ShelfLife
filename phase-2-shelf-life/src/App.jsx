import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;