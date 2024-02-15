import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}></header>
            <form>Content Here!!!</form>
        </div>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById('modal-hook')
    );
};

const Modal = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            {props.show && <ModalOverlay {...props} />}
        </>
    );
};

export default Modal;
