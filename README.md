# xserv-chat-widget

```html
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="assets/css/widget.css">

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://mobile-italia.com/xserv/xserv.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/widget.js"></script>
```

```html
<script>
  $().ready(function() {
    var widget = new XservChatWidget("C3eBY-1", "my_topic", "widget", "widget-toggle");
	});
</script>
...

<div id="widget"></div>
<div id="widget-toggle"><div class="img"></div></div>
```
