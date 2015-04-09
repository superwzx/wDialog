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

	function Dialog (args) {
		
		this.init(options);
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
	 * {
	 *     hasCloseBtn  {Boolean}  true
	 *     hasBg        {Boolean}  true
	 *     width        {Number}
	 *     height       {Number}
	 *     html         {htmlStr}
	 *     callback     {Object | function}
	 * }
	 *
	 *
	 */
	Dialog.prototype.open = function (args) {
		// Get the dialog configs
		var options = $.extend({}, defaults, args);

		//  Is wdialog show gray backgorund
		hasBg ? this.bg.show() : this.bg.hide();

		// Is wdialog show close button
		hasCloseBtn ? this.closeBtn.show() : this.closeBtn.hide();

		// 
		

	};

	Dialog.prototype.close = function () {

	};



}));


/*
 * author: batmanwang@myturan.com
 * date: 2013/7/15
 */
var IGENJIN = IGENJIN || {};

(function () {

	//鏋勯€犲脊绐梙tml
  	var str = "<div class='graybg'></div>" +
  			  "<div class='dialog'>" +
  			  "<div class='inner'>" +
  			  "<a class='dialog-close' href='#'></a>" +
  			  "<div class='dialog-content'>" +
  			  "</div>" +
  			  "</div>" +
  			  "<div>";

  	//灏嗗脊绐楁坊鍔犲埌body
  	$(str).appendTo('body');
	
	//鑾峰彇寮圭獥鐨刣om瀵硅薄锛屽苟缂撳瓨
	var	grayBg = $(".graybg"),
		box = $(".dialog"),
		closeBtn = $(".dialog-close"),
		wrap = $(".dialog-content"),

		dialog =  {

			version: "0.2",

			//寮圭獥鐨勯粯璁ら€夐」
			options: {
				width: 299,
				height: 179,
				html: '',
				hasCloseBtn: true
			},

			showCloseBtn: function () {
				closeBtn.css('display', 'block');
			},

			hideCloseBtn: function () {
				closeBtn.css('display', 'none');
			},

			//鎵撳紑寮圭獥
			open: function(args) {

				var options = this.options;
				var o = $.extend(options, args);

				var pageWidth = $(window).width(),
					pageHeight = $(window).height(),
					left = pageWidth / 2 - o.width / 2 - 5 + 'px',
					top = pageHeight / 2 - o.height / 2 -5 + 'px';

				box.css({
					'top': top,
					'left': left
				});

				/*
				wrap.css({
					'width': o.width,
					'height': o.height,
				});
				*/

				o.hasCloseBtn === true ? this.showCloseBtn() : this.hideCloseBtn();
				
				grayBg.show();
				wrap.html(o.html);
				box.show();

				if (o.callback) o.callback();

				//delete o;
			},

			//閫氳繃寮圭獥涓婄殑鍏抽棴鎸夐挳鍏抽棴寮圭獥
			init: (function() {

				closeBtn.on('click', function() {
					dialog.hide.apply(this);
					return false;
				});

				box.on('click', '.cancel, .sure-close', function () {
					dialog.hide.apply(this);
					return false;
				});

				/*box.on('click', '.cancel, .sure-close', function () {
					dialog.hide.apply(this);
					return false;
				});*/
				
			})(),

			//鍏抽棴寮圭獥
			hide: function() {
				grayBg.hide();
				box.hide();
			}
		};

	return IGENJIN.dialog = dialog;
})();