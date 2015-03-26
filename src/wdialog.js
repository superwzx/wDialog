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
	
}));