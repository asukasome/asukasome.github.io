document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', createFirework);
    document.addEventListener('touchstart', createFirework);

    function createFirework(event) {
        // 防止在触摸事件时触发多次
        if (event.type === 'touchstart') {
            event.preventDefault();
        }

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
            particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';

            // 随机移动和消失
            const deltaX = (Math.random() - 0.5) * 200;
            const deltaY = (Math.random() - 0.5) * 200;
            setTimeout(() => {
                particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                particle.style.opacity = '0';
            }, 0);

            // 动画结束后移除元素
            particle.addEventListener('transitionend', () => {
                particle.remove();
            });
        }
    }
});
