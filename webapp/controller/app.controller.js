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
				var quantityVal = _fields.quantity.getValue();

				if( materialVal &&  segmentVal && batchVal && quantityVal){
						var storeHouseModel = this.getView().getModel('storehouse');
						var data = {
							'Material':materialVal,
							'Segment':segmentVal,
							'Batch':batchVal,
							'Quantity':quantityVal
						};
						storeHouseModel.getData().stock.push(data);
						var oTable = this.byId('stockTable')
						var oColListItem = this.getView().byId('colListItem');
						oTable.bindItems("storehouse>/stock",oColListItem,null,null);
						this.onClear();
					}
				else{
					MessageToast.show("Please enter proper data in all the fields")
				}
			},
			onClear:function(){
				_fields.material.setValue('');
				_fields.segment.setValue('');
				_fields.batch.setValue('');
				_fields.quantity.setValue('');
			}
		});
	});
