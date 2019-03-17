sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    ], function(BaseController, MessageBox, History, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("generated.app.controller.cooler_2_doors_1", {
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
	_onPageNavButtonPress: function (oEvent) {
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
	_onButtonPress26: function (oEvent) {
		var sPopoverName = "popover_7";
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
	_onButtonPress27: function (oEvent) {
		var sDialogName = "dialog_11";
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
	_onLinkPress: function (oEvent) {
		var sDialogName = "dialog_12";
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
	_onComboBoxSelectionChange: function () {
		alert("Not Implemented Yet !");
		
	},
	_onComboBoxSelectionChange1: function () {
		alert("Not Implemented Yet");
		
	},
	_onComboBoxSelectionChange2: function () {
		alert("Not Implemented Yet");
		
	},
	_onComboBoxSelectionChange3: function () {
		alert("Not Implemented Yet");
		
	},
	onAfterRendering: function () {
		
        var oBindingParameters;
        

	},
	formatDate: function(oValue) {
			var oDate = null;
			// can be of type Date if consumed with OData (XML format)
			if (oValue instanceof Date) {
				oDate = oValue;
			}
			// can be a string primitive in JSON, but we need a number
			else if ((typeof oValue) === "string") {
				// can be of type JSON Date if consumed with OData (JSON format)
				if (oValue.indexOf("/") === 0) {
					oValue = oValue.replace(new RegExp("/", 'g'), "");
					oValue = oValue.replace(new RegExp("\\(", 'g'), "");
					oValue = oValue.replace(new RegExp("\\)", 'g'), "");
					oValue = oValue.replace("Date", "");
					oValue = parseInt(oValue);
					oDate = new Date(oValue);
				} else {
					// backward compatibility, old type was long, new type is date
					// check if not a number
					var result = isNaN(Number(oValue));
					if (result) {
						// FF and Ie cannot create Dates using 'DD-MM-YYYY HH:MM:SS.ss' format but
						// 'DD-MM-YYYYTHH:MM:SS.ss'
						oValue = oValue.replace(" ", "T");
						// this is a date type
						oDate = new Date(oValue);
					} else {
						// this is a long type
						oValue = parseInt(oValue);
						// ensure that UNIX timestamps are converted to milliseconds
						oDate = new Date(oValue * 1000);
					}
				}
			} else {
				// ensure that UNIX timestamps are converted to milliseconds
				oDate = new Date(oValue * 1000);
			}
		//	oDate.setHours( oDate.getHours() + 3 );
			oDate = oDate.toLocaleString(); 
			return oDate;
		},
		
	dateFormat: function (date) {
	    if (date === undefined) {return "";}
        var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
        return oDateFormat.format(date);
	},
		
	onInit: function () {
		this.mBindingOptions = {};
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getTarget("cooler_2_doors_1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        oView.setModel(oModel, 'staticDataModel');
		var t = this;
        this.oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.oView));
        var iotmmsModel = this.oComponent.getModel();
        this.iotmmsModel = iotmmsModel;
        
        this.iterationlatestTemp = 0;
        t.bMessageBoxOpenable = true;
        this.hightAlertCounter = 0;
        t.onLatestTempHumAndDate();
		window.setInterval(function(){
				//latest temp
				t.onLatestTempHumAndDate();
				//t.getTemperatureAndHumidity();
				//t.getCurrent();
					//door switch
				//t.getDoorSwitch();
		
		//ldr
				//t.getLDR();
				
	        	//t.getCustomerSatisfaction();
	    }, 3000);//3sn        
		
		//ilk açılış ekranındaki günlük oratalama sıcaklık nem değerlerini getiren...
		this.getTemperatureAndHumidity();
		
		//ilk açılış ekranındaki günlük oratalama akım  değerlerini getiren...
		this.getCurrent();
		
		//vibration
		this.getVibration();
		

		
		//door switch
		this.getDoorSwitch();
		
		//ldr
		this.getLDR();
	},
	
	onLatestTempHumAndDate : function (){
		var idLastTemp = this.byId("idLatestTemperatureTitle");
		var idLastHum = this.byId("idLatestHumidityTitle");
		var idLastDate = this.byId("idLatestTemperatureDateLabel");
		
	
		
		var t = this;
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("C_DATE", true));
		
		this.iotmmsModel.read("/TemperatureHumidity" , {
			sorters : aSorters, 
			success: function(resp) {
				t.iterationlatestTemp += 1;
				idLastTemp.setText(resp.results[t.iterationlatestTemp].C_TEMPERATURE);
				if(resp.results[t.iterationlatestTemp].C_TEMPERATURE >= 25){
					idLastTemp.addStyleClass("highAlert");
					idLastTemp.removeStyleClass("nearTheThreshold");
					idLastTemp.removeStyleClass("underTheThreshold");
					t.hightAlertCounter += 1;
					//eğer bu alert uzun süre devam ederse
					if(t.hightAlertCounter > 10 && t.bMessageBoxOpenable){ //&& popup açık değilse
						//todo:ekranda bir messagebox açtır ve mail gönderildi diye uyarı ver.
						t.bMessageBoxOpenable = false;
						sap.m.MessageBox.error("Sıcaklık 10 dakika boyunca belirtilen limitin (25°C) üzerinde kaldı ve uyarı maili gönderildi.", {
							title: "Sıcaklık Limit Aşımı",
							onClose: function(){
								t.bMessageBoxOpenable = true;
								t.hightAlertCounter = 0;
							}
						});
					}
				}
				else if(resp.results[t.iterationlatestTemp].C_TEMPERATURE >= 24){
					idLastTemp.addStyleClass("nearTheThreshold");
					idLastTemp.removeStyleClass("highAlert");
					idLastTemp.removeStyleClass("underTheThreshold");
				}
				else if(resp.results[t.iterationlatestTemp].C_TEMPERATURE < 24){
					idLastTemp.addStyleClass("underTheThreshold");
					idLastTemp.removeStyleClass("highAlert");
					idLastTemp.removeStyleClass("nearTheThreshold");
				}
				idLastHum.setText(resp.results[t.iterationlatestTemp].C_HUMIDITY);
				idLastHum.addStyleClass("underTheThreshold");
				idLastDate.setText(t.formatDate(resp.results[resp.results.length - 1 - t.iterationlatestTemp].C_DATE));
				
			},
			error : function() {
				
			}
		});
		
	},
	
	getTemperatureAndHumidity: function(){
		var t = this;
		var aFilters = [];
		aFilters.push(new Filter("C_DEVICEID", FilterOperator.EQ, "'000780ED1E66'"));  // FLP ye atınca ' kaldırılmalı.
		//aFilters.push(new Filter("C_DEVICEID", FilterOperator.EQ, "000780ED1E66"));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		//https://iotmmsdbcloudfop1941701105tria.hanatrial.ondemand.com/iotmmsxs/iotservice.xsodata/DailyTempHumidity?$filter=C_DEVICEID%20eq%20%27000780ED1E66%27
		this.iotmmsModel.read("/DailyTempHumidity",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idTemperatureChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idTemperatureChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idTemperatureChart").bindData(t.oBindingParameters);
        		var dates = new sap.ui.model.json.JSONModel({
	    				items	: resp.results
	    			});
	    		//dropdownı doldurduk
                dates.oData.items.unshift({ CONVERTED_DATE: "Hepsi" });
    			t.getView().byId("idTemperatureDateCB").setModel(dates,"temperatureDates");
			},
			error: function(error){
				debugger;
			}
		});
	},
	
	onTemperatureDateChange: function(oEvent){
		var selectedDate = "'" + oEvent.getSource().getSelectedKey() + "'";
		if(selectedDate === "'Hepsi'"){
			this.getTemperatureAndHumidity();
			return;
		}
		var aFilters = [];
		aFilters.push(new Filter("CONVERTED_DATE0", FilterOperator.EQ, selectedDate));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		var t = this;
        sap.ui.core.BusyIndicator.show(0);             
		this.iotmmsModel.read("/HourlyTempHumidity",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idTemperatureChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idTemperatureChart","parameters":{},"model":"staticDataModel"};
        		var chart = t.getView().byId("idTemperatureChart");
        		chart.bindData(t.oBindingParameters);
        		sap.ui.core.BusyIndicator.hide(); 
			},
			error: function(error){
				debugger;
        		sap.ui.core.BusyIndicator.hide(); 
			}
		});
	},
	
	getCurrent: function(){
		var t = this;
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		this.iotmmsModel.read("/DailyCurrent",{
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idCurrentChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idCurrentChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idCurrentChart").bindData(t.oBindingParameters);
        		var dates = new sap.ui.model.json.JSONModel({
	    				items	: resp.results
	    			});
	    		//dropdownı doldurduk
                dates.oData.items.unshift({ CONVERTED_DATE: "Hepsi" });
    			t.getView().byId("idCurrentDateCB").setModel(dates,"currentDates");
			},
			error: function(error){
				debugger;
			}
		});
	},
	
	onCurrentDateChange: function(oEvent){
		var selectedDate = "'" + oEvent.getSource().getSelectedKey() + "'";
		if(selectedDate === "'Hepsi'"){
			this.getCurrent();
			return;
		}
		var aFilters = [];
		aFilters.push(new Filter("CONVERTED_DATE0", FilterOperator.EQ, selectedDate));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		var t = this;
		sap.ui.core.BusyIndicator.show(0); 
		this.iotmmsModel.read("/HourlyCurrent",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idCurrentChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idCurrentChart","parameters":{},"model":"staticDataModel"};
        		var chart = t.getView().byId("idCurrentChart");
        		chart.bindData(t.oBindingParameters);
        		sap.ui.core.BusyIndicator.hide(); 
			},
			error: function(error){
				debugger;
        		sap.ui.core.BusyIndicator.hide(); 
			}
		});
	},
	
	getVibration: function(){
		var t = this;
		var aSorters = [];
		var aFilters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		aFilters.push(new sap.ui.model.Filter("C_VIBRATIONSTATUS", FilterOperator.EQ, 1));
		this.iotmmsModel.read("/DailyVibration",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idVibrationChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idVibrationChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idVibrationChart").bindData(t.oBindingParameters);
        		var dates = new sap.ui.model.json.JSONModel({
	    				items	: resp.results
	    			});
	    		//dropdownı doldurduk
                dates.oData.items.unshift({ CONVERTED_DATE: "Hepsi" });
    			t.getView().byId("idVibrationDateCB").setModel(dates,"vibrationDates");
			},
			error: function(error){
				debugger;
			}
		});
	},
	
	onVibrationDateChange: function(oEvent){
		var selectedDate = "'" + oEvent.getSource().getSelectedKey() + "'";
		if(selectedDate === "'Hepsi'"){
			this.getVibration();
			return;
		}
		var aFilters = [];
		aFilters.push(new Filter("CONVERTED_DATE0",   FilterOperator.EQ, selectedDate));
		aFilters.push(new Filter("C_VIBRATIONSTATUS", FilterOperator.EQ, 1));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		var t = this;
		sap.ui.core.BusyIndicator.show(0); 
		this.iotmmsModel.read("/HourlyVibration",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idVibrationChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idVibrationChart","parameters":{},"model":"staticDataModel"};
        		var chart = t.getView().byId("idVibrationChart");
        		chart.bindData(t.oBindingParameters);
        		sap.ui.core.BusyIndicator.hide(); 
			},
			error: function(error){
				debugger;
        		sap.ui.core.BusyIndicator.hide(); 
			}
		});
	},
	
	getDoorSwitch: function(){
		var t = this;
		var aSorters = [];
		var aFilters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		aFilters.push(new sap.ui.model.Filter("C_DOORSTATUS", FilterOperator.EQ, 1));
		this.iotmmsModel.read("/DailyDoorSwitch",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idDoorChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idDoorChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idDoorChart").bindData(t.oBindingParameters);
        		var dates = new sap.ui.model.json.JSONModel({
	    				items	: resp.results
	    			});
	    		//dropdownı doldurduk
                dates.oData.items.unshift({ CONVERTED_DATE: "Hepsi" });
    			t.getView().byId("idDoorDateCB").setModel(dates,"doorDates");
			},
			error: function(error){
				debugger;
			}
		});
	},
	
	onDoorDateChange: function(oEvent){
		var selectedDate = "'" + oEvent.getSource().getSelectedKey() + "'";
		if(selectedDate === "'Hepsi'"){
			this.getDoorSwitch();
			return;
		}
		var aFilters = [];
		aFilters.push(new Filter("CONVERTED_DATE0",   FilterOperator.EQ, selectedDate));
		aFilters.push(new Filter("C_DOORSTATUS", FilterOperator.EQ, 1));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		var t = this;
		sap.ui.core.BusyIndicator.show(0); 
		this.iotmmsModel.read("/HourlyDoorSwitch",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idDoorChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idDoorChart","parameters":{},"model":"staticDataModel"};
        		var chart = t.getView().byId("idDoorChart");
        		chart.bindData(t.oBindingParameters);
        		sap.ui.core.BusyIndicator.hide(); 
			},
			error: function(error){
				debugger;
        		sap.ui.core.BusyIndicator.hide(); 
			}
		});
	},
	
	getLDR: function(){
		var t = this;
		var aSorters = [];
		var aFilters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		this.iotmmsModel.read("/DailyLDR",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idLDRChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idLDRChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idLDRChart").bindData(t.oBindingParameters);
        		var dates = new sap.ui.model.json.JSONModel({
	    				items	: resp.results
	    			});
	    		//dropdownı doldurduk
                dates.oData.items.unshift({ CONVERTED_DATE: "Hepsi" });
    			t.getView().byId("idLDRDateCB").setModel(dates,"ldrDates");
			},
			error: function(error){
				debugger;
			}
		});
	},
	
	onLDRDateChange: function(oEvent){
		var t = this;
		var selectedDate = "'" + oEvent.getSource().getSelectedKey() + "'";
		if(selectedDate === "'Hepsi'"){
			this.getLDR();
			return;
		}
		var aFilters = [];
		aFilters.push(new Filter("CONVERTED_DATE0",   FilterOperator.EQ, selectedDate));
		var aSorters = [];
		aSorters.push(new sap.ui.model.Sorter("CONVERTED_DATE", false));
		sap.ui.core.BusyIndicator.show(0); 
		this.iotmmsModel.read("/HourlyLDR",{
			filters: aFilters,
			sorters: aSorters,
			success: function(resp){
    			t.getView().getModel("staticDataModel").setData({'idLDRChart':resp.results}, true);
        		t.oBindingParameters = {"path":"/idLDRChart","parameters":{},"model":"staticDataModel"};
        		t.getView().byId("idLDRChart").bindData(t.oBindingParameters);
        		sap.ui.core.BusyIndicator.hide(); 
			},
			error: function(error){
				debugger;
        		sap.ui.core.BusyIndicator.hide(); 
			}
		});
	}
	
});
}, /* bExport= */true);