import mestoSvg from '../images/mesto.svg'
import profileSvg from '../images/profile__image.svg'
import profilePencilSvg from '../images/pencil.svg'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)

    const openEditPopup = () => {
        /*     popupEditForm.handleOpenPopup(
                 userNewInfo.getUserInfo())
             validateEditProfile.resetErrors()
             validateEditProfile.disableButton()*/
        setEditProfilePopupOpen(true)
    };

    const openPopupPlace = () => {
        /*        popupNewCard.handleOpenPopup({
                    name: "",
                    link: "",
                    likes:[],
                    _id: "",
                    owner: storage.user
                })
                validateAddPlace.resetErrors()
                validateAddPlace.disableButton()*/
        setAddPlacePopupOpen(true)
    };

    const openAvatarChange = () => {
        /*        popupChangeAvatar.handleOpenPopup({
                    url: avatarImage.src
                })
                validateAvatar.resetErrors()
                validateAvatar.disableButton()*/
        setEditAvatarPopupOpen(true)
    }
    {/* закртие попапа*/}
    const editProfileClose = () => {
        setEditProfilePopupOpen(false)
    }

    const addPlaceClose = () => {
        setAddPlacePopupOpen(false)
    }

    return <div className="page">
        <Header/>
        <Main
            onEditProfile = {openEditPopup}
            onAddPlace = {openPopupPlace}
            onEditAvatar = {openAvatarChange}
        />
        <PopupWithForm submitButtonTitle={'Сохранить'}
                       name={'edit-profile-form'}
                       idForm={'submit-form'}
                       className={'popup_type_edit'}
                       title={'Редактировать профиль'}
                       isOpen={isEditProfilePopupOpen}
                       onClose={editProfileClose}
        >
            <input id="name"
                   placeholder="Имя"
                   name="name"
                   className="popup__input" minLength="2" maxLength="40" required/>
            <label htmlFor="name" className="popup__error input-error-name"></label>
            <input id="avocation"
                   placeholder="О себе"
                   name="about"
                   className="popup__input" minLength="2" maxLength="200" required />
                <label htmlFor="avocation" className="popup__error input-error-about" />
        </PopupWithForm>

        <PopupWithForm submitButtonTitle={'Создать'}
                       name={'card-form'}
                       idForm={'place-form'}
                       className={'popup_type_plus'}
                       title={'Новое место'}
                       isOpen={isAddPlacePopupOpen}
                       onClose={addPlaceClose }
        >
            <input id="title"
                   placeholder="Название"
                   name="name"
                   className="popup__input popup__name" required minLength="2" maxLength="30"/>
                <span className="popup__error input-error-name"></span>
                <input id="link"
                       placeholder="Ссылка на картинку"
                       name="link"
                       type="url"
                       className="popup__input popup__link" required />
                    <span className="popup__error input-error-link"></span>
        </PopupWithForm>

        <Footer/>
    </div>
}

export default App;
