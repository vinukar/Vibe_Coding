document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    let defaultTime = 25 * 60; // 25 minutes in seconds
    let timeLeft = defaultTime;
    let timerInterval = null;
    let isRunning = false;

    // Create a simple beep sound using Web Audio API
    function playAlert() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5); // Slide down
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1.5);

        // Also show browser alert
        setTimeout(() => {
            alert('Time is up! Great focus session.');
        }, 100);
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.title = `${timerDisplay.textContent} - Study Timer`;
    }

    function toggleTimer() {
        if (isRunning) {
            // Pause
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = 'Start';
            startBtn.style.background = '';
            startBtn.style.color = '';
        } else {
            // Start
            isRunning = true;
            startBtn.textContent = 'Pause';
            startBtn.style.background = 'var(--accent-gold)';
            startBtn.style.color = '#1a0b0b';

            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                    playAlert();
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = defaultTime;
        startBtn.textContent = 'Start';
        startBtn.style.background = '';
        startBtn.style.color = '';
        updateDisplay();
        document.title = 'Focus - Study Timer';
    }

    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initial display
    updateDisplay();
});
