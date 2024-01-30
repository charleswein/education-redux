import {Link} from "react-router-dom";
import {selectPostById, TPost} from "../../store/features/posts/postsSlice.ts";
import {useAppSelector} from "../../store/hooks.ts";
import {PostAuthor, TimeAgo, ReactionButtons} from "../../components";

export const PostExcerpt = ({ postId }: {
  postId: TPost["id"]
}) => {
  const post = useAppSelector(state => selectPostById(state, postId))

  return (
   <article className="post-excerpt">
     <h3>{post.title}</h3>
     <div>
       <PostAuthor userId={post.user} />
       <TimeAgo timestamp={post.date} />
     </div>
     <p className="post-content">{post.content.substring(0, 100)}</p>

     <ReactionButtons post={post} />
     <Link to={`/posts/${post.id}`} className="button muted-button">
       View Post
     </Link>
   </article>
  )
}
