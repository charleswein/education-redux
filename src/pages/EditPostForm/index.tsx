import {ChangeEvent, useState} from "react";
import {Params} from "../../types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEditPostMutation, useGetPostQuery} from "../../store/features/api/apiSlice.ts";

export const EditPostForm = () => {
  const { postId} = useParams<Params>();
  const [updatePost] = useEditPostMutation()
  const { data: post } = useGetPostQuery(postId as string)
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)
  const handleSavePostClick = async () => {
    if(title && content) {
      await updatePost({id: postId as string, title, content})

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
