/**
 * @author Jonas
 */
function RegTimeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout:'vertical'
	});
	var persons = Ti.App.Properties.getList('persons');
	var workersOnAssignment = Ti.App.Properties.getList("workersOnAssignment");
	console.log(workersOnAssignment);
	var label = function(){ Ti.UI.createLabel({
	  			top: 40,
	  			font: {fontSize: 24}
	  	});}
  	var slider = function() { Titanium.UI.createSlider({
	  			top: 70,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: 6
	  	});}
	
	for (var i=0; i<workersOnAssignment.length; i++) {
	  	workersOnAssignment[i].label;
	  	workersOnAssignment[i].slider;
		workersOnAssignment[i].slider.addEventListener("change", function(e){
			workersOnAssignment[i].hours = Math.ceil(workersOnAssignment[i].slider.value)
			workersOnAssignment[i].label.text = workersOnAssignment[i].firstName+" har arbejdet "+workersOnAssignment[i].hours+" timer."
			Ti.App.Properties.setList("workersOnAssignment",workersOnAssignment);
		})
		self.add(workersOnAssignment[i].label);
		self.add(workersOnAssignment[i].slider);
	};
		
		
	var car = Ti.UI.createView();
  		car.label = Titanium.UI.createLabel({
   			top: 40,
  			font: {fontSize: 24},
  			});
	  	car.slider = Titanium.UI.createSlider({
	  			top: 60,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: 6,
	 	 	});
		car.slider.addEventListener("change", function(e){
			car.hours = Math.ceil(car.slider.value);
			car.label.text = "Bilen har været i brug i  "+car.hours+" timer.";
			Ti.App.Properties.setInt("carHours",car.hours);
		});
	self.add(car.label);
	self.add(car.slider);
	
	return self;
};

module.exports = RegTimeWin;