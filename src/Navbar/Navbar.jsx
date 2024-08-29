import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from './Home'
import Calculators from "./Calculators";
import StockAnalysis from "./StockAnalysis";
import { FaBars, FaTimes } from "react-icons/fa";
import '../CSS/Navbar.css'

import StockReturn from '../Calculators/StockReturn';
import DividendReinvestment from '../Calculators/DividendReinvestment';
import DividendYieldCalculator from '../Calculators/DividendYieldCalculator';
import PortfolioPerformanceTracker from "../Calculators/PortfolioPerformanceTracker";
import StockInfo from "../StockAnalysis/StockInfo";
import ROICalculator from "../Calculators/ROICalculator";
import CompoundInterestCalculator from "../Calculators/CompoundInterestCalculator";
import HistoryData from "./HistoryData";

import Darkmode from "../Darkmode";
import ShareButton from "../ShareButton";

function Navbar(){
    const [open, setOpen] = useState(false);
  

    const toggle = () => {
        setOpen(!open);
    }

    const closeMenu = () => {
        setOpen(false);
    }

    return(
        <>
            <nav>
                <h3><Link to={'/'} onClick={closeMenu}>StockandFin</Link></h3>
                <div className="menu" onClick={toggle}>
                    {open ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`links ${open ? "active" : ""}`}>
                    <li><Link to={"/"} className="link" onClick={closeMenu}>Home</Link></li>
                    <li><Link to={"/stockanalysis"} className="link" onClick={closeMenu}>StockAnalysis</Link></li>
                    <li><Link to={"/calculators"} className="link" onClick={closeMenu}>Calculators</Link></li>
                    <li><Link to={"/historical-data-download"} className="link" onClick={closeMenu}>Historical Data</Link></li>
                </ul>
                <Darkmode />
                <ShareButton />
            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/stockanalysis" element={<StockAnalysis />}/>
                <Route path="/calculators" element={<Calculators />}/>
                <Route path="/historical-data-download" element={<HistoryData />}/>

                <Route path="/stock-return-calculator" element={<StockReturn />} />
                <Route path="/dividend-reinvestment-calculator" element={<DividendReinvestment />} />
                <Route path="/dividend-yield-calculator" element={<DividendYieldCalculator />} />
                <Route path="/portfolio-performance-tracker" element={<PortfolioPerformanceTracker />} />
                <Route path={`/stockinfo/:symbol`}element={<StockInfo/>} />
                <Route path={`/roi-calculator`}element={<ROICalculator  />} />
                <Route path={`/compound-interest-calculator`}element={<CompoundInterestCalculator  />} />
            </Routes>
        </>
    )
}

export default Navbar;
