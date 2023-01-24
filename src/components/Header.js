import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/header.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";



const Header = () => {

  // function MyComponent() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
  
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    // return <div style={{ width, height }}>The screen size is {width}px by {height}px</div>;
// }

  let navigate = useNavigate();
  const backHandler = ()=>{
    navigate(-1)
  }
  const currentURL = useLocation()
  return (
    <Box bgcolor={"primary.light"} className="header">
      {(width/height<0.75) && currentURL.pathname!=="/" ?
      <ArrowBackIcon style={{paddingRight: 10}} onClick={()=>backHandler()}/>:null
    }
      Order Cycle
    </Box>
  );
};

export default Header;
