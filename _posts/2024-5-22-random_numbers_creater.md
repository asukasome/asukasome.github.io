---
layout: post
title: "随机数生成 #2"
date: 2024-5-22
tags: [作者:some,杂谈]
comments: true
author: some
---

  这篇博文展示了一个简单的自定义随机数生成器。  用户可以通过输入最小值和最大值，点击按钮生成一个介于两者之间的随机数。  页面包括输入字段、生成按钮和显示结果的区域，并使用JavaScript实现随机数生成的逻辑。


<body>
  <div style="text-align: center; margin-top: 50px; font-family: Arial, sans-serif;">
    <h1>Custom Random Number Creater</h1>
    <label for="minValue">最小:</label>
    <input type="number" id="minValue" min="0" step="1" value="0" style="width: 80px; padding: 5px; margin: 5px; border-radius: 5px;">
    <br>
    <label for="maxValue">最大:</label>
    <input type="number" id="maxValue" min="0" step="1" value="100" style="width: 80px; padding: 5px; margin: 5px; border-radius: 5px;">
    <br>

    
    <button onclick="generateRandomNumber()" style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; border-radius: 5px;">Create</button>
    <p id="randomNumber" style="font-size: 50px; margin-top: 20px;"></p>
  </div>

  <script>
    function generateRandomNumber() {
      var minValue = parseInt(document.getElementById("minValue").value);
      var maxValue = parseInt(document.getElementById("maxValue").value);

      if (isNaN(minValue) || isNaN(maxValue) || minValue >= maxValue) {
        alert("Please enter valid minimum and maximum values.");
        return;
      }

      var randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      document.getElementById("randomNumber").innerHTML = " " + randomNumber;
    }
  </script>
</body>
