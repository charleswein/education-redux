import {useAppSelector} from "../../store/hooks.ts";
import {selectUserById} from "../../store/features/users/usersSlice.ts";
import {RootState} from "../../store";

export const PostAuthor = ({ userId }: {
  userId: string;
}) => {
  const author = useAppSelector((state: RootState) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
