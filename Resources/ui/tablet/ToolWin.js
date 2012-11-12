/**
 * @author Jonas
 */

function ToolWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var label = Ti.UI.createLabel({
		text: "The TIME!!!!"
	});
	self.add(label);
	
	return self;
};

module.exports = ToolWin;