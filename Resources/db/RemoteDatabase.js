//edited by RBORLUm @ 1429:121112
function RemoteDatabase(DB) {
	var api = {};
	var db = require("Database");
	db = DB;
	var materials = new Array();
	var employees = new Array();
	var assignments = new Array();
	var loadedMaterials = false;
	var loadedEmployees = false;
	var loadedAssignments = false;
	var sessionId;
	
	//Login to remotedatabase
	api.login=function(user,pass){
		var loader = Ti.Network.createHTTPClient();
			loader.open('POST','http://rborlum.dk/boellephp/Login');
			
			loader.onload = function(e){
				sessionId=this.responseText;
				//api.postMaterial("TESTTVEBAKKE");
				//api.poster("Tveskægsbakke 1",2,3,1,1,[{employee_id: 22, hours: 33}],[{material_id: 22, niumber: 33}]);
			};
		
			loader.onerror = function(e){
				//alert("Tis: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" readystate: "+e.readystate);
			};
			loader.send({
    			username:user,
    			password:pass
			});
	};
	
	api.poster=function(location,assignmentid,carhours,clientseen,clienttalked,employees,materials){
		var loader2 = Ti.Network.createHTTPClient();
			loader2.open('POST','http://rborlum.dk/boellephp/Registrations/Add');
			
			loader2.onload = function(e){
			};
		
			loader2.onerror = function(e){
				Ti.API.debug(e.error);
				alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			};
			
			loader2.send({
				session: sessionId,
    			name:location,
    			assignment_id:assignmentid,
    			car_hours: carhours,
    			client_seen: clientseen,
    			client_talked: clienttalked,
    			employees: JSON.stringify(employees),
    			materials: JSON.stringify(materials)
    			//employees: JSON.stringify([{employee_id: 22, hours: 33}]),
    			//materials: JSON.stringify([{material_id: 30, number: 23}])
			});
			
	};
	
	api.postMaterial=function(name){
		var loader2 = Ti.Network.createHTTPClient();
			loader2.open('POST','http://rborlum.dk/boellephp/Materials/Add');
			
			loader2.onload = function(e){
				//alert(this.responseText);
			};
		
			loader2.onerror = function(e){
				Ti.API.debug(e.error);
				//alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			};
			loader2.send({
				session: sessionId,
    			name:name,
    			stocknumber:"0",
    			unit:"STK",
    			price:0
			});
			
	};
	
	api.loadMaterials = function(){
		var loaderM = Ti.Network.createHTTPClient();
		loaderM.open("GET",'http://rborlum.dk/RegApp/getMaterials.php');
		loaderM.onload = function(e){
			//alert('success');
			var jsondata=JSON.parse(this.responseText);
			for(var i=0; i<jsondata.length; i++){
				materials[i]=jsondata[i];
			}
			db.refreshMaterialsFromRemoteDB(materials);
			return loadedMaterials=true;
		};
		
		loaderM.onerror = function(e){
			//alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			return loadedMaterials=true;
		};
		loaderM.send();
	};
	
	api.loadEmployees = function(){
		var loaderE = Ti.Network.createHTTPClient();
		loaderE.open("GET",'http://rborlum.dk/RegApp/getEmployees.php');
		loaderE.onload = function(e){
			//alert('success');
			var jsondata=JSON.parse(this.responseText);
			for(var i=0; i<jsondata.length; i++){
				employees[i]=jsondata[i];
			}
			db.refreshEmployeesFromRemoteDB(employees);
			return loadedEmployees=true;
		};
		
		loaderE.onerror = function(e){
			//alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			return loadedEmployees=true;
		};
		loaderE.send();
	};
	
	api.loadAssignments = function(){
		var loaderA = Ti.Network.createHTTPClient();
		loaderA.open("GET",'http://rborlum.dk/RegApp/getAssignments.php');
		loaderA.onload = function(e){
			var jsondata=JSON.parse(this.responseText);
			for(var i=0; i<jsondata.length; i++){
				assignments[i]=jsondata[i];
			}
			db.refreshAssignmentsFromRemoteDB(assignments);
			
			return loadedAssignments=true;
		};
		
		loaderA.onerror = function(e){
			//alert("Status: "+e.status+" Text: "+e.responseText+" Error: "+e.error+" READYSTATE: "+e.readystate);
			return loadedAssignments=true;
		};
		loaderA.send();
	}
	
	return api;
}

module.exports = RemoteDatabase;