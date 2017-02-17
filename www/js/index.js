/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var onLogin = function () {
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    KiiUser.authenticate(username, password).then(function (user) {
        moveMainPage();
    }).catch(function (e) {
        alert(JSON.stringify(e));
    });
};

var onSignup = function () {
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    var user = KiiUser.userWithUsername(username, password);
    user.register().then(function (user) {
        moveMainPage();
    }).catch(function (e) {
        alert(JSON.stringify(e));
    });
};

function moveMainPage() {
    $("#user_id").text('UserID: ' + KiiUser.getCurrentUser().getID());
    $.mobile.changePage('#main_page');
    initializePush();
}
function initializePush() {
    var platform = device.platform.toUpperCase();
    var push = PushNotification.init({
        android: {
            senderID: "570067681475"
        },
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });
    push.on('registration', function(data) {
        // data.registrationId
        KiiUser.getCurrentUser().pushInstallation()._install(data.registrationId, platform, true)
        .then(function(response) {
            alert(JSON.stringify(response));
        }).catch(function (e) {
            alert(JSON.stringify(e));
        });
    });
    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        alert(JSON.stringify(data));
    });
    push.on('error', function(e) {
        // e.message
        alert(JSON.stringify(e));
    });
}

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        if (id === 'deviceready') {
            Kii.initializeWithSite('79dddd14', 'f6e328f969f99ada6d96770b058346eb', KiiSite.JP);
            $("#btn_login").click(onLogin);
            $("#btn_register").click(onSignup);
        }
    }
};

app.initialize();