sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
], function (Controller, MessageBox, UIComponent, History) {
	"use strict";
	return Controller.extend("cognitivepp.CognitiveApp.controller.Extractdetail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cognitivepp.CognitiveApp.view.Extractdetail
		 */
		onInit: function () {
			
			
			var lvstatus = "Extracted";

			var lv_where = "filter[where][and][0][invoicestatus]=" + lvstatus;

			var sUrl_list = "http://localhost:3000/invoicefiles?" + lv_where;
			jQuery.ajax({
				type: "GET",
				//			dataType: "xml",
				dataType: "json",
				data: {},
				url: sUrl_list,
				context: this,
				crossDomain: true,
				error: function (jqXHR, textStatus, errorThrown) {
					var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
					jQuery.sap.log.error("Data loading error", sMessage, "index.html");
					sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
				},
				success: function (oData, status, jqXHR) {
					if (oData === null || oData === undefined) {
						var sMessage = "WARNING. Received a null or undefined response object.";
						jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
						sap.m.MessageToast.show(sMessage);
						return;
					} else

					//			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
						var invuploadstatus = new sap.ui.model.json.JSONModel(oData);
					//		    var oTable = this.byId("mTable");
					//					this.getView().setModel(invuploadstatus);
					var oSelect = this.byId("selectfile");
					oSelect.setModel(invuploadstatus);
				}
			});
			
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cognitivepp.CognitiveApp.view.Extractdetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cognitivepp.CognitiveApp.view.Extractdetail
		 */
		onAfterRendering: function () {
			//			 sap.m.MessageBox("test");
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//var oRouter = sap.ui.core.routing.Router.getRouter(this);
			oRouter.attachRoutePatternMatched(function (oEvent) {
				var oArguments = oEvent.getParameter("arguments");
				this.filename = oArguments.filename;
				//	oRouter.getRoute("Extractdetail").attachPatternMatched(this.onRouteMatch, this);	
				var lv_where = "filter[where][and][0][filename]=" + this.filename;
				var sUrl_list = "http://localhost:3000/invoiceextracts?" + lv_where;
				jQuery.ajax({
					type: "GET",
					//			dataType: "xml",
					dataType: "json",
					data: {},
					url: sUrl_list,
					context: this,
					crossDomain: true,
					error: function (jqXHR, textStatus, errorThrown) {
						var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
						jQuery.sap.log.error("Data loading error", sMessage, "index.html");
						sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
					},
					success: function (oData, status, jqXHR) {
						if (oData === null || oData === undefined) {
							var sMessage = "WARNING. Received a null or undefined response object.";
							jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
							sap.m.MessageToast.show(sMessage);
							return;
						} else
						//			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
							var extract = new sap.ui.model.json.JSONModel(oData);
						//		    var oTable = this.byId("mTable");
						var oTable = that.byId("extractdetails");
						oTable.setModel(extract);
					}
				});
			});
		},
		
		OnExtract: function(){
			
			var filename = this.byId("selectfile");
			var filename_val = filename.getSelectedItem().getKey();
			
			var lv_where = "filter[where][and][0][filename]=" + filename_val;
				var sUrl_list = "http://localhost:3000/invoiceextracts?" + lv_where;
				jQuery.ajax({
					type: "GET",
					//			dataType: "xml",
					dataType: "json",
					data: {},
					url: sUrl_list,
					context: this,
					crossDomain: true,
					error: function (jqXHR, textStatus, errorThrown) {
						var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
						jQuery.sap.log.error("Data loading error", sMessage, "index.html");
						sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
					},
					success: function (oData, status, jqXHR) {
						if (oData === null || oData === undefined) {
							var sMessage = "WARNING. Received a null or undefined response object.";
							jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
							sap.m.MessageToast.show(sMessage);
							return;
						} else
						//			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
							var extract = new sap.ui.model.json.JSONModel(oData);
						//		    var oTable = this.byId("mTable");
						var oTable = this.byId("extractdetails");
						oTable.setModel(extract);
					}
				});
			
		},
		onRouteMatch: function (oEvent) {
				var oArguments = oEvent.getParameter("arguments");
				this.filename = oArguments.filename;
			}
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf cognitivepp.CognitiveApp.view.Extractdetail
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf cognitivepp.CognitiveApp.controller.Extractdetail
		 */
		onNavBack: function (oEvent) {
			//This code was generated by the layout editor.
			
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}

		
	});
});