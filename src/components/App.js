import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddNewCardPopup} from "./AddNewCardPopup";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard]  = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const getCards = () => {
        api.getInitialCards()
            .then(setCards) // получили карточки с api
            .catch( (e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        api.getUser()
            .then((user) => {
                setCurrentUser(user)
            }) // получили данные пользователя
            .catch( (e) => {
                console.error(e)
            })
        getCards()
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(c => c._id === currentUser._id);

        api.likeCard(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch( (e) => {
            console.error(e)
        })
    }

    const handleCardRemove = (card) => {
        api.removeCard(card._id)
            .then(getCards)
            .catch( e => console.error(e) )
    }

    const openEditPopup = () => {
        setEditProfilePopupOpen(true)
    };

    const openPopupPlace = () => {
        setAddPlacePopupOpen(true)
    };

    const openAvatarChange = () => {
        setEditAvatarPopupOpen(true)
    }

    {/* закртие попапа*/}
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditProfilePopupOpen(false)
        setSelectedCard(null)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUserUpdate = ({ name, about }) => {
        api.updateUser(name, about)
            .then( updatedUser => setCurrentUser(updatedUser) )
            .catch( e => console.error(e))
            .finally(() => closeAllPopups())
    }
    const handleAvatarChange = (url) => {
        api.changeAvatar(url)
            .then( updatedUser => setCurrentUser(updatedUser) )
            .catch( e => console.error(e))
            .finally(() => closeAllPopups())

    }

    const handleAddNewCard = ({ name, link }) => {
        api.createNewCard(name, link)
            .then( card => {
                setCards([card, ...cards])
            })
            .catch( e => console.error(e))
            .finally(() => closeAllPopups())
    }

    return <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header/>
            <Main
                cards={cards}
                onEditProfile = {openEditPopup}
                onAddPlace = {openPopupPlace}
                onEditAvatar = {openAvatarChange}
                onCardClick = {handleCardClick}
                onCardLike={handleCardLike}
                onCardRemove={handleCardRemove}
            />
            <EditProfilePopup closeAllPopups={closeAllPopups}
                              isOpen={isEditProfilePopupOpen}
                              onUpdate={handleUserUpdate}
            />
            <EditAvatarPopup closeAllPopups={closeAllPopups}
                             isOpen={isEditAvatarPopupOpen}
                             onUpdate={handleAvatarChange}
            />
            <AddNewCardPopup closeAllPopups={closeAllPopups}
                             isOpen={isAddPlacePopupOpen}
                             onUpdate={handleAddNewCard}
            />

            { selectedCard && <ImagePopup card={selectedCard}
                                          onClose={closeAllPopups} /> }
            <Footer/>
        </div>
    </CurrentUserContext.Provider>
}

export default App;
