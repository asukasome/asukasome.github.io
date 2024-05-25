document.addEventListener('DOMContentLoaded', function() {
    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A', '#31A2AC'];
    const particles = 20;
    const particlePool = [];
    let particleIndex = 0;

    // 预创建粒子池
    for (let i = 0; i < particles * 2; i++) {
        const particle = document.createElement('div');
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0';
        particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        particlePool.push(particle);
        document.body.appendChild(particle);
    }

    function createFirework(event) {
        if (event.type === 'touchstart') {
            event.preventDefault();
        }

        const x = (event.clientX || event.touches[0].clientX) + window.scrollX;
        const y = (event.clientY || event.touches[0].clientY) + window.scrollY;

        for (let i = 0; i < particles; i++) {
            const particle = particlePool[particleIndex];
            particleIndex = (particleIndex + 1) % particlePool.length;

            particle.style.top = `${y}px`;
            particle.style.left = `${x}px`;
            particle.style.transform = 'none';
            particle.style.opacity = '1';

            // 强制重绘
            particle.getBoundingClientRect();

            const deltaX = (Math.random() - 0.5) * 200;
            const deltaY = (Math.random() - 0.5) * 200;
            const transformString = `translate(${deltaX}px, ${deltaY}px)`;

            requestAnimationFrame(() => {
                particle.style.transform = transformString;
                particle.style.opacity = '0';
            });
        }
    }

    document.addEventListener('click', createFirework);
    document.addEventListener('touchstart', createFirework);
});
