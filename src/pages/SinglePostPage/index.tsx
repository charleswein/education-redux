import {Link, useParams} from "react-router-dom";
import {RootState} from "../../store";
import {Params} from "../../types.ts";
import {useAppSelector} from "../../store/hooks.ts";
import {PostAuthor} from "../../components/PostAuthor/PostAuthor.tsx";
import {TimeAgo} from "../../components/TimeAgo";
import {ReactionButtons} from "../../components/ReactionButtons";
import {selectPostById} from "../../store/features/posts/postsSlice.ts";

export const SinglePostPage = () => {
  const { postId } = useParams<Params>();
  const post = useAppSelector((state: RootState) =>
   selectPostById(state, postId))

  if (!post) {
    return (
     <section>
       <h2>Post not found!</h2>
     </section>
    )
  }

  return (
   <section>
     <article className="post">
       <h2>{post.title}</h2>
       <div>
         <PostAuthor userId={post?.userId} />
         <TimeAgo timestamp={post?.date} />
         <ReactionButtons post={post}/>
       </div>
       <p className="post-content">{post.content}</p>
       <Link to={`/editPost/${post.id}`} className="button">
         Edit Post
       </Link>
     </article>
   </section>
  )
}
