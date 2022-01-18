sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("com.learn.assignment.controller.app", {
			onInit: function () {
				MessageToast.show("Haai");
			},
			onSubmit: function(oEvent){
				
			},
			onClear:function(oEvent){
				this.byId('material').setValue('');
				this.byId('segment').setValue('');
				this.byId('batch').setValue('');
				this.byId('quantity').setValue('');
			}
		});
	});
