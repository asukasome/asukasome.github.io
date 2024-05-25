// 添加点击或触摸事件监听器
document.addEventListener('click', createFirework);
document.addEventListener('touchstart', createFirework);

function createFirework(event) {
    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A', '#31A2AC'];
    const particles = 30;
    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        document.body.appendChild(particle);

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.top = `${y}px`;
        particle.style.left = `${x}px`;
        particle.style.pointerEvents = 'none';

        const animation = particle.animate([
            { transform: `translate(${x}px, ${y}px)`, opacity: 1 },
            { transform: `translate(${x + (Math.random() - 0.5) * 200}px, ${y + (Math.random() - 0.5) * 200}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }
}
