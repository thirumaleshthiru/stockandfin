import {Link } from "react-router-dom";
import '../CSS/Calculators.css'

function Calculators(){

    
    return(
        <>
        <main>
        <h1>Calculators</h1>
            <section className="calculators">
            
           
                <div className="calculator">
                    <h2>Stock Return Calculator</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/stock-return-calculator"} className="button-link"> Try Now</Link>                
                </div>

                <div className="calculator">
                    <h2>Dividend Reinvestment Calculator</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/dividend-reinvestment-calculator"} className="button-link"> Try Now</Link>                
                </div>
                
                <div className="calculator">
                    <h2>Dividend Yield Calculator</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/dividend-yield-calculator"} className="button-link"> Try Now</Link>                
                </div>

                <div className="calculator">
                    <h2>Portfolio Performance Tracker</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/portfolio-performance-tracker"} className="button-link"> Try Now</Link>                
                </div>
               
                <div className="calculator">
                    <h2>Return On Investment (ROI Calculator)</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/roi-calculator"} className="button-link"> Try Now</Link>                
                </div>

                <div className="calculator">
                    <h2>Compound Interest Calculator</h2>
                    <p>User our free Stock Return Calculator tool</p>
                    <Link to={"/compound-interest-calculator"} className="button-link"> Try Now</Link>                
                </div>

              
            </section>
        
     
        </main>
       
        </>  
    )
}
 

export default Calculators;