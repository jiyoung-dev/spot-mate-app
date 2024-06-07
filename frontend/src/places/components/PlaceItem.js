import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';
import { AuthContext } from 'src/shared/context/auth-context';
import useHttpClient from 'src/shared/hooks/useHttpClient';

const PlaceItem = (props) => {
    const [showMap, setShowMap] = React.useState(false);
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);
    const auth = React.useContext(AuthContext);

    const [sendRequest] = useHttpClient();

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showConfirmModalHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5500/api/places/${props.id}`,
                'DELETE',
                null,
                auth.token
            );
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }

        setShowConfirmModal(false);
        // 현재 페이지 새로고침: 최상위 부모컴포넌트에 알린다
        props.onDelete(props.id);
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <Map zoom={16} center={props.coordinates} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>
                            Cancel
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            Delete
                        </Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place? </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h2>{props.address}</h2>
                        <h2>{props.description}</h2>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>
                            View on Map
                        </Button>
                        {/* 작성자와 로그인한 유저의 ID가 일치하는 경우에만 수정,삭제버튼 표시 */}
                        {auth.isLoggedIn && props.creatorId === auth.userId && (
                            <>
                                <Button to={`/places/${props.id}`}>Edit</Button>
                                <Button
                                    danger
                                    onClick={showConfirmModalHandler}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
