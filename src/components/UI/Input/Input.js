import React from 'react';
import styles from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    switch (props.elementType) {
        case ('input'): {
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value}
                onChange={(event) => props.changeHandler(event, props.name)} />
                break;
        }
        case ('textarea'): {
            inputElement = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value} 
                                     onChange={(event) => props.changeHandler(event, props.name)} />
            break;
        }
        case ('select'): {
            inputElement = (<select className={styles.InputElement} value={props.value} 
                                    onChange={(event) => props.changeHandler(event, props.name)}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>)
            break;
        }
        default: {
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value} 
                                  onChange={(event) => props.changeHandler(event, props.name)} />
        }
    }

    return (
        <div className={styles.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}


export default input