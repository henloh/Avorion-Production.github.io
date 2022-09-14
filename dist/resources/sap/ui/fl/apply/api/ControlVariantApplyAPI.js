/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Component","sap/ui/core/Core","sap/ui/core/Element","sap/ui/fl/apply/_internal/controlVariants/URLHandler","sap/ui/fl/variants/VariantManagement","sap/ui/fl/Utils"],function(e,r,t,n,a,o,i){"use strict";var l={clearVariantParameterInURL:function(r){var t;var n=i.getAppComponentForControl(r.control);var l=n&&n.getModel(i.VARIANT_MODEL_NAME);if(!l){e.error("Variant model could not be found on the provided control");return}if(r.control instanceof o){var c=l.getLocalId(r.control.getId(),n);var p=a.removeURLParameterForVariantManagement({model:l,vmReference:c});t=p.parameters}a.update({parameters:t||[],updateURL:true,updateHashEntry:!!l,model:l||{},silent:!l})},activateVariant:function(a){function o(r){e.error(r);return Promise.reject(r)}var l;if(typeof a.element==="string"){l=r.get(a.element);if(!(l instanceof r)){l=t.byId(a.element);if(!(l instanceof n)){return o(Error("No valid component or control found for the provided ID"))}}}else if(a.element instanceof r||a.element instanceof n){l=a.element}var c=i.getAppComponentForControl(l);if(!c){return o(Error("A valid variant management control or component (instance or ID) should be passed as parameter"))}var p=c.getModel(i.VARIANT_MODEL_NAME);if(!p){return o(Error("No variant management model found for the passed control or application component"))}var d=p.getVariantManagementReference(a.variantReference).variantManagementReference;if(!d){return o(Error("A valid control or component, and a valid variant/ID combination are required"))}return p.waitForVMControlInit(d).then(function(){return p.updateCurrentVariant({variantManagementReference:d,newVariantReference:a.variantReference,appComponent:c})}).catch(function(r){e.error(r);throw r})},attachVariantApplied:function(e){var r=e.selector.id&&sap.ui.getCore().byId(e.selector.id)||e.selector;var t=i.getAppComponentForControl(r);var n=t.getModel(i.VARIANT_MODEL_NAME);n.attachVariantApplied({vmControlId:e.vmControlId,control:r,callback:e.callback,callAfterInitialVariant:e.callAfterInitialVariant})},detachVariantApplied:function(e){var r=e.selector.id&&sap.ui.getCore().byId(e.selector.id)||e.selector;var t=i.getAppComponentForControl(r);var n=t.getModel(i.VARIANT_MODEL_NAME);n.detachVariantApplied(e.vmControlId,r.getId())}};return l});