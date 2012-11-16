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
		backgroundColor:'white',
		layout: "horizontal"
	});

var scrollView = Ti.UI.createScrollView({
	layout: "vertical",
	width:"50%"
	});
self.add(scrollView);


var scrollView2 = Ti.UI.createScrollView({
	layout: "vertical",
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
	
	var button = Ti.UI.createButton({
			right: 10,
			height: 30,
			width: 80,
			title: 'Tilføj'
			});
			
	row.add(button);
	element.push(row);
	};
};

//adds content to tbl data selected from RDB
function populatorRDB(element){
	for (var i = 1; i <= rdb.gAll().length; i++) {
			console.log(rdb.gDataElementById(i).name+" "+rdb.gDataElementById(i).number);
		var row = Ti.UI.createTableViewRow({
			title: rdb.gDataElementById(i).number+"   "+rdb.gDataElementById(i).name
		});
		
		var button = Ti.UI.createButton({
			right: 10,
			height: 30,
			width: 80,
			title: 'Fjern'
		});
			
		var counterLabel = Ti.UI.createLabel({
			height: 30,
			width: 40,
			title: rdb.gDataElementById(i).number
		});
	
		row.add(counterLabel);
		row.add(button);
		element.push(row);
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
		barColor: '#385292',
		showCancel: false,
	});
}
scrollView.add(searchBar);

var tableView = Titanium.UI.createTableView({
	headerTitle:"Materialeforslag",
	search: searchBar,
});
if(platform === "ipad"){
	tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}
tableView.setData(tbl_data);
scrollView.add(tableView);

var tableViewSelected = Titanium.UI.createTableView({
	headerTitle:"Materialeliste",
});
if(platform === "ipad"){
	tableViewSelected.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
}
tableViewSelected.setData(tbl_data_selected);
scrollView2.add(tableViewSelected);

tableView.addEventListener('click', function(e) {
	console.log(e.source.title);
	rdb.addDataElement(db.gDataElementByName(e.source.title),1);
	console.log(rdb.gAll());
	tableViewSelected.appendRow({title:rdb.gDataElementByName(e.source.title).number+"   "+e.source.title},{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});	
});

tableViewSelected.addEventListener('click',function(e){
	var nameOfMaterial = e.source.title.substr(e.source.title.indexOf(" ")+3,e.source.title.length);
	console.log(nameOfMaterial);
	tableViewSelected.deleteRow(e.index,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	rdb.deleteDataElementByName(nameOfMaterial);
	var newIndex = 1;
	for(dataElement in rdb.gAll()){
		//TODO HER ER DET AT DER SKAL SKE NOGET - RAMMUS ER IGANG LIGE HER
		console.log("UPDATING "+dataElement.name+" NI: "+newIndex);
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