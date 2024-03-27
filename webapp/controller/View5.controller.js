sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox"
], function(Controller, Filter, FilterOperator, MessageBox) {
	"use strict";
	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View5", {
		onAfterRendering: function() {
			var otable = this.getView().byId("productionordertable");
			var totalCountLabel = this.getView().byId("totalCountLabel");
			otable.attachUpdateFinished(function() {
				var itemCount = otable.getBinding("items").getLength();
				totalCountLabel.setText("NUMBER OF PRODUCTION ORDERS : " + itemCount);
			});
			this.columnMapping = {
				"PlanPlant": "PRODUCTION PLANT",
				"MrpController": "MRP CONTROLLER",
				"OrderNumber": "PRODUCTION ORDER NUMBER",
				"Material": "MATERIAL NUMBER",
				"TargetQuantity": "TARGET QUANTITY",
				"Unit": "UNIT",
				"ProductionStartDate": "PRODUCTION START DATE",
				"ProductionFinishDate": "PRODUCTION FINISH DATE"
			};
			var odata = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_SFP_MAHESH_SRV/");
			this.getView().setModel(odata);
			var data = {
				productionorder: [],
				Year: [{
					yearkey: "",
					year: "Choose a Year"
				}, {
					yearkey: "2021",
					year: "2021"
				}, {
					yearkey: "2022",
					year: "2022"
				}, {
					yearkey: "2023",
					year: "2023"
				}, {
					yearkey: "2024",
					year: "2024"
				}, {
					yearkey: "2025",
					year: "2025"
				}]
			};

			var otable = this.getView().byId("productionordertable");

			var yearlist = this.getView().byId("yearDropdown");
			var omodel = new sap.ui.model.json.JSONModel();
			omodel.setData(data);
			var uri = "?$filter=PlantNo eq '0001' ";

			odata.read("ZODATA_SFP_PRO_ORDER_MAHESHSet" + uri + "", {
				success: function(oData, response) {
					window.console.log(oData);
					window.console.log(response);
					for (var i = 0; i <= oData.results.length; i++) {
						data.productionorder.push(oData.results[i]);
					}
					otable.setModel(omodel);
					yearlist.setModel(omodel);
				}

			});

		},
		onsearch: function(oEvt) {
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			window.console.log(sQuery);
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("OrderNumber", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("productionordertable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},

		onChange2: function(oEvent) {
			var sValue = oEvent.getParameters().selectedItem.mProperties.key;
			window.console.log(sValue);
			// window.console.log(oEvent.getParameters("Key"));

			var oList = this.getView().byId("productionordertable");
			window.console.log("oList");
			window.console.log(oList);
			var oItemBinding = oList.getBinding("items");
			window.console.log("oItemBinding");
			window.console.log(oItemBinding);
			if (sValue === "" || sValue === null || sValue === undefined) {
				oItemBinding.filter([]);
				return;
			}
			window.console.log(sValue);
			var oyearFilter = new sap.ui.model.Filter("ProductionStartDate", sap.ui.model.FilterOperator.Contains, +sValue + "-");
			oItemBinding.filter(oyearFilter);
		},

		_getDialog4: function() {

			this._oDialog4 = sap.ui.xmlfragment("ShopFloorShopFloor.view.Fragments.ProdorderYear", this);
			this.getView().addDependent(this._oDialog4);

			return this._oDialog4;
		},
		// displayProdOrder_Year: function(oEvent) {
		// 	this._getDialog4().open();
		// 	var objcurrent4 = oEvent.getSource().getSelectedContexts()[0].getObject();

		// 	var mat = new sap.ui.model.json.JSONModel(objcurrent4);
		// 	this._oDialog4.setModel(mat);
		// },
		
		displayProdOrder_Year: function(oEvent) {
			var selectedContext = oEvent.getSource().getSelectedItem().getBindingContext();
			var selectedObject = selectedContext.getObject();

			var message = "";

			for (var fieldName in this.columnMapping) {
				var displayColumnName = this.columnMapping[fieldName];
				var fieldValue = selectedObject[fieldName];

				if (fieldValue !== undefined) {
					if (fieldName.includes("Date")) {
						fieldValue = this.formatDate(fieldValue);
					}
					message += displayColumnName + " : " + fieldValue + "\n\n";
				}
			}

			MessageBox.show(message, {
				title: "Details",
				icon: MessageBox.Icon.INFORMATION,
				styleClass: "customMessageBox"
			});
		},
		
		onClose4: function() {
			this._oDialog4.close();
			this._oDialog4.destroy(true);
		},
		formatDate: function(sDate) {
			if (sDate) {
				var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd-MM-yyyy"
				});
				return oDateFormat.format(new Date(sDate));
			}
			return "";
		},
		// logout: function() {
		// 	var oR = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oR.navTo("View1");
		// },
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
        },
		back: function() {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("View8");
		}

	});

});