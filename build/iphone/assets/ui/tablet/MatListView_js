function MatListView(dbGALL) {
	var self = Ti.UI.createView({
		top: 50,
		layout: "vertical",
		//backgroundColor:"red"
		
	});
	
	var label = Ti.UI.createLabel({
		text: "I har anvendt følgende materialer:",
		font: {
			fontSize: 30,
			fontFamily: "Segoe UI"
		},
		bottom: 10,
		left: "10%"
	});
	self.add(label);
	
	for (place in dbGALL){
		var label = Ti.UI.createLabel({
			text: dbGALL[place].number+"   "+dbGALL[place].name,
			font: {
				fontSize: 20,
				fontFamily: "Segoe UI"
			},
			left:"25%"	
		});
	self.add(label);
	};
	
	
	return self;
};

module.exports = MatListView;