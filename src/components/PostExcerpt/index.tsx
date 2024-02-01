import {Link} from "react-router-dom";
import {TPost} from "../../store/features/posts/postsSlice.ts";
import {PostAuthor, TimeAgo, ReactionButtons} from "../../components";

export const PostExcerpt = ({post}: {
  post: TPost
}) => {
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
