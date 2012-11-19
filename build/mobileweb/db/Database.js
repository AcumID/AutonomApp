// edited by RBORLUM @ 1427:121112
function Database() {
	var api = {};
	
	var db = Ti.Database.open('materials');
	db.execute('CREATE TABLE IF NOT EXISTS materials (id INTEGER PRIMARY KEY, stocknumber INTEGER, name TEXT, unit TEXT, assignments TEXT, image BLOB, price REAL)');
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
	
	api.refreshFromRemoteDB = function(data){
		db.execute('DELETE FROM materials');
		
		var loadedData = data;
		
		console.log("loadeddata:"+loadedData+"lige før remoteDB");
		
		for(var i=0;i<loadedData.length;i++){
			console.log("Now adding: "+loadedData[i].name+" to database");
			api.addDataElement(loadedData[i]);
		}
	};
	
	return api;
}

module.exports = Database;

