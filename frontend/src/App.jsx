import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import FoundItemsPage from './pages/FoundItemsPage'
import ItemDetailsPage from './pages/ItemDetailsPage'
import ReportFoundItemPage from './pages/ReportFoundItemPage'
import ClaimItemPage from './pages/ClaimItemPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/found-items" element={<FoundItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/report" element={<ReportFoundItemPage />} />
          <Route path="/claim/:id" element={<ClaimItemPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
