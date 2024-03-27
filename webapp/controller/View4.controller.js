sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox"
], function(Controller, Filter, FilterOperator, MessageBox) {
	"use strict";
	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View4", {
		onAfterRendering: function() {
			var otable = this.getView().byId("plannedordertable");
			var totalCountLabel = this.getView().byId("totalCountLabel");
			otable.attachUpdateFinished(function() {
				var itemCount = otable.getBinding("items").getLength();
				totalCountLabel.setText("NUMBER OF PLANNED ORDERS : " + itemCount);
			});
			this.columnMapping = {
				"PlannedorderNum": "PLANNED ORDER NUMBER",
				"Material": "MATERIAL NUMBER",
				"TotalPlordQty": "ORDER QUANTITY",
				"PlanOpenDate": "PLAN OPEN DATE",
				"OrderStartDate": "PLAN START DATE",
				"OrderFinDate": "PLAN END DATE"
			};
			var odata = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_SFP_MAHESH_SRV/");
			this.getView().setModel(odata);
			var data = {
				plannedorder: [],
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
				}]
			};

			var otable = this.getView().byId("plannedordertable");
			var monthlist = this.getView().byId("MonthDropdown");
			var omodel = new sap.ui.model.json.JSONModel();
			omodel.setData(data);
			monthlist.setModel(omodel); // Move this line outside the success callback

			var uri = "?$filter=ImPlanOrder eq '0001'";

			odata.read("ZODATA_SFP_PLAN_ORDER_MAHESHSet" + uri + "", {
				success: function(oData, response) {
					window.console.log(oData);
					window.console.log(response);
					for (var i = 0; i < oData.results.length; i++) { // Modify the loop condition
						data.plannedorder.push(oData.results[i]);
					}
					otable.setModel(omodel);
				}
			});
		},
		onsearch: function(oEvt) {
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			window.console.log(sQuery);
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("PlannedorderNum", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("plannedordertable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		onChange: function(oEvent) {
			var sValue = oEvent.getSource().getSelectedItem().getKey(); // Update this line
			window.console.log(sValue);
			var oList = this.getView().byId("plannedordertable");
			var oItemBinding = oList.getBinding("items");
			if (sValue === "" || sValue === null || sValue === undefined) {
				oItemBinding.filter([]);
				return;
			}
			var oMonthFilter = new sap.ui.model.Filter("PlanOpenDate", sap.ui.model.FilterOperator.Contains, "-" + sValue + "-");
			oItemBinding.filter([oMonthFilter]); // Wrap the filter in an array
		},

		_getDialog2: function() {
			this._oDialog2 = sap.ui.xmlfragment("ShopFloorShopFloor.view.Fragments.PlanorderMonth", this);
			this.getView().addDependent(this._oDialog2);
			return this._oDialog2;
		},
		// displayPlanOrder_Month: function(oEvent) {
		// 	this._getDialog2().open();
		// 	var objcurrent2 = oEvent.getSource().getSelectedContexts()[0].getObject();
		// 	var mat = new sap.ui.model.json.JSONModel(objcurrent2);
		// 	this._oDialog2.setModel(mat);
		// },
		
		displayPlanOrder_Month: function(oEvent) {
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
		
		onClose2: function() {
			this._oDialog2.close();
			this._oDialog2.destroy(true);
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
			oR.navTo("View2");
		}
	});
});