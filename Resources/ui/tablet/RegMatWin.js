/**
 * @author Jonas
 */
var platform = Ti.Platform.osname;

var Database = require('db/Database');
var db = new Database();
var RegistrationDatabase = require('db/RegistrationDatabase');
var rdb = new RegistrationDatabase();

function RegMatWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
	//	backgroundColor:'white',
		layout: "horizontal",
		backgroundImage: "images/back.png"
	});


var scrollView = Ti.UI.createScrollView({
	layout: "vertical",
	backgroundColor:"#55858585",
	borderColor:"#9D9D9D",
	borderRadius:1,
	width:"50%"
	});
self.add(scrollView);


var scrollView2 = Ti.UI.createScrollView({
	layout: "vertical",
	//backgroundColor:"#EEEEEE",
	width:"50%"	});
self.add(scrollView2);

var tbl_data = [];

var tbl_data_selected = [];



//adds content to tbl data from DB
function populatorDB(element){
for (var i = 1; i <= db.gAll().length; i++) {
	var row = Ti.UI.createTableViewRow({
		title: db.gDataElementById(i).name
	});
	
	
	
	element.push(row);
	};
};

//adds content to tbl data selected from RDB
function populatorRDB(element){
	
	for (var i = 1; i <= rdb.gAll().length; i++) {
		var row = Ti.UI.createTableViewRow({
			title: rdb.gDataElementById(i).number+"   "+rdb.gDataElementById(i).name
		});
		
		element[i-1]=row;
	};
};

populatorDB(tbl_data);
populatorRDB(tbl_data_selected);


//Creating Searchbar
if(platform === "mobileweb"){
	var searchBar = Ti.UI.createTextField({
 		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 		center: 50,
 		width: 250, 
 		height: 40 
	});
} else {
	var searchBar = Titanium.UI.createSearchBar({
		//TODO only hinttext seems to be working
		backgroundColor: "black",
		barColor: '#385292',
		showCancel: false,
		hintText: "Hvad leder du efter?"
	});
}
scrollView.add(searchBar);

var tableView = Titanium.UI.createTableView({
	headerTitle:"Forslag",
	search: searchBar,
});
if(platform === "ipad"){
	tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}
tableView.setData(tbl_data);
scrollView.add(tableView);

var tableViewSelected = Titanium.UI.createTableView({
	headerTitle:"Valgte materialer",
});
if(platform === "ipad"){
	tableViewSelected.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}
tableViewSelected.setData(tbl_data_selected);
scrollView2.add(tableViewSelected);

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







var popOver = Ti.UI.iPad.createPopover({
	height:400,
	width:300,
	title:"Redigér antal",
	arrowDirection:Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT
});

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
			
			popOver.addEventListener('hide',function(evt){
				e.row.remove(pickerView)
			});
			
			popOver.add(popOverView);
			popOver.show({view:pickerView, rect:{height:200, width:200, x:-200, y:-100}});
			numberInputField.focus();
		};
					
});


var popOverView = Ti.UI.createView({
	backgroundColor:"white"
});

var popOverLabel = Ti.UI.createLabel({
	text: "Hvor mange?",
	center: {x: 150, y: 150},
	font: {
		fontSize: 24
	}
});

var numberInputField = Ti.UI.createTextField({
	value: 1,
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

popOverView.add(popOverLabel);
popOverView.add(numberInputField);

//HANDLER FOR RETURN ON NUMBER ENTERED
numberInputField.addEventListener('return',function(e){
	if(checkRedundancy(currentEditElement.name)){
		//TODO Currently interprets inputTextField.value as String = mathmatics are not right.	
		rdb.updateDataElementNumberByName(db.gDataElementByName(currentEditElement.name), (rdb.gDataElementByName(currentEditElement.name).number+e.source.value));
		populatorRDB(tbl_data_selected);
		
	}else{
		rdb.addDataElement(db.gDataElementByName(currentEditElement.name),e.source.value);
		tbl_data_selected.push(
					Ti.UI.createTableViewRow({
						title:rdb.gDataElementByName(currentEditElement.name).number+"   "+currentEditElement.name
					}))	
	}
	e.source.value=1;
	tableViewSelected.data = tbl_data_selected;
	popOver.hide();
});

//HANDLER FOR REGMATERIAL-CLICK
tableViewSelected.addEventListener('click',function(e){
	var nameOfMaterial = e.source.title.substr(e.source.title.indexOf(" ")+3,e.source.title.length);
	tableViewSelected.deleteRow(e.index,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	rdb.deleteDataElementByName(nameOfMaterial);
	var newIndex = 1;
	for(dataElement in rdb.gAll()){
		//TODO HER ER DET AT DER SKAL SKE NOGET - RAMMUS ER IGANG LIGE HER
		rdb.updateDataElementId(dataElement,newIndex);
		newIndex++;
	};
});

//NOW SCROLLVIEWS HAS BEEN ADDED + EVENTLISTENERS

var browseButton = Ti.UI.createButton({
	right: 10,
	title: "Gennemse katalog",
	image: "/images/64.png"
});
self.rightNavButton = browseButton;

browseButton.addEventListener("click", function(e) {
	self.containingTab.open(Ti.UI.createWindow({
			title: "test",
			backgroundColor: 'white'
		}));
});

	return self;
};

module.exports = RegMatWin;