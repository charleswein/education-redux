import {TPost} from "../../store/features/posts/postsSlice.ts";
import {useAddReactionMutation} from "../../store/features/api/apiSlice.ts";

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: {
  post: TPost
}) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
     <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() => {
        addReaction({ postId: post.id, reaction: name })
      }}
     >
       {emoji} {post.reactions[name]}
     </button>
    )
  })

  return <div>{reactionButtons}</div>
}
