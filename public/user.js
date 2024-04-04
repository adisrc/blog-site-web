// user.js
document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('posts');

    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error(error);
        postsContainer.textContent = 'Error fetching posts';
    }
});
