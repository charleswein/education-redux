import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {postAdded} from "../../store/features/posts/postsSlice.ts";
import {nanoid} from "nanoid";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)
  const handleSavePostClick = () => {
    if(title && content) {
      dispatch(postAdded({
        id: nanoid(),
        title,
        content
      }))

      setTitle('')
      setContent('')
    }
  }

  return (
   <section>
     <h2>Add a New Post</h2>
     <form>
       <label htmlFor="postTitle">Post Title:</label>
       <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={handleTitleChange}
       />
       <label htmlFor="postContent">Content:</label>
       <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={handleContentChange}
       />
       <button type="button" onClick={handleSavePostClick}>Save Post</button>
     </form>
   </section>
  )
}
