import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentList: [],
    name: '',
    comment: '',
    commentCount: 0,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name !== '' && comment !== '') {
      const color =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]
      console.log(color)
      const currentDate = () => format(new Date(), 'yyyy-MM-dd h:mm a')

      const newComment = {
        id: uuidv4(),
        name,
        comment,
        isLiked: false,
        commentTime: currentDate(),
        color,
      }

      this.setState(prevState => ({
        commentList: [...prevState.commentList, newComment],
        name: '',
        comment: '',
      }))
      this.setState(prevState => ({
        commentCount: prevState.commentCount + 1,
      }))
    }
  }

  onClickDeleteIcon = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
      commentCount: prevState.commentCount - 1,
    }))
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, comment, commentList, commentCount} = this.state

    return (
      <div className="element-container">
        <div className="container">
          <h1 className="heading">Comments</h1>
          <div className="internal-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
            <form onSubmit={this.onClickAddComment} className="form-container">
              <p className="para">Say Something about 4.0 Technologies</p>
              <input
                value={name}
                placeholder="Your Name"
                onChange={this.onChangeName}
              />
              <textarea
                value={comment}
                placeholder="Your Comment"
                onChange={this.onChangeComment}
              />
              <button
                type="submit"
                onSubmit={this.onClickAddComment}
                className="submit-btn"
              >
                Add Comment
              </button>
            </form>
          </div>
          <hr />
          <p>
            <span className="counter">{commentCount}</span>Comment
          </p>
          <ul type="none">
            {commentList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                onClickDeleteIcon={this.onClickDeleteIcon}
                onToggleLike={this.onToggleLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
