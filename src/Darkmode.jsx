import React, { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

function Darkmode() {
    const [isDark, setIsDark] = useState(false);  

    const darkmodeHandle = () => {
        setIsDark(!isDark);
    }

    useEffect(() => {
        document.body.style.backgroundColor = isDark ? "#000" : "#fff";  
        document.body.style.color = isDark ? "#fff" : "#000";
        
        const stockCards = document.querySelectorAll('.stock-card');
        stockCards.forEach(card => {
            card.style.backgroundColor = isDark ? "#000" : "#fff";  
            card.style.color = isDark ? "#fff" : "#000";  
        });
    }, [isDark]);

    return (
        <div>
            <div onClick={darkmodeHandle} className="darkmode-toggle">
                {isDark ? <IoMdSunny size={23} /> : <IoMdMoon size={23} />}
            </div>
        </div>
    );
}

export default Darkmode;
