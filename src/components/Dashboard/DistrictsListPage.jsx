import { useState } from 'react'
import './dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import DistrictList from '../../Pages/DistrictList/DistrictList'

function DistrictsListPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <DistrictList />
    </div>
  )
}

export default DistrictsListPage;