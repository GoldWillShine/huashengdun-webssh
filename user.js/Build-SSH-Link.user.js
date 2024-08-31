// ==UserScript==
// @name         Build SSH Link (Optimized)
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Build SSH link for huashengdun-webssh with copy feature (optimized version)
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
    
    // 获取已存在的按钮和div元素
    var buildLinkBtn = document.getElementById("sshlinkBtn");
    var sshlinkdiv = document.getElementById("sshlink");

    // 设置div的样式
    sshlinkdiv.style.cursor = "pointer";
    sshlinkdiv.style.marginTop = "10px";
    sshlinkdiv.style.padding = "10px";
    sshlinkdiv.style.backgroundColor = "#f8f9fa";
    sshlinkdiv.style.borderRadius = "5px";

    // 让按钮的click事件调用updateSSHlink函数
    buildLinkBtn.addEventListener("click", updateSSHlink);

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

    function updateSSHlink() {
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
        var sshlinkstr = thisPageProtocol + "//" + thisPageUrl + "/?hostname=" + hostnamestr + "&port=" + portstr + "&username=" + usrnamestr + "&password=" + passwdstrAfterBase64;
        sshlinkdiv.textContent = sshlinkstr;
        sshlinkdiv.title = "Click to copy";
    }
})();
