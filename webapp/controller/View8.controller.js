sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View8", {
		onLogin3: function() {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("View5");
		},
		onLogin4: function() {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("View6");
		},
		back: function() {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("View7");
		},
		// logout: function() {
		// 	var oR = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oR.navTo("View1");
		// }
		logout: function () {
            var that = this;
            MessageBox.confirm("Are you sure you want to Logout?", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        var oR = sap.ui.core.UIComponent.getRouterFor(that);
                        oR.navTo("View1");
                    }
                }
            });
        }		
		

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.view.View8
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.view.View8
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.view.View8
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.view.View8
		 */
		//	onExit: function() {
		//
		//	}

	});

});