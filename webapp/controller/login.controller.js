sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel,MessageBox) {
	"use strict";
	return Controller.extend("cognitivepp.CognitiveApp.controller.login", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cognitivepp.CognitiveApp.view.login
		 */
		onInit: function () {},
		onNewuser: function (oEvent) {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("Newuser"); //			this.getRouter().navTo("Newuser");
		},
		/**
		 *@memberOf cognitivepp.CognitiveApp.controller.login
		 */
		onLogin: function (oEvent) {
			//This code was generated by the layout editor.
			
			var email = this.onEmail(oEvent);
			
			if (email === true) {
			
			this.userModel = new sap.ui.model.json.JSONModel();
			var lEmail = this.byId("idEmail").getValue();
			var lPassword = this.byId("idPassword").getValue();
			var logindetails = JSON.stringify({
				"email": lEmail,
				"password": lPassword
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();
			var sUrl2 = "http://localhost:3000/login/";
			jQuery.ajax({
				type: "POST",
				url: sUrl2,
				data: logindetails,
				contentType: "application/json",
				error: function (jqXHR, textStatus, errorThrown) {
					var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
					jQuery.sap.log.error("Invalid Login:", sMessage, "index.html");
					oGlobalBusyDialog.close();
					//sap.m.MessageToast.show(errorThrown);
					sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
				},
				success: function (oData, status, jqXHR) {
					oGlobalBusyDialog.close();
					this.userModel = new sap.ui.model.json.JSONModel();
					this.userModel.setJSON(JSON.stringify(oData));
					sap.ui.getCore().setModel(this.userModel);
					oRouter.navTo("Menu", {
						"user": oData.user1.firstname
					});
				}
			}); //		this.getRouter().navTo("MainView");
		}
		
		else {
			
		}
			
		},
		/**
		 *@memberOf cognitivepp.CognitiveApp.controller.login
		 */
		onEmail: function (oEvent) {
			//This code was generated by the layout editor.
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			var lvEmail = this.byId("idEmail").getValue();
			if (!lvEmail) {
				this.byId("idEmail").setValueState(sap.ui.core.ValueState.Error);
				this.byId("idEmail").setValueStateText("Enter Email");
				return false;
			} else {
				this.byId("idEmail").setValueState(sap.ui.core.ValueState.None);
				if (!mailregex.test(lvEmail)) {
					this.byId("idEmail").setValueState(sap.ui.core.ValueState.Error);
					this.byId("idEmail").setValueStateText("Enter valid Email");
					return false;
				}
				else{
					return true;
				}
			}
		}
	});
});