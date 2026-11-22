import Header from './Header'
import Footer from './Footer'

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  )
}
