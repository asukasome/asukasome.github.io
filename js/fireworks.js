// 创建一个函数来生成爱心效果
function createHeart(event) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  // 设置爱心的位置为点击或触摸的位置
  heart.style.top = `${event.clientY - 10}px`;  // 减去偏移量以调整爱心位置
  heart.style.left = `${event.clientX - 10}px`; // 减去偏移量以调整爱心位置
  
  // 添加爱心到页面中
  document.body.appendChild(heart);
  
  // 在动画结束后移除爱心元素
  setTimeout(() => {
    heart.remove();
  }, 800); // 调整这里的时间以控制爱心消失速度
}

// 监听整个文档的点击事件
document.addEventListener('click', function(event) {
  createHeart(event);
});

// 监听整个文档的触摸事件
document.addEventListener('touchstart', function(event) {
  // 阻止触摸事件的默认行为，例如页面滚动
  event.preventDefault();
  
  // 仅处理单指触摸，多指触摸会忽略
  if (event.touches.length === 1) {
    createHeart(event.touches[0]);
  }
});
