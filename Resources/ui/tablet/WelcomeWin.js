var platform = Ti.Platform.osname;
function WelcomeWin(title) {
	
	var Database = require('db/Database');
	var db = new Database();
	
	//clear 
	//Ti.App.Properties.setList('workersOnAssignment', []);
	//Ti.App.Properties.setInt("journeymanHours", []);
	
	//load relevant data for this view from memory
	
	var persons = Ti.App.Properties.getList('persons', []); 
	var workersOnAssignment = Ti.App.Properties.getList('workersOnAssignment', []);
	var assignment = Ti.App.Properties.getString('assignment', "Vinduer");
	var assignments = Ti.App.Properties.getList('assignments', []);
	var location = Ti.App.Properties.getString('location', "Adresse");
	
	//for making buttons in right order
	var zIndexCounter = 1;

	Ti.App.addEventListener('updatePersons', function(){
		persons = Ti.App.Properties.getList('persons', []);
	});	
	
	Ti.App.addEventListener('updateWorkersOnAssignment', function(){
		workersOnAssignment = Ti.App.Properties.getList('workersOnAssignment', [])
		/*
			
		}*/
	});

	/*
	 Her Bygges f¯rste View, der kan Êndre hvilke personer der er pÂ arbejde
	 * */
	
	var self = Ti.UI.createWindow({title:title, backgroundColor:'white', layout: 'vertical'});
	
	var welcomeView = Ti.UI.createView ({width:"90%", height:Ti.UI.SIZE, layout: 'horizontal'});
	self.add(welcomeView);
		
	var textField = Ti.UI.createLabel({
		text: "Hej ",
		font: {fontFamily:"Segoe UI", fontSize: 56}
	})	
	welcomeView.add(textField);
	
	//adds the persons currently on the assignment with 'og' inbetween
	if(workersOnAssignment.length === 1){
			createPersonButton(workersOnAssignment[0].firstName);
	} else {
		for (var i=0;i<workersOnAssignment.length;i++){
			createPersonButton(workersOnAssignment[i].firstName);
			if (i+1<workersOnAssignment.length){
				createOgField();
			}			
		}
	}
	//Helper functions for the previous if statement
	function createOgField(){
		var textField = Ti.UI.createLabel({
			text: " og ",
			font: {fontFamily:"Segoe UI", fontSize: 56}
			})
		zIndexCounter++;	
		welcomeView.add(textField);
	}
	function createPersonButton(name){
		var btn = Ti.UI.createButton({
			title: name,
			zIndex:zIndexCounter
		});
		zIndexCounter++;	
		btn.addEventListener('click', function(e){
			createPersonPicker(name, btn.zIndex);
		});
		welcomeView.add(btn);
	}
	
	function createPersonPicker(currentName, zIndex){
		Ti.App.fireEvent('updatePersons');
		var buttons = [];
		
		for (var i=0;i<persons.length;i++){
			buttons.push(persons[i].firstName);
		}
		buttons.push('Slet');
		buttons.push('Annuller');
		var nameList = Ti.UI.createAlertDialog({
			message: 'Vælg person',
			buttonNames: buttons
		});
		
		var clickHandler = function(e){			
			if(e.index === buttons.length - 2){  															
				for (var g=0;g<workersOnAssignment.length;g++){
					if(currentName === workersOnAssignment[g].firstName){
						workersOnAssignment.splice(g,1);
						Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
					}
				}
				Ti.App.fireEvent('updateWorkersOnAssignment');
				deleteButton(zIndex);
				for (var h=0;h<welcomeView.children.length;h++){
					welcomeView.children[h].zIndex -=2;
				}				
			} else if (e.index === buttons.length - 1) {
				//nothing happens
			} else {
				workersOnAssignment[zIndex]=persons[e.index];
				updateButton((workersOnAssignment[zIndex].firstName), zIndex);							
				for (var i = workersOnAssignment.length;i>=0;i--){
					if (workersOnAssignment[i] === undefined){
						workersOnAssignment.splice(i,1);
					} else {}
				}
				Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
				Ti.App.fireEvent('updateWorkersOnAssignment');
			}	
		}			
		nameList.addEventListener('click', clickHandler)
		nameList.show();	
	}	
	
	function updateButton(newName, zIndex){
		
		welcomeView.children[zIndex].title = newName;
	}
	function deleteButton(zIndex) {
		welcomeView.remove(welcomeView.children[zIndex]);
		welcomeView.remove(welcomeView.children[zIndex-1]);	
		//Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
		//Ti.App.fireEvent('updateWorkersOnAssignment');
		zIndexCounter-=2;
	}
	var addBtn = Ti.UI.createButton({
		title:'+'
	});
	addBtn.addEventListener('click', function() {
		createOgField();
		createPersonButton('Ny person');
	});
	self.add(addBtn);

	//build the location view
	
	var locationView = Ti.UI.createView ({
		width:"90%", height:"10%", layout: 'horizontal'});
	self.add(locationView);
	
	var textField2 = Ti.UI.createLabel({
		text: "I dag arbejder i på ",
		font: {fontFamily:"Segoe UI", fontSize: 30}
	})	
	locationView.add(textField2);
	
	var tf1 = Titanium.UI.createTextField({
		value:location,
		width:250,
		height:40,
		top:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocorrect:false
	});
	tf1.addEventListener('return', function() {
		// hide the keyboard
		tf1.blur();
	});
	tf1.addEventListener('change', function(e) {
		// save the text field's value 
		Titanium.App.Properties.setString("location",e.value);
	});
	locationView.add(tf1);	
	
	//add the assignment view
	
	var assignmentView = Ti.UI.createView ({
		width:"90%", height:"10%", layout: 'horizontal'});
	self.add(assignmentView);
	
	var textField3 = Ti.UI.createLabel({
		text: "med at lave ",
		font: {fontFamily:"Segoe UI", fontSize: 30}
	})	
	assignmentView.add(textField3);
	
	var tf2 = Titanium.UI.createButton({
		title:assignment,
		width:250,
		height:40,
		top:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var assignmentNames=new Array();
	for (place in db.gAllAssignments()){
		assignmentNames.push(db.gAllAssignments()[place].name);
		
	};
	
	
	//assignmentDialog.options.push("Annullér");
	
	tf2.addEventListener("click",function(e){
		
	var assignmentDialog = Titanium.UI.createOptionDialog({
    	title: 'Vælg opgave',
    	options: assignmentNames,
    	destructive: assignments.length
	});
		
		
		assignmentDialog.show();
	});
	
	/*assignmentDialog.addEventListener('click',function(e){
		var selectedAssignment=assignment;
		switch(e.index){
			case 0: selectedAssignment='Vinduer'; break;
			case 1: selectedAssignment='Tag'; break;
			case 2: selectedAssignment='Solceller'; break;
			case 3: selectedAssignment='Småarbejde'; break;
			case 4: selectedAssignment='Gulv'; break;
			case 5: selectedAssignment='Loft'; break;
			case 6: selectedAssignment='Hus'; break;
			default: break;
		}
		Titanium.App.Properties.setString("assignment",selectedAssignment);
		Ti.App.fireEvent('updateAssignment');
		tf2.setTitle(assignment);
		self.remove(assignmentView);
		assignmentView.remove(tf2);
		assignmentView.add(tf2);
		self.add(assignmentView);
		
	});*/
	assignmentView.add(tf2);
	
	var perOle = Ti.UI.createImageView({
		image: '/images/perole.jpg',
		
	});
	self.add(perOle);
	return self;
};

module.exports = WelcomeWin;
