
import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'

function App() {
  const [exp, setExp] = useState(0);
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [basePay, setBasePay] = useState(0);
  return (
    <>
      <Navbar
        setExp={setExp}
        setLocation={setLocation}
        setCompanyName={setCompanyName}
        setBasePay={setBasePay}
      />
      <Home exp={exp} location={location} companyName={companyName} basePay={basePay} />
    </>
  )
}

export default App
