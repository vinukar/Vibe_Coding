const card = document.getElementById('profileCard');

// Subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset card position on mouse leave
document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    card.style.transition = 'all 0.5s ease';
});

// Re-enable smooth movement on enter
document.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
});

// Button click feedback
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            alert(`${btn.innerText} feature coming soon!`);
        }, 150);
    });
});