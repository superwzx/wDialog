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
			width:,
			height:,
			html:,
			hasCloseBtn: true,
			callback: function () { }	
		};

		dialog = {
			version: '0.0.3',
			init: 

		}

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
		// Get the dialog configs
		var o = this.options = $.extend({}, defaults, args);

		// Set dialog width and height
		this.setShape(o.width, o.height, o.tpl)

		//  If hasBg, show gray backgorund
		this.setBg(o.hasBg);

		// Is wdialog show close button
		this.setXBtn(o.hasXBtn);

		// If hasCloseBtn, show close btn
		this.box.show();
		
		// Delegate Events
		if (o.events) {
			this.delegateEvents(o.events);
		}

		// listenTo window resize event
		this.resize();

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
	Dialog.prototype.setShape = function (width, height) {
		var vp       = $(window),
			vpWidth  = vp.width(),
			vpHeight = vp.height(),
			left     = 50% - width / 2 + 'px',
			top      = 50% - height / 2 + 'px';

		this.box.css({
			position: 'absolute',
			left: left,
			top: top

		});
		
		return this;
	};


	
	Dialog.prototype.setContent = function (tpl) {
		this.wrap.html(tpl);
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
	Dialog.prototype.setBg = function (hasBg) {
		hasXBg ? this.bg.show() : this.bg.hide();
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
	Dialog.prototype.setXBtn = function (hasXBtn) {
		hasXBtn ? this.XBtn.show() : this.XBtn.hide();
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
	Dialog.prototype.setDraggable = function (isDraggable) {
		isDraggable ? (function () {

		})() : void;
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
	Dialog.prototype.setScrollable = function (isScrollable) {
		isScrollable ? (function () {

		})() : (function () {

		})();
		return this;
	};


	/**
	 * When window has changed,
	 * resize the dialog.
	 *************************
	 * 
	 */
	Dialog.prototype.resize = function () {
		$(window).on('resize', function () {
			this.setShape();
		})
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

	// delegate 返回什么？
	Dialog.prototype.delegateEvents = function (events) {
		Object.prototype.toString.call(events) === '[Object events]' ? (function() {
				var eventSplitter = /^(\w+)\s*(.*)$/;
				for (var key in events) {
					var methodName = events[key],
						method     = events[methodName],
						match      = key.match(eventSplitter),
						eventName  = match[1],
						selector   = match[2];
					this.box.delegate(selector, eventsName, method);
				}
			})() : throw new Error('wDialog Error: events type is error.');

	};

	// Close the dialog, and reset it.
	Dialog.prototype.close = function () {
		this.bg.hide();
		this.box.hide();
		if (this.options.closeCallback) {
			this.options.closeCallback();
		}
		delete this.options;
	};


	var dialog = new Dialog();

	return {
		pluginName: pluginName,
		pluginVersion: pluginVersion,
		open: dialog.open,
		close: close
	}

}));


