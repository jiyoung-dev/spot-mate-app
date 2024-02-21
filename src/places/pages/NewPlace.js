import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element="input"
                type="text"
                label="Title"
                validators={[]}
                errorText="Please enter a valid title."
            />
            <Input
                element="textarea"
                type="text"
                label="Description"
                validators={[]}
                errorText="Please enter a valid description."
            />
        </form>
    );
};

export default NewPlace;
