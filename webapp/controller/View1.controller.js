sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View1", {
		onLogin: function() {

			var uid = this.getView().byId("uid").getValue();
			var pasw = this.getView().byId("pasw").getValue();
			var surl = "/sap/opu/odata/sap/ZODATA_SFP_MAHESH_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(surl, true);
			var uri = "UserId='" + uid + "',Password='" + pasw + "'";
			var status;
			window.console.log(uri);
			oModel.read("/ZODATA_SFP_LOGIN_MAHESHSet(" + uri + ")", {

				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					window.console.log(oData);
					status = oData["Result"];
					window.console.log(status);

				}
			});
			if (status === "TRUE") {
				var oR = sap.ui.core.UIComponent.getRouterFor(this);
				oR.navTo("View7");
			} else {
				MessageBox.alert("Enter The Valid Credentials");
			}

		}

	});
});