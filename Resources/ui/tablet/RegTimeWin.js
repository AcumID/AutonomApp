/**
 * @author Jonas
 */

function RegTimeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout:'vertical'
	});
	var svende = new Array("Pedersen","Hanen");
	var lrlinge = new Array("Findus","Hønen");
	var sliders = new Array;
	var labels = new Array;
	
	
	var svendeArray = [];
	var Svend = function(name){
		this.name = name;
		this.hours = 10;
		this.createLabel = function(){
			var label = Titanium.UI.createLabel({
			top: 40,
			font:{
				fontSize: 24
			},
			text: "Svendetimer for "+this.name+": "
			})
			return label
		}
		this.createSlider = function(){
			var slider = Titanium.UI.createSlider({
    		top: 70,
   			min: 0,
  	  		max: 24,
    		width: '80%',
    		value: this.hours
			});
			return slider;
		}
		this.slider = this.createSlider();
		this.label = this.createLabel();
	}
	var bent = new Svend("Bent");
	
	self.add(bent.label);
	self.add(bent.slider);
	
	
	bent.slider.addEventListener("change", function(e){
			bent.hours = Math.ceil(bent.slider.value);
			bent.label.text = "Svendetimer for "+bent.name+": "+bent.hours;
	});

	
/*	
	
	for (var i = svende.length - 1; i >= 0; i--){
		var slider = Titanium.UI.createSlider({
    	top: 70+(i+1)*70,
   		min: 0,
  	  	max: 24,
    	width: '80%',
    	value: 6
    });
    	var svendTimer = Ti.UI.createLabel({
		text:"Svendetimer " + slider.value,
		top: 30+(i+1)*70
	});
    	sliders.push(slider);
    	labels.push(svendTimer);
	};
	
	for (var i = sliders.length - 1; i >= 0; i--){
		self.add(sliders[i]);
		self.add(labels[i]);
		sliders[i].addEventListener("change", function(e){
			labels[i].text = "Svendetimer " + Math.ceil(sliders[i].value)
		})
	};

	
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
	
	
*/	
	return self;
};

module.exports = RegTimeWin;