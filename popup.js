var su = 'default value';

// Make links open new tab window
$(document).ready(function(){
  $('body').on('click', 'a', function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });
});

// Copy provided text to the clipboard.
function copyTextToClipboard(text) {
  var copyFrom = $('<textarea/>');
  copyFrom.text(text);
  $('body').append(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.remove();
}

// REST client query
function makeShort(tablink) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://api.url.joor.net/api/shorten', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var req = {name:"John Rambo", time:"2pm"};
  var req = {
    secret_key: "", 
    expire_after: null, 
    is_protected: false, 
    owner: null, 
    is_custom: false, 
    short_code: "", 
    long_url: tablink, 
    description: null
  };
  var data = JSON.stringify(req);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var jresponse = JSON.parse(xhr.responseText);
      su = jresponse.short_url; //+ '/' + jresponse.short_code;
      var link = "<a href='"+su+"'>"+su+"</a>";
      document.getElementById("short-url").innerHTML = link;
    }
  }
  xhr.send(data);
}

chrome.tabs.getSelected(null,function(tab) {
  var tablink = tab.url; 
  document.getElementById("long-url").setAttribute('value',tablink);
  document.getElementById("short").onclick = function() {
    makeShort(tablink);
  };
  document.getElementById("cc").onclick = function() {
    copyTextToClipboard(su);
  }
});

