document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('userSelect');
    const postSelect = document.getElementById('postSelect');
    const commentsList = document.getElementById('commentsList');

    //  Users API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.username;
                userSelect.add(option);
            });
        });

    // Fetch Posts for default user (ID 1)
    fetchPosts(1);

    // Event listener for user selection
    userSelect.addEventListener('change', function () {
        const selectedUserId = this.value;
        fetchPosts(selectedUserId);
    });

    // Event listener for post selection
    postSelect.addEventListener('change', function () {
        const selectedPostId = this.value;
        fetchComments(selectedPostId);
    });

    function fetchPosts(userId) {
        // Fetch Posts API for the selected user
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                // Clear previous posts
                postSelect.innerHTML = '';

                posts.forEach(post => {
                    const option = document.createElement('option');
                    option.value = post.id;
                    option.text = post.title;
                    postSelect.add(option);
                });

                // Fetch Comments for the first post of the selected user
                if (posts.length > 0) {
                    fetchComments(posts[0].id);
                }
            });
    }

    function fetchComments(postId) {
        // Fetch Comments API for the selected post
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                commentsList.innerHTML = '';

                comments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.classList.add('comment');
                    commentItem.innerHTML = `
                        <h3>${comment.name}</h3>
                        <p>${comment.body}</p>
                    `;
                    commentsList.appendChild(commentItem);
                });
            });
    }
});
