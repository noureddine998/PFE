import { useState } from 'react'
import './dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import CandidatesList from '../../Pages/CandidatesList/CandidatesList'

function CandidatesListPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <CandidatesList />
    </div>
  )
}

export default CandidatesListPage;