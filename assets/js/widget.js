/* widget */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
	// AMD
	define([], function() {
	    return (root.XservChatWidget = factory());
	});
    } else if (typeof exports === 'object') {
	// Node, CommonJS-like
	module.exports = factory();
    } else {
	// Browser globals (root is window)
	root.XservChatWidget = factory();
    }
}(this, function () {
    
    (function () {
	
	function XservChatWidget(app_id, topic, widget_id) {
		$("#" + widget_id).addClass("widget-size");

	    var xserv = new Xserv(app_id);

		xserv.addEventListener("receive_ops_response", function(json) {
			if (json.op == Xserv.OP_SUBSCRIBE && json.rc == Xserv.RC_OK) {
            	$("#" + widget_id).html('<div class="widget-wrap"><iframe scrolling="no" src="https://mobile-italia.com:8000/?app_id=' + app_id + '&room=' + json.topic + '"></iframe></div>' +
            		'<div class="widget-content"></div>' +
            		'<div class="input-group">' +
	    			'<input id="message" type="text" class="form-control" placeholder="Message">' +
	    			'<span class="input-group-btn">' +
	      			'<button id="publish" class="btn btn-default" type="button">Send</button>' +
	    			'</span>' +
	  				'</div>');
	  			
	  			$("#publish").click(function() {
           			xserv.publish(topic, $("#message").val());
           			$("#message").val("");
           			$("#message").focus();
        		});
        		
	  			$("#message").keyup(function(event){
    				if (event.keyCode == 13){
        				$("#publish").click();
    				}
				});
            } else if (json.op == Xserv.OP_UNSUBSCRIBE && json.rc == Xserv.RC_OK) {
            	$("#" + widget_id).html('');
            }
		});

		xserv.addEventListener("receive_messages", function(json) {
			var prefix = json.socket_id == xserv.getSocketId() ? "You: " : xserv.getSocketId() + ": "
            var html = "<div class='widget-content-row'><strong>" + prefix + "</strong>" + json.data + "</div>";
            $(html).hide().prependTo(".widget-content").fadeIn(1000);
		});

		xserv.addEventListener("open_connection", function() {
			xserv.subscribe(topic);
		});

		xserv.connect();
	}
	
	var prototype = XservChatWidget.prototype;
	
	this.XservChatWidget = XservChatWidget;
	
	}).call(this);

	return XservChatWidget;
}));