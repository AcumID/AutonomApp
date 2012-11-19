/**
 * @author Jonas
 */
function RegTimeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout:'vertical'
	});
	var workersOnAssignment = Ti.App.Properties.getList("workersOnAssignment",[]);

	for (var i=0; i<workersOnAssignment.length; i++) {
		workersOnAssignment[i].label = Ti.UI.createLabel({
	  			top: 40,
	  			font: {fontSize: 24},
	  			text: "Test"
	  	});
	  	workersOnAssignment[i].slider = Titanium.UI.createSlider({
	  			top: 70,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: 6,
	  			id: i
	  	});
		workersOnAssignment[i].slider.addEventListener("change", function(e){
			var j = e.source.id;
			//Husk at opdater arrayet af perosner
			//Ti.App.Properties.getList("workersOnAssignment",workersOnAssignment);

			workersOnAssignment[j].workHours = Math.ceil(e.source.value);
			workersOnAssignment[j].label.text = workersOnAssignment[j].firstName+" har arbejdet "+workersOnAssignment[j].workHours+" timer.";
		//	Ti.App.Properties.setList("workersOnAssignment",workersOnAssignment);
		});


		self.add(workersOnAssignment[i].label);
		self.add(workersOnAssignment[i].slider);
	};
		
	var carHours = 6;	
	var carLabel = Titanium.UI.createLabel({
   			top: 40,
  			font: {fontSize: 24},
  			text: "Bilen har været i brug i "+carHours+" timer."
  			});
	  	carSlider = Titanium.UI.createSlider({
	  			top: 60,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: 6,
	 	 	});
		carSlider.addEventListener("change", function(e){
			carHours = Math.ceil(carSlider.value);
			carLabel.text = "Bilen har været i brug i  "+carHours+" timer.";
			Ti.App.Properties.setInt("carHours",carHours);
		});
	self.add(carLabel);
	self.add(carSlider);
	
	return self;
};

module.exports = RegTimeWin;