import React from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
};

const useForm = (inputValues) => {
    const [formState, dispatch] = React.useReducer(formReducer, {
        inputs: inputValues,
        isValid: false,
    });

    const inputHandler = React.useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    return [formState, inputHandler];
};

export default useForm;
