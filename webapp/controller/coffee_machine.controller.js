sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, History) {
    "use strict";

    return BaseController.extend("generated.app.controller.coffee_machine_1", {
    	handleRouteMatched: function (oEvent) {
		var oParams = {};
		
		if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
		    var oModel = this.getView ? this.getView().getModel() : null;
		    if (oModel) {
		        oModel.setRefreshAfterChange(true);
		
		        if (oModel.hasPendingChanges()) {
		            oModel.resetChanges();
		        }
		    }
		
		    this.sContext = oEvent.mParameters.data.context;
		    this.sMasterContext = oEvent.mParameters.data.masterContext;
		
		    if (!this.sContext) {
		        this.getView().bindElement("/" + this.sMasterContext, oParams);
		    }
		    else {
		        this.getView().bindElement("/" + this.sContext, oParams);
		    }
		
		}
		
	},
	_onPageNavButtonPress1: function (oEvent) {
		var oBindingContext = oEvent.getSource().getBindingContext();
		
		return new ES6Promise.Promise(function(resolve, reject) {
		
		    this.doNavigate("launch_page", oBindingContext, resolve, ""
		    );
		}.bind(this));
		
	},
	doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
		var that = this;
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : null;
		
		var entityNameSet;
		if (sPath !== null && sPath !== "") {
		
		    if (sPath.substring(0, 1) === "/") {
		        sPath = sPath.substring(1);
		    }
		    entityNameSet = sPath.split("(")[0];
		}
		var navigationPropertyName;
		var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;
		
		if (entityNameSet !== null) {
		    navigationPropertyName = sViaRelation || that.getOwnerComponent().getNavigationPropertyForNavigationWithContext(entityNameSet, sRouteName);
		}
		if (navigationPropertyName !== null && navigationPropertyName !== undefined) {
		    if (navigationPropertyName === "") {
		        this.oRouter.navTo(sRouteName, {
		            context: sPath,
		            masterContext: sMasterContext
		        }, false);
		    } else {
		        oModel.createBindingContext(navigationPropertyName, oBindingContext, null, function (bindingContext) {
		            if (bindingContext) {
		                sPath = bindingContext.getPath();
		                if (sPath.substring(0, 1) === "/") {
		                    sPath = sPath.substring(1);
		                }
		            }
		            else {
		                sPath = "undefined";
		            }
		
		            // If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
		            if (sPath === "undefined") {
		                that.oRouter.navTo(sRouteName);
		            } else {
		                that.oRouter.navTo(sRouteName, {
		                    context: sPath,
		                    masterContext: sMasterContext
		                }, false);
		            }
		        });
		    }
		} else {
		    this.oRouter.navTo(sRouteName);
		}
		
		if (typeof fnPromiseResolve === "function") {
		    fnPromiseResolve();
		}
		
	},
	_onButtonPress33: function (oEvent) {
		var sPopoverName = "popover_8";
		this.mPopovers = this.mPopovers || {};
		var oPopover = this.mPopovers[sPopoverName];
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : this.getView().getModel();
		var oView;
		if (!oPopover) {
		    this.getOwnerComponent().runAsOwner(function () {
		        oView = sap.ui.xmlview({viewName: "generated.app.view." + sPopoverName});
		        this.getView().addDependent(oView);
		        oView.getController().setRouter(this.oRouter);
		        oPopover = oView.getContent()[0];
		        oPopover.setPlacement("Bottom" || "Auto");
		        this.mPopovers[sPopoverName] = oPopover;
		    }.bind(this));
		}
		
		return new ES6Promise.Promise(function (resolve, reject) {
		    oPopover.attachEventOnce("afterOpen", null, resolve);
		
		    oPopover.openBy(oSource);
		    if (oView) {
		        oPopover.attachAfterOpen(function () {
		            oPopover.rerender();
		        });
		    }
		    else {
		        oView = oPopover.getParent();
		    }
		    oView.setModel(oModel);
		    if (sPath) {
		        var oParams = oView.getController().getBindingParameters();
		        oView.bindElement(sPath, oParams);
		    }
		});
		
	},
	_onButtonPress34: function (oEvent) {
		var sDialogName = "dialog_14";
		this.mDialogs = this.mDialogs || {};
		var oDialog = this.mDialogs[sDialogName];
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : this.getView().getModel();
		var oView;
		if (!oDialog) {
		    this.getOwnerComponent().runAsOwner(function () {
		        oView = sap.ui.xmlview({viewName: "generated.app.view." + sDialogName});
		        this.getView().addDependent(oView);
		        oView.getController().setRouter(this.oRouter);
		        oDialog = oView.getContent()[0];
		        this.mDialogs[sDialogName] = oDialog;
		    }.bind(this));
		}
		
		return new ES6Promise.Promise(function(resolve, reject) {
		    oDialog.attachEventOnce("afterOpen", null, resolve);
		
		    oDialog.open();
		    if (oView) {
		        oDialog.attachAfterOpen(function () {
		            oDialog.rerender();
		        });
		    }
		    else {
		        oView = oDialog.getParent();
		    }
		    oView.setModel(oModel);
		    if (sPath) {
		        var oParams = oView.getController().getBindingParameters();
		        oView.bindElement(sPath, oParams);
		    }
		});
		
	},
	_onLinkPress1: function (oEvent) {
		var sDialogName = "dialog_13";
		this.mDialogs = this.mDialogs || {};
		var oDialog = this.mDialogs[sDialogName];
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : this.getView().getModel();
		var oView;
		if (!oDialog) {
		    this.getOwnerComponent().runAsOwner(function () {
		        oView = sap.ui.xmlview({viewName: "generated.app.view." + sDialogName});
		        this.getView().addDependent(oView);
		        oView.getController().setRouter(this.oRouter);
		        oDialog = oView.getContent()[0];
		        this.mDialogs[sDialogName] = oDialog;
		    }.bind(this));
		}
		
		return new ES6Promise.Promise(function(resolve, reject) {
		    oDialog.attachEventOnce("afterOpen", null, resolve);
		
		    oDialog.open();
		    if (oView) {
		        oDialog.attachAfterOpen(function () {
		            oDialog.rerender();
		        });
		    }
		    else {
		        oView = oDialog.getParent();
		    }
		    oView.setModel(oModel);
		    if (sPath) {
		        var oParams = oView.getController().getBindingParameters();
		        oView.bindElement(sPath, oParams);
		    }
		});
		
	},
	_onComboBoxSelectionChange4: function () {
		alert("Not Implemented Yet !");
		
	},
	_onComboBoxSelectionChange5: function () {
		alert("Not Implemented Yet");
		
	},
	_onComboBoxSelectionChange6: function () {
		alert("Not Implemented Yet");
		
	},
	_onComboBoxSelectionChange7: function () {
		alert("Not Implemented Yet");
		
	},
	onAfterRendering: function () {
		
        var oBindingParameters;
        
        oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_LineChart-1492495527716-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_LineChart-1492495527716-809672887b8ae21d0dba3b476_S6").bindData(oBindingParameters);
        oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-32cec818e0f6070f0db87c754_S4-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-32cec818e0f6070f0db87c754_S4-809672887b8ae21d0dba3b476_S6").bindData(oBindingParameters);
        oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ScatterChart-1492541544828-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ScatterChart-1492541544828-809672887b8ae21d0dba3b476_S6").bindData(oBindingParameters);
        oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ColumnChart-1492547627201-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ColumnChart-1492547627201-809672887b8ae21d0dba3b476_S6").bindData(oBindingParameters);


	},
	onInit: function () {
		this.mBindingOptions = {};
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getTarget("coffee_machine_1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        oView.setModel(oModel, 'staticDataModel');
    
        var oData = [{"dim0":"India","mea0":"20","Hour":"1 pm","Regular":"100","Decaf":"30"},{"dim0":"Canada","mea0":"30","Hour":"2 pm","Regular":"60","Decaf":"40"},{"dim0":"USA","mea0":"50","Hour":"3 pm","Regular":"30","Decaf":"50"},{"dim0":"Japan","mea0":"100","Hour":"4 pm","Regular":"100","Decaf":"80"},{"dim0":"Germany","mea0":"70","Hour":"5 pm","Regular":"20","Decaf":"100"},{"Hour":"6 pm","mea0":"40","Regular":"60","Decaf":"40"}];
        oView.getModel("staticDataModel").setData({'sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_LineChart-1492495527716-809672887b8ae21d0dba3b476_S6':oData}, true);
        this.oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_LineChart-1492495527716-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_LineChart-1492495527716-809672887b8ae21d0dba3b476_S6").bindData(this.oBindingParameters);
    
        var oData = [{"dim0":"1 pm","mea0":"100","Decaf":"30"},{"dim0":"2 pm","mea0":"50","Decaf":"60"},{"dim0":"3 pm","mea0":"40","Decaf":"20"},{"dim0":"4 pm","mea0":"60","Decaf":"80"},{"dim0":"5 pm","mea0":"70","Decaf":"90"},{"dim0":"6 pm","mea0":"80","Decaf":"40"},{"undefined":null,"dim0":"7 pm","mea0":"90","Decaf":"30"}];
        oView.getModel("staticDataModel").setData({'sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-32cec818e0f6070f0db87c754_S4-809672887b8ae21d0dba3b476_S6':oData}, true);
        this.oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-32cec818e0f6070f0db87c754_S4-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-items-sap_chart_ColumnChart-1490598562351-32cec818e0f6070f0db87c754_S4-809672887b8ae21d0dba3b476_S6").bindData(this.oBindingParameters);
    
        var oData = [{"mea1":"1","mea0":"60","dim0":"1 pm"},{"mea1":"2","mea0":"100","dim0":"2 pm"},{"mea1":"3","mea0":"90","dim0":"3 pm"},{"mea1":"4","mea0":"80","dim0":"4 pm"},{"mea1":"5","mea0":"70","dim0":"5 pm"},{"mea1":"6","mea0":"78","dim0":"6 pm"},{"mea1":"7","mea0":"100","dim0":"7 pm"},{"mea1":"8","mea0":"70","dim0":"8 pm"},{"mea1":"9","mea0":"67","dim0":"9 pm"},{"mea1":"10","mea0":"65","dim0":"10 pm"}];
        oView.getModel("staticDataModel").setData({'sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ScatterChart-1492541544828-809672887b8ae21d0dba3b476_S6':oData}, true);
        this.oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ScatterChart-1492541544828-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ScatterChart-1492541544828-809672887b8ae21d0dba3b476_S6").bindData(this.oBindingParameters);
    
        var oData = [{"dim0":"1 pm","mea0":"100"},{"dim0":"2 pm","mea0":"0"},{"dim0":"3 pm","mea0":"100"},{"dim0":"4 pm","mea0":"100"},{"dim0":"5 pm","mea0":"0"}];
        oView.getModel("staticDataModel").setData({'sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ColumnChart-1492547627201-809672887b8ae21d0dba3b476_S6':oData}, true);
        this.oBindingParameters = {"path":"/sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ColumnChart-1492547627201-809672887b8ae21d0dba3b476_S6","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Responsive_Page_0-content-sap_m_VBox-1490596649278-32cec818e0f6070f0db87c754_S4-items-sap_chart_ColumnChart-1492547627201-809672887b8ae21d0dba3b476_S6").bindData(this.oBindingParameters);
    


	}
});
}, /* bExport= */true);