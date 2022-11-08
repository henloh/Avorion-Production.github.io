/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState","sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/LayerUtils","sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/Utils"],function(e,t,r,n,a,i,o,l,c,s,f,u){"use strict";var p={};function g(e){e.reference=r.getFlexReferenceForControl(e.selector);return t.initialize({componentId:e.componentId||u.getAppComponentForControl(e.selector).getId(),reference:e.reference,componentData:{},manifest:{}})}function C(e){var r=t.getCompVariantsMap(e.reference);var n=[];if(e.invalidateCache){var a=t.getInitialNonFlCompVariantData(e.reference);if(a){Object.keys(a).forEach(function(e){r._initialize(e,a[e].variants);o.merge(e,r[e],a[e].standardVariant)})}}for(var i in r){var l=r[i];for(var c in l.byId){n.push(l.byId[c])}}return s.filterChangeOrChangeDefinitionsByCurrentLayer(n,e.currentLayer)}function h(e){var t=r.getFlexReferenceForControl(e.selector);return i.persistAll(t)}function y(e){if(!e.reference){var t=a.getAppComponentForSelector(e.selector);e.reference=r.getFlexReferenceForControl(t)}return c.getChangePersistenceForComponent(e.reference)}function v(e,t){var r=u.getAppComponentForControl(t);var n=r.getModel(u.VARIANT_MODEL_NAME);var a=n&&n.sFlexReference;var i=l.getVariantManagementReferences(a);if(i.length===0){return e}var o=i.map(function(e){return n.getCurrentVariantReference(e)});return e.filter(function(e){return o.some(function(t){return e.getVariantReference()===t||!e.getVariantReference()})})}function m(t){var r=y(t);return r.getChangesForComponent(e(t,["invalidateCache","selector"]),t.invalidateCache).then(function(e){var n=[];if(t.includeDirtyChanges){n=r.getDirtyChanges()}var a=e.concat(n);if(t.onlyCurrentVariants){return v(a,t.selector)}return a})}function F(e,t){var r=a.getFlexControllerInstance(e.selector);var n=a.getDescriptorFlexControllerInstance(e.selector);return r.saveAll(t,e.skipUpdateCache,e.draft,e.layer,e.removeOtherLayerChanges,e.condenseAnyLayer).then(n.saveAll.bind(n,t,e.skipUpdateCache,e.draft,e.layer,e.removeOtherLayerChanges,e.condenseAnyLayer))}p.getFlexObjects=function(e){return g(e).then(function(){return m(e)}).then(function(t){return C(e).concat(t)})};p.getDirtyFlexObjects=function(e){e.includeDirtyChanges=true;var t=y(e);var r=t.getDirtyChanges();var a=C(e);return r.concat(a).filter(function(e){return e.getState()!==n.PERSISTED})};p.hasDirtyFlexObjects=function(e){var t=a.getAppComponentForSelector(e.selector);var n=r.getFlexReferenceForControl(t);if(c.getChangePersistenceForComponent(n).getDirtyChanges().length>0){return true}if(c.getChangePersistenceForComponent(u.normalizeReference(n)).getDirtyChanges().length>0){return true}return i.hasDirtyChanges(n)};p.saveFlexObjects=function(t){var r=a.getAppComponentForSelector(t.selector);return Promise.all([h(t),F(t,r)]).then(function(){if(t.layer){t.currentLayer=t.layer}t.componentId=r.getId();t.invalidateCache=true;return p.getFlexObjects(e(t,"skipUpdateCache"))})};return p});