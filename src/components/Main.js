import profilePencilSvg from "../images/pencil.svg";
import {useEffect, useState} from "react";
import API from "../utils/API";
import Card from "./Card";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    useEffect(() => {
        {/* запрос данных пользователя */}
        API.getUser()
            .then((user) => {

                setUserName(user.name)
                setUserDescription(user.about)
                setUserAvatar(user.avatar)

                return API.getInitialCards()
            }) // получили данные пользователя
            .then((initialCards) => {
                setCards(initialCards)
            }) // получили карточки с api
            .catch( (e) => {
                console.error(e)
            })
    }, [])

    return (
        <main className="content">

            {/* profile */}
            <section className="profile">

                <div className="profile__image-container" onClick={onEditAvatar}>
                    <img alt="Фото пользователя"
                         className="profile__image"
                         src={userAvatar}
                         />
                    <div className="profile__pencil"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__header-line">
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button"
                                className="profile__edit" onClick={onEditProfile}>
                            <img src={profilePencilSvg}
                                 alt="Редактировать" />
                        </button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button type="button"
                        className="profile__plus"
                        onClick={onAddPlace}>
                </button>

            </section>

            {/* elements  */}

            <section className="elements">
                {/* отображение массива карточек */}
                { cards.map( card =>
                    <Card key={card._id} card={card} onCardClick={onCardClick}/> )
                }
            </section>

        </main>
    );
}

export default Main;