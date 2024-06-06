import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useForm from '../../shared/hooks/useForm';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { AuthContext } from 'src/shared/context/auth-context';

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const history = useHistory();
    const auth = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadedPlaces, setLoadedPlaces] = React.useState();

    const [formState, inputHandler, initializeFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    // placeId 에 해당하는 장소를 DB로부터 조회한다.
    const getPlaceById = async () => {
        try {
            const response = await fetch(
                `http://localhost:5500/api/places/${placeId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const responseData = await response.json();
            setLoadedPlaces(responseData.place);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getPlaceById();
    }, [placeId]);

    React.useEffect(() => {
        if (loadedPlaces) {
            initializeFormData(
                {
                    title: {
                        value: loadedPlaces.title,
                        isValid: true,
                    },
                    description: {
                        value: loadedPlaces.description,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsLoading(false);
    }, [initializeFormData, loadedPlaces]);

    const placeSubmitHandler = async (event) => {
        event.preventDefault();

        // TO-DO: form data 서버에 전송
        console.log(formState.inputs);

        try {
            const response = await fetch(
                `http://localhost:5500/api/places/${placeId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                        title: formState.inputs.title.value,
                        description: formState.inputs.description.value,
                    }),
                }
            );

            // 데이터 전송 후 리디렉션
            history.push('/' + auth.userId + '/places');
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!loadedPlaces) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        );
    }

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
                initialValue={loadedPlaces.title}
                initialValid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                onInput={inputHandler}
                initialValue={loadedPlaces.description}
                initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
