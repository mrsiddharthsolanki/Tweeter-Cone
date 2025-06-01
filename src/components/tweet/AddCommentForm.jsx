import React from 'react'

function AddCommentForm() {

    const [comment, setComment] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!comment) {
            alert('Please enter a comment')
            return
        }

        
        onSubmit({ comment })
        setComment('');
    }

  return (
    <div>
        <form action="" className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4 flex items-center gap-2" onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 p-2 rounded border dark:bg-zinc-800 resize-none text-sm"
                placeholder="Add a comment..."
                rows="2"
                required
            />
            <button type="submit" 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                Post Comment
            </button>
        </form>
    </div>
  )
}

export default AddCommentForm;