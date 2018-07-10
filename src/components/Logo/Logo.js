import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}> 
        {/* <img src="../../assets/images/butger-logo.png"/> */}
        <img src={BurgerLogo} alt ="my Burger"/>

    </div>
);

export default logo;