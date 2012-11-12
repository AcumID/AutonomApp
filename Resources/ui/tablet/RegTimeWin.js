/**
 * @author Jonas
 */

function RegTimeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var slider = Titanium.UI.createSlider({
    	top: "50",
   		min: 0,
  	  	max: 12,
    	width: '80%',
    	value: 6
    });
    self.add(slider);
    
    slider.addEventListener("change", function(e){
    	svendTimer.text = "Svendetimer " + Math.ceil(slider.value)
    });


	var svendTimer = Ti.UI.createLabel({
		text:"Svendetimer " + slider.value,
		top:"30"
	});
	self.add(svendTimer);
	
	
	var slider2 = Titanium.UI.createSlider({
    	top: "65%",
   		min: 0,
  	  	max: 12,
    	width: '80%',
    	value: 6
    });
    self.add(slider2);
    
    slider2.addEventListener("change", function(e){
    	lrlTimer.text = "Lærlingetimer " + Math.ceil(slider2.value)
    });


	var lrlTimer = Ti.UI.createLabel({
		text:"Lærlingetimer " + slider2.value,
		top:"55%"
	});
	self.add(lrlTimer);
	
	
	
	return self;
};

module.exports = RegTimeWin;