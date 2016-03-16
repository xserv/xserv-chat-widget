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
	    if (typeof topic === 'string' || topic instanceof String) {
		topic = {topic: topic, auth: {params: {user: "", pass: ""}}};
	    } else {
		topic = {topic: topic.topic, auth: {params: {user: topic.user, pass: topic.pass}}};
	    }
	    var open = false;
	    
	    var widget = $('#' + widget_id);
	    
	    var widget_toggle = null;
	    if (widget_toggle_id) {
		widget_toggle = $('#' + widget_toggle_id);
		widget_toggle.hide();
		
		widget_toggle.addClass('widget-toggle');
		widget_toggle.append("<div class='img'></div>");
		
		widget_toggle.click(function() {
		    if (!widget.children().length > 0) {
			if (!open) {
			    widget_toggle.attr('class', 'widget-toggle widget-toggle-off');
			    xserv.subscribe(topic.topic, topic.auth);
			}
		    } else {
			if (open) {
			    widget_toggle.attr('class', 'widget-toggle');
			    xserv.unsubscribe(topic.topic);
			}
		    }
		});
	    }
	    
	    widget.addClass('widget-size');
	    
	    var xserv = new Xserv(app_id);
	    this.xserv = xserv;
	    
	    xserv.addEventListener("receive_ops_response", function(json) {
		if (json.op == Xserv.OP_SUBSCRIBE && json.rc == Xserv.RC_OK && json.topic == topic.topic) {
		    var row_welcome = '';
		    if (welcome) {
			row_welcome = "<div class='widget-content-row'><strong>" + welcome + "</strong></div>";
		    }
            	    widget.html('<div class="widget-wrap">' +
				'<iframe scrolling="no" src="https://mobile-italia.com:8000/?app_id=' +
				app_id + '&room=' + json.topic.replace("@", "priv_") + '"></iframe></div>' + 
				'<div class="widget-content">' + row_welcome + '</div>' +
            			'<div class="input-group">' +
	    			'<input id="message" type="text" class="form-control" placeholder="Message">' +
	    			'<span class="input-group-btn">' +
	      			'<button id="publish" class="btn btn-default" type="button">Send</button>' +
	    			'</span></div>');
	  	    
	  	    $("#publish").click(function() {
           		xserv.publish(topic.topic, $("#message").val());
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
		    
		    if (this.widget_open) {
			this.widget_open(json);
		    }
		} else if (json.op == Xserv.OP_UNSUBSCRIBE && json.rc == Xserv.RC_OK && json.topic == topic.topic) {
            	    widget.animate({opacity: 0}, 500, function() {
    			widget.html('');
    			open = false;
  		    });
		    
		    if (this.widget_close) {
			this.widget_close(close);
		    }
		}
		
		if (this.receive_ops_response) {
		    this.receive_ops_response(json);
		}
	    }.bind(this));
	    
	    xserv.addEventListener("receive_messages", function(json) {
		if (json.topic == topic.topic) {
		    var prefix = json.socket_id == xserv.getSocketId() ? "You: " : xserv.getSocketId() + ": "
		    var html = "<div class='widget-content-row'><strong>" + prefix + "</strong>" + json.data + "</div>";
		    $(html).hide().prependTo(".widget-content").fadeIn(1000);
		}
		
		if (this.receive_messages) {
		    this.receive_messages(json);
		}
	    }.bind(this));
	    
	    xserv.addEventListener("open_connection", function() {
		if (widget_toggle) {
		    widget_toggle.show();
		} else {
		    xserv.subscribe(topic.topic, topic.auth);
		}
		
		if (this.open_connection) {
		    this.open_connection();
		}
	    }.bind(this));
	    
	    xserv.addEventListener("close_connection", function(event) {
		if (this.close_connection) {
		    this.close_connection(event);
		}
	    }.bind(this));
	    
	    xserv.addEventListener("error_connection", function(event) {
		if (this.error_connection) {
		    this.error_connection(event);
		}
	    }.bind(this));
	    
	    xserv.connect();
	}
	
	var prototype = XservChatWidget.prototype;
	
	prototype.addEventListener = function(name, callback) {
	    if (name == 'open_connection') {
		this.open_connection = callback;
	    } else if (name == 'close_connection') {
		this.close_connection = callback;
	    } else if (name == 'error_connection') {
		this.error_connection = callback;
	    } else if (name == 'receive_ops_response') {
		this.receive_ops_response = callback;
	    } else if (name == 'receive_messages') {
		this.receive_messages = callback;
	    } else if (name == 'widget_open') {
		this.widget_open = callback;
	    } else if (name == 'widget_close') {
		this.widget_close = callback;
	    }
	};
	
	prototype.getXserv = function() {
	    return this.xserv;
	};
	
	this.XservChatWidget = XservChatWidget;
	
    }).call(this);
    
    return XservChatWidget;
}));
