import Login from './pages/log-in'
import Home from './pages/home'

type AppProps = {
  page?: 'home'
}

function App({ page }: AppProps) {
  if (page === 'home') {
    return <Home />
  }
  return <Login />
}

export default App
