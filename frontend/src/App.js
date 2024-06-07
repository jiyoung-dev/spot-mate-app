import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App = () => {
    const [token, setToken] = React.useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = React.useState(null);
    const [userId, setUserId] = React.useState(null);

    // useCallback 사용하는 이유:
    // - context를 사용하는 컴포넌트들의 불필요한 리렌더링 방지를 위해.
    // - 의존성배열이 비어있으므로 처음 생성된 이후에는 변하지 않는다.
    // - 만약 login함수가 매번 새로 생성이되면, value객체도 매번 새로운 객체로 인식되므로 context를 사용하는 모든 컴포넌트가 리렌더링될수있다.
    // - login과 logout함수를 메모이제이션 해두고, provider의 value객체가 변하지 않는다고 인식하기때문에 불필요한 렌더링을 막는다.

    const login = React.useCallback((token, uid, expirationDate) => {
        setToken(token);
        setUserId(uid);
        // token 만료날짜 저장
        const tokenExpirationDate =
            expirationDate ||
            new Date(
                new Date().getTime() + 1000 * 60 * 60 // 1시간설정
            );
        setTokenExpirationDate(tokenExpirationDate);
        // token을 로컬스토리지에 저장
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            })
        );
    }, []);

    const logout = React.useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    React.useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    React.useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            new Date() < new Date(storedData.expiration) // 토큰만료날짜가 현재날짜보다 미래인지 확인
        ) {
            login(
                storedData.token,
                storedData.userId,
                new Date(storedData.expiration) // 기존 토큰만료날짜를 유지시킨다
            );
        }
    }, []);

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <UserPlaces />
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace />
                </Route>
                <Route path="/places/:placeId" exact>
                    <UpdatePlace />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <Redirect to="/" />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token, // token이 존재하면 true, 없으면 false
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <MainNavigation />
                <main>
                    {/* TO-DO: 로그인상태에 따라 스위칭을 다르게함 */}
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
