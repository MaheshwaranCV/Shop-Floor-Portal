sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox"
], function(Controller, Filter, FilterOperator, MessageBox) {
	"use strict";
	return Controller.extend("SHOP_FLOOR_PORTAL_OF_MAHESHSHOP_FLOOR_PORTAL_OF_MAHESH.controller.View3", {
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
				Year: [{
					yearkey: "",
					year: "Choose a Year"
				}, {
					yearkey: "2015",
					year: "2015"
				}, {
					yearkey: "2016",
					year: "2016"
				}, {
					yearkey: "2017",
					year: "2017"
				}, {
					yearkey: "2018",
					year: "2018"
				}, {
					yearkey: "2019",
					year: "2019"
				}, {
					yearkey: "2020",
					year: "2020"
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
				}]
			};
			var otable = this.getView().byId("plannedordertable");
			var yearlist = this.getView().byId("yearDropdown");
			var omodel = new sap.ui.model.json.JSONModel();
			omodel.setData(data);
			var uri = "?$filter=ImPlanOrder eq '0001'";
			odata.read("ZODATA_SFP_PLAN_ORDER_MAHESHSet" + uri + "", {
				success: function(oData, response) {
					window.console.log(oData);
					window.console.log(response);
					for (var i = 0; i <= oData.results.length; i++) {
						data.plannedorder.push(oData.results[i]);
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
				var filter = new Filter("PlannedorderNum", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("plannedordertable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		onChange2: function(oEvent) {
			var sValue = oEvent.getParameters().selectedItem.mProperties.key;
			window.console.log(sValue);
			// window.console.log(oEvent.getParameters("Key"));
			var oList = this.getView().byId("plannedordertable");
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
			var oyearFilter = new sap.ui.model.Filter("PlanOpenDate", sap.ui.model.FilterOperator.Contains, +sValue + "-");
			oItemBinding.filter(oyearFilter);
		},
		_getDialog1: function() {
			this._oDialog1 = sap.ui.xmlfragment("ShopFloorShopFloor.view.Fragments.PlanorderYear", this);
			this.getView().addDependent(this._oDialog1);
			return this._oDialog1;
		},

		displayPlanOrderYear: function(oEvent) {
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

		// displayPlanOrderYear: function(oEvent) {
		// 	var selectedContext = oEvent.getSource().getSelectedItem().getBindingContext();
		// 	var selectedObject = selectedContext.getObject();

		// 	var formattedContent = this._createFormattedContent(selectedObject);

		// 	var dialog = new sap.m.Dialog({
		// 		title: "Details",
		// 		contentWidth: "400px",
		// 		content: [
		// 			new sap.ui.core.HTML({
		// 				content: formattedContent
		// 			})
		// 		],
		// 		endButton: new sap.m.Button({
		// 			text: "Close",
		// 			press: function() {
		// 				dialog.close();
		// 				dialog.destroy();
		// 			}
		// 		}),
		// 		afterClose: function() {
		// 			dialog.destroy();
		// 		}
		// 	});

		// 	dialog.open();
		// },

		// _createFormattedContent: function(selectedObject) {
		// 	var formattedContent = "";

		// 	for (var fieldName in this.columnMapping) {
		// 		var displayColumnName = this.columnMapping[fieldName];
		// 		var fieldValue = selectedObject[fieldName];

		// 		if (fieldValue !== undefined) {
		// 			if (fieldName.includes("Date")) {
		// 				fieldValue = this.formatDate(fieldValue);
		// 			}
		// 			formattedContent += "<b>" + displayColumnName + ":</b> " + fieldValue + "<br>";
		// 		}
		// 	}

		// 	return formattedContent;
		// },

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
		logout: function() {
			var that = this;
			MessageBox.confirm("Are you sure you want to Logout?", {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
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