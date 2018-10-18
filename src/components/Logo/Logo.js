import React from 'react';
import styles from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="Logo" style={{height: props.height}} />
        </div>
    );
};

export default logo;
