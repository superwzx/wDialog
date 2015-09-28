/**
 * https://github.com/superwzx/wDialog
 * Author: superwzx <wzx175@gmail.com>
 */

 // UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
	'use strict';

	/*global define, exports, module */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.Dialog = factory();
	}

}(this, function () {

	var	defaults = {
			width: 400,
			bodyView: null,
			hasMask: true,
			hasXBtn: true,
			draggable: false,
			init: null,
			closeCallback: null
		};

	function Dialog (configs) {
		Dialog.occupied = true;
		this.o = $.extend({}, defaults, configs);
		this.open();
	}

	Dialog.create = function (configs) {
		if (Dialog.occupied) {
			return;
		}

		return new Dialog(configs);
	}

	Dialog.version = "0.0.6";

	Dialog.occupied = false;


	Dialog.prototype.open = function () {

		// 构造弹窗遮罩层
		if (this.o.hasMask) {
			this.setMask();
		}

		// 构造弹窗主体
		this.setBox();

		// 构造弹窗关闭按钮
		if (this.o.hasXBtn) {
			this.setXBtn();
		}

		// 构造弹窗Header
		this.setHeader();

		// 构造弹窗Body
		this.setBody();

		// 构造弹窗Footer
		this.setFooter();

		// 设置弹窗宽高；定位弹窗
		this.setShape();

		// 初始化
		this.initialize();
		
		// 委派弹窗事件
		this.delegateEvents();

		// 弹窗是否可拖拽
		if (this.o.draggable) {
			this.setDraggable();
		}

		// 显示弹窗
		this.box.show();

		// 注册弹窗resize事件
		this.resize();

	};

	/**
	 * 弹窗初始化
	 */
	Dialog.prototype.initialize = function () {
		var init = this.o.init;
		if (init && typeof init === 'function') {
			this.o.init();
		}
	};


	/**
	 * Set the Dialog Mask
	 */
	Dialog.prototype.setMask = function () {
		// Create the Mask
		this.mask = $('<div class="wdialog-bg" />').appendTo('body');
		return this;
	};

	/**
	 * Set the Dialog Box
	 */
	Dialog.prototype.setBox = function () {
		// Create the box
		this.boxWrap = $('<div class="wdialog-wrap" />').appendTo('body');
		this.box = $('<div class="wdialog" />').appendTo(this.boxWrap);
		this.container = $('<div class="wdialog-container" />').appendTo(this.box);
		return this;
	};


	/**
	 * Set the Dialog Close-button
	 */
	Dialog.prototype.setXBtn = function () {
		// Create the Close-button
		this.XBtn = $('<a class="wdialog-xbtn">×</a>')
			.click($.proxy(function () {
				this.close();
			}, this))
			.appendTo(this.box);
		return this;
	}


	/**
	 * Set the Dialog Header
	 */
	Dialog.prototype.setHeader = function () {
		// Create the Dialog Header
		this.containerHeader = $('<div class="wdialog-container-header" />');

		// Set the Dialog Title
		var title = this.o.title,
			t;
		if (title && Object.prototype.toString.call(title) === '[object String]') {
			t = '<h3>' + title + '</h3>';
		} else {
			t = '<h3>提示</h3>';
		}
		this.containerHeader.append(t);

		// Append ContainerHeader to Container
		this.containerHeader.appendTo(this.container);
		return this;
	};


	/**
	 * Set the Dialog Body-View
	 */
	Dialog.prototype.setBody = function () {
		// Create the Dialog Body
		this.containerBody = $('<div class="wdialog-container-body" />')
			.appendTo(this.container);

		// Create the Dialog Tooltip
		this.tooltip = $('<div class="wdialog-container-tooltip" />')
			.appendTo(this.containerBody);

		// Set the content
		var view = this.o.bodyView;
		if (view && Object.prototype.toString.call(view) === '[object String]') {
			this.containerBody.append(view);
		}

		// Return this
		return this;
	};


	/**
	 * Set the Dialog Footer
	 */
	Dialog.prototype.setFooter = function () {
		// Set the Footer Button
		var buttons = this.o.buttons;
		if (buttons && Object.prototype.toString.call(buttons) === '[object Array]') {
			// Create the Dialog setFooter
			this.containerFooter = $('<div class="wdialog-container-footer" />');
			for (var i = 0, l = buttons.length; i < l; i++) {
				var button = buttons[i],
					attributes = {},
					value;
				if (button.id) {
					attributes.id = button.id;
				}
				if (button.className) {
					attributes.className = button.className;
				}
				if (button.value && typeof button.value === 'string') {
					value = button.value;
				} else {
					throw new Error("Button's value must be a String.");
				}

				$('<button type="button" />')
					.attr(attributes)
					.text(value)
					.appendTo(this.containerFooter);
			}
			// Append ContainerFooter to Container
			this.containerFooter.appendTo(this.container);
		}
		
		// Return this
		return this;
	};


	// Close the dialog, and reset it.
	Dialog.prototype.close = function () {
		if (this.o.hasMask) {
			this.mask.remove();	
		}
		this.boxWrap.remove();
		if (this.o.closeCallback) {
			this.o.closeCallback();
		}
		delete this;
		Dialog.occupied = false;
	};


	/**
	 * set dialog width & height
	 ****************************
	 * args:
	 *     width     {Number}
	 *     height    {Number}
	 *     tpl       {String}
	 ****************************
	 * return:
	 *     this
	 */
	Dialog.prototype.setShape = function () {

		var vpWidth  = $(window).width(),
			vpHeight = $(window).height(),
			width    = this.o.width,
			height   = this.box.height();
			// left     = vpWidth / 2 - width / 2 + 'px',
			// top      = vpHeight /2 - height / 2 + 'px';

		this.box.css({
			width: width,
			// height: height,
			// left: left,
			// top: '20%'
		})//.show();
		
		return this;
	};


	/**
	 * set dialog draggable
	 *************************
	 * args:
	 * isDraggable    {Boolean}    ture | false
	 *************************
	 * return:
	 *     this
	 */
	Dialog.prototype.setDraggable = function () {

		var bMouseUp = true,
			nMouseX,
			nMouseY,
			nStartX,
			nStartY;

		this.box.on({
			mousedown: function (e) {
				target = e.target; 
				bMouseUp = false;
				nStartX = nStartY = 0;
				nStartX += target.offsetLeft;
				nStartY += target.offsetTop;
				nMouseX = e.clientX;
				nMouseY = e.clientY;
				return false;
			},
			mousemove: function (e) {
				if (bMouseUp) return;
				e.target.style.left = nStartX + e.clientX - nMouseX + 'px';
				e.target.style.top = nStartY + e.clientY - nMouseY + 'px';
			},
			mouseup: function (e) {
				bMouseUp = true;
			}
		});

		$(document).on('mouseup', function (e) {
			bMouseUp = true;
		});

		return this;
	};


	/**
	 * set dialog scrollable
	 *************************
	 * args:
	 * isScrollable    {Boolean}    ture | false
	 *************************
	 * return:
	 *     this
	 */
	Dialog.prototype.setScrollable = function () {
		this.o.isScrollable ? (function () {

		})() : (function () {

		})();
		return this;
	};


	/**
	 * Set the tooltip show the Dialog Message
	 *******************************************
	 * args:
	 *     config    {Object}
	 *     -- msg    {String}  "message"
	 *     -- flag   {String}  "right | error | normal",
	 *     -- delay  {Number}  1000   
	 */
	Dialog.prototype.showTooltip = function (config) {

		var msg   = config.msg,
			flag  = config.flag,
			delay = config.delay;

		if (!msg && typeof msg === 'string') {
			return;
		}

		this.tooltipMsg = this.tooltipMsg || $('<div class="wdialog-msg" />').text(msg);
		

		if (flag === 'right') {
			this.tooltipMsg.addClass('wdialog-msg-right');
		} else if (flag === 'error') {
			this.tooltipMsg.addClass('wdialog-msg-error');
		}

		this.tooltipMsg.appendTo(this.tooltip);

		if (delay && delay>>0) {
			var _this = this;
			window.setTimeout(function () {
				_this.offTooltip();
			}, Math.abs(delay));
		}

		return this;
	};


	/**
	 * Set the tooltip off the Dialog Message
	 *
	 */
	Dialog.prototype.offTooltip = function () {
		this.tooltipMsg.remove();
		return this;
	};


	/**
	 * When window has changed,
	 * resize the dialog.
	 *************************
	 * return:
	 *      this
	 */
	Dialog.prototype.resize = function () {
		$(window).on('resize', $.proxy(function () {
			this.setShape();
		}, this));
		return this;
	};


	// delegate 
	Dialog.prototype.delegateEvents = function () {
		var events = this.o.events;
		if (events && Object.prototype.toString.call(events) === '[object Object]') {
			var eventSplitter = /(.*)\s(\w+)/;
			for (var key in events) {
				var methodName = key;
					method     = events[methodName],
					match      = key.match(eventSplitter),
					selector   = match[1],
					eventName  = match[2];
				this.box.delegate(selector, eventName, method);
			}
		}
		return this;
	};

	return Dialog;
}));


