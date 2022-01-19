sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, JSONModel) {
		"use strict";

		var _fields = {}

		return Controller.extend("com.learn.assignment.controller.app", {
			onInit: function () {
				MessageToast.show("Haai");
				_fields.material = this.byId('material'),
				_fields.segment = this.byId('segment'),
				_fields.batch = this.byId('batch'),
				_fields.quantity = this.byId('quantity')
			},
			onKeyPress: function(oEvent){
				var text = _fields.quantity.getValue();
				text = text.replace(/[^\d]/g, '');
				_fields.quantity.setValue(text);
			},
			onSubmit: function(oEvent){
				var materialVal = _fields.material.getValue()
				var segmentVal = _fields.segment.getValue();
				var batchVal = _fields.batch.getValue();
				var quantityVal = parseInt(_fields.quantity.getValue());

				if( materialVal &&  segmentVal && batchVal && quantityVal){
						var storeHouseModel = this.getView().getModel('storehouse');

						var _stock = storeHouseModel.getData().stock;
						var _row = this.findData(_stock, materialVal, segmentVal);

						if( _row != -1){
							_stock.at(_row).Batch.push(batchVal);
							_stock.at(_row).Quantity.push(quantityVal);
							_stock.at(_row).TotalQuantity += quantityVal;
						}
						else{
							var data = {
								'Material':materialVal,
								'Segment':segmentVal,
								'Batch':[batchVal],
								'Quantity':[quantityVal],
								'TotalQuantity': quantityVal
							};
							_stock.push(data);
						}
						
						var oTable = this.byId('stockTable')
						var oColListItem = this.getView().byId('colListItem');
						oTable.bindItems("storehouse>/stock",oColListItem);
						this.onClear();
					}
				else{
					MessageToast.show("Please enter proper data in all the fields")
				}
			},
			findData: function(jStock, materialVal, segmentVal){
				for(var i =0; i< jStock.length; i++){
					var data = jStock.at(i);
					if(data.Material === materialVal && data.Segment === segmentVal){
						return i;
					}
				};
				return -1;
			},

			onNavigation:function(oEvent){
				var oItem = oEvent.getSource();
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("detail", {
					id: window.encodeURIComponent(oItem.getBindingContext("storehouse").getPath().substr(1))
				});
			},

			onClear:function(){
				_fields.material.setValue('');
				_fields.segment.setValue('');
				_fields.batch.setValue('');
				_fields.quantity.setValue('');
			}
		});
	});
