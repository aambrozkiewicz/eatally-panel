import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function ConfirmButton(props) {
    const {children, onClick, timeout, ...other} = {timeout: 2, ...props};
    const [clicked, setClicked] = useState(false);
    const [counter, setCounter] = useState(timeout);

    useEffect(() => {
        let interval;
        if (clicked) {
            interval = setInterval(() => {
                setCounter(counter => counter - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [clicked]);

    useEffect(() => {
        if (counter <= 0) {
            setClicked(false);
            setCounter(timeout);
        }
    }, [counter, timeout]);

    function click() {
        if (clicked) {
            onClick && onClick();
            setClicked(false);
        } else {
            setClicked(true);
            setCounter(timeout);
        }
    }
    
    return <Button {...other} onClick={click}>{clicked ? `Na pewno? (${counter})` : children}</Button>;
}

export default ConfirmButton;