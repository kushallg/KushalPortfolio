import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import Writing from '@/pages/Writing';
import BlogPost from '@/pages/BlogPost';
import '@/components/Navigation.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
