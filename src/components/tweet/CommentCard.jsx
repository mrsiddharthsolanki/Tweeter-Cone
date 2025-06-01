import React from 'react'

function CommentCard({ comment }) {

  return (
    <div>
    <div className="flex gap-3 p-3 border-b dark:border-zinc-700">
      <img
        src={comment?.user?.profileImage}
        alt="user"
        className="w-8 h-8 rounded-full object-cover"
     />
      <div>
        <div className="font-medium text-sm">{comment?.user?.displayName}</div>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm">{comment?.content}</p>
      </div>
    </div>
    </div>
  )
}

export default CommentCard