import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../Pages/UserRegister'
import UserLogin from '../Pages/UserLogin'
import FoodPartnerRegister from '../Pages/FoodPartnerRegister'
import FoodPartnerLogin from '../Pages/FoodPartnerLogin'
import Home from '../Pages/Home'
import Seeallfoods from '../Pages/Seeallfoods'
import Createfood from '../Pages/Createfood'
import FoodPartnerStore from '../Pages/FoodPartnerStore'
const Approutes = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
        <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
        <Route path='/see-all-foods' element={<Seeallfoods />} />
        <Route path='/create-food' element={<Createfood />} />
        <Route path='/food-partner/:Id' element={<FoodPartnerStore />} />
      </Routes>
    </Router>
  )
}

export default Approutes
