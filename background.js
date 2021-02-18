// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  console.log('on installed')
});

chrome.runtime.onMessage.addListener(function(data) {
  if (data.message == 'submit') {
    let url = 'http://t4coach38.p.ssafy.io/askme/users/login'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.user.name,
        password: data.user.password
      })
    })
      .then(res => res = res.json())
      .then(body => {
        let url2 = 'http://t4coach38.p.ssafy.io/askme/questions'
        fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + body.token 
          },
          body: JSON.stringify({
            title: data.question.title,
            content: data.question.content,
            author: data.question.author,
            mainCategory: data.question.mainCategory,
            subCategory: data.question.subCategory,
            keyword: data.question.keyword
          })
        })
          .then(res => {
            if (res.status == 200) {
              chrome.runtime.sendMessage({
                message: 'success'
              })
            } else if (res.status == 401) {
              chrome.runtime.sendMessage({
                message: '401'
              })
            } else {
              chrome.runtime.sendMessage({
                message: 'error'
              })
            }
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  } else if (data.message == 'title') {
    chrome.storage.sync.set({title: data.question.title}, function() {})
  } else if (data.message == 'content') {
    chrome.storage.sync.set({content: data.question.content}, function() {})
  }
})