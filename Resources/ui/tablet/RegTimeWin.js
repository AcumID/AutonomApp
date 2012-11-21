/**
 * @author Jonas
 */

var RegistrationDatabase = require('db/RegistrationDatabase');
var regdb = new RegistrationDatabase();
var RemoteDatabase = require('db/RemoteDatabase');
var remotedb = new RemoteDatabase();
var Database = require('db/Database');
var db = new Database();

function RegTimeWin(title) {
	var win = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		layout:'vertical'
	});
	
	var self = Ti.UI.createScrollView({
		layout:'vertical',
		backgroundImage: "images/back.png"
	});
	
	var workersOnAssignment = Ti.App.Properties.getList("workersOnAssignment",[]);
	var assignment = Ti.App.Properties.getString('assignment');
	var location = Ti.App.Properties.getString('location');
		// Variables containing the hours worked
	var journeymanHours = 0;
	var apprenticeHours = 0;
	var carHours = Ti.App.Properties.getInt("carHours",0);
	
	Ti.App.addEventListener('updateWorkersOnAssignment', function(){
	
		for (var d = holderView.children.length-1; d >= 0; d--) {
    		holderView.remove(holderView.children[d]);
		}
		workersOnAssignment = Ti.App.Properties.getList("workersOnAssignment",[]);
		viewUpdater();
	});
		
	var holderView = Ti.UI.createView({
		layout:"vertical",
		height: Ti.UI.SIZE
	});
		
	function viewUpdater(){
	for (var i=0; i<workersOnAssignment.length; i++) {
		console.log(workersOnAssignment[i]);
		workersOnAssignment[i].label = Ti.UI.createLabel({
	  			top: 40,
	  			font: {fontSize: 24},
	  			text: workersOnAssignment[i].firstName+" har arbejdet "+workersOnAssignment[i].workHours+" timer.",
	  			width: Ti.UI.SIZE
	  	});
	  	workersOnAssignment[i].slider = Titanium.UI.createSlider({
	  			top: 20,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: workersOnAssignment[i].workHours,
	  			id: i
	  	});
		workersOnAssignment[i].slider.addEventListener("change", function(e){
			var j = e.source.id;
			Ti.App.Properties.getList("workersOnAssignment",workersOnAssignment);

			workersOnAssignment[j].workHours = Math.ceil(e.source.value);
			workersOnAssignment[j].label.text = workersOnAssignment[j].firstName+" har arbejdet "+workersOnAssignment[j].workHours+" timer.";
			Ti.App.Properties.setList("workersOnAssignment",workersOnAssignment);
		});


		holderView.add(workersOnAssignment[i].label);
		holderView.add(workersOnAssignment[i].slider);
		};
	};
		viewUpdater();	
		self.add(holderView);

	
	var carLabel = Titanium.UI.createLabel({
   			top: 40,
  			font: {fontSize: 24},
  			text: "Bilen har været i brug i "+carHours+" timer.",
	  		width: Ti.UI.SIZE
  			});
	  	carSlider = Titanium.UI.createSlider({
	  			top: 20,
	  			min: 0,
	  			max: 24,
	  			width: "80%",
	  			value: carHours,
	 	 	});
		carSlider.addEventListener("change", function(e){
			carHours = Math.ceil(carSlider.value);
			carLabel.text = "Bilen har været i brug i  "+carHours+" timer.";
			Ti.App.Properties.setInt("carHours",carHours);
		});
	self.add(carLabel);
	self.add(carSlider);
	
	
	
	var checkBoxView = Ti.UI.createView({
		layout: 'vertical',
		width: '100%',
		height: Ti.UI.SIZE
	});
	self.add(checkBoxView);
	
	var talkToCustomer = false;
	var seeCustomer = false;
	var tableData = [{title: 'Snakket med kunde', hasCheck: talkToCustomer, backgroundColor:"#F7F0DE"}, {backgroundColor:"#F7F0DE", title: 'Set kunde', hasCheck: seeCustomer}];
	
	var customerPickers = Ti.UI.createTableView({
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data: tableData,
		height: 200,
		width: "50%",
		scrollable: false,
		backgroundColor: "transparent",	
	});
	customerPickers.addEventListener('click', function(e){
		e.row.hasCheck = !e.row.hasCheck;
		if(e.index === 0){
			talkToCustomer = e.row.hasCheck;
		} else {
			seeCustomer = e.row.hasCheck;
		}
	});
	
	
	checkBoxView.add(customerPickers);
	
	
	var sendBtn = Ti.UI.createButton({
		title: 'Send dagsseddel',
		right: '10%',
		color: 'black'
	});
	sendBtn.addEventListener('click', function(e){
		var dagseddelView = Ti.UI.createWindow ({backgroundColor: 'white', layout: 'vertical'});
		dagseddelView.open();
		
		var view1 = Ti.UI.createView ({height:"10%", layout: 'vertical'});
		var view2 = Ti.UI.createView ({height:"15%", layout: 'horizontal'});
		var view3 = Ti.UI.createView ({height:"65%", layout: 'vertical'});
		var view4 = Ti.UI.createView ({height:"10%", layout: 'vertical'});
		
		dagseddelView.add(view1);
		dagseddelView.add(view2);
		dagseddelView.add(view3);
		dagseddelView.add(view4);


		var title = Ti.UI.createLabel({
			text: 'Dagens Dagseddel',
			font: { fontSize:40 }	
		})
		view1.add(title);
		
		var label1 = Ti.UI.createLabel({
			text: '',
			font: { fontSize:30 },
			left: '10%'
		});
		
		
		if (workersOnAssignment.length === 1){
			label1.text = workersOnAssignment[0].firstName +' har lavet ' + assignment + ' pÂ ' + location +'\n\nDu har'
		} else {
			for (var i=0;i<workersOnAssignment.length-1;i++){
				label1.text = label1.text + ' ' +workersOnAssignment[i].firstName + ' og ';
			}
			label1.text = label1.text + ' ' + workersOnAssignment[workersOnAssignment.length-1].firstName +' har lavet ' + assignment + ' pÂ ' + location +'\n\nI har';
		}
		
		view2.add(label1);
		var costumerText = "";
		
		
		if (talkToCustomer === true){
			costumerText = "snakket med kunden";
		} else if (talkToCustomer === false && seeCustomer === true) {
			costumerText = "set kunden";
		} else {
			costumerText = "ikke set kunden";
		}
		
		var label3 = Ti.UI.createLabel({
			text: costumerText,
			font: { fontSize:30 },
			left: '20%'
		});
		view3.add(label3);
		
		var label4 = Ti.UI.createLabel({
			text: '\nog brugt\n',
			font: { fontSize:30 },
			left: '10%'
		});
		view3.add(label4);
		
		// Antal arbejdstimer
		for (var i=0; i < workersOnAssignment.length; i++) {
			console.log(workersOnAssignment[i].isJourneyman);
		 	if (workersOnAssignment[i].isJourneyman >0){
		  		journeymanHours += workersOnAssignment[i].workHours;
			} else {
				apprenticeHours += workersOnAssignment[i].workHours;
	 		}
		};
		Ti.App.Properties.setInt("journeymanHours", journeymanHours);
		Ti.App.Properties.setInt("apprenticeHours", apprenticeHours);
		
		var label5 = Ti.UI.createLabel({
			text: journeymanHours +' svendetimer\n' + apprenticeHours + ' lærlingetimer\n' + carHours + ' biltimer',
			font: { fontSize:30 },
			left: '20%'		
		});
		view3.add(label5);
		
		//materialelsite
		
		var MatListView = require("ui/common/MatListView");
		var matListView = new MatListView(regdb.gAll());
		view3.add(matListView);
		
		
		//underskrivnings ting
		
		
		var submitButton = Ti.UI.createButton({
			title: 'Send dagsseddel',
			right: '10%',
			color: 'black'
		});
		view4.add(submitButton);
		
		submitButton.addEventListener('click',function(){
			dagseddelView.hide();
			
			var assignmentid;
			for(var i=0; i<db.gAllAssignments().length;i++){
				if(db.gAllAssignments()[i].name===assignment){
					assignmentid=db.gAllAssignments()[i].id;
				}	
			}	
			
			var carhours = carHours;
			
			var clientseen;
			if(seeCustomer===true){
				clientseen=1;	
			} else {
				clientseen=0;
			}
			
			var clienttalked;
			if(talkToCustomer===true){
				clienttalked=1;	
			} else {
				clienttalked=0;
			}
			
			function Employed(id,hours){
				this.employee_id = id;
				this.hours = hours;
			};
			var employees = new Array();
			for (place in workersOnAssignment){
				var employeeId;
				for(var i=0; i<db.gAllAssignments().length;i++){
					if(db.gAllEmployees()[i].name===workersOnAssignment[place].firstName){
						employeeId=db.gAllEmployees()[i].id;
					}	
				}	
				employees.push(new Employed(employeeId,workersOnAssignment[place].workHours));
			};
			
			function Material(id,number){
				this.material_id = id;
				this.number = number;
			};
			var materials = new Array();
			for (var i=0; i<regdb.gAll().length;i++){
				var matId = db.gDataElementByName(regdb.gAll()[i].name).id;
				materials.push(new Material(matId,regdb.gAll()[i].number));
			};
			console.log(employees);
			console.log(materials);
			remotedb.poster(location,assignmentid,carhours,clientseen,clienttalked,employees,materials);
			alert("Tak for i dag og kom godt hjem");
			//TODO Rinse?
		});
		
		
		
		//annullerknap
		var cancelBtn = Ti.UI.createButton({
			title: 'Annuller',
			right: '10%',
			color: 'black'
		});
		view4.add(cancelBtn);
		cancelBtn.addEventListener('click',function(){
			dagseddelView.close();
		})
		
		
	});
	
	self.add(sendBtn);
	

	
	win.add(self);
	
	return win;
};

module.exports = RegTimeWin;