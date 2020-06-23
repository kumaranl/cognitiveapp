sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library"
], function (Controller,UIComponent,JSONModel,Popover,Button,library) {
	"use strict";
	var ButtonType = library.ButtonType,
	PlacementType = library.PlacementType;
	return Controller.extend("cognitivepp.CognitiveApp.controller.Menu", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cognitivepp.CognitiveApp.view.Menu
		 */
		onInit: function () {
			this.oModel= sap.ui.getCore().getModel(this.userModel);
			var iduserb = this.byId("text2");
		
			iduserb.setModel(this.oModel);
			
		//("userData");
//		alert(oModel);
	//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	//	oRouter.getRoute("Menu").attachMatched(this.onRouteMatched, this);	
		},
		
		handleUserNamePress: function (event) {
			var oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: 'Logout',
						type: ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			oPopover.openBy(event.getSource());
		},
		
	//	onRouteMatched: function (oEvent) {
//			var oArguments = oEvent.getParameter("arguments");
//			var user = oArguments.user;
//			alert(user);
			
//			},
		
		
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},
		onItemSelect: function(oEvent){
	//		alert("I am here");
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},
		onCollapseExpandPress: function () {
			var oSideNavigation = this.byId("sideNavigation");
			var bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},

		onHideShowSubItemPress: function () {
			var oNavListItem = this.byId("subItem3");
			oNavListItem.setVisible(!oNavListItem.getVisible());
		},
		onNavigate: function() {
			 
			 	
			 this.getRouter().navTo("MainView");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cognitivepp.CognitiveApp.view.Menu
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cognitivepp.CognitiveApp.view.Menu
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cognitivepp.CognitiveApp.view.Menu
		 */
		//	onExit: function() {
		//
		//	}

	});

});