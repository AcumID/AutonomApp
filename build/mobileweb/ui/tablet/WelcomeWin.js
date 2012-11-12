function WelcomeWin(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var svdName = "Pedersen",
		lrlName = "Findus",
		prtName = "Solceller på Birkevej 12";
	
	var textField = Ti.UI.createView ({
		width:"90%"
	});
	self.add(textField);
	
	var nameLabel = Ti.UI.createLabel({
		text: "Hej "+svdName+" og "+lrlName,
		font: {fontFamily:"Segoe UI", fontSize: 56},
		top:"1%"
	});
	textField.add(nameLabel);
	
	var projectLabel = Ti.UI.createLabel({
		text: "I dag arbejder I på "+prtName+". Hvis I har nogle spørgsmål i forbindelse med projektet, dagens gang eller lignende, kig under fanen Projektbeskrivelse i bunden af skærmen.",
		font: {fontFamily:"Segoe UI Light", fontSize: 40},
		top:"15%",
		width:"100%"
	});
	textField.add(projectLabel);
	
	var confirmerLabel = Ti.UI.createLabel({
		text: "Stemmer projektet, adressen eller navnet ikke?",
		font: {fontFamily:"Segoe UI Light", fontSize: 30},
		top:"60%",
		width:"100%"
	});
	textField.add(confirmerLabel);
	
	var confirmButton = Ti.UI.createButton({
		title: "Det stemmer >",
		top:"70%",
		left:"75%"
	});
	textField.add(confirmButton);
	
	var declineButton = Ti.UI.createButton({
		title: "Noget stemmer ikke",
		top:"70%",
		left:"25%"
	});
	textField.add(declineButton);
	
	return self;
};

module.exports = WelcomeWin;
