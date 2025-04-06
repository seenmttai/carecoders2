// Load and play Lottie animations
document.addEventListener('DOMContentLoaded', function() {
  // Load the Lottie player script dynamically
  const script = document.createElement('script');
  script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
  document.head.appendChild(script);
  
  script.onload = function() {
    // Initialize any specific Lottie functionality here if needed
    const lottiePlayer = document.querySelector('lottie-player');
    if (lottiePlayer) {
      lottiePlayer.addEventListener('ready', () => {
        console.log('Lottie animation ready');
      });
    }
  };
});
