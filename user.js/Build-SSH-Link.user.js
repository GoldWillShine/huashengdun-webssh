// ==UserScript==
// @name         Build SSH Link
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Build SSH link for huashengdun-webssh with copy feature
// @author       ǝɔ∀ǝdʎz∀ɹɔ 👽
// @author       GoldWillShine ⚜️
// @match        https://ssh.vps.vc/*
// @match        https://ssh.hax.co.id/*
// @match        https://ssh-crazypeace.koyeb.app/
// @match        https://nodeloc.koyeb.app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=koyeb.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // 获取 form 元素
    var form = document.getElementById("connect");

    // 创建 `<button>` 元素
    var buildLinkBtn = document.createElement("button");
    // 设置 `<button>` 的属性
    buildLinkBtn.type = "button";
    buildLinkBtn.className = "btn btn-info";
    buildLinkBtn.innerHTML = "Build SSH Link";
    buildLinkBtn.id = "sshlinkBtnA";
    // 将 `<button>` 添加到 `<form>` 元素范围内部的尾部
    form.appendChild(buildLinkBtn);

    // 创建 `<div>` 元素
    var sshlinkdiv = document.createElement("div");
    // 设置 `<div>` 的属性
    sshlinkdiv.id = "sshlinkA";
    sshlinkdiv.style.cursor = "pointer";
    sshlinkdiv.style.marginTop = "10px";
    sshlinkdiv.style.padding = "10px";
    sshlinkdiv.style.backgroundColor = "#f8f9fa";
    sshlinkdiv.style.borderRadius = "5px";
    // 将 `<div>` 添加到 `<form>` 元素范围内部的尾部
    form.appendChild(sshlinkdiv);

    // 让按钮的click事件 调用 updateSSHlinkA 函数
    document.querySelector('#sshlinkBtnA').addEventListener("click", updateSSHlinkA);

    // 添加复制功能
    sshlinkdiv.addEventListener("click", function() {
        var text = this.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(function() {
                alert('SSH link copied to clipboard!');
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        }
    });
})();

function updateSSHlinkA() {
    var thisPageProtocol = window.location.protocol;
    var thisPageUrl = window.location.host;
    var hostnamestr = document.getElementById("hostname").value;
    var portstr = document.getElementById("port").value;
    if (portstr == "") {
        portstr = "22"
    }
    var usrnamestr = document.getElementById("username").value;
    if (usrnamestr == "") {
        usrnamestr = "root"
    }
    var passwdstr = document.getElementById("password").value;
    var passwdstrAfterBase64 = window.btoa(passwdstr);
    var sshlinkstr;
    sshlinkstr = thisPageProtocol+"//"+thisPageUrl+"/?hostname="+hostnamestr+"&port="+portstr+"&username="+usrnamestr+"&password="+passwdstrAfterBase64;
    var sshlinkdiv = document.getElementById("sshlinkA");
    sshlinkdiv.textContent = sshlinkstr;
    sshlinkdiv.title = "Click to copy";
}
