async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.log(`Ошибка при загрузке ${url}:`, error.message);
        return null;
    }
}

async function showPosts() {
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
    if (posts) {
        const sorted = posts.sort((a, b) => b.title.length - a.title.length);
        console.log("Posts:", sorted);
    }
}

async function showComments() {
    const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
    if (comments) {
        const sorted = comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log("Comments:", sorted);
    }
}

async function showUsers() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    if (users) {
        const filtered = users.map(({ id, name, username, email, phone }) => ({
            id, name, username, email, phone
        }));
        console.log("Users:", filtered);
    }
}

async function showTodos() {
    const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
    if (todos) {
        const filtered = todos.filter(t => !t.completed);
        console.log("Todos:", filtered);
    }
}

async function showPostsAndComments() {
    const [posts, comments] = await Promise.all([
        fetchData('https://jsonplaceholder.typicode.com/posts'),
        fetchData('https://jsonplaceholder.typicode.com/comments')
    ]);
    if (posts && comments) {
        console.log("Async Posts:", posts.sort((a, b) => b.title.length - a.title.length));
        console.log("Async Comments:", comments.sort((a, b) => a.name.localeCompare(b.name)));
    }
}

async function showUsersAndTodos() {
    const [users, todos] = await Promise.all([
        fetchData('https://jsonplaceholder.typicode.com/users'),
        fetchData('https://jsonplaceholder.typicode.com/todos')
    ]);
    if (users && todos) {
        const filteredUsers = users.map(({ id, name, username, email, phone }) => ({
            id, name, username, email, phone
        }));
        const filteredTodos = todos.filter(t => !t.completed);
        console.log("Async Users:", filteredUsers);
        console.log("Async Todos:", filteredTodos);
    }
}
showPosts();
showComments();
showUsers();
showTodos();
showPostsAndComments();
showUsersAndTodos();
