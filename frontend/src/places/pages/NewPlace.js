import React from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '../../shared/hooks/useForm';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { AuthContext } from 'src/shared/context/auth-context';
import './NewPlace.css';

const NewPlace = () => {
    const history = useHistory();
    const auth = React.useContext(AuthContext);

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

    const placeSubmitHandler = async (event) => {
        event.preventDefault();

        console.log(auth); // auth 객체 확인
        try {
            const response = await fetch(
                'http://localhost:5500/api/places/new',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                        title: formState.inputs.title.value,
                        description: formState.inputs.description.value,
                        address: formState.inputs.address.value,
                        creator: auth.userId,
                    }),
                }
            );
            const responseData = await response.json();

            console.log(responseData);
            // 데이터 전송 후 리디렉션
            history.push('/');
        } catch (error) {
            console.log(error);
        }
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
