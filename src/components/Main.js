import profileSvg from "../images/profile__image.svg";
import profilePencilSvg from "../images/pencil.svg";


function Main ({ onEditProfile, onAddPlace, onEditAvatar }) {
    return (
        <main className="content">

            {/* profile */}
            <section className="profile">

                <div className="profile__image-container">
                    <img alt="Фото пользователя"
                         className="profile__image"
                         src={profileSvg}
                         onClick={onEditAvatar}/>
                    <div className="profile__pencil"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__header-line">
                        <h1 className="profile__title">Жак-Ив Кусто</h1>
                        <button type="button"
                                className="profile__edit" onClick={onEditProfile}>
                            <img src={profilePencilSvg}
                                 alt="Редактировать" />
                        </button>
                    </div>
                    <p className="profile__subtitle">Исследователь океана</p>
                </div>
                <button type="button"
                        className="profile__plus"
                        onClick={onAddPlace}>
                </button>

            </section>

            {/* elements  */}

            <section className="elements">

            </section>

        </main>
    );
}

export default Main;