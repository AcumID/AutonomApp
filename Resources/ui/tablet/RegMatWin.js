/**
 * @author Jonas
 */
var platform = Ti.Platform.osname;

var Database = require('db/Database');
var db = new Database();
var RegistrationDatabase = require('db/RegistrationDatabase');
var rdb = new RegistrationDatabase();
var RemoteDatabase = require('db/RemoteDatabase');
var remotedb = new RemoteDatabase();

function RegMatWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
	//	backgroundColor:'white',
		layout: "horizontal",
		backgroundImage: "images/back.png",
		barColor:"#FF6600"
	});

var assignment = Ti.App.Properties.getString('assignment','Vinduer');

Ti.App.addEventListener('updateAssignment', function(){
	assignment = Ti.App.Properties.getString('assignment');
	populatorDB(tbl_data);
	updateTableViews();
});	


var scrollView = Ti.UI.createScrollView({
	layout: "vertical",
	backgroundColor:"#55858585",
	borderColor:"#9D9D9D",
	borderRadius:1,
	width:"50%"
	});
self.add(scrollView);

 
var rightLaneView = Ti.UI.createView({
	layout: "vertical",
	width:"50%"
});
self.add(rightLaneView);

 var addNewMaterialBtn = Ti.UI.createButton({
	left: 10,
	top: 5,
	width: 250,
	height: 35,
	title: "Opret nyt materiale fra søgefelt",
	color: "black",
	layout: "vertical"
 });
rightLaneView.add(addNewMaterialBtn);

var scrollView2 = Ti.UI.createScrollView({
	top: 5,
	layout: "vertical",
	//top: 200,
	//right: 10,
	//backgroundColor:"#EEEEEE",
	//height:200,
	width:"100%"	
});
rightLaneView.add(scrollView2);



var tbl_data = [];
var tbl_data_selected = [];

//adds content to tbl data from DB
function populatorDB(element){
	var dataToPopulateWith=db.gAllByAssignment(assignment.toLowerCase());
	
	var addition = 0;
	var colorToUse = "#F7F0DE";
	
	for(var i=0; i<dataToPopulateWith.length+2; i++){
		var nameOnRow = dataToPopulateWith[i-addition].name;
		if(i===0){
			colorToUse = "#F09E6C";
			nameOnRow = "                "+assignment.toUpperCase();
			addition++;	
		}
		if(i==db.gDataElementsByAssignment(assignment.toLowerCase()).length+1){
			colorToUse = "#F7F0DE";
			nameOnRow = "                ØVRIGE MATERIALER";
			addition++;	
		}
		var row = Ti.UI.createTableViewRow({
			title: nameOnRow,
			backgroundColor:colorToUse
		});
		element[i+addition]=row;
	}
};

//adds content to tbl data selected from RDB
function populatorRDB(element,ondelete){
	ondelete = typeof ondelete !== 'undefined' ? ondelete : false;
	var i=0;
	for (place in rdb.gAll()) {
		var row = Ti.UI.createTableViewRow({
			title: rdb.gAll()[place].number+"   "+rdb.gAll()[place].name
		});
		element[place]=row;
		if(place===0){
			i+=1;
		}
		i++;
	};
	if(ondelete){
		element.splice(i,1);	
	}
};

populatorDB(tbl_data);
populatorRDB(tbl_data_selected);

//Creating Searchbar
var searchBar = Titanium.UI.createSearchBar({
	backgroundColor: "#F7F0DE",
	showCancel: false,
	hintText: "Hvad leder du efter?",
	barColor: "#CC6600"
});
scrollView.add(searchBar);

//hide keyboard when clicking outside searchField
self.addEventListener('click', function(e){
	searchBar.blur();
});

var tableView = Titanium.UI.createTableView({
	headerTitle:"Forslag",
	search: searchBar,
	backgroundColor:"transparent",
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
tableView.setData(tbl_data);
scrollView.add(tableView);

var tableViewSelected = Titanium.UI.createTableView({
	headerTitle:"Valgte materialer",
	backgroundColor:"transparent",
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
tableViewSelected.setData(tbl_data_selected);
scrollView2.add(tableViewSelected);

var updateTableViews = function(){
	tableViewSelected.data=tbl_data_selected;
	tableView.data=tbl_data;
	tableViewSelected.setData(tableViewSelected.data);
	tableView.setData(tableView.data);
}

var checkRedundancy = function(name){
	var isReduntant = false;

	for(var i=0; i<tbl_data_selected.length; i++){
		if(tbl_data_selected[i].title.substr(tbl_data_selected[i].title.indexOf(" ")+3,tbl_data_selected[i].title.length) === name){
			isReduntant = true;
		};	
	}
	return isReduntant;	
};

var currentEditElement;

//Creating popups and subviews
var PopOver = require("ui/common/PopOver");
var popOver = new PopOver(false);
var popOverRegged = new PopOver(true);
var popOverView = Ti.UI.createView({
	backgroundColor:"white"
});	
var popOverViewRegged = Ti.UI.createView({
	backgroundColor:"white"
});
var popOverLabel = Ti.UI.createLabel({
	text: "Hvor mange?",
	center: {x: 150, y: 150},
	font: {
		fontSize: 24
	}
});
var popOverButton = Ti.UI.createButton({
	title: "Tilføj",
	width: 100,
	height: 50,
	center: {x: 150, y: 260},
	color: 'black'
});
var numberInputField = Ti.UI.createTextField({
	width: 200,
	height: 50,
	center: {x: 150, y: 200},
	borderRadius: 8,
	borderColor: "black",
	font: {
		fontSize: 22
	},
	enabled: true,
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	clearOnEdit: true
});
var numberInputFieldRegged = Ti.UI.createTextField({
	width: 200,
	height: 50,
	center: {x: 150, y: 200},
	borderRadius: 8,
	borderColor: "black",
	font: {
		fontSize: 22
	},
	enabled: true,
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	clearOnEdit: false
});

var acceptButton = Ti.UI.createButton({
	title: "Ændre antal",
	width: 150,
	height: 50,
	center: {x: 150, y: 260},
	color: 'black'
});

var delButton = Ti.UI.createButton({
	title: "Fjern",
	width: 150,
	height: 50,
	center: {x: 150, y: 320},
	color: 'black'
});
popOverView.add(popOverLabel);
popOverView.add(numberInputField);
popOverView.add(popOverButton);
popOver.add(popOverView);
popOverViewRegged.add(popOverLabel);
popOverViewRegged.add(numberInputFieldRegged);
popOverViewRegged.add(delButton);
popOverViewRegged.add(acceptButton);
popOverRegged.add(popOverViewRegged);

//HANDLER FOR MATERIAL-CLICK
tableView.addEventListener('click', function(e) {
	
		currentEditElement=db.gDataElementByName(e.source.title);
		
		var pickerView = Ti.UI.createView({
			title:"",height:20,width:1,top:20,right:0
		});
		pickerView.addEventListener('postlayout',displayPopOver);
		
		e.row.add(pickerView);	
		
		function displayPopOver(){
			pickerView.removeEventListener('postlayout',displayPopOver);
			popOver.show({view:pickerView, rect:{height:200, width:200, x:-200, y:-100}});
			numberInputField.focus();
		};
					
});
//HANDLER FOR RETURN ON NUMBER ENTERED - MATERIAL
numberInputField.addEventListener('return',function(e){
	if(checkRedundancy(currentEditElement.name)){
		//TODO Currently handles only int
		console.log("Previous number:"+rdb.gDataElementByName(db.gDataElementByName(currentEditElement.name).name).number);
		var valuenumber = parseInt(e.source.value);
		console.log(valuenumber);
		var sum = rdb.gDataElementByName(db.gDataElementByName(currentEditElement.name).name).number+valuenumber;
		rdb.updateDataElementNumber(rdb.gDataElementByName(currentEditElement.name),sum);
		populatorRDB(tbl_data_selected);
		console.log("Number after:"+rdb.gDataElementByName(currentEditElement.name).number);
	}else{
		rdb.addDataElement(db.gDataElementByName(currentEditElement.name),e.source.value);
		tbl_data_selected.push(
					Ti.UI.createTableViewRow({
						title:rdb.gDataElementByName(currentEditElement.name).number+"   "+currentEditElement.name
					}))	
	}
	
	updateTableViews();
	
	popOver.hide();
});

popOverButton.addEventListener('click',function(e){
	if(checkRedundancy(currentEditElement.name)){
		//TODO Currently handles only int
		console.log("Previous number:"+rdb.gDataElementByName(db.gDataElementByName(currentEditElement.name).name).number);
		var valuenumber = parseInt(numberInputField.value);
		console.log(valuenumber);
		var sum = rdb.gDataElementByName(db.gDataElementByName(currentEditElement.name).name).number+valuenumber;
		rdb.updateDataElementNumber(rdb.gDataElementByName(currentEditElement.name),sum);
		populatorRDB(tbl_data_selected);
		console.log("Number after:"+rdb.gDataElementByName(currentEditElement.name).number);
	}else{
		rdb.addDataElement(db.gDataElementByName(currentEditElement.name),numberInputField.value);
		tbl_data_selected.push(
					Ti.UI.createTableViewRow({
						title:rdb.gDataElementByName(currentEditElement.name).number+"   "+currentEditElement.name
					}))	
	}
	
	updateTableViews();
	popOver.hide();
});

//HANDLER FOR REGMATERIAL-CLICK
tableViewSelected.addEventListener('click',function(e){
	var nameOfMaterial = e.source.title.substr(e.source.title.indexOf(" ")+3,e.source.title.length);
	currentEditElement=rdb.gDataElementByName(nameOfMaterial);
	
	var pickerView = Ti.UI.createView({
		title:"",height:20,width:1,top:20,right:0
	});
		
	pickerView.addEventListener('postlayout',displayPopOver);
		
	e.row.add(pickerView);	
		
	function displayPopOver(){
		pickerView.removeEventListener('postlayout',displayPopOver);
		popOverRegged.add(popOverViewRegged);
		popOverRegged.show({view:pickerView, rect:{height:200, width:200, x:-362, y:-100}});
		numberInputFieldRegged.setValue(currentEditElement.number.toString());
		numberInputFieldRegged.focus();
	};
});
//HANDLER FOR DELBUT-CLICK
delButton.addEventListener('click',function(e){
	popOverRegged.hide();
	rdb.deleteDataElementByName(currentEditElement.name);
	populatorRDB(tbl_data_selected,true);
	updateTableViews();
});

//HANDLER FOR ACCEPTBUT-CLICK
acceptButton.addEventListener('click',function(e){
	rdb.updateDataElementNumber(rdb.gDataElementByName(currentEditElement.name), numberInputFieldRegged.value);
	populatorRDB(tbl_data_selected);
	updateTableViews();
	popOverRegged.hide();
});

//HANDLER FOR RETURN ON INPUT NUMBER - REGMATERIAL
numberInputFieldRegged.addEventListener('return',function(e){
	rdb.updateDataElementNumber(rdb.gDataElementByName(currentEditElement.name), e.source.value);
	populatorRDB(tbl_data_selected);
	updateTableViews();
	popOverRegged.hide();
});

searchBar.addEventListener('change',function(e){
	var i=1;
	var searchQuery = searchBar.value;
	searchQuery = searchQuery.substr(0,1).toUpperCase();
	searchQuery += searchBar.value.substr(1,searchBar.value.length).toLowerCase();
	
	
	while(i<=db.gAll().length){
		//console.log("COMPARING: "+searchBar.value+" with "+db.gDataElementById(i).name);
		if(
			db.gDataElementByName(searchQuery) === null
			
			/*db.gDataElementById(i).name.toLowerCase().indexOf(searchBar.value.toLowerCase())===-1&&i===db.gAll().length*/){
			console.log("It wasnt here");
			addMaterialFromSearch();
			break;
		} else if (db.gDataElementById(i).name.toLowerCase().indexOf(searchBar.value.toLowerCase())===-1&&i!==db.gAll().length){
			//console.log("Proceed at "+db.gDataElementById(i).name);
			i++;
		} else {
			//console.log("End of loop");
			if(nmPopOver.visible===true){
				nmPopOver.hide();
				nmPopOver.visible=false;
			}
			break;
		}
	}
});

var nmPopOver=Ti.UI.iPad.createPopover({
	height: 150,
	width: 250,
	title: "Tilføj nyt materiale?",
	arrowDirection: Titanium.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT,
	visible: false
});

var nmPopOverView = Ti.UI.createView({
	backgroundColor:"white"
});

var nmPopOverLabel = Ti.UI.createLabel({
	text: "Vil du tilføje dette materiale?",
	center: {x: 125, y: 50},
	font: {
		fontSize: 18
	}
});

var nmPopOverAddButton = Ti.UI.createButton({
	title: "Tilføj",
	width: 100,
	height: 50,
	center: {x: 125, y: 100},
	color: 'black'	
});

nmPopOverView.add(nmPopOverLabel);
nmPopOverView.add(nmPopOverAddButton);
nmPopOver.add(nmPopOverView);

//HANDLER FOR NMADDBUT-CLICK
nmPopOverAddButton.addEventListener('click',function(e){
	nmPopOver.hide();
	nmPopOver.visible=false;
	var searchQuery = searchBar.value;
	var nameOfNewMaterial = searchQuery;
	nameOfNewMaterial = nameOfNewMaterial.toLowerCase().charAt(0).toUpperCase()+nameOfNewMaterial.toLowerCase().substr(1,nameOfNewMaterial.length);
	console.log("Adding "+nameOfNewMaterial+" to database");
	db.addDataElementFromName(nameOfNewMaterial);
	remotedb.postMaterial(nameOfNewMaterial);
	populatorDB(tbl_data);
	updateTableViews();
	searchBar.value = "";
	searchBar.value = searchQuery;
	searchBar.focus();
	self.fireEvent('breaksearch');
});

addNewMaterialBtn.addEventListener('click',function(e){
	if(searchBar.value!==""){
		if(nmPopOver.visible===true){
			nmPopOver.hide();
			nmPopOver.visible=false;
		}
	}
	var searchQuery = searchBar.value;
	var nameOfNewMaterial = searchQuery;
	nameOfNewMaterial = nameOfNewMaterial.toLowerCase().charAt(0).toUpperCase()+nameOfNewMaterial.toLowerCase().substr(1,nameOfNewMaterial.length);
	console.log("Adding "+nameOfNewMaterial+" to database");
	db.addDataElementFromName(nameOfNewMaterial);
	remotedb.postMaterial(nameOfNewMaterial);
	populatorDB(tbl_data);
	updateTableViews();
	searchBar.value = "";
	searchBar.value = searchQuery;
	searchBar.focus();
	self.fireEvent('breaksearch');
});

var addMaterialFromSearch = function(){
	var pickerView = Ti.UI.createView({
			title:"",height:20,width:1,top:20,right:0
		});
	pickerView.addEventListener('postlayout',displayPopOver);
		
	searchBar.add(pickerView);	
	
	nmPopOverLabel.text = "Vil du tilføje '"+searchBar.value.toLowerCase().charAt(0).toUpperCase()+searchBar.value.toLowerCase().substr(1,searchBar.value.length)+"' ?";
	if(nmPopOverView.children>1){
		nmPopOverView.remove(nmPopOverLabel);
	}
	nmPopOverView.add(nmPopOverLabel);
	
		function displayPopOver(){
			pickerView.removeEventListener('postlayout',displayPopOver);
			console.log("Displaying popover?"+nmPopOver.visible);
			if(nmPopOver.visible===false){
				nmPopOver.show({view:pickerView, rect:{height:200, width:200, x:-170, y:-100}});
				nmPopOver.visible=true;	
			}
		};
};

//JONAS LEGER MED BROWSING
// var browseButton = Ti.UI.createButton({
	// right: 10,
	// title: "Gennemse katalog",
	// image: "/images/64.png" 
// });
// self.rightNavButton = browseButton;
// 
// var BrowseMatWin = require("/ui/tablet/BrowseMatWin");
// 
// browseButton.addEventListener("click", function(e) {
	// self.containingTab.open(
	// new BrowseMatWin()
	// )
// });

	return self;
};

module.exports = RegMatWin;