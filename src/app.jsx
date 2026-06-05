import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

import Home from '@/pages/Home';
import Games from '@/pages/Games';
import Launcher from '@/pages/Launcher';
import Contact from '@/pages/Contact';
import Ticket from '@/pages/Ticket';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oyunlar" element={<Games />} />
      <Route path="/launcher" element={<Launcher />} />
      <Route path="/iletisim" element={<Contact />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/giris" element={<Login />} />
      <Route path="/profil" element={<Profile />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AppRoutes />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;