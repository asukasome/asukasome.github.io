---
layout: post
title: "随机数生成 #2"
date:   2024-5-22
tags: [作者:some,杂谈]
comments: true
author: some
---

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Custom Random Number Generator</title>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    text-align: center;
  }
  h1 {
    color: #007bff;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }
  input {
    width: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
  #randomNumber {
    font-size: 24px;
    margin-top: 20px;
    color: #333;
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
</body>
</html>
