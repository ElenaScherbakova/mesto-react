import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike}) => {

    const { _id } = useContext(CurrentUserContext)
    const currentUserLiked = card.likes.some( l => l._id === _id )
    const className = 'card__like' + (currentUserLiked ? ' card__like_active' : '')
    function handleClick () {
        onCardClick(card)
    }

    return (

        <div className="card">
            <div className="card__place">
                <img className="card__photo"
                     src={card.link} onClick={handleClick}/>
                { card.owner._id === _id &&
                    <button type="button"
                            className="card__basket"></button>
                }
            </div>
            <div className="card__title">
                <h2 className="card__text"></h2>
                <div className="card__heart">
                    <button type="button"
                            className={className}
                            onClick={onCardLike}
                    >
                    </button>
                    <span className="card__counter">{card.likes.length}</span>
                </div>

            </div>
        </div>

    );
}

export default Card;