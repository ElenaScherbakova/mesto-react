function PopupWithForm({title, className, idForm, name, children, isOpen, onClose, submitButtonTitle}) {
    return (
        <div className={`popup ${className} ${isOpen ? 'popup_opened' : 'popup_hidden'}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close popup__close_edit" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form id={idForm}
                      name={name}
                      className="popup__form" noValidate>
                    {children}
                    <button disabled className="popup__button popup__button_edit"
                            type="submit">{submitButtonTitle}
                    </button>
                </form>
            </div>

        </div>
    );
}

export default PopupWithForm;