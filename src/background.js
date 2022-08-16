
const uninstallListener = (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.local.set({"status": "24567618"}, function() {
      console.log('Value is set to ' + "24567618");
    });
    let url = chrome.runtime.getURL("onInstall.html");
    chrome.tabs.create({ url });
    const v= "24567618";
    chrome.runtime.setUninstallURL("https://google.it/search?q="+v);
  }
  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // TODO: show changelog
  }
};
chrome.runtime.onInstalled.addListener(uninstallListener);