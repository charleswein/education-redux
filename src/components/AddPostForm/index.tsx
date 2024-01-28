import {ChangeEvent, useMemo, useState} from "react";
import {postAdded} from "../../store/features/posts/postsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {RootState} from "../../store";

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useAppSelector((state: RootState) => state.users)

  const dispatch = useAppDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)
  const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => setUserId(event.target.value)

  const handleSavePostClick = () => {
    if(title && content) {
      dispatch(postAdded(
        title,
        content,
        userId
      ))

      setTitle('')
      setContent('')
    }
  }

  const canSave = [title, content, userId].every(Boolean)

  const usersOptions = useMemo(() => {
    return users.map(user => (
     <option key={user.id} value={user.id}>
      {user.name}
    </option>)
    )
  }, [users])

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
       <label htmlFor="postAuthor">Author:</label>
       <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
         <option value=""></option>
         {usersOptions}
       </select>
       <label htmlFor="postContent">Content:</label>
       <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={handleContentChange}
       />
       <button type="button" onClick={handleSavePostClick} disabled={!canSave}>Save Post</button>
     </form>
   </section>
  )
}