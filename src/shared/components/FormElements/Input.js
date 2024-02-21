import React from 'react';

import './Input.css';

// reducer 함수 작성
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true,
            };
        default:
            return state;
    }
};

const Input = (props) => {
    // useReducer를 사용하여 상태와 상태를 변경하는 함수를 생성
    const [inputState, dispatch] = React.useReducer(inputReducer, {
        value: '',
        isValid: false,
    });

    const changeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
        });
    };

    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value}
            />
        );

    return (
        <div
            className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
