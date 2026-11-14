import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";
import MyShelves from "./pages/MyShelves";
import ShelfStatistics from "./pages/ShelfStatistics";
import ReadingGoal from "./pages/ReadingGoal";
import { BookProvider } from "./state/BookContext";

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Discover />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/shelves" element={<MyShelves />} />
            <Route path="/statistics" element={<ShelfStatistics />} />
            <Route path="/reading-goal" element={<ReadingGoal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;