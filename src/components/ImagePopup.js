function ImagePopup() {
    return <div className="popup popup_type_image">

        <div className="popup__unit">
            <div className="popup__block"></div>
            <figure className="popup__figure">
                <img src="#"
                     alt="photo"
                     className="popup__photo" />
                    <figcaption>
                        <p className="popup__figcaption"></p>
                    </figcaption>
                    <button type="button"
                            className="popup__close popup__close_photo"></button>
            </figure>
        </div>
    </div>

}

export default ImagePopup;