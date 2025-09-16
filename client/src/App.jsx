import Home from "./components/Home"
import ThemeToggle from "./components/ThemeToggle"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <ThemeToggle />
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App
