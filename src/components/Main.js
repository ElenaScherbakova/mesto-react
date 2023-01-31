import profilePencilSvg from "../images/pencil.svg";
import {useContext, useEffect, useState} from "react";
import API from "../utils/API";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const { name, about, avatar, _id } = useContext(CurrentUserContext)
    const [cards, setCards] = useState([])
    const getCards = () => {
        API.getInitialCards()
            .then(setCards) // получили карточки с api
            .catch( (e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        /* запрос данных пользователя */
        // Нельзя использовать Promise.all, так как если провалится один из запросов,
        // весь Promise.all будет rejected.  С точки зрения UX, нельзя показывать пустой экран.
        // У пользователя создастся впечателение, что вся страница не работает.
        // Увидев часть страницы, в нашем случае header, пользователь сможет отредактировать свои данные.
        // Т.о. страница останется функциональной.
        // Нельзя так же испольовать Promise.allSettled
        // так как если запрос на user/me провалится, то запрос на карточки выполнится все равно.
        // В текущей реализации отобразитсья хотя бы информация о пользователе.
        getCards()

    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(c => c._id === _id);

        API.likeCard(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleCardRemove = (card) => {
        API.removeCard(card._id).then(getCards)
    }

    return (
        <main className="content">

            {/* profile */}
            <section className="profile">

                <div className="profile__image-container" onClick={onEditAvatar}>
                    <img alt="Фото пользователя"
                         className="profile__image"
                         src={avatar}
                         />
                    <div className="profile__pencil"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__header-line">
                        <h1 className="profile__title">{name}</h1>
                        <button type="button"
                                className="profile__edit" onClick={onEditProfile}>
                            <img src={profilePencilSvg}
                                 alt="Редактировать" />
                        </button>
                    </div>
                    <p className="profile__subtitle">{about}</p>
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
                    <Card key={card._id} card={card}
                          onCardClick={onCardClick}
                          onCardLike={ () => handleCardLike(card) }
                          onCardRemove={() => handleCardRemove(card) }
                    /> )
                }
            </section>

        </main>
    );
}

export default Main;