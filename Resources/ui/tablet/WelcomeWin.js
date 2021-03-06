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
	
	var logo = Ti.UI.createImageView({
		image: '/images/SkinnerupLogo.png',
		right: 0,
		top:1,
		zIndex: -1
	});
	
	//for making buttons in right order
	var zIndexCounter = 1;
	var currentZIndex;
	var workersOnAssignmentIndex;

	Ti.App.addEventListener('updatePersons', function(){
		persons = Ti.App.Properties.getList('persons', []);
	});	
	
	Ti.App.addEventListener('updateWorkersOnAssignment', function(){
		workersOnAssignment = Ti.App.Properties.getList('workersOnAssignment', [])
	});

	/*
	 Her Bygges f¯rste View, der kan Êndre hvilke personer der er pÂ arbejde
	 * */
	
	var self = Ti.UI.createWindow({title:title, backgroundImage: "images/back.png", layout: 'vertical', barColor:"#FF6600"});
	self.add(logo);
	var welcomeView = Ti.UI.createView ({top: 130, width:"90%", height:Ti.UI.SIZE, layout: 'horizontal'});
	self.add(welcomeView);
	
	
	var textField = Ti.UI.createLabel({
		text: "Hej ",
		//top: 130,
		font: {fontFamily:"Segoe UI", fontSize: 46}
	})	
	welcomeView.add(textField);
	
	//adds the persons currently on the assignment with 'og' inbetween
	if(workersOnAssignment.length === 1){
			createPersonButton(workersOnAssignment[0].name);
	} else {
		for (var i=0;i<workersOnAssignment.length;i++){
			createPersonButton(workersOnAssignment[i].name);
			if (i+1<workersOnAssignment.length){
				createOgField();
			}			
		}
	}
	//Helper functions for the previous if statement
	function createOgField(){
		var textField = Ti.UI.createLabel({
			text: " og ",
			//top: 130,
			font: {fontFamily:"Segoe UI", fontSize: 46}
			})
		zIndexCounter++;	
		welcomeView.add(textField);
	}
	function createPersonButton(name){
		var btn = Ti.UI.createButton({
			title: name,
			//top: 130,
			width: 200,
			color: "black",
			font: {fontFamily:"Marker Felt", fontSize: 46},
			zIndex:zIndexCounter,
			height: 50
			//backgroundImage: "none"
			
		});
		zIndexCounter++;	
		btn.addEventListener('click', function(e){
			createPersonPicker(btn.title, btn.zIndex);
		});
		welcomeView.add(btn);
	}
	var addBtn = Ti.UI.createButton({
		top: -46,
		right: 30,
		title:'Tilføj person +',
		font: {fontFamily: "Marker Felt", fontSize: 20},
		color: "black",
		height: 50,
		backgroundImage: "none",
		borderColor: "black",
		height: 40,
		width: 120,
		borderRadius: 8
	});
	addBtn.addEventListener('click', function() {
		if(workersOnAssignment[0]!==undefined||zIndexCounter>=2){
			createOgField();
		}
		createPersonButton('Ny person');
	});
	self.add(addBtn);
	
	function createPersonPicker(currentName, zIndex){
		currentZIndex=zIndex;
		//console.log("WORKERSONASSIGNMENT > "+workersOnAssignment);
		if(currentName!=="Ny person"){
			for(var i=0; i<workersOnAssignment.length; i++){
				if(workersOnAssignment[i].name===currentName){
					workersOnAssignmentIndex=i;
				}
			};
		} else {
			workersOnAssignmentIndex=workersOnAssignment.length;
		}
		
		
		Ti.App.fireEvent('updatePersons');
		var buttons = [];
		for(var i=0; i<persons.length; i++){
			buttons.push(persons[i].name);
		}
		buttons.push('Slet');
		buttons.push('Annuller');
		var nameList = Ti.UI.createOptionDialog({
			title: 'Vælg person',
			options: buttons,
			destructive: persons.length
		});
		
		var clickHandler = function(e){	
			if(e.source==="[object TiUIOptionDialog]")	
			{	
				if(e.index === buttons.length - 2){  															
					for (var g=0;g<workersOnAssignment.length;g++){
						//console.log("Now testing "+currentName+" versus "+workersOnAssignment[g].name);
						if(currentName === workersOnAssignment[g].name){
							workersOnAssignment.splice(g,1);
							//console.log("Splicing where current = "+currentName+" and now setting workers on assignment: "+workersOnAssignment);
							Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
						}
					}
					Ti.App.fireEvent('updateWorkersOnAssignment');
					deleteButton(currentZIndex);
					//TODO need to change zindex of other elements when deleting
					for (var h=0;h<welcomeView.children.length;h++){
						if(welcomeView.children[h].zIndex>currentZIndex){
							welcomeView.children[h].zIndex -=2;	
						}
					}				
				} else if (e.index === buttons.length - 1) {
					//nothing happens
				} else {
					workersOnAssignment[workersOnAssignmentIndex]=persons[e.index];
					updateButton((workersOnAssignment[workersOnAssignmentIndex].name), currentZIndex);
					Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
					Ti.App.fireEvent('updateWorkersOnAssignment');
				}
			}	
		}			
		nameList.addEventListener('click', clickHandler)
		nameList.show();	
	}	
	
	function updateButton(newName, zIndex){
		welcomeView.children[zIndex].title = newName;
	}
	
	function deleteButton(zIndex) {
		//alert("THIS IS Z: "+zIndex);
		var zIndexCounterToRemove=0;
		welcomeView.remove(welcomeView.children[zIndex]);
		zIndexCounterToRemove++;	
		if(zIndexCounter>2&&zIndex===1){
			welcomeView.remove(welcomeView.children[zIndex]);
			zIndexCounterToRemove++;
		} else if(zIndexCounter>2){
			welcomeView.remove(welcomeView.children[zIndex-1]);
			zIndexCounterToRemove++;	
		}
		//Ti.App.Properties.setList('workersOnAssignment', workersOnAssignment);
		//Ti.App.fireEvent('updateWorkersOnAssignment');
		zIndexCounter-=zIndexCounterToRemove;
	}

	//build the location view
	
	var locationView = Ti.UI.createView ({
		top: 60, width:"90%", height:"10%", layout: 'horizontal'});
	self.add(locationView);
	
	var textField2 = Ti.UI.createLabel({
		text: "I dag arbejder I på ",
		font: {fontFamily:"Segoe UI", fontSize: 30}
	})	
	locationView.add(textField2);
	
	var tf1 = Titanium.UI.createTextField({
		value:location,
		top:10,
		height:40,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocorrect:false,
		font: {fontFamily:"Marker Felt", fontSize: 30}
		//backgroundImage: "none"
		
	});
	// hide the keyboard on clicking return button
	tf1.addEventListener('return', function() {
		
		tf1.blur();
	});
	
	//hide keyboard when clicking anywhere else in the window
	self.addEventListener('click', function(e){
		tf1.blur();
	});
	
	tf1.addEventListener('change', function(e) {
		// save the text field's value 
		Titanium.App.Properties.setString("location",e.value);
		Ti.App.fireEvent("updateLocation");
	});
	locationView.add(tf1);	
	
	//add the assignment view
	
	var assignmentView = Ti.UI.createView ({
		top:-20,width:"90%", height:"10%", layout: 'horizontal'});
	self.add(assignmentView);
	
	var textField3 = Ti.UI.createLabel({
		text: "med at lave ",
		font: {fontFamily:"Segoe UI", fontSize: 30}
	})	
	assignmentView.add(textField3);
	
	var tf2 = Titanium.UI.createButton({
		title:assignment,
		height:40,
		width:150,
		color: "black",
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font: {fontFamily:"Marker Felt", fontSize: 30}
		//backgroundImage: "none"
	});
	
	var assignmentNames=new Array();
	for (place in db.gAllAssignments()){
		assignmentNames.push(db.gAllAssignments()[place].name);
	};
	assignmentNames.push("Annuller");
	assignmentNames.push("");
	var assignmentDialog = Titanium.UI.createOptionDialog({
    		title: 'Vælg opgave',
    		options: assignmentNames,
    		cancel: assignmentNames.length-1
	});
	assignmentDialog.addEventListener("click",function(e){
		switchAssignment(e);
	});
	
	//assignmentDialog.options.push("Annullér");
	tf2.addEventListener("click",function(e){
		assignmentDialog.show();
	});
	assignmentView.add(tf2);
	
	var switchAssignment = function(e){
		if(e.index!==assignmentNames.length){
			Ti.App.Properties.setString("assignment",db.gAllAssignments()[e.index].name);
			assignment = Ti.App.Properties.getString("assignment");
			Ti.App.fireEvent("updateAssignment");
			tf2.title=assignment;
		}
	};
	
	var perOle = Ti.UI.createImageView({
		image: '/images/PerOle.png',
		right: 0,
		top:120
	});
	self.add(perOle);
	return self;
};

module.exports = WelcomeWin;