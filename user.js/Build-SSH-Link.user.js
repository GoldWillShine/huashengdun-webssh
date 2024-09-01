// ==UserScript==
// @name         Build SSH Link (Optimized)
// @namespace    http://tampermonkey.net/
// @version      0.4
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

    // 获取已存在的 SSH Link 按钮和 sshlink div
    var buildLinkBtn = document.getElementById("sshlinkBtn");
    var sshlinkdiv = document.getElementById("sshlink");

    // 让按钮的click事件调用 updateSSHlink 函数
    buildLinkBtn.addEventListener("click", updateSSHlink);

    // 添加点击复制功能
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
    var sshlinkstr;
    sshlinkstr = thisPageProtocol+"//"+thisPageUrl+"/?hostname="+hostnamestr+"&port="+portstr+"&username="+usrnamestr+"&password="+passwdstrAfterBase64;
    document.getElementById("sshlink").textContent = sshlinkstr;
}
