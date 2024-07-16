document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://chat-app-6liz.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        alert('Registration successful! Please log in.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed');
    }
});
