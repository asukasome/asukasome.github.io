document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', createFirework);
    document.addEventListener('touchstart', createFirework);

    function createFirework(event) {
        // 防止在触摸事件时触发多次
        if (event.type === 'touchstart') {
            event.preventDefault();
        }

        const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A', '#31A2AC'];
        const particles = 9; // 减少粒子数量以提高性能
        const x = (event.clientX || event.touches[0].clientX) + window.scrollX;
        const y = (event.clientY || event.touches[0].clientY) + window.scrollY;

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

            const deltaX = (Math.random() - 0.5) * 200;
            const deltaY = (Math.random() - 0.5) * 200;
            const transformString = `translate(${deltaX}px, ${deltaY}px)`;

            // 使用 CSS 动画
            particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            particle.style.opacity = '1';

            // 强制重绘
            particle.getBoundingClientRect();
            particle.style.transform = transformString;
            particle.style.opacity = '0';

            // 动画结束后移除元素
            particle.addEventListener('transitionend', () => {
                particle.remove();
            });
        }
    }
});
