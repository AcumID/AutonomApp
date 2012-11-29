// edited by RBORLUM @ 1611:131112
function RegistrationDatabase() {
	var api = {};
	
	var db = Ti.Database.open('registration');
	db.execute('CREATE TABLE IF NOT EXISTS regmaterials (id INTEGER PRIMARY KEY, stocknumber INTEGER, name TEXT, unit TEXT, assignments TEXT, image BLOB, price REAL, number REAL)');
	//db.execute('DELETE FROM regmaterials'); //This will delete all data in table
	
	//Add a dataelement to the database
	api.addDataElement=function(dataElement, numberOfElements){
		var stocknumber = dataElement.stocknumber;
		var name = '"'+dataElement.name+'"';
		var unit = '"'+dataElement.unit+'"';
		var assignments = '"'+dataElement.assignments+'"';
		var image = '"'+dataElement.image+'"';
		var price = dataElement.price;
		var number = numberOfElements;
		db.execute('INSERT INTO regmaterials (stocknumber, name, unit, assignments, image, price, number) VALUES ('+stocknumber+', '+name+', '+unit+', '+assignments+', '+image+', '+price+', '+number+')');
		return db.lastInsertRowId;
	};
	
	//Get all dataelements in database
	api.gAll = function(){
		var results = [];
		//get dataelements from database
		var resultSet = db.execute('SELECT * FROM regmaterials');
		while(resultSet.isValidRow()){
			results.push({
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price'),
				number: resultSet.fieldByName('number')
			});
			resultSet.next();
		}
		resultSet.close();
		
		return results; //return an array of JavaScript objects reflecting the materials
	};
	
	api.gDataElementById = function(id){
		var result = null;
		var resultSet = db.execute('SELECT * FROM regmaterials WHERE id = ?', id);
		if(resultSet.isValidRow()){
			result = {
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price'),
				number: resultSet.fieldByName('number')
			};
		}
		return result;
	};
	
	api.gDataElementByName = function(name){
		var result = null;
		var resultSet = db.execute('SELECT * FROM regmaterials WHERE name = ?', name);
		if(resultSet.isValidRow()){
			result = {
				id: resultSet.fieldByName('id'),
				stocknumber: resultSet.fieldByName('stocknumber'),
				name: resultSet.fieldByName('name'),
				unit: resultSet.fieldByName('unit'),
				assignments: resultSet.fieldByName('assignments'),
				image: resultSet.fieldByName('image'),
				price: resultSet.fieldByName('price'),
				number: resultSet.fieldByName('number')
			};
		}
		return result;
	};
	
	api.updateDataElementId = function(dataElement,id){
		db.execute('UPDATE regmaterials SET id = '+id+' WHERE name = "'+dataElement.name+'"');
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	api.updateDataElementNumber = function(dataElement,number){
		console.log(dataElement.name);
		db.execute("UPDATE regmaterials SET number = "+number+" WHERE name = '"+dataElement.name+"'");
		return db.rowsAffected;
	};
	
	api.updateDataElement = function(dataElement){
		db.execute('UPDATE regmaterials SET stocknumber = '+dataElement.stocknumber+', name = "'+dataElement.name+'", unit = "'+dataElement.unit+'", assignments = "'+dataElement.assignments+'", image = "'+dataElement.image+'", price = '+dataElement.price+', number = '+dataElement.number+' WHERE id = '+dataElement.id);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.deleteDataElementById = function(id){
		db.execute('DELETE FROM regmaterials WHERE id = ?',id);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.deleteDataElementByName = function(name){
		db.execute('DELETE FROM regmaterials WHERE name = ?',name);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.updateNumberOfDataElement = function(dataElement,newNumber){
		db.execute('UPDATE regmaterials SET number = '+newNumber+' WHERE id = '+dataElement.id);
		return db.rowsAffected; //return the number of rows affected by the last query
	};
	
	api.reduceNumberOfDataElement = function(dataElement,amount){
		var newNumber = dataElement.number-amount;
		api.updateNumberOfDataElement(dataElement,newNumber);
	};
	
	api.increaseNumberOfDataElement = function(dataElement,amount){
		var newNumber = dataElement.number+amount;
		api.updateNumberOfDataElement(dataElement,newNumber);
	};
	
	return api;
}

module.exports = RegistrationDatabase;

