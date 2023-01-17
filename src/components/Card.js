const Card = ({ card, onCardClick }) => {

    function handleClick () {
        onCardClick(card)
    }
    return (

        <div className="card">
            <div className="card__place">
                <img className="card__photo"
                     src={card.link} onClick={handleClick}/>
                    <button type="button"
                            className="card__basket"></button>
            </div>
            <div className="card__title">
                <h2 className="card__text"></h2>
                <div className="card__heart">
                    <button type="button"
                            className="card__like">
                    </button>
                    <span className="card__counter">{card.likes.length}</span>
                </div>

            </div>
        </div>

    );
}

export default Card;