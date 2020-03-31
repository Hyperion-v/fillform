document.addEventListener('DOMContentLoaded', function()
{
    try
    {
            chrome.runtime.sendMessage({greeting:location.href}, function(response) {

            });

    }
    catch(e)
    {
        // alert(e);
    }

});
