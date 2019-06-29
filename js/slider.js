window.onload = function () {
  var slider = document.getElementById('slider');
  var list = document.getElementById('slider-list');
  var buttons = slider.getElementsByTagName('span');
  var next = document.getElementById('next');
  var prev = document.getElementById('prev');
  var index = 0;
  var timer;
  var animated = false;

  //箭头切换函数
  function animate (offset) {
      animated = true;
      var newLeft = parseInt(list.style.left) + offset;
      var time = 300;
      var interval = 10;
      var speed = offset/(time/interval);

      //图片切换时加入动画
      function go () {
          if((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
              list.style.left = parseInt(list.style.left) + speed + 'px';
              setTimeout(go,interval);
          }
          else {
              animated = false;
              list.style.left=newLeft + 'px';
              if(newLeft > 0) {
                  list.style.left = -3160 + 'px';
              }
              if(newLeft < -3160) {
                  list.style.left = 0 + 'px';
              }
          }
      };
      go();
  };

  //小圆点显示函数
  function showBtn () {
      for(var i = 0;i < buttons.length; i++) {
          buttons[i].className = '';
      }
      buttons[index].className = 'on';
  };

  //小圆点切换函数
  for(var i = 0;i < buttons.length;i++) {
      buttons[i].onclick = function () {
          if(this.className == 'on') {
              return;
          }
          var myIndex = parseInt(this.getAttribute('index'));
          offset = -790*(myIndex - index);

          animate(offset);
          index = myIndex;
          showBtn();
      }
  }

  next.onclick = function () {
      if(index == 4) {
          index = 0;
      }
      else {
          index++;
      }
      showBtn();
      if(!animated) {
          animate(-790);
      }
  };

  prev.onclick = function () {
      if(index == 0) {
          index = 4;
      }
      else {
          index--;
      }
      showBtn();
      if(!animated) {
          animate(790);
      }
  };
  
  //自动播放
  function autoPlay () {
      timer = setInterval(function(){
          next.onclick();
      },3000)
  };

  function stop () {
      clearInterval(timer);
  };

  slider.onmouseover=stop;
  slider.onmouseout=autoPlay;

  autoPlay();
};
