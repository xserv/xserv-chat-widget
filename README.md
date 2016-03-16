<p align="center" >
  <img src="http://mobile-italia.com/xserv/assets/images/logo-big.png?t=3" alt="Xserv" title="Xserv">
</p>

<br>

This JavaScript widget allows you easily use [Xserv](http://mobile-italia.com/xserv/) WebSocket API for text and video/audio messaging on your site (integration with WebRTC).<br>
[Xserv](http://mobile-italia.com/xserv/) is a platform of real-time bi-directional messaging via WebSockets to web and mobile apps, or any other Internet connected device.

## Live Demo

Small Floating Widget (with toggle button) https://mobile-italia.com/xserv/try/widget/index.html

Multi-Client Widget https://mobile-italia.com/xserv/try/widget/index-full.html

## How To Get Started

- [Download xserv-chat-widget](https://github.com/xserv/xserv-chat-widget/archive/master.zip) and try out the included JavaScript example apps.

##Installation

### Sign Up on Xserv

You need sign up on Xserv to get your `app_id` on Xserv Dashboard. That is an identifier of your application.

https://mobile-italia.com/xserv/dashboard/signup

### Include dependecies

```html
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="assets/css/widget.css">

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="https://mobile-italia.com/xserv/xserv.min.js"></script>
<script src="assets/js/widget.js"></script>
```

### Init 1. small floating widget (with toogle button)

```html
<script>
  $().ready(function() {
    var widget = new XservChatWidget(<app_id>, <topic>, "widget", "widget-toggle", "");
    // 'app_id' is an identifier of your application, You can found it on Xserv dashboard.
    // You need sign up on https://mobile-italia.com/xserv/dashboard/signup
    
    // 'topic' is the argument of discussion
    
    // last arg is a welcome message
  });
</script>

...

<div id="widget"></div>
<div id="widget-toggle"><div class="img"></div></div>
```

### Init 2. multi-client widget (large, no floating, no toggle button)

```html
<script>
  $().ready(function() {
    var widget = new XservChatWidget(<app_id>, <topic>, "widget", null, "");
    // 'app_id' is an identifier of your application, You can found it on Xserv dashboard.
    // You need sign up on https://mobile-italia.com/xserv/dashboard/signup
    
    // 'topic' is the argument of discussion
    
    // last arg is a welcome message
  });
</script>

...

<div id="widget"></div>
```

### Manage Widget toggle events

```javascript
widget.addEventListener("widget_open", function(json) {
  
});

widget.addEventListener("widget_close", function(json) {
  
});
```

### Extra

If you want Xserv connector events.

```javascript
widget.addEventListener("open_connection", function() {
  
});

widget.addEventListener("close_connection", function(event) {
  
});

widget.addEventListener("error_connection", function(event) {
  
});

widget.addEventListener("receive_ops_response", function(json) {
  
});

widget.addEventListener("receive_messages", function(json) {
  
});
```

If you want send a WebSocket API command to Xserv connector.

```javascript
var xserv = widget.xserv; // widget.getXserv();
// some ex.
xserv.subscribe(topic);
xserv.unsubscribe(topic);
xserv.users(topic);
...
```

##Screnshot

An example of use on our site.

Live demo

Floating Widget with toggle button https://mobile-italia.com/xserv/try/widget/index.html

Multi-client Widget https://mobile-italia.com/xserv/try/widget/index-full.html

![](screenshot.png)

## Credits

Xserv is owned and maintained by the [mobile-italia.com] (http://mobile-italia.com).

### Security Disclosure

If you believe you have identified a security vulnerability with Xserv, you should report it as soon as possible via email to xserv.dev@gmail.com. Please do not post it to a public issue tracker.

## License

Xserv is released under the GNU General Public License Version 3. See LICENSE for details.
