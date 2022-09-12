/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddViaDelegate","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,r){"use strict";var t="sap.ui.core.Title";var n="sap.m.Toolbar";var a="sap.m.Label";var o="sap.ui.comp.smartfield.SmartLabel";function i(e,r){var i=r.change;var l=r.modifier;var v=i.getContent();var g=v.newFieldIndex;var u=i.getDependentControl("targetContainerHeader",r);var c=e.indexOf(u);var d=0;var f=0;if(e.length===1||e.length===c+1){d=e.length}else{var s=0;for(s=c+1;s<e.length;s++){var p=l.getControlType(e[s]);if(p===a||p===o){if(f===g){d=s;break}f++}if(p===t||p===n){d=s;break}if(s===e.length-1){d=e.length}}}return d}function l(e,r,t){var n=e.slice();n.splice(r,0,t.label,t.control);return n}function v(e,r,t,n){return r.reduce(function(r,a,o){return r.then(function(){return t.insertAggregation(e,"content",a,o,n.view)})},Promise.resolve())}var g=e.createAddViaDelegateChangeHandler({addProperty:function(e){var r=e.control;var t=e.innerControls;var n=e.modifier;var a=e.appComponent;var o;var g;var u;var c=e.change;var d=c.getRevertData();d.labelSelector=n.getSelector(t.label,a);c.setRevertData(d);return Promise.resolve().then(n.getAggregation.bind(n,r,"content")).then(function(a){o=a;g=i(o,e);u=l(o,g,t);return n.removeAllAggregation(r,"content")}).then(function(){return v(r,u,n,e)}).then(function(){if(t.valueHelp){return n.insertAggregation(r,"dependents",t.valueHelp,0,e.view)}return undefined})},revertAdditionalControls:function(e){var r=e.control;var t=e.change;var n=e.modifier;var a=e.appComponent;var o=t.getRevertData().labelSelector;if(o){var i=n.bySelector(o,a);return Promise.resolve().then(n.removeAggregation.bind(n,r,"content",i)).then(n.destroy.bind(n,i))}return Promise.resolve()},aggregationName:"content",mapParentIdIntoChange:function(e,r,t){var n=t.appComponent;var a=t.view;var o=t.modifier.bySelector(r.parentId,n,a);var i=o.getTitle()||o.getToolbar();if(i){e.addDependentControl(i.getId(),"targetContainerHeader",t)}},parentAlias:"_",fieldSuffix:"",skipCreateLayout:true,supportsDefault:true});g.getChangeVisualizationInfo=function(e,t){var n=e.getRevertData();if(n&&n.labelSelector){return{affectedControls:[r.bySelector(n.labelSelector,t).getId()],hasParentWithUnstableId:true}}return{affectedControls:[e.getContent().newFieldSelector]}};return g},true);