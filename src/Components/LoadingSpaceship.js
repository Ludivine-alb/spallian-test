import React, { useEffect, useState } from "react";
import SpaceshipIcon from "../assets/icons/r2d2.svg"
import "../styles/components/loading-spaceship.css";

const LoadingSpaceship = () => {
    const [loadingPercentage, setLoadingPercentage] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setLoadingPercentage((prevPercentage) =>
          prevPercentage >= 100 ? 0 : prevPercentage + 5
        );
      }, 200);
  
      return () => clearInterval(interval);
    }, []);

    const iconX = loadingPercentage * 3;
  
    return (
      <div className={`loading-container ${loadingPercentage === 100 ? "loaded" : ""}`}>
        <div className="loading-bar-and-percentage">
            <div className="loading-bar" style={{ width: `${loadingPercentage}%` }}>
            <div className="loading-percentage">{loadingPercentage}%</div>
        </div>
       
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          className={`loading-spaceship ${loadingPercentage === 100 ? "loaded" : ""}`}
          style={{ width: "100%", height: "auto" }}
        >
        <image className="icon"
          href={SpaceshipIcon} x={iconX}
        />
        </svg>
      </div>
    );
};

export default LoadingSpaceship;