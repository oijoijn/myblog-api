import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
