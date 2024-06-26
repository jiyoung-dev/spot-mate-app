import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/useForm';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';
import { AuthContext } from 'src/shared/context/auth-context';
import useHttpClient from 'src/shared/hooks/useHttpClient';

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = React.useState(true);
    const auth = React.useContext(AuthContext);

    const [formState, inputHandler, initializeFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
    });

    const [sendRequest, clearError, isLoading, error] = useHttpClient();

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
            const responseData = await sendRequest(
                'http://localhost:5500/api/users/login',
                'POST',
                {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }
            );

            // 로그인상태로 변경하기
            auth.login(responseData.token, responseData.userId);
        } else {
            try {
                await sendRequest(
                    'http://localhost:5500/api/users/signup',
                    'POST',
                    {
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }
                );
            } catch (error) {}
        }
    };

    const switchModeHandler = () => {
        // Sign Up -> Login 스위칭
        if (!isLoginMode) {
            initializeFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            // Login -> Sign Up  스위칭
            initializeFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                false
            );
        }
        // 모드를 전환
        setIsLoginMode((prev) => !prev);
    };

    return (
        <Card className="authentication">
            <h2>Login</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    element="input"
                    type="text"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'Login' : 'Sign Up'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                Switch to {isLoginMode ? ' Sign Up' : 'Login'}
            </Button>
        </Card>
    );
};

export default Auth;
