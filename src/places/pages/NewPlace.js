import React from 'react';

import useForm from '../../shared/hooks/useForm';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './NewPlace.css';

const NewPlace = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        },
        address: {
            value: '',
            isValid: false,
        },
    });

    const placeSubmitHandler = (event) => {
        event.preventDefault();

        // TO-DO: form data 서버에 전송
        console.log(formState.inputs);
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address." // TO-DO: 장소 validation은 서버에서 처리
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
