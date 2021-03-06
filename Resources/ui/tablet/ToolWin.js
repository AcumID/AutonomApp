/**
 * @author Jonas
 */

function ToolWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout: 'vertical'
	});
	
	var label = Ti.UI.createLabel({
		text: "Tilføj person"
	});
	self.add(label);
	
	var tf1 = Titanium.UI.createTextField({
		width:250,
		height:40,
		top:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocorrect:false
	});
	self.add(tf1);
	
	var isJourneymanPicker = Ti.UI.createSwitch({
		value: true
	});
	self.add(isJourneymanPicker);
	
	var Person = function(name, isJourneyman){
		this.name = name;
		this.isJourneyman = isJourneyman;
		this.workHours = 0;
	}
	

	var btn = Ti.UI.createButton({
		title: 'Tilføj',
	});
	
	btn.addEventListener('click', function(e){
		var person = new Person(tf1.value, isJourneymanPicker.value);
		var persons = Ti.App.Properties.getList('persons', []);
		persons.push(person);
		Ti.App.Properties.setList('persons', persons);
		tf1.value = "";
		Ti.App.fireEvent('updatePersons');
	});
	self.add(btn);

	var btn2 = Ti.UI.createButton({
		title: 'Tøm svende database',
	});
	btn2.addEventListener('click', function(){
		var persons = [];
		Ti.App.Properties.setList('persons', persons);
		Ti.App.fireEvent('updatePersons');
	});
	self.add(btn2);
	
	
	return self;
	
	
	
	
	
	
	
	
};

module.exports = ToolWin;