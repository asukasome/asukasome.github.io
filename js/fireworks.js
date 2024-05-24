<canvas class="fireworks"></canvas>
<script>
  "use strict";

  var canvasEl = document.querySelector('.fireworks');
  if (canvasEl) {
    var ctx = canvasEl.getContext('2d');
    var numberOfParticules = 20;
    var pointerX = 0;
    var pointerY = 0;
    var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    var colors = ['#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD', '#E0FFFF']; // 马卡龙色系

    function updateCoords(e) {
      pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left;
      pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
    }

    function setParticuleDirection(e) {
      var angle = Math.random() * 360 * Math.PI / 180;
      var value = Math.random() * (180 - 50) + 50;
      var radius = [-1, 1][Math.floor(Math.random() * 2)] * value;
      return { x: e.x + radius * Math.cos(angle), y: e.y + radius * Math.sin(angle) };
    }

    function createParticule(x, y) {
      var p = {};
      p.x = x;
      p.y = y;
      p.color = colors[Math.floor(Math.random() * colors.length)];
      p.radius = Math.random() * (32 - 16) + 16;
      p.alpha = 1;
      p.endPos = setParticuleDirection(p);
      p.draw = function () {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      };
      return p;
    }

    function createCircle(x, y) {
      var p = {};
      p.x = x;
      p.y = y;
      p.color = "#FFF";
      p.radius = 0.1;
      p.alpha = 0.5;
      p.lineWidth = 6;
      p.draw = function () {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = p.lineWidth;
        ctx.strokeStyle = p.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
      };
      return p;
    }

    function renderParticule(anim) {
      for (var i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
      }
    }

    function animateParticules(x, y) {
      var circle = createCircle(x, y);
      var particules = [];
      for (var i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y));
      }
      anime.timeline().add({
        targets: particules,
        x: function (p) { return p.endPos.x; },
        y: function (p) { return p.endPos.y; },
        radius: 0.1,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: 600,
        },
        duration: Math.random() * (1800 - 1200) + 1200,
        easing: 'easeOutExpo',
        update: renderParticule
      }).add({
        targets: circle,
        radius: Math.random() * (160 - 80) + 80,
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: 600,
        },
        duration: Math.random() * (1800 - 1200) + 1200,
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0
      });
    }

    function debounce(func, wait) {
      var timeout;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    }

    var setCanvasSize = debounce(function () {
      canvasEl.width = 2 * window.innerWidth;
      canvasEl.height = 2 * window.innerHeight;
      canvasEl.style.width = window.innerWidth + 'px';
      canvasEl.style.height = window.innerHeight + 'px';
      canvasEl.getContext('2d').scale(2, 2);
    }, 500);

    var render = anime({
      duration: Infinity,
      update: function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }
    });

    document.addEventListener(tap, function (e) {
      if (e.target.id !== 'sidebar' && e.target.id !== 'toggle-sidebar' && e.target.nodeName !== 'A' && e.target.nodeName !== 'IMG') {
        render.play();
        updateCoords(e);
        animateParticules(pointerX, pointerY);
      }
    }, false);

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);
  }
</script>
