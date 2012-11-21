// edited by RBORLUM @ 1427:121112
function Database() {
	var api = {};
	
	var db = Ti.Database.open('carpenters');
	db.execute('CREATE TABLE IF NOT EXISTS materials (id INTEGER PRIMARY KEY, stocknumber INTEGER, name TEXT, unit TEXT, assignments TEXT, image BLOB, price REAL)');
	db.execute('CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, name TEXT, type TEXT, carpenter_id INT)');
	db.execute('CREATE TABLE IF NOT EXISTS assignments (id INTEGER PRIMARY KEY, name TEXT)');
	//db.execute('DELETE FROM materials'); //This will delete all data in table
	
	//Add a dataelement to the database
	api.addDataElement=function(dataElement){
		var stocknumber = dataElement.stocknumber;
		var name = '"'+dataElement.name+'"';
		var unit = '"'+dataElement.unit+'"';
		var assignments = '"'+dataElement.assignments+'"';
		var image = '"'+dataElement.image+'"';
		var price = dataElement.price;
		db.execute('INSERT INTO materials (stocknumber, name, unit, assignments, image, price) VALUES ('+stocknumber+', '+name+', '+unit+', '+assignments+', '+image+', '+price+')');
		return db.lastInsertRowId;
	};
	
	api.addEmployee=function(dataElement){
		var name = '"'+dataElement.name+'"';
		var type = '"'+dataElement.type+'"';
		db.execute('INSERT INTO employees (name, carpenter_id) VALUES ('+name+', '+dataElement.carpenter_id+')');
		return db.lastInsertRowId;
	};
	
	api.addAssignment=function(dataElement){
		var name = '"'+dataElement.name+'"';
		db.execute('INSERT INTO assignments (name) VALUES ('+name+')');
		return db.lastInsertRowId;
	};
	
	api.addDataElementFromName=function(name){
		name=name.toString();
		db.execute('INSERT INTO materials (name, unit) VALUES ("'+name+'", "STK")');
		return db.lastInsertRowId;
	};
	
	//Get all dataelements in database
	api.gAll = function(){
		var results = [];
		//get dataelements from database
		var resultSet = db.execute('SELECT * FROM materials');
		while(resultSet.isValidRow()){
			results.push({
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price')
			});
			resultSet.next();
		}
		resultSet.close();
		
		return results; //return an array of JavaScript objects reflecting the materials
	};
	
	api.gAllEmployees = function(){
		var results = [];
		//get dataelements from database
		var resultSet = db.execute('SELECT * FROM employees');
		while(resultSet.isValidRow()){
			results.push({
				id: resultSet.fieldByName('id'),
				name: resultSet.fieldByName('name'),
				type: resultSet.fieldByName('type'),
				carpenter_id: resultSet.fieldByName('carpenter_id')
			});
			resultSet.next();
		}
		resultSet.close();
		
		return results; //return an array of JavaScript objects reflecting the materials
	};
	
	api.gAllAssignments = function(){
		var results = [];
		//get dataelements from database
		var resultSet = db.execute('SELECT * FROM assignments');
		while(resultSet.isValidRow()){
			results.push({
				id: resultSet.fieldByName('id'),
				name: resultSet.fieldByName('name')
			});
			resultSet.next();
		}
		resultSet.close();
		return results; //return an array of JavaScript objects reflecting the materials
	};
	
	//Get all by assignment
	api.gAllByAssignment = function(assignment){
		var results = [];
		var resultsToSort = [];
		//get dataelements from database
		var resultSet = db.execute('SELECT * FROM materials');
		while(resultSet.isValidRow()){
			resultsToSort.push({
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price')
			});
			resultSet.next();
		}
		resultSet.close();
		//TODO sort results by assignment, following by alphabetical rests
		resultsToSort.sort();
		for (place in resultsToSort){
			if(resultsToSort[place].assignments!==null){
				if (resultsToSort[place].assignments.indexOf(assignment)!==-1){
				results.push(resultsToSort[place]);
				}	
			}
		}
		for (place in resultsToSort){
			if (results.indexOf(resultsToSort[place])===-1){
				results.push(resultsToSort[place]);
			}
		}
		
		return results; //return an array of JavaScript objects reflecting the materials
		
	}
	
	api.gDataElementById = function(id){
		var result = null;
		var resultSet = db.execute('SELECT * FROM materials WHERE id = ?', id);
		if(resultSet.isValidRow()){
			result = {
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price')
			};
		}
		return result;
	};
	
	api.gDataElementByName = function(name){
		var result = null;
		console.log("gDataElementByName sger "+name);
		var resultSet = db.execute('SELECT * FROM materials WHERE name = ?', name);
		if(resultSet.isValidRow()){
			result = {
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price')
			};
		}
		return result;
	};
	
	api.updateDataElement = function(dataElement){
		db.execute('UPDATE materials SET stocknumber = '+dataElement.stocknumber+', name = "'+dataElement.name+'", unit = "'+dataElement.unit+'", assignments = "'+dataElement.assignments+'", image = "'+dataElement.image+'", price = '+dataElement.price+' WHERE id = '+dataElement.id+'');
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.deleteDataElementById = function(id){
		db.execute('DELETE FROM materials WHERE id = ?',id);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
		api.deleteDataElementByName = function(name){
		db.execute('DELETE FROM materials WHERE name = ?',name);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.refreshMaterialsFromRemoteDB = function(data){
		db.execute('DELETE FROM materials');
		
		var loadedData = data;
		
		//console.log("loadeddata:"+loadedData+"lige før remoteDB");
		
		for(var i=0;i<loadedData.length;i++){
			//console.log("Now adding: "+loadedData[i].name+" to database");
			api.addDataElement(loadedData[i]);
		}
	};
	
	api.refreshEmployeesFromRemoteDB = function(data){
		db.execute('DELETE FROM employees');
		
		var loadedData = data;
		
		console.log("loadeddata:"+loadedData+"lige før remoteDB");
		
		for(var i=0;i<loadedData.length;i++){
			console.log("Now adding: "+loadedData[i].name+" to database");
			api.addEmployee(loadedData[i]);
		}
		var persons = Ti.App.Properties.setList("persons",db.gAllEmployees());
	};
	
	api.refreshAssignmentsFromRemoteDB = function(data){
		
		db.execute('DELETE FROM assignments');
		
		var loadedData = data;
		
		console.log("loadeddata:"+loadedData+"lige før remoteDB");
		
		for(var i=0;i<loadedData.length;i++){
			console.log("Now adding: "+loadedData[i].name+" to database");
			api.addAssignment(loadedData[i]);
		}
		
		var assignments = Ti.App.Properties.setList("assignments",db.gAllAssignments());
	};
	
	return api;
}

module.exports = Database;

