/**
 * @author Jonas
 */
function RegTimeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout:'vertical'
	});
	var persons = Ti.App.Properties.getList('persons',persons);
	
	/*for (var i=0; i < workersOnAssignment.length; i++) {
	  	workersOnAssignement[i].label = Titanium.UI.createLabel({
	  			top: 40,
	  			font: {fontSize: 24},
	  			text: worksOnAssignment[i].firstName+" har arbejdet i dag"
	  		})
	  	}
	  	workersOnAssignment[i].slider = Titanium.UI.createSlider({
	  			top: 70,
	  			min: 0,
	  			max: 24,
	  			width: "80%"
	  			value: 6
	  		})
		}
		workersOnAssignment.slider.addEventListener("change", function(e){
			workersOnAssignment[i].hours = Math.ceil(workersOnAssignment[i].slider.value)
			workersOnAssignment[i].label.text = workersOnAssignment[i].firstName+" har arbejdet "+workersOnAssignment[i].hours+" timer."
		})
		self.add(workersOnAssignment[i].label);
		self.add(workersOnAssignment[i].slider);
	}*/
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
		});
	self.add(car.label);
	self.add(car.slider);
	
	return self;
};

module.exports = RegTimeWin;