"use strict";

// 更新坐标函数
function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left;
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
}

// 设置烟花颜色为马卡龙色
var colors = ["#FFAEBC", "#A0E7E5", "#B4F8C8", "#FBE7C6"];

// 创建烟花粒子函数
function createParticule(e, t) {
    var a = {};
    a.x = e;
    a.y = t;
    a.color = colors[anime.random(0, colors.length - 1)];
    a.radius = anime.random(16, 32);
    a.endPos = setParticuleDirection(a);
    a.draw = function () {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0);
        ctx.fillStyle = a.color;
        ctx.fill();
    };
    return a;
}

// 创建烟花圆圈函数
function createCircle(e, t) {
    var a = {};
    a.x = e;
    a.y = t;
    a.color = "#F00";
    a.radius = 0.1;
    a.alpha = 0.5;
    a.lineWidth = 6;
    a.draw = function () {
        ctx.globalAlpha = a.alpha;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0);
        ctx.lineWidth = a.lineWidth;
        ctx.strokeStyle = a.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
    };
    return a;
}

// 渲染烟花粒子函数
function renderParticule(e) {
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw();
    }
}

// 动画烟花粒子函数
function animateParticules(e, t) {
    for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) {
        n.push(createParticule(e, t));
    }
    anime.timeline().add({
        targets: n,
        x: function (e) {
            return e.endPos.x;
        },
        y: function (e) {
            return e.endPos.y;
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule
    }).add({
        targets: a,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
            value: 0,
            easing: "linear",
            duration: anime.random(600, 800)
        },
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule,
        offset: 0
    });
}

// 防抖函数
function debounce(e, t) {
    var a;
    return function () {
        var n = this,
            i = arguments;
        clearTimeout(a);
        a = setTimeout(function () {
            e.apply(n, i);
        }, t);
    };
}

var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
    var ctx = canvasEl.getContext("2d"),
        numberOfParticules = 30,
        pointerX = 0,
        pointerY = 0,
        tap = "mousedown";

    var setCanvasSize = debounce(function () {
        canvasEl.width = 2 * window.innerWidth;
        canvasEl.height = 2 * window.innerHeight;
        canvasEl.style.width = window.innerWidth + "px";
        canvasEl.style.height = window.innerHeight + "px";
        canvasEl.getContext("2d").scale(2, 2);
    }, 500);

    var render = anime({
        duration: 1 / 0,
        update: function () {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        }
    });

    document.addEventListener(tap, function (e) {
        if ("sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName) {
            render.play();
            updateCoords(e);
            animateParticules(pointerX, pointerY);
        }
    }, !1);

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize, !1);
}
