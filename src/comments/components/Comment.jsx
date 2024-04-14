import { useState } from "react";
import { createComment } from "../../features/services/features_service";
import '../assets/comment.css'

const BASE_URL = 'http://localhost:3000'

export function Comment({ featureId, setFeatureId, newComment, setNewComment }) {
  const [body, setBody] = useState('')

  function hideCommentBox() {
    setNewComment(!newComment);
  }

  function handleChange(e) {
    const { value } = e.target
    setBody(value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const { method } = e.target
    const data = {
      'url': BASE_URL,
      'featureId': featureId,
      'body': body,
      'method': method,
    }

    createComment(data)
    clearForm()
  }

  function clearForm() {
    const $comment = document.querySelector('textarea')
    $comment.value = ""
    setFeatureId('')
  }

  return (
    <>
      <div className="comment">
        <form onSubmit={handleSubmit} method="POST">
          <textarea
            name="body"
            placeholder="Enter your comment here..."
            onChange={handleChange}
          ></textarea>
          <input type="submit" value="Creat comment" className={ featureId === '' ? 'disabled' : '' }  disabled={ featureId === ''} />
        </form>
        <button className='cancel' onClick={hideCommentBox}>Cancel</button>
      </div>
    </>
  );
}
