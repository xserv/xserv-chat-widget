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
	
	function XservChatWidget(app_id, topic, widget_id, widget_toggle_id, welcome) {
	    var open = false;
	    var widget = $('#' + widget_id);
	    var widget_toggle = $('#' + widget_toggle_id);
	    widget_toggle.hide();
	    
	    widget.addClass('widget-size');
	    widget_toggle.addClass('widget-toggle');
	    widget_toggle.append("<div class='img'></div>");
	    
	    widget_toggle.click(function() {
		if (!widget.children().length > 0) {
		    if (!open) {
			widget_toggle.attr('class', 'widget-toggle widget-toggle-off');
			xserv.subscribe(topic);
		    }
		} else {
		    if (open) {
			widget_toggle.attr('class', 'widget-toggle');
			xserv.unsubscribe(topic);
		    }
		}
	    });
	    
	    var xserv = new Xserv(app_id);
	    
	    xserv.addEventListener("receive_ops_response", function(json) {
		if (json.op == Xserv.OP_SUBSCRIBE && json.rc == Xserv.RC_OK) {
		    var row_welcome = '';
		    if (welcome) {
			row_welcome = "<div class='widget-content-row'><strong>" + welcome + "</strong></div>";
		    }
            	    widget.html('<div class="widget-wrap">' +
				'<iframe scrolling="no" src="https://mobile-italia.com:8000/?app_id=' +
				app_id + '&room=' + json.topic + '"></iframe></div>' +
				'<div class="widget-content">' + row_welcome + '</div>' +
            			'<div class="input-group">' +
	    			'<input id="message" type="text" class="form-control" placeholder="Message">' +
	    			'<span class="input-group-btn">' +
	      			'<button id="publish" class="btn btn-default" type="button">Send</button>' +
	    			'</span></div>');
	  	    
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
		    
		    widget.animate({opacity: 1}, 500, function() {
    			open = true;
  		    });
		} else if (json.op == Xserv.OP_UNSUBSCRIBE && json.rc == Xserv.RC_OK) {
            	    widget.animate({opacity: 0}, 500, function() {
    			widget.html('');
    			open = false;
  		    });
		}
	    });
	    
	    xserv.addEventListener("receive_messages", function(json) {
		var prefix = json.socket_id == xserv.getSocketId() ? "You: " : xserv.getSocketId() + ": "
		var html = "<div class='widget-content-row'><strong>" + prefix + "</strong>" + json.data + "</div>";
		$(html).hide().prependTo(".widget-content").fadeIn(1000);
	    });
	    
	    xserv.addEventListener("open_connection", function() {
		widget_toggle.show();
	    });
	    
	    xserv.connect();
	}
	
	var prototype = XservChatWidget.prototype;
	
	this.XservChatWidget = XservChatWidget;
	
    }).call(this);
    
    return XservChatWidget;
}));
