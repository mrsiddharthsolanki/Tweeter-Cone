import React from 'react'

function CommentList({Comments}) {

    if (!Comments || Comments.length === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4">
                <p className="text-center text-zinc-600 dark:text-zinc-300">No comments available</p>
            </div>
        );
    }

  return (
    <div className="flex flex-col gap-4">
        {Comments.map((comment) => (
            <CommentCard key={comment.$id} comment={comment} />
        ))}
    </div>
  )
}

export default CommentList