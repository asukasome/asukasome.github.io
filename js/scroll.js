// 引入Font Awesome图标库
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
document.head.appendChild(link);

// 创建按钮元素
const createButton = (className, iconClass) => {
  const button = document.createElement('button');
  button.className = className;
  const icon = document.createElement('i');
  icon.className = iconClass;
  button.appendChild(icon);
  return button;
};

// 创建滚动按钮
const scrollToTopBtn = createButton('scroll-to-top', 'fas fa-arrow-up');
const scrollToBottomBtn = createButton('scroll-to-bottom', 'fas fa-arrow-down');

// 添加按钮到页面
document.body.append(scrollToTopBtn, scrollToBottomBtn);

// 样式
const style = `
  .scroll-to-top,
  .scroll-to-bottom {
    position: fixed;
    display: none;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background-color: #87ceeb;
    color: #fff;
    font-size: 16px;
    bottom: 30px;
    right: 25px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
  }

  .show {
    display: block !important;
  }

  .hide {
    display: none !important;
  }
`;

// 添加样式到页面
const styleElement = document.createElement('style');
styleElement.textContent = style;
document.head.appendChild(styleElement);

// 滚动事件监听器
let lastScrollTop = 0;
let timer = null;

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    showBtn(scrollToBottomBtn);
    hideBtn(scrollToTopBtn);
  } else {
    showBtn(scrollToTopBtn);
    hideBtn(scrollToBottomBtn);
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

  clearTimeout(timer);
  timer = setTimeout(() => {
    hideBtn(scrollToTopBtn);
    hideBtn(scrollToBottomBtn);
  }, 1000); // 在3秒钟后隐藏按钮
};

window.addEventListener('scroll', handleScroll);

// 点击事件监听器
const handleClick = (btn, position) => {
  window.scrollTo({
    top: position,
    behavior: 'smooth',
  });
  
  clearTimeout(timer);
  timer = setTimeout(() => {
    hideBtn(scrollToTopBtn);
    hideBtn(scrollToBottomBtn);
  }, 1000); // 在3秒钟后隐藏按钮
};

scrollToTopBtn.addEventListener('click', () => {
  handleClick(scrollToTopBtn, 0);
});

scrollToBottomBtn.addEventListener('click', () => {
  handleClick(scrollToBottomBtn, document.body.scrollHeight);
});

// 函数：显示按钮
const showBtn = (btn) => {
  btn.classList.remove('hide');
  btn.classList.add('show');
};

// 函数：隐藏按钮
const hideBtn = (btn) => {
  btn.classList.remove('show');
  btn.classList.add('hide');
};
