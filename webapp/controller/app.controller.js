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
				var _materialVal = _fields.material.getValue()
				var _segmentVal = _fields.segment.getValue();
				var _batchVal = _fields.batch.getValue();
				var _quantityVal = parseInt(_fields.quantity.getValue());

				if( _materialVal &&  _segmentVal && _batchVal && _quantityVal){
						var oStoreHouseModel = this.getView().getModel('storehouse');
						var oStock = oStoreHouseModel.getData().stock;
						var _msRow = this._findMatAndSegRow(oStock, _materialVal, _segmentVal);

						if( _msRow != -1){
							
							var oBat = oStock.at(_msRow).bat;
							var _batRow = this._findBatRow(oBat,_batchVal)

							if(_batRow !== -1){
								oStock.at(_msRow).bat.at(_batRow).Quantity += _quantityVal;
							}
							else{
								var _bat = {
									'Batch':_batchVal,
									'Quantity':_quantityVal
								};
								oStock.at(_msRow).bat.push(_bat);
							}
							oStock.at(_msRow).TotalQuantity += _quantityVal;
						}
						else{
							var id = oStock.length;
							var _oData = {
								'stockId':id,
								'Material':_materialVal,
								'Segment':_segmentVal,
								'TotalQuantity': _quantityVal,
								'bat': [
									{
										'Batch':_batchVal,
										'Quantity':_quantityVal
									}
								]
							};
							oStock.push(_oData);
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
			_findMatAndSegRow: function(_oStock, _materialVal, _segmentVal){
				
				for(var row = 0; row < _oStock.length; row++){
					var _data = _oStock.at(row);
					if(_data.Material === _materialVal && _data.Segment === _segmentVal){
						return row;
					}
				};
				return -1;
			},

			_findBatRow: function(_oBat,_batchVal){
				for(var row = 0; row < _oBat.length; row++){
					var _data = _oBat.at(row);
					if(_data.Batch === _batchVal){
						return row;
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
