import React from 'react';

/**
 * useHttpClient 역할
 * - 서버로 클라이언트 요청 전송
 * - 응답 상태코드 검사
 * - 로딩, 에러메시지 상태관리
 */

const useHttpClient = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState();

    const sendRequest = React.useCallback(
        async (url, method = 'GET', body = null, token = null) => {
            setIsLoading(true); // 서버에 전송하기전 로딩중표시

            if (body) {
                body = JSON.stringify(body);
            }

            try {
                const response = await fetch(url, {
                    method,
                    headers: token
                        ? {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                          }
                        : { 'Content-Type': 'application/json' },
                    body,
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);

                return responseData;
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                throw error;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    return [sendRequest, clearError, isLoading, error];
};

export default useHttpClient;
