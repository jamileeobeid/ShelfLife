import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";
import MyShelves from "./pages/MyShelves";
import ShelfStatistics from "./pages/ShelfStatistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Discover />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/shelves" element={<MyShelves />} />
          <Route path="/statistics" element={<ShelfStatistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
