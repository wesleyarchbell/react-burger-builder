import React from 'react';

import menuIcon from '../../../../assets/images/menu-icon.png';
import styles from './Menu.module.css';

const menu = (props) => {
    return (
        <React.Fragment>
            <img onClick={props.click}
                 className={styles.Menu} src={menuIcon} alt="Menu"/>

        </React.Fragment>
    );
};

export default menu;
