/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/support/ToolsAPI","sap/ui/test/_ControlFinder"],function(e,t,r){"use strict";var o=e.extend("sap.ui.testrecorder.inspector.ControlAPI",{});var n="default";var a="none";o.prototype.getFrameworkData=function(){var e=t.getFrameworkInformation();return{framework:{name:e.commonInformation.frameworkName,version:e.commonInformation.version}}};o.prototype.getAllControlData=function(){var e=t.getRenderedControlTree();return{renderedControls:e}};o.prototype.getControlData=function(e){var t;if(e.controlId){t=e.controlId}else if(e.domElementId){var o=r._getControlForElement(e.domElementId);if(o){t=o.getId()}else{return{}}}var n=this._getFormattedProperties(t);var a=this._getFormattedBindings(t);return{properties:n,bindings:a}};o.prototype._getFormattedProperties=function(e){var r=t.getControlProperties(e);r.own=[r.own];var o={};["own","inherited"].forEach(function(e){o[e]=[];r[e].forEach(function(t){Object.keys(t.properties).forEach(function(r){var n=t.properties[r];o[e].push({inheritedFrom:t.meta.controlName,property:r,value:n.value===undefined?"":n.value,type:n.type})})})});return o};o.prototype._getFormattedBindings=function(e){var r=t.getControlBindings(e);var o=r.contextPath?r.contextPath+"/":"";var i=Object.keys(r.properties)[0]&&r.properties[Object.keys(r.properties)[0]];var p=i&&i.model.names[0]||n;var s={context:[{path:r.contextPath||a,model:p}],properties:[],aggregations:[]};Object.keys(r.properties).forEach(function(e){var t=r.properties[e];s.properties.push({property:e,relativePath:t.path,absolutePath:o+t.path,model:t.model.names[0]||n})});Object.keys(r.aggregations).forEach(function(e){var t=r.aggregations[e].model;s.aggregations.push({aggregation:e,relativePath:t.path,absolutePath:o+t.path,model:t.names[0]||n})});return s};return new o},true);