import {useAppSelector} from "../../store/hooks.ts";

export const PostAuthor = ({ userId }: {
  userId?: string;
}) => {
  const author = useAppSelector(state =>
   state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
