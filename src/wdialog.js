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
		root.returnExports = factory();
	}

}(this, function () {

	var pluginName = "wDialog",
		pluginVersion = '0.0.3',
		defaults = {
			width: 300,
			height: 400,
			tpl: null,
			hasBg: true,
			hasXBtn: true,
			// isDraggable: true,
			closeCallback: null	
		};

	function Dialog () {
		this.init();
	}

	Dialog.prototype.init = function () {
		// 构造弹窗背景
		this.bg = $('<div class="wdialog-bg" />')
			.hide()
			.appendTo('body');

		// 构造弹窗
		this.box = $('<div class="wdialog" />')
			.hide()
			.appendTo('body');

		// 构造关闭按钮
		this.closeBtn = $('<div class="wdialog-closebtn" />')
			.hide()
			.appendTo(this.box);

		// 构造弹窗内容
		this.wrap = $('<div class="wdialog-wrap" />')
			.appendTo(this.box);

		this.isOpened = false;

	};

	/**
	 * args {
	 *     hasCloseBtn   {Boolean}
	 *     hasBg         {Boolean}
	 *     width         {Number}             
	 *     height        {Number}
	 *     html          {HtmlStr}
	 *     events        {Object}
	 *     closeCallback {Array | Function}
	 * }
	 *
	 *
	 */
	Dialog.prototype.open = function (args) {

		if (this.isOpened) {
			return false;
		}
		// Get the dialog configs
		var o = this.o = $.extend({}, defaults, args);

		// Set dialog width and height
		this.setShape();

		//  If hasBg, show gray backgorund
		this.setBg();

		this.setContent();

		// Is wdialog show close button
		// this.setXBtn(o.hasXBtn);

		this.setDraggable();

		// If hasCloseBtn, show close btn
		this.box.show();
		
		// Delegate Events
		// if (o.events) {
		this.delegateEvents();
		// }

		// listenTo window resize event
		this.resize();

		this.isOpened = true;

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
			height   = this.o.height,
			left     = vpWidth / 2 - width / 2 + 'px',
			top      = vpHeight /2 - height / 2 + 'px';

		this.box.css({
			width: width,
			height: height,
			left: left,
			top: top
		}).show();
		
		return this;
	};



	Dialog.prototype.setContent = function () {
		if (this.o.tpl) {
			this.wrap.html(this.o.tpl);
		}
			
		return this;
	}


	/**
	 * set dialog-bg show or hide
	 ******************************
	 * args:
	 *     hasBg    {Boolean}    ture | false
	 ******************************
	 * return:
	 *     this
	 */
	Dialog.prototype.setBg = function () {
		this.o.hasBg ? this.bg.show() : this.bg.hide();
		return this;
	};


	/**
	 * set xbtn show or hide
	 *************************
	 * args:
	 * hasXBtn    {Boolean}    ture | false
	 *************************
	 * return:
	 *     this
	 */
	Dialog.prototype.setXBtn = function () {
		this.o.hasXBtn ? this.XBtn.show() : this.XBtn.hide();
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

		if (this.o.isDraggable) {

			var bMouseUp = true,
				nMouseX,
				nMouseY,
				nStartX,
				nStartY;

			// this.box.on('mousedown', function (e) {})

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
			})

		}
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


	/**
	 * set dialog scrollable
	 *************************
	 * args:
	 * isScrollable    {Boolean}    ture | false
	 */
	Dialog.prototype.alert = function () {

	};


	/**
	 * set dialog scrollable
	 *************************
	 * args:
	 * isScrollable    {Boolean}    ture | false
	 */
	Dialog.prototype.confirm = function () {

	};

	// delegate 
	Dialog.prototype.delegateEvents = function () {
		var events = this.o.events;
		if (events && Object.prototype.toString.call(events) === '[object Object]') {
			// var eventSplitter = /^(\w+)\s*(.*)$/;
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

	// Close the dialog, and reset it.
	Dialog.prototype.close = function () {
		this.bg.hide();
		this.box.hide();
		if (this.options.closeCallback) {
			this.options.closeCallback();
		}
		delete this.options;
		this.isOpened = false;
	};


	return dialog = new Dialog();

	return s = {
		pluginName: pluginName,
		pluginVersion: pluginVersion,
		open: dialog.open,
		close: dialog.close
	}

}));


