sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox"
], function(Controller, Filter, FilterOperator, MessageBox) {
	"use strict";

	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View6", {
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
				Month: [{
					MonthNo: "",
					MonthName: "Choose a Month"
				}, {
					MonthNo: "01",
					MonthName: "January"
				}, {
					MonthNo: "02",
					MonthName: "February"
				}, {
					MonthNo: "03",
					MonthName: "March"
				}, {
					MonthNo: "04",
					MonthName: "April"
				}, {
					MonthNo: "05",
					MonthName: "May"
				}, {
					MonthNo: "06",
					MonthName: "June"
				}, {
					MonthNo: "07",
					MonthName: "July"
				}, {
					MonthNo: "08",
					MonthName: "August"

				}, {
					MonthNo: "09",
					MonthName: "September"
				}, {
					MonthNo: "10",
					MonthName: "October"
				}, {
					MonthNo: "11",
					MonthName: "November"
				}, {
					MonthNo: "12",
					MonthName: "December"
				}],
			};

			var otable = this.getView().byId("productionordertable");
			var monthlist = this.getView().byId("MonthDropdown");
			// var yearlist = this.getView().byId("yearDropdown");
			var omodel = new sap.ui.model.json.JSONModel();
			omodel.setData(data);

			// var uri = "?$filter=Plant eq '0001'";

			var uri = "?$filter=PlantNo eq '0001'";

			odata.read("ZODATA_SFP_PRO_ORDER_MAHESHSet" + uri + "", {
				success: function(oData, response) {
					window.console.log(oData);
					window.console.log(response);
					for (var i = 0; i <= oData.results.length; i++) {
						data.productionorder.push(oData.results[i]);
					}
					otable.setModel(omodel);
					monthlist.setModel(omodel);
					// yearlist.setModel(omodel);
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

		onChange: function(oEvent) {
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
			var oMonthFilter = new sap.ui.model.Filter("ProductionStartDate", sap.ui.model.FilterOperator.Contains, "-" + sValue + "-");
			oItemBinding.filter(oMonthFilter);
		},

		_getDialog3: function() {

			this._oDialog3 = sap.ui.xmlfragment("ShopFloorShopFloor.view.Fragments.ProdorderMonth", this);
			this.getView().addDependent(this._oDialog3);

			return this._oDialog3;
		},
		// displayProdOrder_Month: function(oEvent) {
		// 	this._getDialog3().open();
		// 	var objcurrent3 = oEvent.getSource().getSelectedContexts()[0].getObject();

		// 	var mat = new sap.ui.model.json.JSONModel(objcurrent3);
		// 	this._oDialog3.setModel(mat);
		// },
		
		displayProdOrder_Month: function(oEvent) {
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
		
		
		onClose: function() {
			this._oDialog3.close();
			this._oDialog3.destroy(true);
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