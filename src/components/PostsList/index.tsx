import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchPosts, selectAllPosts, selectError, selectPostStatus} from "../../store/features/posts/postsSlice.ts";
import {useEffect} from "react";
import {PostExcerpt} from "../PostExcerpt";
import {Spinner} from "../Spinner";

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostStatus)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  }

  if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
     .slice()
     .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
     <PostExcerpt key={post.id} post={post} />
    ))
  }

  if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
