import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import LoadingSpaceship from "./LoadingSpaceship";
import burgerIcon from '../assets/icons/death-star.svg';
import "../styles/components/navbar.css"

const Navbar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [navbarData, setNavbarData] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const fetchContent = async () => {
        try {
          const actualUrl = window.location.href
          const response = await axios.get(actualUrl);
          const responseData = response.data; 
          setNavbarData(responseData);
        } catch (error) {
         console.error("Error fetching content:", error);
  }
};

    useEffect(() => {
        fetchContent();
        setIsLoading(false);
    }, []);

    return (
        <>
            {!isLoading && (
        <div className="navbar" >
          <div className="navbar-logo">
            <img src={burgerIcon} alt="Logo" />
          </div>
          <button className={`burger-menu ${mobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </button>
          <ul className={`navbar-links ${mobileMenuOpen ? "mobile-links" : ""}`}>
            <li>
              <Link to="/">Characters</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/planets">Planets</Link>
            </li>
            <li>
              <Link to="/starships">Starships</Link>
            </li>
          </ul>
          <div className={`search-bar ${mobileMenuOpen ? "mobile-search-hide" : ""}`}>
          <SearchComponent />
          </div>
        </div>
            )}
        </>
      );
    };

export default Navbar;