//edited by RBORLUm @ 1429:121112
function RemoteDatabase(DB) {
	var api = {};
	var db = require("Database");
	db = DB;
	var materials = new Array();
	var loaded = false;
	
	api.loadRemoteData = function(){
		var loader = Ti.Network.createHTTPClient();
		loader.open("GET",'http://rborlum.dk/RegApp/phpFoolAround/getMaterials.php');
		loader.onload = function(e){
			//alert('success');
			var jsondata=JSON.parse(this.responseText);
			for(var i=0; i<jsondata.length; i++){
				materials[i]=jsondata[i];
				
			
			}
			db.refreshFromRemoteDB(materials);
			return loaded=true;
		};
		
		loader.onerror = function(e){
			alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			return loaded=true;
		};
		
		loader.send();
		
	}
	
	return api;
}

module.exports = RemoteDatabase;