/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/uid","sap/ui/fl/util/ManagedObjectModel"],function(e){"use strict";var t={};var n="$sap.m.flexibility.CombineButtonsModel";function r(e,t,r,o,i,a,u,c,s){var g="";var d="";var l="";var m=[];var v=sap.ui.getCore().getConfiguration().getRTL();var f=[];return e.reduce(function(e,p,b){var h;var C=b;var y;var I;var P=c.buttonsIdForSave[C];var S;var B="$sap.m.flexibility.MenuButtonModel"+C;return e.then(t.getProperty.bind(t,p,"text")).then(function(e){S=e;return t.createControl("sap.m.MenuItem",r,u,P)}).then(function(e){y=e;return t.findIndexInParentAggregation(p)}).then(function(e){s.insertIndexes[C]=e;return t.createControl("sap.ui.fl.util.ManagedObjectModel",r,u,Object.assign({},P,{id:P.id+"-managedObjectModel"}),{object:p,name:n})}).then(function(e){I=e;return t.insertAggregation(y,"dependents",I,0,u)}).then(function(){return t.createControl("sap.ui.core.CustomData",r,u,Object.assign({},P,{id:P.id+"-customData"}),{key:"{ path: '"+n+">key' }",value:"{ path: '"+n+">value' }"})}).then(function(e){t.bindProperty(y,"text",n+">/text");t.bindProperty(y,"icon",n+">/icon");t.bindProperty(y,"enabled",n+">/enabled");t.bindProperty(y,"visible",n+">/visible");return t.bindAggregation(y,"customData",{path:n+">/customData",template:e,templateShareable:false},u)}).then(function(){if(S){v?f.unshift(S):f.push(S)}var e=Object.assign({},P,{id:P.id+"-originalButtonId"});return t.createControl("sap.ui.core.CustomData",r,u,e)}).then(function(e){h=e;t.setProperty(h,"key","originalButtonId");t.setProperty(h,"value",t.getId(p));return t.removeAggregation(i,a,p)}).then(function(){return t.insertAggregation(i,"dependents",p,0,u)}).then(function(){t.insertAggregation(p,"customData",h,0,u)}).then(function(){t.insertAggregation(o,"items",y,C,u)}).then(function(){return t.createControl("sap.ui.fl.util.ManagedObjectModel",r,u,Object.assign({},P,{id:P.id+"-managedObjectModelMenuItem"}),{object:y,name:B})}).then(function(e){m[C]=e;g=g+l+"${"+B+">/enabled}";d=d+l+"${"+B+">/visible}";l=" || ";return{menuButtonModels:m,menuButtonName:f,propertyEnabled:g,propertyVisible:d}})},Promise.resolve())}t.applyChange=function(e,t,n){if(n.modifier.targets!=="jsControlTree"){return Promise.reject(new Error("Combine buttons change can't be applied on XML tree"))}var o=e.getContent();var i=n.modifier;var a=n.view;var u=n.appComponent;var c;var s;var g;var d;var l;var m;var v;var f={parentAggregation:"",insertIndexes:[]};var p=[];var b=[];return Promise.resolve().then(i.bySelector.bind(i,o.combineButtonSelectors[0],u,a)).then(function(e){s=e;c=i.getParent(s);var t=[];o.combineButtonSelectors.forEach(function(e){var n=Promise.resolve().then(i.bySelector.bind(i,e,u,a));t.push(n)});return Promise.all(t)}).then(function(e){l=e;return i.getParentAggregationName(l[0],c)}).then(function(e){d=e;f.parentAggregation=d;return i.findIndexInParentAggregation(s)}).then(function(e){g=e;return i.createControl("sap.m.Menu",u,a,o.menuIdSelector)}).then(function(e){m=e;return i.attachEvent(m,"itemSelected","sap.m.changeHandler.CombineButtons.pressHandler")}).then(function(){return r(l,i,u,m,c,d,a,o,f)}).then(function(e){p=e.menuButtonModels;b=e.menuButtonName;var t=e.propertyVisible;var n=e.propertyEnabled;return i.createControl("sap.m.MenuButton",u,a,o.menuButtonIdSelector,{visible:"{= "+t+"}",enabled:"{= "+n+"}"})}).then(function(e){v=e;return p.reduce(function(e,t){return e.then(i.insertAggregation.bind(i,v,"dependents",t,0,a))},Promise.resolve())}).then(function(){i.setProperty(v,"text",b.join("/"));return Promise.resolve().then(i.insertAggregation.bind(i,v,"menu",m,0,a)).then(i.insertAggregation.bind(i,c,d,v,g,a)).then(function(){e.setRevertData(f)})})};function o(e,t){return e.reduce(function(e,n){return e.then(function(){return t.getProperty(n,"key")}).then(function(e){if(e==="originalButtonId"){return t.destroy(n)}return undefined})},Promise.resolve())}t.revertChange=function(e,t,n){var r=n.modifier;var i=n.view;var a=e.getRevertData();var u=e.getContent();var c=a.parentAggregation;var s,g,d;return Promise.resolve().then(function(){return r.bySelector(u.menuButtonIdSelector,n.appComponent,i)}).then(function(e){s=e;g=r.getParent(s);d=u.combineButtonSelectors.slice().reverse();return r.removeAggregation(g,c,s)}).then(function(){return r.destroy(s)}).then(function(){var t=d.length;return d.reduce(function(e,u,s){var d=s;var l;return e.then(function(){return r.bySelector(u,n.appComponent,i)}).then(function(e){l=e;return r.getAggregation(l,"customData")}).then(function(e){return o(e,r)}).then(function(){return r.insertAggregation(g,c,l,a.insertIndexes[t-d-1],i)})},Promise.resolve()).then(function(){e.resetRevertData()})})};t.completeChangeContent=function(t,n,r){var o=r.modifier;var i=r.appComponent;var a=n.combineElementIds;if(a&&a.length>1){var u={};t.addDependentControl(a,"combinedButtons",r);u.combineButtonSelectors=a.map(function(e){return o.getSelector(e,i)});u.menuButtonIdSelector=o.getSelector(i.createId(e()),i);u.menuIdSelector=o.getSelector(i.createId(e()),i);u.buttonsIdForSave=a.map(function(){return o.getSelector(i.createId(e()),i)});t.setContent(u)}else{throw new Error("Combine buttons action cannot be completed: oSpecificChangeInfo.combineElementIds attribute required")}};t.pressHandler=function(e){var t=e.getParameter("item").getModel(n).getObject();t.firePress()};return t},true);