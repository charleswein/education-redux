import {PostExcerpt, Spinner} from "../../components";
import {useGetPostsQuery} from "../../store/features/api/apiSlice.ts";
import {useMemo} from "react";
import classnames from "classnames";

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPostsQuery(undefined)

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.slice()
    // Sort posts in descending chronological order
    sortedPosts?.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />
  }

  if (isSuccess) {
    const renderedPosts = sortedPosts?.map((post) => (
     <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  }

  if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
   <section className="posts-list">
     <h2>Posts</h2>
     <button onClick={refetch}>Re-fetch Posts</button>
     {content}
   </section>
  )
}
