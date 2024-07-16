document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('ws://localhost:5000');

    const token = sessionStorage.getItem('token');
    const decoded = token && jwt_decode(token);
    const currentUser = decoded?.user || null;

    socket.onopen = () => {
        console.log('Connected to WebSocket');

        fetch('https://chat-app-6liz.onrender.com/api/messages')
            .then(response => response.json())
            .then(messages => {
                messages.forEach(message => {
                    receiveMessage(message.username, message.text, message.timestamp);
                });
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const { username, text, timestamp } = data;
            receiveMessage(username, text, timestamp);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    document.getElementById('send').addEventListener('click', () => {
        const message = document.getElementById('message').value;

        if (token && message.trim() !== '') {
            console.log('Sending message:', { token, text: message });
            socket.send(JSON.stringify({ token, text: message }));
            document.getElementById('message').value = ''; 
        }
    });

    const receiveMessage = (username, text, timestamp) => {
        console.log("Received", username, text);
        const viewMessage = document.getElementById('messages-view');
        const messageDiv = document.createElement('div');
        messageDiv.innerText = `${username}: ${text}`;
        messageDiv.classList.add('message');

        if (username === currentUser) {
            messageDiv.classList.add('sent');
        } else {
            messageDiv.classList.add('received');
        }
        const timestampSpan = document.createElement('span');
        timestampSpan.textContent = new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        timestampSpan.classList.add('timestamp');

        messageDiv.appendChild(timestampSpan);


        viewMessage.appendChild(messageDiv);
    };
});
