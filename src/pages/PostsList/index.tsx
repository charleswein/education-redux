import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
  fetchPosts,
  selectError,
  selectPostStatus,
  selectPostIds
} from "../../store/features/posts/postsSlice.ts";
import {useEffect} from "react";
import {PostExcerpt, Spinner} from "../../components";

export const PostsList = () => {
  const orderedPosts = useAppSelector(selectPostIds)
  const postStatus = useAppSelector(selectPostStatus)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  }

  if (postStatus === 'succeeded') {
    content = orderedPosts.map(postId => (
     <PostExcerpt key={postId} postId={postId} />
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
