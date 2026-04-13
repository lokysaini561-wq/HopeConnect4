import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./admin/Register";
import Login from "./admin/Login";
import Orphanage from "./admin/Orphanage";
// import Layout from "./components/Layout";
import Home from "./Home";
import Contact  from "./Contact";
import Location from "./Location";
import Search from "./Search";
import DetailPage from "./DetailPage";
import Donation from "./Donation"
import ImpactPage from "./ImpactPage";
import Donate from "./admin/Donate";
import Admin from "./superadmin/Admin";
import SuperOrphanage from "./superadmin/SuperOrphanage";
import DonateSuper from "./superadmin/DonateSuper";
import ContactDetails from "./superadmin/ContactDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orphanage" element={<Orphanage />} />
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/location" element={<Location />}/>
        <Route path="/search" element={<Search />} />
        <Route path="/view/:id" element={<DetailPage />} />
        <Route path="/donate/:id" element={<Donation />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/donates/:id" element={<Donate />} />
        {/* SuperAdmin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/allorphanage" element={<SuperOrphanage />} />
        <Route path="/donatesuper/:id" element={<DonateSuper />} />
        <Route path="/contactview" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
}
export default App;