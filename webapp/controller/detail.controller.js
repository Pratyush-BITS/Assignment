sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], 
    /**     
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function(Controller, MessageToast, JSONModel) {
    'use strict';

        return Controller.extend("com.learn.assignment.controller.detail", {

            onInit: function() {    
                var oRouter = this.getOwnerComponent().getRouter();
			    oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function(oEvent){
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").id),
                    model: "storehouse"
                });
            },
            onNavBack: function(){
                var oHistory = sap.ui.core.routing.History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } 
                else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("app", {});
			    }
            }
            
        })


    
    }
);