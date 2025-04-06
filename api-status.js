document.addEventListener('DOMContentLoaded', async function() {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  
  async function checkApiStatus() {
    try {
      const response = await fetch('http://localhost:5000/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        statusIndicator.classList.add('online');
        statusIndicator.classList.remove('offline');
        
        // Check which models are loaded
        const modelsLoaded = data.models_loaded.join(', ');
        const ragStatus = data.rag_status;
        const device = data.device;
        
        statusText.innerHTML = `API Online (${device}) - Models: ${modelsLoaded} - RAG: ${ragStatus}`;
        return true;
      } else {
        throw new Error('API responded with error');
      }
    } catch (error) {
      console.error('API Status Check Error:', error);
      statusIndicator.classList.add('offline');
      statusIndicator.classList.remove('online');
      statusText.textContent = 'API Offline - Diagnose features unavailable';
      return false;
    }
  }
  
  // Initial check
  const isApiOnline = await checkApiStatus();
  
  // Re-check status every 30 seconds
  setInterval(checkApiStatus, 30000);
  
  // Adjust the diagnose button behavior based on API status
  const diagnoseCards = document.querySelectorAll('.diagnostic-card');
  if (!isApiOnline && diagnoseCards) {
    diagnoseCards.forEach(card => {
      const diagnoseButton = card.querySelector('.diagnose-button');
      if (diagnoseButton) {
        diagnoseButton.addEventListener('click', function(e) {
          e.preventDefault();
          alert('The diagnostic service is currently unavailable. Please try again later.');
        });
      }
    });
  }
  
  // Add connection status to chat system if it exists
  const chatBtn = document.getElementById('chat-btn');
  if (chatBtn) {
    chatBtn.addEventListener('click', function() {
      if (!isApiOnline) {
        alert('The chat service is currently unavailable as the API is offline.');
      }
    });
  }
});