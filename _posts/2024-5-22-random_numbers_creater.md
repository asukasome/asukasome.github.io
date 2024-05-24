---
layout: post
title: "随机数生成 #2"
date:   2024-5-22
tags: [作者:some,杂谈]
comments: true
author: some
---


<title>Custom Random Number Generator</title>
<style>
.container {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}
input[type="number"] {
  width: 80px;
  padding: 5px;
  margin: 5px;
  radian:20px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  radian:20px;
}
button:hover {
  background-color: #0056b3;
}
#randomNumber {
  font-size: 24px;
  margin-top: 20px;
}
</style>
</head>
<body>
<div class="container">
  <h1>Custom Random Number Generator</h1>
  <label for="minValue">Minimum Value:</label>
  <input type="number" id="minValue" min="0" step="1" value="0">
  <br>
  <label for="maxValue">Maximum Value:</label>
  <input type="number" id="maxValue" min="0" step="1" value="100">
  <br>
  <button onclick="generateRandomNumber()">Generate Random Number</button>
  <p id="randomNumber"></p>
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
  document.getElementById("randomNumber").innerHTML = "Random Number: " + randomNumber;
}
</script>

