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

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState();

    const auth = React.useContext(AuthContext); // 수신받는 컨택스트를 사용해보자

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

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
            const response = await fetch(
                'http://localhost:5500/api/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                }
            );
            const responseData = response.json();
            console.log(responseData);
            // 로그인상태로 변경하기
            auth.login();
        } else {
            try {
                setIsLoading(true); // 서버에 전송하기전 로딩중표시
                const response = await fetch(
                    'http://localhost:5500/api/users/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );
                // const responseData = response.json();
                console.log(response);
                console.log(response.userId);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
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
