import {Link, useParams} from 'react-router-dom'

import {selectUserById} from '../../store/features/users/usersSlice'
import {useAppSelector} from "../../store/hooks.ts";
import {TPost} from "../../store/features/posts/postsSlice.ts";
import {useMemo} from "react";
import {createSelector} from "@reduxjs/toolkit";
import {useGetPostsQuery} from "../../store/features/api/apiSlice.ts";

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const user = useAppSelector(state => selectUserById(state, userId as string))

  const selectPostsForUser = useMemo(() => {
    const emptyArray: unknown[] = []

    return createSelector(
     (res) => res.data,
     (_, userId) => userId,
     (data: TPost[], userId) => data?.filter(post => post.user === userId) ?? emptyArray
    )
  }, [])

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        postsForUser: selectPostsForUser(result, userId)
      }
    }
  })

  const postTitles = postsForUser.map(post => (
   <li key={post.id}>
     <Link to={`/posts/${post.id}`}>{post.title}</Link>
   </li>
  ))

  return (
   <section>
     <h2>{user?.name}</h2>
     <ul>{postTitles}</ul>
   </section>
  )
}
