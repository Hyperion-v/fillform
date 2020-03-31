var currentSetupKey = null;
var core = {
    getOptions: function () {
        var result;
        try {
            result = JSON.parse(localStorage.settings);
            result = result[currentSetupKey];
        } catch (e) {
            result = null;
        }

        return result;
    }
};

function fill(info, tab) {
    chrome.tabs.executeScript(null, {file: "jquery-3.1.1.min.js"}, function () {
        chrome.tabs.executeScript(null, {file: "faker.js"}, function () {
            chrome.tabs.executeScript(
                null,
                {
                    code:
                        "var deepAutofillChromeExtensionSettings = " +
                        JSON.stringify(core.getOptions()) +
                        ";"
                },
                function () {
                    chrome.tabs.executeScript(null, {file: "run.js"}, function () {
                        // chrome.notifications.create(
                        //   "name-for-notification",
                        //   {
                        //     type: "basic",
                        //     iconUrl: "monkey48.png",
                        //     title: "OK",
                        //     message: "success"
                        //   },
                        //   function() {}
                        // );
                    });
                }
            );
        });
    });
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "getOptions"){
            var list=JSON.parse(localStorage.settings);
            var settings = JSON.parse(localStorage.settings);
            var deepAutofillChromeExtensionSettings={};
            for (var curObj in settings) {
                deepAutofillChromeExtensionSettings=settings[curObj];
            }
            sendResponse(deepAutofillChromeExtensionSettings );

        }
    });

function fillfinal(info, tab) {
    debugger
    chrome.tabs.executeScript(null, {file: "jquery-3.1.1.min.js"}, function () {
        chrome.tabs.executeScript(null, {file: "faker.js"}, function () {
            chrome.tabs.executeScript(
                null,
                {
                    code:
                        "var deepAutofillChromeExtensionSettings = " +
                        JSON.parse(localStorage.settings) +
                        ";"
                },
                function () {
                    chrome.tabs.executeScript(null, {file: "run.js"}, function () {
                        // chrome.notifications.create(
                        //   "name-for-notification",
                        //   {
                        //     type: "basic",
                        //     iconUrl: "monkey48.png",
                        //     title: "OK",
                        //     message: "success"
                        //   },
                        //   function() {}
                        // );
                    });
                }
            );
        });
    });
}



function getScheme(info, tab) {
    chrome.tabs.executeScript(null, {file: "jquery-3.1.1.min.js"}, function () {
        chrome.tabs.executeScript(null, {file: "faker.js"}, function () {
            chrome.tabs.executeScript(
                null,
                {
                    code:
                        "var deepAutofillChromeExtensionSettings = " +
                        JSON.stringify(tab.url) +
                        ";"
                },
                function () {
                    chrome.tabs.executeScript(null, {file: "scheme.js"}, function () {
                        var optionsUrl = chrome.extension.getURL("options.html");
                        chrome.tabs.create({url: optionsUrl});
                        chrome.notifications.create(
                            "name-for-notification",
                            {
                                type: "basic",
                                iconUrl: "monkey48.png",
                                title: "Selectors copied",
                                message:
                                    "Simply paste the new configuration to a prefered position in you settings."
                            },
                            function () {
                            }
                        );
                    });
                }
            );
        });
    });
}

var settings = localStorage.settings ? JSON.parse(localStorage.settings) : {};
var mainContextMenuItem = chrome.contextMenus.create({
    title: "daxian"
});
if (localStorage.settings !== undefined) {
    for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
            var menuSetup = settings[key];
            chrome.contextMenus.create({
                title: key,
                contexts: ["page"],
                onclick: function (info, tab) {
                    currentSetupKey = key;
                    fill(info, tab);
                },
                parentId: mainContextMenuItem
            });
        }
    }
    for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
            var menuSetup = settings[key];
        }
    }
}


// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//   var url = tabs[0].url.toString(), result;
//   if(localStorage.settings){
//     result = JSON.parse(localStorage.settings);
//     for (var curObj in result) {
//      // var value={"auto":result[curObj].auto,"fields":result[curObj].fields};
//       localStorage.setItem(result[curObj].url,result[curObj].auto);
//     }
//     // alert(123);
//   }
//
// });

// chrome.contextMenus.create({
//   title: "Random",
//   contexts: ["page"],
//   onclick: function(info, tab) {
//     currentSetupKey = null;
//     fill(info, tab);
//   }
// });

// chrome.contextMenus.create({
//   title: "Get Scheme",
//   contexts: ["page"],
//   onclick: function(info, tab) {
//     getScheme(info, tab);
//   }
// });

// chrome.contextMenus.create({
//   title: "Options",
//   contexts: ["page"],
//   onclick: function(info, tab) {
//     var optionsUrl = chrome.extension.getURL("options.html");
//     chrome.tabs.create({ url: optionsUrl });
//   }
// });

chrome.browserAction.onClicked.addListener(function (tab) {
    currentSetupKey = null;
    // chrome.tabs.sendMessage(tab.id,{"message":"hide"});
    // console.info(core)
    fill(null, tab);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //{greeting:url}
    try {
        var url = request.greeting;
        var settings = JSON.parse(localStorage.settings);
        for (var curObj in settings) {
            var targeturl = settings[curObj].url;
            var auto = settings[curObj].auto;
            // debugger
            if (url.indexOf(targeturl) !== -1 && auto === true) {
                fillfinal(null, null);
            }
        }

    } catch (e) {
        // alert(e);
    }

    sendResponse('ans:ok');
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url) {
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}

// 新标签打开某个链接
function openUrlNewTab(url) {
    chrome.tabs.create({url: url});
}

//判断某个标签页是否存在
function isExistTab(callback) {
    chrome.tabs.getAllInWindow(null, function (tabs) {
        bexist = false;
        // for ( var i = 0; i <tabs.length; i++)
        // {
        //   url = tabs[i].url;
        //   if(url.indexOf("t") !== -1)
        //   {
        //     bexist = true;
        //     break;
        //   }
        // }

        callback(true)
        // if(callback) callback(bexist)
    });
}
