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
			
			/*
			Add a debugger on Message toast after loading the page,
			goto console and write 
			this.getView().getModel('storehouse').getJSON();
			*/
			onPress: function(){
				MessageToast.show("For Debugger")
			}
		});
	});
