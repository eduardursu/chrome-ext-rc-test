chrome.storage.local.get(['status'], function(result) {
        var value = result.status;
        document.querySelector("#test").innerHTML="status:"+value
      });
    