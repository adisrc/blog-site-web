// admin.js
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const deleteForm = document.getElementById('deleteForm');
    const message = document.getElementById('message');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(postForm);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content')
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            message.textContent = 'Post created successfully';
        } catch (error) {
            console.error(error);
            message.textContent = 'Error creating post';
        }
    });

    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(deleteForm);
        const postId = formData.get('postId');

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            message.textContent = 'Post deleted successfully';
        } catch (error) {
            console.error(error);
            message.textContent = 'Error deleting post';
        }
    });
});
