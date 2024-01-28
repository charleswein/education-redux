import {ChangeEvent, useState} from "react";
import {postUpdated, selectPostById} from "../../store/features/posts/postsSlice.ts";
import {Params} from "../../types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {RootState} from "../../store";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

export const EditPostForm = () => {
  const { postId} = useParams<Params>();
  const navigate = useNavigate();
  const post = useAppSelector((state: RootState) => selectPostById(state, postId))

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useAppDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)
  const handleSavePostClick = () => {
    if(title && content && postId) {
      dispatch(postUpdated({
        id: postId,
        title,
        content
      }))

      navigate(`/posts/${postId}`)
    }
  }

  return (
   <section>
     <h2>Edit Post</h2>
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
