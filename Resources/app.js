/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	
	//to force a tablet build
	//	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	//var isTablet = true;
	
	//init Ti.App.Properties

	
	//init Database	
	var Database = require('db/Database');
	var RemoteDatabase = require('db/RemoteDatabase');
	var db = new Database();
	var rdb = new RemoteDatabase(db);
	rdb.login("SampleUser","SamplePass");
	rdb.loadAssignments();
	rdb.loadEmployees();
	rdb.loadMaterials();
	
	var WelcomeWin;
	var RegMatWin;
	var RegTimeWin;
	var ToolWin;
	
//	if (isTablet) {
		WelcomeWin = require('ui/tablet/WelcomeWin');
		RegMatWin = require("ui/tablet/RegMatWin");
		RegTimeWin = require("ui/tablet/RegTimeWin");
		ToolWin = require("ui/tablet/ToolWin");
/*	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
		RegMatWin = require("ui/tablet/RegMatWin");
	}
*/
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(WelcomeWin, RegMatWin, RegTimeWin, ToolWin).open();
	
})();
