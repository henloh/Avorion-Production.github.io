/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/model/ChangeReason","sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/core/IconPool","./library","./Table","./Column","./ColumnListItem","./P13nPanel","./P13nColumnsItem","./SearchField","./Text","./Button","./OverflowToolbar","./OverflowToolbarLayoutData","./OverflowToolbarButton","./ToolbarSpacer","sap/ui/thirdparty/jquery"],function(e,t,n,o,i,r,s,l,a,d,u,p,h,m,c,g,I,f,_){"use strict";var y=r.OverflowToolbarPriority;var b=r.ButtonType;var M=r.ToolbarDesign;var T=r.ListType;var v=r.ListMode;var C=r.P13nPanelType;var S=r.Sticky;var x=d.extend("sap.m.P13nColumnsPanel",{metadata:{deprecated:true,library:"sap.m",properties:{visibleItemsThreshold:{type:"int",group:"Behavior",defaultValue:-1}},aggregations:{columnsItems:{type:"sap.m.P13nColumnsItem",multiple:true,singularName:"columnsItem",bindable:"bindable"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"}},events:{addColumnsItem:{deprecated:true,parameters:{newItem:{type:"sap.m.P13nColumnsItem"}}},changeColumnsItems:{parameters:{newItems:{type:"sap.m.P13nColumnsItem[]"},existingItems:{type:"sap.m.P13nColumnsItem[]"},items:{type:"object[]"}}},setData:{deprecated:true}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.class("sapMP13nColumnsPanel");e.openEnd();t.getAggregation("content").forEach(function(t){e.renderControl(t)});e.close("div")}}});x.prototype.init=function(){this._iLiveChangeTimer=0;this._iSearchTimer=0;this._bIgnoreUpdateInternalModel=false;this._bUpdateInternalModel=true;this._bTableItemsChanged=false;var e=new n({items:[],columnKeyOfMarkedItem:undefined,isMoveDownButtonEnabled:undefined,isMoveUpButtonEnabled:undefined,showOnlySelectedItems:undefined,countOfSelectedItems:0,countOfItems:0});e.setDefaultBindingMode(o.TwoWay);e.setSizeLimit(1e3);this.setModel(e,"$sapmP13nColumnsPanel");this.setType(C.columns);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("COLUMSPANEL_TITLE"));this._createTable();this._oTable.setHeaderToolbar(this._createToolbar());this.addAggregation("content",this._oTable)};x.prototype.reInitialize=function(){};x.prototype.onBeforeRendering=function(){this._updateInternalModel();if(!this._getInternalModel().getProperty("/columnKeyOfMarkedItem")){this._setColumnKeyOfMarkedItem(this._getColumnKeyByTableItem(this._getVisibleTableItems()[0]))}this._switchMarkedTableItemTo(this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem")));this._updateControlLogic()};x.prototype.getOkPayload=function(){this._updateInternalModel();var e=this._getInternalModel().getProperty("/items");return{tableItems:e.map(function(e){return{columnKey:e.columnKey,index:e.persistentIndex===-1?undefined:e.persistentIndex,visible:e.persistentSelected,width:e.width}}),tableItemsChanged:this._bTableItemsChanged,selectedItems:e.filter(function(e){return e.persistentSelected}).map(function(e){return{columnKey:e.columnKey}})}};x.prototype.getResetPayload=function(){return{oPanel:this}};x.prototype.exit=function(){this._getToolbar().destroy();this._oTable.destroy();this._oTable=null;if(this._getInternalModel()){this._getInternalModel().destroy()}window.clearTimeout(this._iLiveChangeTimer);window.clearTimeout(this._iSearchTimer)};x.prototype.addItem=function(e){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.addAggregation("items",e);return this};x.prototype.insertItem=function(e,t){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.insertAggregation("items",e,t);return this};x.prototype.removeItem=function(e){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}e=this.removeAggregation("items",e);return e};x.prototype.removeAllItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}return this.removeAllAggregation("items")};x.prototype.destroyItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.destroyAggregation("items");return this};x.prototype.addColumnsItem=function(e){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.addAggregation("columnsItems",e);return this};x.prototype.insertColumnsItem=function(e,t){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.insertAggregation("columnsItems",e,t);return this};x.prototype.updateColumnsItems=function(e){this.updateAggregation("columnsItems");if(e===t.Change&&!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}};x.prototype.removeColumnsItem=function(e){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}return this.removeAggregation("columnsItems",e)};x.prototype.removeAllColumnsItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}return this.removeAllAggregation("columnsItems")};x.prototype.destroyColumnsItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true}this.destroyAggregation("columnsItems");return this};x.prototype.onBeforeNavigationFrom=function(){var e=this._getSelectedModelItems();var t=this.getVisibleItemsThreshold();return!(e&&t!==-1&&e.length>t)};x.prototype._notifyChange=function(){this._bTableItemsChanged=true;var e=this.getChangeNotifier();if(e){e(this)}};x.prototype._scrollToSelectedItem=function(e){if(!e){return}sap.ui.getCore().applyChanges()};x.prototype._getInternalModel=function(){return this.getModel("$sapmP13nColumnsPanel")};x.prototype._createTable=function(){this._oTable=new s({mode:v.MultiSelect,rememberSelections:false,sticky:[S.ColumnHeaders,S.HeaderToolbar],itemPress:_.proxy(this._onItemPressed,this),selectionChange:_.proxy(this._onSelectionChange,this),columns:[new l({vAlign:e.VerticalAlign.Middle,header:new h({text:{parts:[{path:"/countOfSelectedItems"},{path:"/countOfItems"}],formatter:function(e,t){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("COLUMNSPANEL_SELECT_ALL_WITH_COUNTER",[e,t])}}})})],items:{path:"/items",templateShareable:false,template:new a({cells:[new h({text:"{text}"})],visible:"{visible}",selected:"{persistentSelected}",tooltip:"{tooltip}",type:T.Active})}});this._oTable.setModel(this._getInternalModel())};x.prototype._createToolbar=function(){var e=this;var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");var n=new c(this.getId()+"-toolbar",{design:M.Auto,content:[new f,new p(this.getId()+"-searchField",{liveChange:function(t){var n=t.getSource().getValue(),o=n?300:0;window.clearTimeout(e._iSearchTimer);if(o){e._iSearchTimer=window.setTimeout(function(){e._onExecuteSearch()},o)}else{e._onExecuteSearch()}},search:_.proxy(this._onExecuteSearch,this),layoutData:new g({minWidth:"12.5rem",maxWidth:"23.077rem",shrinkable:true,moveToOverflow:false,stayInOverflow:false})}),new m(this.getId()+"-showSelected",{text:{path:"/showOnlySelectedItems",formatter:function(e){return e?t.getText("COLUMNSPANEL_SHOW_ALL"):t.getText("COLUMNSPANEL_SHOW_SELECTED")}},type:b.Transparent,press:_.proxy(this._onSwitchButtonShowSelected,this),layoutData:new g({moveToOverflow:true,priority:y.High})}),new I({icon:i.getIconURI("collapse-group"),text:t.getText("COLUMNSPANEL_MOVE_TO_TOP"),tooltip:t.getText("COLUMNSPANEL_MOVE_TO_TOP"),type:b.Transparent,enabled:{path:"/isMoveUpButtonEnabled"},press:_.proxy(this.onPressButtonMoveToTop,this),layoutData:new g({moveToOverflow:true,priority:y.Low,group:2})}),new I({icon:i.getIconURI("navigation-up-arrow"),text:t.getText("COLUMNSPANEL_MOVE_UP"),tooltip:t.getText("COLUMNSPANEL_MOVE_UP"),type:b.Transparent,enabled:{path:"/isMoveUpButtonEnabled"},press:_.proxy(this.onPressButtonMoveUp,this),layoutData:new g({moveToOverflow:true,priority:y.High,group:1})}),new I({icon:i.getIconURI("navigation-down-arrow"),text:t.getText("COLUMNSPANEL_MOVE_DOWN"),tooltip:t.getText("COLUMNSPANEL_MOVE_DOWN"),type:b.Transparent,enabled:{path:"/isMoveDownButtonEnabled"},press:_.proxy(this.onPressButtonMoveDown,this),layoutData:new g({moveToOverflow:true,priority:y.High,group:1})}),new I({icon:i.getIconURI("expand-group"),text:t.getText("COLUMNSPANEL_MOVE_TO_BOTTOM"),tooltip:t.getText("COLUMNSPANEL_MOVE_TO_BOTTOM"),type:b.Transparent,enabled:{path:"/isMoveDownButtonEnabled"},press:_.proxy(this.onPressButtonMoveToBottom,this),layoutData:new g({moveToOverflow:true,priority:y.Low,group:2})})]});n.setModel(this._getInternalModel());return n};x.prototype.onPressButtonMoveToTop=function(){this._moveMarkedTableItem(this._getMarkedTableItem(),this._getVisibleTableItems()[0])};x.prototype.onPressButtonMoveUp=function(){var e=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),e[e.indexOf(this._getMarkedTableItem())-1])};x.prototype.onPressButtonMoveDown=function(){var e=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),e[e.indexOf(this._getMarkedTableItem())+1])};x.prototype.onPressButtonMoveToBottom=function(){var e=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),e[e.length-1])};x.prototype._onSwitchButtonShowSelected=function(){this._getInternalModel().setProperty("/showOnlySelectedItems",!this._getInternalModel().getProperty("/showOnlySelectedItems"));this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic()};x.prototype._onExecuteSearch=function(){this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._updateControlLogic()};x.prototype._switchVisibilityOfUnselectedModelItems=function(){var e=this._isFilteredByShowSelected();var t=this._getInternalModel().getProperty("/items");t.forEach(function(t){if(t.persistentSelected){t.visible=true;return}t.visible=!e});this._getInternalModel().setProperty("/items",t)};x.prototype._getVisibleModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(e){return!!e.visible})};x.prototype._moveMarkedTableItem=function(e,t){var n=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(e));var o=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(t));var i=this._getModelItemIndexByColumnKey(n.columnKey);var r=this._getModelItemIndexByColumnKey(o.columnKey);this._moveModelItems(i,r);this._checkButtonFocus(r);this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();this._fireChangeColumnsItems();this._fireSetData();this._notifyChange()};x.prototype._checkButtonFocus=function(e){var t=this._oTable.getItems().length-1;if(e===0||e===t){sap.ui.getCore().byId(this.getId()+"-showSelected").focus()}};x.prototype._moveModelItems=function(e,t){var n=this._getInternalModel().getProperty("/items");if(e<0||t<0||e>n.length-1||t>n.length-1){return false}this._removeStyleOfMarkedTableItem();var o=n.splice(e,1);n.splice(t,0,o[0]);this._updateModelItemsPersistentIndex(n);this._updateCounts(n);this._getInternalModel().setProperty("/items",n);this._switchMarkedTableItemTo(this._getMarkedTableItem());return true};x.prototype._getModelItemByColumnKey=function(e){var t=this._getInternalModel().getProperty("/items").filter(function(t){return t.columnKey===e});return t[0]};x.prototype._updateCounts=function(e){var t=0;var n=0;e.forEach(function(e){t++;if(e.persistentSelected){n++}});this._getInternalModel().setProperty("/countOfItems",t);this._getInternalModel().setProperty("/countOfSelectedItems",n)};x.prototype._sortModelItemsByPersistentIndex=function(e){var t;var n;try{n=sap.ui.getCore().getConfiguration().getLocale().toString();if(typeof window.Intl!=="undefined"){t=window.Intl.Collator(n,{numeric:true})}}catch(e){}e.forEach(function(e,t){e.localIndex=t});e.sort(function(e,o){if(e.persistentSelected===true&&(o.persistentSelected===false||o.persistentSelected===undefined)){return-1}else if((e.persistentSelected===false||e.persistentSelected===undefined)&&o.persistentSelected===true){return 1}else if(e.persistentSelected===true&&o.persistentSelected===true){if(e.persistentIndex>-1&&e.persistentIndex<o.persistentIndex){return-1}else if(o.persistentIndex>-1&&e.persistentIndex>o.persistentIndex){return 1}else{return e.localIndex-o.localIndex}}else if((e.persistentSelected===false||e.persistentSelected===undefined)&&(o.persistentSelected===false||o.persistentSelected===undefined)){return t?t.compare(e.text,o.text):e.text.localeCompare(o.text,n,{numeric:true})}});e.forEach(function(e){delete e.localIndex})};x.prototype._getColumnKeyByTableItem=function(e){var t=this._oTable.indexOfItem(e);if(t<0){return null}return this._oTable.getBinding("items").getContexts(undefined,undefined,undefined,true)[t].getObject().columnKey};x.prototype._getModelItemIndexByColumnKey=function(e){var t=-1;this._getInternalModel().getProperty("/items").some(function(n,o){if(n.columnKey===e){t=o;return true}});return t};x.prototype._getSelectedModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(e){return e.persistentSelected})};x.prototype._getVisibleTableItems=function(){return this._oTable.getItems().filter(function(e){return e.getVisible()})};x.prototype._getTableItemByColumnKey=function(e){var t=this._oTable.getBinding("items").getContexts(undefined,undefined,undefined,true);var n=this._oTable.getItems().filter(function(n,o){return t[o].getObject().columnKey===e});return n[0]};x.prototype._getToolbar=function(){return sap.ui.getCore().byId(this.getId()+"-toolbar")||null};x.prototype._getSearchField=function(){return sap.ui.getCore().byId(this.getId()+"-searchField")||null};x.prototype._getSearchText=function(){var e=this._getSearchField();return e?e.getValue():""};x.prototype._isFilteredBySearchText=function(){return!!this._getSearchText().length};x.prototype._isFilteredByShowSelected=function(){return this._getInternalModel().getData().showOnlySelectedItems};x.prototype._updateControlLogic=function(){var e=this._isFilteredBySearchText();var t=this._isFilteredByShowSelected();var n=this._getVisibleTableItems();this._getInternalModel().setProperty("/isMoveUpButtonEnabled",n.indexOf(this._getMarkedTableItem())>0);this._getInternalModel().setProperty("/isMoveDownButtonEnabled",n.indexOf(this._getMarkedTableItem())>-1&&n.indexOf(this._getMarkedTableItem())<n.length-1);var o=sap.ui.getCore().byId(this._oTable.getId()+"-sa");if(o){o.setEnabled(!e&&!t)}};x.prototype._updateModelItemsPersistentIndex=function(e){var t=-1;e.forEach(function(e){e.persistentIndex=-1;if(e.persistentSelected){t++;e.persistentIndex=t}})};x.prototype._fireSetData=function(){this._bIgnoreUpdateInternalModel=true;this.fireSetData();this._bIgnoreUpdateInternalModel=false};x.prototype._fireChangeColumnsItems=function(){this._bIgnoreUpdateInternalModel=true;var e=this._getInternalModel().getProperty("/items");var t={newItems:[],existingItems:[],items:e.map(function(e){return{columnKey:e.columnKey,visible:e.persistentSelected,index:e.persistentIndex===-1?undefined:e.persistentIndex,width:e.width,total:e.total}})};e.forEach(function(e){var n=this._getColumnsItemByColumnKey(e.columnKey);if(n){n.setVisible(e.persistentSelected);n.setIndex(e.persistentIndex===-1?undefined:e.persistentIndex);if(e.width!==undefined){n.setWidth(e.width)}if(e.total!==undefined){n.setTotal(e.total)}t.existingItems.push(n)}else{t.newItems.push(new u({columnKey:e.columnKey,visible:e.persistentSelected,index:e.persistentIndex===-1?undefined:e.persistentIndex,width:e.width,total:e.total}))}},this);this.fireChangeColumnsItems(t);this._bIgnoreUpdateInternalModel=false};x.prototype._getColumnsItemByColumnKey=function(e){var t=this.getColumnsItems().filter(function(t){return t.getColumnKey()===e});return t[0]};x.prototype._getMarkedTableItem=function(){return this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem"))};x.prototype._setColumnKeyOfMarkedItem=function(e){this._getInternalModel().setProperty("/columnKeyOfMarkedItem",e)};x.prototype._onItemPressed=function(e){this._switchMarkedTableItemTo(e.getParameter("listItem"));this._updateControlLogic()};x.prototype._onSelectionChange=function(e){if(!e.getParameter("selectAll")&&e.getParameter("listItems").length===1){this._switchMarkedTableItemTo(e.getParameter("listItem"))}this._selectTableItem()};x.prototype._selectTableItem=function(){this._updateControlLogic();var e=this._getInternalModel().getProperty("/items");this._updateModelItemsPersistentIndex(e);this._updateCounts(e);this._getInternalModel().setProperty("/items",e);this._fireChangeColumnsItems();this._fireSetData();this._notifyChange();var t=this.getValidationExecutor();if(t){t()}};x.prototype._switchMarkedTableItemTo=function(e){this._removeStyleOfMarkedTableItem();var t=this._getColumnKeyByTableItem(e);if(t){this._setColumnKeyOfMarkedItem(t);e.addStyleClass("sapMP13nColumnsPanelItemSelected")}};x.prototype._removeStyleOfMarkedTableItem=function(){if(this._getMarkedTableItem()){this._getMarkedTableItem().removeStyleClass("sapMP13nColumnsPanelItemSelected")}};x.prototype._filterModelItemsBySearchText=function(){var e=this._getSearchText();e=e.replace(/(^\s+)|(\s+$)/g,"");e=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");var t=new RegExp(e,"igm");if(!t){return}this._getVisibleModelItems().forEach(function(e){e.visible=false;if(typeof e.text==="string"&&e.text.match(t)){e.visible=true}if(typeof e.tooltip==="string"&&e.tooltip.match(t)){e.visible=true}});this._getInternalModel().refresh()};x.prototype._updateInternalModel=function(){if(!this._bUpdateInternalModel){return}this._bUpdateInternalModel=false;this._removeStyleOfMarkedTableItem();var e=this._getInternalModel().getProperty("/items");this._getInternalModel().setProperty("/items",this.getItems().map(function(e){return{columnKey:e.getColumnKey(),visible:true,text:e.getText(),tooltip:e.getTooltip(),persistentIndex:-1,persistentSelected:e.getVisible(),width:undefined,total:undefined}},this));this.getColumnsItems().forEach(function(e){var t=this._getModelItemByColumnKey(e.getColumnKey());if(!t){return}if(e.getIndex()!==undefined){t.persistentIndex=e.getIndex()}if(e.getVisible()!==undefined){t.persistentSelected=e.getVisible()}if(e.getWidth()!==undefined){t.width=e.getWidth()}if(e.getTotal()!==undefined){t.total=e.getTotal()}},this);this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();var t=this._getInternalModel().getProperty("/items");this._sortModelItemsByPersistentIndex(t);this._updateCounts(t);this._getInternalModel().setProperty("/items",t);this._switchMarkedTableItemTo(this._getMarkedTableItem());if(_(t).not(e).length!==0||_(e).not(t).length!==0){this._bTableItemsChanged=true}};return x});