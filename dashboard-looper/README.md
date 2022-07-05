# chrome-dashboard-looper

Display and loop through a list of dashboard URLs on Chrome devices.

## App Flow

`background.js` - serviceworker
onInstalled
create new tab

runtime.onMessage
listen for 'get-config'
if request === 'get-config'
get-config

function get-config()
get managed and sync storage as (data)
if data.url_list //if exists
set-config(data.url_list)

function set-config()
storage.sync.set

`dashboard.js` - content page
sendMessage: get-config
if response
displayContent

`options.js` - user input

UrlField addListener
on 'enter'
sendMessage: "get-config"
SetButton addListener
on 'click'
sendMessage: 'get-config'

```javascript
When app is installed
  open dashboard page
  check managed storage for URLs
  if no URLs
    check local storage for URLs
  else
  set local storage URLs
```
