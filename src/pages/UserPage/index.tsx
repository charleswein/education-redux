import {Link, useParams} from 'react-router-dom'

import {selectUserById} from '../../store/features/users/usersSlice'
import {useAppSelector} from "../../store/hooks.ts";
import {selectPostsByUser} from "../../store/features/posts/postsSlice.ts";

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const user = useAppSelector(state => selectUserById(state, userId as string))

  const postsForUser = useAppSelector(state => selectPostsByUser(state, userId))

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
