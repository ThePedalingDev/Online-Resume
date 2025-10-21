import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Projects } from '@/pages/Projects';
import { Contact } from '@/pages/Contact';
import { Skills } from '@/pages/Skills';
import { Social } from '@/pages/Social';
import { Docs } from '@/pages/Docs';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/social" element={<Social />} />
            <Route path="/docs" element={<Docs />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
