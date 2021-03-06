function ApplicationTabGroup(WelcomeWin, RegMatWin, RegTimeWin, ToolWin) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	self.activeTabBackgroundSelectedColor="#FF6600";
	
	//create app tabs
	var win1 = new WelcomeWin("Velkommen"),
		win2 = new RegMatWin("Registrering af materialer"),
		win3 = new RegTimeWin("Registrering af tid"),
		win4 = new ToolWin("hej")
		
	var tab1 = Ti.UI.createTab({
		title: "Velkommen",
		icon: '/images/89.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: "Registrer materialer",
		icon: '/images/18.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: "Registrer Tid",
		icon: '/images/66.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 =Ti.UI.createTab({
		title: " ",
		window: win4
	})
	win4.containgingTab = tab4;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	return self;
};

module.exports = ApplicationTabGroup;
