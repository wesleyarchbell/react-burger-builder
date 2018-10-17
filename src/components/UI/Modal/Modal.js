import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './Modal.module.css';

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default modal;