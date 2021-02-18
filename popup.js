// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let mainCategory = document.getElementById('mainCategory')

function removeOptions(selectElement) {
  let i
  let L = selectElement.options.length - 1
  for (let i = L; i >= 0; i--) {
    selectElement.remove(i)
  }
}

mainCategory.onchange = function(e) {
  let main = e.target.value
  let subCategory = document.getElementById('subCategory')
  removeOptions(subCategory)
  if (main == 'Frontend') {
    let subItems = ['React', 'Vue.js', 'HTML & CSS']
    for (let i = 0; i < subItems.length; i++) {
      let item = subItems[i]
      let option = document.createElement('option')
      option.innerText = item
      subCategory.append(option)
    }
  } else if (main == 'Backend') {
    let subItems = ['Django', 'Spring', 'Node.js', 'Flask']
    for (let i = 0; i < subItems.length; i++) {
      let item = subItems[i]
      let option = document.createElement('option')
      option.innerText = item
      subCategory.append(option)
    }
  } else if (main == 'Database') {
    let subItems = ['MySQL', 'MariaDB', 'Redis']
    for (let i = 0; i < subItems.length; i++) {
      let item = subItems[i]
      let option = document.createElement('option')
      option.innerText = item
      subCategory.append(option)
    }
  } else if (main == 'Server') {
    let subItems = ['Jenkins', 'AWS', 'Docker']
    for (let i = 0; i < subItems.length; i++) {
      let item = subItems[i]
      let option = document.createElement('option')
      option.innerText = item
      subCategory.append(option)
    }
  } else if (main == '기타') {
    let subItems = ['운영', '발표', '평가',  '명세서']
    for (let i = 0; i < subItems.length; i++) {
      let item = subItems[i]
      let option = document.createElement('option')
      option.innerText = item
      subCategory.append(option)
    }
  }
}

let titleInput = document.getElementById('title')
titleInput.oninput = function(e) {
  let data = {
    message: 'title',
    question: {
      title: titleInput.value,
      content: contentInput.value
    },
  }
  chrome.runtime.sendMessage(data, function() {})
}

let contentInput = document.getElementById('content')
contentInput.oninput = function(e) {
  let data = {
    message: 'content',
    question: {
      title: titleInput.value,
      content: contentInput.value
    }
  }
  chrome.runtime.sendMessage(data, function() {})
}

let nameInput = document.getElementById('name')
let passwordInput = document.getElementById('password')
let submitButton = document.getElementById('submitButton')
let subCategory = document.getElementById('subCategory')
let keyword = document.getElementById('keyword')

submitButton.onclick = function(e) {
  e.preventDefault()
  if (titleInput.value.trim().length > 0 && contentInput.value.trim().length > 0) {
    let data = {
      message: 'submit',
      question: {
        title: titleInput.value,
        content: contentInput.value,
        author: nameInput.value,
        mainCategory: mainCategory.value,
        subCategory: subCategory.value,
        keyword: keyword.value
      },
      user: {
        name: nameInput.value,
        password: passwordInput.value
      }
    }
    chrome.runtime.sendMessage(data, function() {})
  } else {
    alert('질문을 제대로 입력해주세요.')
  }
}

let resetButton = document.getElementById('resetButton')

resetButton.onclick = function(e) {
  e.preventDefault()
  titleInput.value = ''
  contentInput.value = ''
}

chrome.runtime.onMessage.addListener(function(data) {
  if (data.message == 'success') {
    resetButton.click()
    alert('질문이 등록되었습니다.')
  } else if (data.message == '401') {
    alert('로그인 정보를 제대로 입력해주세요.')
  } else {
    alert('error')
  }
})