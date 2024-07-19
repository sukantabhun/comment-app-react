import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onClickDeleteIcon, onToggleLike} = props
  const {id, name, comment, isLiked, commentTime, color} = commentDetails
  const letter = name[0]
  const timeStamp = new Date(commentTime)
  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const activeClassBtn = isLiked ? 'active' : ''

  const deleteButton = () => {
    onClickDeleteIcon(id)
  }
  const onLike = () => {
    onToggleLike(id)
  }
  return (
    <li>
      <div className="comment-container">
        <div className={`initials ${color}`}>{letter}</div>
        <div className="detail">
          <div className="comment-details">
            <h1 className="name">{name}</h1>
            <p className="time">{`${formatDistanceToNow(timeStamp)} ago `}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="btn-container">
        <button
          type="button"
          onClick={onLike}
          className={`btn like-btn ${activeClassBtn}`}
        >
          <img src={imgUrl} alt="like" className="like-icon" />
          Like
        </button>

        <button
          onClick={deleteButton}
          type="button"
          data-testid="delete"
          className="btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-button"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
