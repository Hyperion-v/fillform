function msg(title, message) {
  chrome.notifications.create(
    "name-for-notification",
    {
      type: "basic",
      iconUrl: "icon48.png",
      title: title,
      message: message
    },
    function() {}
  );
}



//  var demoSettings ={
//   "案例1-test1.html": {
//   "randomLocale": "de",
//       "url":"test1.html",
//       "fields": [
//     {
//       "selector": "input[name='textbox3']",
//       "static": "填充文本"
//     },
//     {
//       "selector": "input[name='textbox4']",
//       "static": "填充数字"
//     }
//
//
//   ]
// }
// }

// var demoSettings ={
//     "案例1": {
//         "randomLocale": "de",
//         "url":"119l",
//         "auto": true,
//         "fields": [
//             {
//                 "selector": "input[name='textbox3']",
//                 "static": "填充文本"
//             },
//             {
//                 "selector": "input[name='textbox4']",
//                 "static": "填充数字"
//             }
//
//
//         ]
//     }
// }
//

var demoSettings ={
    "案例1": {
        "randomLocale": "de",
        "url":"form",
        "auto": true,
        "fields": [
            {
                "selector": ":input",
                "static": "填充文本"
            }
            // {
            //     "selector": input",
            //     "static": "填充数字"
            // }


        ]
    }
}



jQuery(function($) {
  debugger;
  var text = localStorage.settings
    ? localStorage.settings
    : JSON.stringify(demoSettings, null, "\t");
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setValue(text);
  editor.commands.addCommand({
    name: "save_settings",
    bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
    exec: function(editor) {
      try {
        var data = editor.session.getValue();
        var parsedData = JSON.parse(data); // try it to see if setting are valid
        localStorage.settings = data;
        chrome.runtime.reload();
        msg("Settings saved successfully", "☑️"); // error in the above string (in this case, yes)!
      } catch (e) {
        msg("⚠️ Error", e); // error in the above string (in this case, yes)!
      }
    }
  });
});
