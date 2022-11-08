/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core","sap/ui/core/Element","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/registry/Settings","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(e,n,t,r,o,a,i,c,l,s,u,f){"use strict";var p={};function g(e,t){if(!e.changeSpecificData){return Promise.reject(new Error("No changeSpecificData available"))}if(!e.changeSpecificData.changeType){return Promise.reject(new Error("No valid changeType"))}if(!(e.selectorControl instanceof r)){return Promise.reject(new Error("No valid selectorControl"))}var o=e.selectorControl.getMetadata().getName();return c.getChangeHandler(e.changeSpecificData.changeType,o,e.selectorControl,n,t)}function d(e,t,r){var o=a.getRelevantVariantManagementControlId(t,[],r);return n.getSelector(o,e).id}function h(e){var r=a.getAllVariantManagementControlIds(e);return r.reduce(function(r,o){var a=t.byId(o).getFor();if(a.length){r.push(n.getSelector(o,e).id)}return r},[])}function m(n){e.error(n);return Promise.reject(n)}var C={add:function(n){if(!n.changes.length){return Promise.resolve([])}var t=n.changes[0].selectorElement||n.changes[0].selectorControl;var r=f.getAppComponentForControl(t);var a=i.getFlexReference({element:t});var c=s.createForControl(r);var l=r.getModel(f.VARIANT_MODEL_NAME);var h=u.USER;var m=[];function C(){var t=[];return n.changes.reduce(function(o,a){return o.then(function(){a.selectorControl=a.selectorElement;return g(a,h)}).then(function(){if(!n.ignoreVariantManagement){if(!a.changeSpecificData.variantReference){var e=d(r,a.selectorControl,n.useStaticArea);if(e){var t=l.oData[e].currentVariant;a.changeSpecificData.variantReference=t}}}else{delete a.changeSpecificData.variantReference}a.changeSpecificData=Object.assign(a.changeSpecificData,{developerMode:false,layer:h});return c.addChange(a.changeSpecificData,a.selectorControl)}).then(function(e){t.push({changeInstance:e,selectorControl:a.selectorControl})}).catch(function(n){e.error("A Change was not added successfully. Reason: ",n.message)})},Promise.resolve()).then(function(){return t})}function v(n){return n.reduce(function(n,t){return n.then(function(){return c.applyChange(t.changeInstance,t.selectorControl)}).then(function(e){m.push(e)}).catch(function(n){e.error("A Change was not applied successfully. Reason:",n.message)})},Promise.resolve())}return o.initialize({componentId:r.getId()}).then(function(){return C().then(v).then(function(){(p[a]||[]).forEach(function(e){e(m)});return m})})},reset:function(e){if(!e.selectors||e.selectors.length===0){return m("At least one control ID has to be provided as a parameter")}var n=e.selectors[0].appComponent||f.getAppComponentForControl(e.selectors[0]);if(!n){return m("App Component could not be determined")}var t=e.selectors.map(function(e){var t=e.id||e.getId();var r=n.getLocalId(t);return r||t});var r=s.createForControl(n);if(o.isInitialized({control:n})){return r.resetChanges(u.USER,undefined,n,t,e.changeTypes)}return Promise.resolve()},restore:function(e){if(!e||!e.selector){return Promise.reject("No selector was provided")}var n=f.getAppComponentForControl(e.selector);if(!n){return Promise.reject("App Component could not be determined")}var t=s.createForControl(n);if(o.isInitialized({control:n})){return t.removeDirtyChanges(u.USER,n,e.selector,e.generator,e.changeTypes)}return Promise.resolve()},save:function(e){var n=e.selector.appComponent||f.getAppComponentForControl(e.selector);if(!n){return m("App Component could not be determined")}var t=s.createForControl(n);var r=n.getModel(f.VARIANT_MODEL_NAME);var a=h(n);if(o.isInitialized({control:n})){return t.saveSequenceOfDirtyChanges(e.changes,n).then(function(e){if(r){r.checkDirtyStateForControlModels(a)}return e})}return Promise.resolve()},buildSelectorFromElementIdAndType:function(e){var n=f.getAppComponentForControl(e.element);if(!n||!e.elementId||!e.elementType){throw new Error("Not enough information given to build selector.")}return{elementId:e.elementId,elementType:e.elementType,appComponent:n,id:e.elementId,controlType:e.elementType}},isCondensingEnabled:function(){return l.getInstance().then(function(e){return e.isCondensingEnabled(u.USER)})},attachChangeCreation:function(e,n){var t=i.getFlexReference({element:e});p[t]=(p[t]||[]).concat(n)},detachChangeCreation:function(e,n){var t=i.getFlexReference({element:e});if(Array.isArray(p[t])){p[t]=p[t].filter(function(e){return e!==n})}},detachAllChangeCreationListeners:function(e){if(e){var n=i.getFlexReference({element:e});delete p[n]}else{p={}}}};return C});