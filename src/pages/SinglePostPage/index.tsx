import {Link, useParams} from "react-router-dom";
import {Params} from "../../types.ts";
import {PostAuthor, TimeAgo, ReactionButtons, Spinner} from "../../components";

import {useGetPostQuery} from "../../store/features/api/apiSlice.ts";

export const SinglePostPage = () => {
  const { postId } = useParams<Params>();
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId as string)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  }


  if (isSuccess) {
    content = (
     <article className="post">
       <h2>{post.title}</h2>
       <div>
         <PostAuthor userId={post.user} />
         <TimeAgo timestamp={post.date} />
       </div>
       <p className="post-content">{post.content}</p>
       <ReactionButtons post={post} />
       <Link to={`/editPost/${post.id}`} className="button">
         Edit Post
       </Link>
     </article>
    )
  }

  return (
   <section>
     {content}
   </section>
  )
}
