/**
 * @author Jonas
 */
var platform = Ti.Platform.osname;


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


//adds content to tbl data, hvem db is setup it has to take date therefrom, but for now it just creates a "row" text
function populator(element){
for (var i = 0; i < 12; i++) {
	var row = Ti.UI.createTableViewRow();
	
	var nameLabel = Ti.UI.createLabel({
		left: 10,
		text: 'Row ' + (i+1)
	});
	var button = Ti.UI.createButton({
			right: 10,
			height: 30,
			width: 80
			});
	if(element === tbl_data_selected){
			button.title = 'Fjern'
			
		var counterLabel = Ti.UI.createLabel({
			height:30,
			width: 40,
			title: "10"
		});
		row.add(counterLabel);
			
	}else{
		button.title = "Tilføj"
	}
	row.add(nameLabel);
	row.add(button);
	element.push(row);
	};
};

populator(tbl_data);
populator(tbl_data_selected);


//This wont work in webapp, but will in IOS
if(platform === "iPad"){
	
	var searchBar = Titanium.UI.createSearchBar({
	barColor: '#385292',
	showCancel: false 
});	
alert("Det var iPad");
	
	}else{
	var searchBar = Titanium.UI.createSearchBar({
	barColor: '#385292',
	showCancel: false 
	//To be used in webapp
/*	var searchBar = Ti.UI.createTextField({
 	 borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 	 center: 50,
 	 width: 250, 
 	 height: 40 */
	});
};
scrollView.add(searchBar);

var browseButton = Ti.UI.createButton({
	right: 10,
	title: "Gennemse katalog",
	image: "/images/64.png"
});
self.rightNavButton = browseButton;



var tableView = Titanium.UI.createTableView({
	headerTitle:"Materialeforslag",
	search: searchBar,
	//this  is removed in  web preview
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});
tableView.setData(tbl_data);
scrollView.add(tableView);




var tableViewSelected = Titanium.UI.createTableView({
	headerTitle:"Materialeliste",
	//this  is removed in  web preview
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});
tableViewSelected.setData(tbl_data_selected);
scrollView2.add(tableViewSelected);


browseButton.addEventListener("click", function(e) {
	self.containingTab.open(Ti.UI.createWindow({
			title: "test",
			backgroundColor: 'white'
		}));
});

tableView.addEventListener('click', function(e) {
		createConfirmDialog(e.row.title).show();
	});
	
	
function createConfirmDialog(title) {

	var confirm = Ti.UI.createAlertDialog({
		title: 'Change Task Status',
		message: title
	});
	
	return confirm;
};



	
	return self;
};

module.exports = RegMatWin;