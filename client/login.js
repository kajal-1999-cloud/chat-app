document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const payload = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://chat-app-c9fn.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();

        console.log("data", data)
        sessionStorage.setItem('token', data.token);
        alert('Login successful!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed');
    }
});
