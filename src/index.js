import { useEffect, useState, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Spinner from './mod/common/SpinnerCom'

const root = ReactDOM.createRoot(document.getElementById('root'))

const Index = () => {
  const [configLoaded, setConfigLoaded] = useState(false)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const config = await response.json()
        window.infoConfig = config
        setConfigLoaded(true)
      } catch (error) {
        console.error('Failed to load config:', error)
      }
    }
    loadConfig()
  }, [])
  if (!configLoaded) {
    return <Spinner />
  }
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}
root.render(<Index />)
