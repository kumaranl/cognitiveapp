sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/PDFViewer",
	"sap/ui/model/xml/XMLModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (jQuery, Controller,JSONModel, PDFViewer,  XMLModel , MessageToast, MessageBox ) {
	"use strict";

	return Controller.extend("cognitivepp.CognitiveApp.controller.MainView", {
		
		onInit : function () {
			
			this._pdfViewer = new PDFViewer("pdfViewer",
			{
				sourceValidationFailed: function (oEvent) {	
					oEvent.preventDefault();
				}
			});
			this.getView().addDependent(this._pdfViewer);
			this._oModel = new sap.ui.model.json.JSONModel();
			
		//var sUrl1_azure_list = "https://scandocument.blob.core.windows.net/trainpdf?restype=container&comp=list";
		var sUrl_list = "http://localhost:3000/invoicefiles";
		jQuery.ajax({
			type    : "GET",
//			dataType: "xml",
			dataType: "json",
			data : {},
//			url     : sUrl1_azure_list,
			url : sUrl_list,
			context : this,	
			crossDomain: true,
			error   : function(jqXHR, textStatus, errorThrown) {
				var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
				jQuery.sap.log.error("Data loading error", sMessage, "index.html");
	//			sap.m.MessageToast.show(errorThrown);
				sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
				},
		    success : function(oData, status, jqXHR) {
				if (oData === null || oData === undefined) {
					var sMessage = "WARNING. Received a null or undefined response object.";
					 jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
					 sap.m.MessageToast.show(sMessage);
					 return;
				}else
			    
//			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
			    var invModel = new sap.ui.model.json.JSONModel(oData);
			    
	//		    var oTable = this.byId("mTable");
				var oTable = this.byId("invoicetable");
			    oTable.setModel(invModel);
		    }
	});
	},
		handleUploadComplete: function(oEvent) {
	//		var sResponse = oEvent.getParameter("statusMessage");
			var retfile = oEvent.getParameter("responseRaw");
//			alert("inside handleupload");
			var retstatus = oEvent.getParameter("status");
			var oFileUploader = this.byId("fileUploader");
			var success;
			
			this.oModel= sap.ui.getCore().getModel(this.userModel);
			
			this.vendorid = this.oModel.getProperty('/user1/vendorid');
			
			this.username = this.oModel.getProperty('/user1/firstname');
			
			if (retstatus === 200)
			{
				var filename_az = JSON.stringify({"filename" : retfile});
				var sUrl2 = "http://localhost:8081/uploadfileaz/";
				 jQuery.ajax({
				 type    : "POST",
					 url     : sUrl2,
					 data: filename_az,
					 contentType : "application/json",
					 error   : function(jqXHR, textStatus, errorThrown) {
					 	var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
					 	jQuery.sap.log.error("Data loading error", sMessage, "index.html");
		//			 	sap.m.MessageToast.show(errorThrown);
						sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
					 	},
					   success : function(oData, status, jqXHR) 
					   {
						 success = 'Y';					   	
					   }
				});		
						var invoice1 = JSON.stringify({
					  "vendorid": this.vendorid,
					  "filename" : oFileUploader.getProperty("value"),
					  "filetype": "pdf",
					  "fileurl": retfile,
					  "createdby": this.username,
					  "invoicestatus": "Uploaded",
					  "comments" : "Invoice Uploaded"
					  
						});
	//		"additionalProp1": {}
						var sUrl2 = "http://localhost:3000/invoicefiles";
						 jQuery.ajax({
						 type    : "POST",
						 url     : sUrl2,
						 data: invoice1,
						 dataType: "json",
						 contentType : "application/json",
						 error   : function(jqXHR, textStatus, errorThrown) {
						 	var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
						 	jQuery.sap.log.error("Data loading error", sMessage, "index.html");
						// 	sap.m.MessageToast.show(errorThrown);
						sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
						 	},
						   success : function(oData, status, jqXHR) 
						   {
							   sap.m.MessageToast.show("Data Uploaded to Server");
						   }
					});
			}	
			else
			{
				sap.m.MessageBox.error("Upload Error. Pls contact admin"); 				
			}
			
			var sUrl_list = "http://localhost:3000/invoicefiles";
		jQuery.ajax({
			type    : "GET",
//			dataType: "xml",
			dataType: "json",
			data : {},
//			url     : sUrl1_azure_list,
			url : sUrl_list,
			context : this,	
			crossDomain: true,
			error   : function(jqXHR, textStatus, errorThrown) {
				var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
				jQuery.sap.log.error("Data loading error", sMessage, "index.html");
				sap.m.MessageBox.show(JSON.parse(jqXHR.responseText).error.message);
				},
		    success : function(oData, status, jqXHR) {
				if (oData === null || oData === undefined) {
					var sMessage = "WARNING. Received a null or undefined response object.";
					 jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
					 sap.m.MessageToast.show(sMessage);
					 return;
				}else
			    
//			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
			    var invModel = new sap.ui.model.json.JSONModel(oData);
	//		    var oTable = this.byId("mTable");
				var oTable = this.byId("invoicetable");
			    oTable.setModel(invModel);
		    }
	});
			
			
		
		},
		handleUploadPress: function() {
			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();
			
			var oFileUploader = this.byId("fileUploader");
			
			if ((oFileUploader.getValue()) === "")
			{
					 sap.m.MessageToast.show("Please select a file and upload");
					 	oGlobalBusyDialog.close();
					 return;
			}
			
			this._oModel.setProperty("/Source", this._sValidPath);
			oFileUploader.mimeType = "application/pdf";
			oFileUploader.fileType = "pdf";
	//		oFileUploader.sendXHR = true;
			oFileUploader.upload();
			oGlobalBusyDialog.close();
	// 		var invoice1 = JSON.stringify({
	// 				  "vendorid": 456,
	// 				  "filename" : oFileUploader.getProperty("value"),
	// 				  "filetype": "pdf",
	// 				  "fileurl": oFileUploader.getProperty("uploadUrl"),
	// 				  "createdby": "Username",
	// 				  "invoicestatus": "Uploaded",
	// 				  "additionalProp1": {}

	// 		});
			
	// 		var sUrl2 = "http://localhost:3000/invoicefiles";
	// 		 jQuery.ajax({
	// 		 type    : "POST",
	// 		 url     : sUrl2,
	// 		 data: invoice1,
	// 		 dataType: "json",
	// 		 contentType : "application/json",
	// 		 error   : function(jqXHR, textStatus, errorThrown) {
	// 		 	var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
	// 		 	jQuery.sap.log.error("Data loading error", sMessage, "index.html");
	// 		 	sap.m.MessageToast.show(errorThrown);
	// 		 	},
	// 		   success : function(oData, status, jqXHR) 
	// 		   {
	// 			   sap.m.MessageToast.show("Data Uploaded to Server");
	// //			   alert(jqXHR.responseText);
	// 		   }
	// 	});
		
// 	/*	var sUrl_list = "http://localhost:3000/invoicefiles";
// 		jQuery.ajax({
// 			type    : "GET",
// //			dataType: "xml",
// 			dataType: "json",
// 			data : {},
// //			url     : sUrl1_azure_list,
// 			url : sUrl_list,
// 			context : this,	
// 			crossDomain: true,
// 			error   : function(jqXHR, textStatus, errorThrown) {
// 				var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
// 				jQuery.sap.log.error("Data loading error", sMessage, "index.html");
// 				sap.m.MessageToast.show(errorThrown);
// 				},
// 		    success : function(oData, status, jqXHR) {
// 				if (oData === null || oData === undefined) {
// 					var sMessage = "WARNING. Received a null or undefined response object.";
// 					 jQuery.sap.log.warning("Data loading messageiungasd", sMessage, "index.html");
// 					 sap.m.MessageToast.show(sMessage);
// 					 return;
// 				}else
			    
// //			    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
// 			    var invModel = new sap.ui.model.json.JSONModel(oData);
// 	//		    var oTable = this.byId("mTable");
// 				var oTable = this.byId("invoicetable");
// 			    oTable.setModel(invModel);
// 		    }
// 	});
// 	*/	
		},
		
		onChange: function(oEvent) {
  //      var that = this;
 //       var reader = new FileReader();
 //       var file = oEvent.getParameter("files")[0];
     //   var raw ;
     //   var file1 = new request.file();
        
        // var file1 = {fieldname : string,
        // 			 originalname : string, 
        // 			 encoding: string,
        // 			 mimetype: string,
        // 			 size: string,
        // 			 destination : string,
        // 			 filename : string,
        // 			 path : string,
        // 			 buffer : string}
        			 
        
   //     reader.onload = function(e) {}
            
   //         raw = e.target.result;
			// var sUrl2 = "http://localhost:8081/uploadfile";
			// jQuery.ajax({
			// type    : "POST",
			// url     : sUrl2,
			// context : this,	
			// crossDomain: true,
			// data: file,
			// beforeSend: function(xhr) {
   //         	xhr.setRequestHeader("content-type", "multipart/form-data");
   //         	},
			// error   : function(jqXHR, textStatus, errorThrown) {
			// 	var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
			// 	jQuery.sap.log.error("Data loading error", sMessage, "index.html");
			// 	sap.m.MessageToast.show(errorThrown);
			// 	},
		 //   success : function(oData, status, jqXHR) {
		 //   //	alert(oData);
		 //   sap.m.MessageToast.show(status);
		 //   }
				
			// });	
            
   //      };

   //     reader.onerror = function(e) {
   //         sap.m.MessageToast.show("error");
   //     };
   //     reader.oncomplete = function(e){
   //            };
   //     reader.readAsDataURL(file);
    	},
		
		onTableRowClick: function(oEvent){
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			var oCtx = oItem.getBindingContext(); 
			// var sPath = oCtx ? oCtx.getPath() : undefined;
			
			this._sValidPath = oCtx.getProperty("fileurl");
			var path = "https://scandocument.blob.core.windows.net/trainpdf/" +
						this._sValidPath;
			this._oModel.setData({
    			Source: path,
				Title: this._sValidPath,
				Height: "600px",
				Width: "600px"
			});
			this.getView().setModel(this._oModel);
			this._pdfViewer.setSource(path);
			this._pdfViewer.open();
		},
		
		
		fnProcessInv : function(oEvent){
		
	//	var sUrl2 = "https://formrecognizerforsap.cognitiveservices.azure.com/formrecognizer/v1.0-preview/custom/models/2f88514a-e794-47c7-b162-e9be2b9a674d/analyze";
		
		// jQuery.ajax({
		// 	type    : "POST",
		// 	url     : sUrl2,
		// 	context : this,	
		// 	crossDomain: true,
		// 	data: this.raw,
		// 	dataType: "application/pdf",
		// 	//'{"form": this._sValidPath }',
		// 	beforeSend: function(xhr) {
  //          	xhr.setRequestHeader("content-type", "multipart/form-data");
  //          	xhr.setRequestHeader("ocp-apim-subscription-key", "dbfbe33dd08c4ecea12cdc3b9e94c488");
  //      	},
		// 	error   : function(jqXHR, textStatus, errorThrown) {
		// 		var sMessage = jqXHR.status + " " + jqXHR.statusText + " " + jqXHR.responseText;
		// 		jQuery.sap.log.error("Data loading error", sMessage, "index.html");
		// 		sap.m.MessageToast.show(errorThrown);
		// 		},
		//     success : function(oData, status, jqXHR) {
		//     	alert(oData);
		//     }
				
		// 	});
		}
		
	});
});
