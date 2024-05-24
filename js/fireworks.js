"use strict";

// 定义常量和变量
const canvasEl = document.querySelector(".fireworks");
const ctx = canvasEl.getContext("2d");
const colors = ["#FFC0CB", "#FFA07A", "#87CEEB", "#F08080"];
const numberOfParticules = 30;
let pointerX = 0;
let pointerY = 0;

// 更新鼠标坐标
function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left;
    pointerY = (e.clientY || e.touches[0].clientY) - canvasEl.getBoundingClientRect().top;
}

// 创建粒子对象
function createParticule(x, y) {
    return {
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 16 + 16,
        endPos: setParticuleDirection(x, y),
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
}

// 设置粒子方向
function setParticuleDirection(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 130 + 50;
    return {
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance
    };
}

// 渲染粒子效果
function renderParticules(anim) {
    for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
    }
}

// 动画效果
function animateParticules() {
    const anim = anime.timeline({
        duration: 800,
        easing: "easeOutExpo"
    });

    const particles = [];
    for (let i = 0; i < numberOfParticules; i++) {
        particles.push(createParticule(pointerX, pointerY));
    }

    anim.add({
        targets: particles,
        x: p => p.endPos.x,
        y: p => p.endPos.y,
        radius: 0.1,
        update: renderParticules
    });

    anim.play();
}

// 事件监听
document.addEventListener("mousedown", e => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".toggle-sidebar") && e.target.nodeName !== "A" && e.target.nodeName !== "IMG") {
        updateCoords(e);
        animateParticules();
    }
});

// 设置画布尺寸和缩放
function setCanvasSize() {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvasEl.style.width = window.innerWidth + "px";
    canvasEl.style.height = window.innerHeight + "px";
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// 初始化
function init() {
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
}

// 启动初始化
init();
