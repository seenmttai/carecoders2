import API_BASE_URL from './api-config.js';

document.addEventListener('DOMContentLoaded', async function() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const healthEndpoint = `${API_BASE_URL}/health`;

    console.log(`API Health Endpoint: ${healthEndpoint}`);

    async function checkApiStatus() {
        let response;
        try {
            response = await fetch(healthEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                mode: 'cors'
            });

            console.log(`Health check response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log("Health check data:", data);

                statusIndicator.classList.add('online');
                statusIndicator.classList.remove('offline');

                const modelStatusArray = Object.entries(data.models_status || {})
                    .map(([name, status]) => `${name}: ${status}`);
                const modelsLoadedText = modelStatusArray.length > 0 ? modelStatusArray.join(', ') : 'None';
                const ragStatus = data.rag_status || 'Unknown';
                const device = data.device_used || 'Unknown';

                statusText.innerHTML = `API Online (${device}) | Models: ${modelsLoadedText} | RAG: ${ragStatus}`;
                return true;
            } else {
                console.error(`API Status Check Error: Response not OK (${response.status} ${response.statusText})`);
                try {
                    const errorBody = await response.text();
                    console.error("Error Body:", errorBody.substring(0, 500));
                } catch (bodyError) {
                    console.error("Could not read error body:", bodyError);
                }
                throw new Error(`API responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('API Status Check Error:', error);
            statusIndicator.classList.add('offline');
            statusIndicator.classList.remove('online');
            statusText.textContent = 'API Offline - Diagnose features unavailable';
            return false;
        }
    }

    const isApiOnline = await checkApiStatus();

    setInterval(checkApiStatus, 30000);

    const diagnoseCards = document.querySelectorAll('.diagnostic-card');
    if (diagnoseCards) {
        diagnoseCards.forEach(card => {
            const diagnoseButton = card.querySelector('.diagnose-button');
            if (diagnoseButton) {
                diagnoseButton.addEventListener('click', async function(e) {
                    const currentlyOnline = await checkApiStatus();
                    if (!currentlyOnline) {
                        e.preventDefault();
                        alert('The diagnostic service is currently unavailable. Please try again later.');
                    }
                });
            }
        });
    }

    const chatBtn = document.getElementById('chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', async function() {
            const currentlyOnline = await checkApiStatus();
            if (!currentlyOnline) {
                alert('The chat service is currently unavailable as the API is offline.');
            }
        });
    }
});

