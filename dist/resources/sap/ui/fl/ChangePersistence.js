/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_union","sap/base/util/includes","sap/base/util/merge","sap/base/util/UriParameters","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/apply/_internal/flexObjects/FlexObject","sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory","sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/registry/Settings","sap/ui/fl/write/_internal/condenser/Condenser","sap/ui/fl/write/_internal/Storage","sap/ui/fl/write/api/Version","sap/ui/fl/Cache","sap/ui/fl/Change","sap/ui/fl/LayerUtils","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/model/json/JSONModel","sap/ui/performance/Measurement"],function(e,t,n,a,r,i,s,o,h,l,g,c,p,u,f,d,C,m,y,_,v,D,S,b,E,I){"use strict";var M=function(e){this._mComponent=e;this._mChanges=c.createEmptyDependencyMap();this._bChangesMapCreated=false;this._mChangesInitial=n({},this._mChanges);if(!this._mComponent||!this._mComponent.name){r.error("The Control does not belong to an SAPUI5 component. Personalization and changes for this control might not work as expected.");throw new Error("Missing component name.")}this._aDirtyChanges=[];this._oMessagebundle=undefined;this._mChangesEntries={};this._bHasChangesOverMaxLayer=false;this.HIGHER_LAYER_CHANGES_EXIST="higher_layer_changes_exist"};function F(e,t){var n;if(t instanceof v||t instanceof l){n=t;this._mChangesEntries[n.getId()]=n}else{if(!this._mChangesEntries[t.fileName]){if(t.changeType==="codeExt"){this._mChangesEntries[t.fileName]=g.createFromFileContent(t)}else{this._mChangesEntries[t.fileName]=new v(t)}}n=this._mChangesEntries[t.fileName];n.setState(v.states.PERSISTED)}return n}M.prototype.getComponentName=function(){return this._mComponent.name};M.prototype.getCacheKey=function(e){return _.getCacheKey(this._mComponent,e)};function O(e){var t;var n;var a;var r;if(e instanceof v){var i=e;t=i.getFileType();a=i.getVariantReference();r=i.getSelector()&&i.getSelector().id}else{var s=e;t=s.fileType;n=s.variantManagementReference;a=s.variantReference;r=s.selector&&s.selector.id}var o=false;if(t==="ctrl_variant"||t==="ctrl_variant_change"||t==="ctrl_variant_management_change"){o=n||a||r}return t==="change"||o}M.prototype.getChangesForComponent=function(e,t){return b.getUShellService("URLParsing").then(function(n){this._oUShellURLParsingService=n;return _.getChangesFillingCache(this._mComponent,e,t)}.bind(this)).then(function(e,t){var a=n({},t);var r=e&&e.component&&b.getAppComponentForControl(e.component);var i=f.isStorageResponseFilled(a.changes);if(!i){return[]}var s=a.changes.changes;if(!this._oMessagebundle&&a.messagebundle&&r){if(!r.getModel("i18nFlexVendor")){if(s.some(function(e){return e.layer===S.VENDOR})){this._oMessagebundle=a.messagebundle;var o=new E(this._oMessagebundle);r.setModel(o,"i18nFlexVendor")}}}var h=e&&e.currentLayer;var l=!(e&&e.ignoreMaxLayerParameter);var g=function(){return true};if(h){s=D.filterChangeOrChangeDefinitionsByCurrentLayer(s,h)}else if(D.isLayerFilteringRequired(this._oUShellURLParsingService)&&l){g=L.bind(this);s=s.filter(g)}else if(this._bHasChangesOverMaxLayer&&!l){this._bHasChangesOverMaxLayer=false;return this.HIGHER_LAYER_CHANGES_EXIST}var c=a.changes&&e&&e.includeCtrlVariants;var p=this._getAllCtrlVariantChanges(a,c,g);s=s.concat(p);return this._checkAndGetChangeInstances(s,a)}.bind(this,e))};M.prototype._checkAndGetChangeInstances=function(e,t){return e.filter(O).map(F.bind(this,t))};function L(e){if(D.isOverMaxLayer(x(e),this._oUShellURLParsingService)){if(!this._bHasChangesOverMaxLayer){this._bHasChangesOverMaxLayer=true}return false}return true}function x(e){var t;if(typeof e.isA==="function"&&(e.isA("sap.ui.fl.apply._internal.flexObjects.FlVariant")||e.isA("sap.ui.fl.Change"))){t=e.getLayer()}else{t=e.layer}return t}M.prototype._getAllCtrlVariantChanges=function(e,t,n){if(!t){return p.getInitialChanges({reference:this._mComponent.name})}return["variants","variantChanges","variantDependentControlChanges","variantManagementChanges"].reduce(function(t,n){if(e.changes[n]){return t.concat(e.changes[n])}return t},[]).filter(n)};M.prototype.loadChangesMapForComponent=function(e){return this.getChangesForComponent({component:e}).then(t.bind(this));function t(t){I.start("fl.createDependencyMap","Measurement of creating initial dependency map");this._mChanges=c.createEmptyDependencyMap();t.forEach(this.addChangeAndUpdateDependencies.bind(this,e));this._mChangesInitial=n({},this._mChanges);I.end("fl.createDependencyMap","Measurement of creating initial dependency map");this._bChangesMapCreated=true;return this.getChangesMapForComponent.bind(this)}};M.prototype.getOpenDependentChangesForControl=function(e,t){return c.getOpenDependentChangesForControl(this._mChanges,i.getControlIdBySelector(e,t),t)};function A(e){var t=n({},this._mChangesInitial.mDependencies);return t[e.getId()]}function R(e,n,a,r){var s;var o=[];e.controlsDependencies.forEach(function(e){if(!i.bySelector(e,a)){s=i.getControlIdBySelector(e,a);o.push(e);this._mChanges.mControlsWithDependencies[s]=this._mChanges.mControlsWithDependencies[s]||[];if(!t(this._mChanges.mControlsWithDependencies[s],r.getId())){this._mChanges.mControlsWithDependencies[s].push(r.getId())}}}.bind(this));e.dependencies=n;e.controlsDependencies=o;if(n.length||o.length){this._mChanges.mDependencies[r.getId()]=e}}M.prototype.copyDependenciesFromInitialChangesMapSync=function(e,t,n){var a=A.call(this,e);if(a){var r=[];a.dependencies.forEach(function(n){if(t(n)){this._mChanges.mDependentChangesOnMe[n]=this._mChanges.mDependentChangesOnMe[n]||[];this._mChanges.mDependentChangesOnMe[n].push(e.getId());r.push(n)}}.bind(this));R.call(this,a,r,n,e)}return this._mChanges};M.prototype.copyDependenciesFromInitialChangesMap=function(e,t,n){var a=A.call(this,e);if(a){var r=[];return a.dependencies.reduce(function(n,a){return n.then(function(){return t(a)}).then(function(t){if(t){this._mChanges.mDependentChangesOnMe[a]=this._mChanges.mDependentChangesOnMe[a]||[];this._mChanges.mDependentChangesOnMe[a].push(e.getId());r.push(a)}}.bind(this))}.bind(this),Promise.resolve()).then(function(){R.call(this,a,r,n,e);return this._mChanges}.bind(this))}return Promise.resolve(this._mChanges)};M.prototype.addChangeAndUpdateDependencies=function(e,t,n){t.setInitialApplyState();if(n){c.insertChange(t,this._mChanges,n)}c.addChangeAndUpdateDependencies(t,e,this._mChanges)};M.prototype._addRunTimeCreatedChangeAndUpdateDependencies=function(e,t){c.addRuntimeChangeAndUpdateDependencies(t,e,this._mChanges,this._mChangesInitial)};M.prototype.getChangesMapForComponent=function(){return this._mChanges};M.prototype.getAllUIChanges=function(t){var n=e(this.getChangesMapForComponent().aChanges,t.includeDirtyChanges&&this.getDirtyChanges()).filter(function(e){return Boolean(e)&&e.getFileType()==="change"&&D.compareAgainstCurrentLayer(e.getLayer(),t.layer)===0});return n};M.prototype.isChangeMapCreated=function(){return this._bChangesMapCreated};M.prototype.getChangesForView=function(e){return this.getChangesForComponent(e).then(function(t){return t.filter(h.filterChangeByView.bind(undefined,e))})};M.prototype.addChange=function(e,t){var n=this.addDirtyChange(e);this._addRunTimeCreatedChangeAndUpdateDependencies(t,n);this._mChangesEntries[n.getId()]=n;this._addPropagationListener(t);return n};M.prototype.addDirtyChange=function(e){var t;if(typeof e.isA==="function"&&(e.isA("sap.ui.fl.Change")||e.isA("sap.ui.fl.apply._internal.flexObjects.FlexObject"))){t=e}else{t=new v(e)}if(this._aDirtyChanges.indexOf(t)===-1){this._aDirtyChanges.push(t)}return t};M.prototype._addPropagationListener=function(e){var t=b.getAppComponentForControl(e);if(t instanceof s){var n=function(e){return!e._bIsSapUiFlFlexControllerApplyChangesOnControl};var a=t.getPropagationListeners().every(n);if(a){var r=sap.ui.require("sap/ui/fl/FlexControllerFactory");var i=r.create(this.getComponentName());var h=o.applyAllChangesForControl.bind(o,this.getChangesMapForComponent.bind(this),t,i);h._bIsSapUiFlFlexControllerApplyChangesOnControl=true;t.addPropagationListener(h)}}};M.prototype._deleteNotSavedChanges=function(e,t,n){e.filter(function(e){return!t.some(function(t){return e.getId()===t.getId()})}).forEach(function(e){if(n){this.removeChange(e);_.deleteChange(this._mComponent,e.convertToFileContent())}else{this.deleteChange(e)}}.bind(this))};function T(e,t){var n=e.map(function(e){return e[t]()});var a=n.filter(function(e,t,n){return n.indexOf(e)===t});return a.length===1}function U(e,t,n){var r=false;if(!e||t.length<2||!T(t,"getLayer")){return false}if(n){r=true}else{var i=t[0].getLayer();if([S.CUSTOMER,S.USER].includes(i)){r=true}}var s=a.fromURL(window.location.href);if(s.has("sap-ui-xx-condense-changes")){r=s.get("sap-ui-xx-condense-changes")==="true"}return r}function N(e){var t=d.getInstanceOrUndef()&&d.getInstanceOrUndef().isCondensingEnabled();if(t&&!T(e,"getNamespace")){t=false}return t}function P(e,t,n,a){this._massUpdateCacheAndDirtyState(t,n);this._deleteNotSavedChanges(e,t,a)}function V(e,t,n,a){if(!e.length&&!n){return[]}var r=this._mChanges.aChanges.filter(function(e){if(a===S.CUSTOMER&&t){return e.getState()===v.states.PERSISTED&&t.includes(e.getId())}return e.getState()===v.states.PERSISTED&&D.compareAgainstCurrentLayer(e.getLayer(),a)===0});return r.concat(e)}function w(e){if(e.length){var t=j(e);var n=q(e);return n.length===1&&t.length===1&&n[0]===v.states.NEW}return true}M.prototype.saveDirtyChanges=function(e,t,n,a,r,i,s){var o=n||this._aDirtyChanges;var h=o.length&&o[0].getLayer()||s;var l=V.call(this,o,r,i,h);var g=N(l)&&U(e,l,i);var c=g?l:o;var p=c.slice(0);var u=j(o);if(w(o)){var f=Promise.resolve(p);if(U(e,p,i)){f=C.condense(e,p)}return f.then(function(e){var n=u[0];if(g){return m.condense({allChanges:c,condensedChanges:e,layer:h,transport:n,isLegacyVariant:false,parentVersion:a}).then(function(n){P.call(this,c,e,t,true);return n}.bind(this))}if(e.length){return m.write({layer:h,flexObjects:B(e),transport:n,isLegacyVariant:false,parentVersion:a}).then(function(n){P.call(this,c,e,t);return n}.bind(this))}this._deleteNotSavedChanges(c,e)}.bind(this))}return this.saveSequenceOfDirtyChanges(o,t,a)};M.prototype.saveSequenceOfDirtyChanges=function(e,t,n){var a;if(n){var r=e.filter(function(e){return e.getState()===v.states.NEW});a=[].concat(r).shift()}return e.reduce(function(e,r){return e.then(H.bind(undefined,r,a,n)).then(this._updateCacheAndDirtyState.bind(this,r,t))}.bind(this),Promise.resolve())};function H(e,t,n){switch(e.getState()){case v.states.NEW:if(n!==undefined){n=e===t?n:y.Number.Draft}return m.write({layer:e.getLayer(),flexObjects:[e.convertToFileContent()],transport:e.getRequest(),parentVersion:n});case v.states.DELETED:return m.remove({flexObject:e.convertToFileContent(),layer:e.getLayer(),transport:e.getRequest(),parentVersion:n});default:}}M.prototype._updateCacheAndDirtyState=function(e,t){this._aDirtyChanges=this._aDirtyChanges.filter(function(t){return e.getId()!==t.getId()});if(!t){if(b.isChangeRelatedToVariants(e)){p.updateVariantsState({reference:this._mComponent.name,changeToBeAddedOrDeleted:e})}else{switch(e.getState()){case v.states.NEW:e.setState(v.states.PERSISTED);_.addChange(this._mComponent,e.convertToFileContent());break;case v.states.DELETED:_.deleteChange(this._mComponent,e.convertToFileContent());break;case v.states.DIRTY:e.setState(v.states.PERSISTED);_.updateChange(this._mComponent,e.convertToFileContent());break}}}};M.prototype._massUpdateCacheAndDirtyState=function(e,t){e.forEach(function(e){this._updateCacheAndDirtyState(e,t)},this)};function j(e){var t=[];e.forEach(function(e){var n=e.getRequest();if(t.indexOf(n)===-1){t.push(n)}});return t}function q(e){var t=[];e.forEach(function(e){var n=e.getState();if(t.indexOf(n)===-1){t.push(n)}});return t}function B(e){var t=[];e.forEach(function(e){t.push(e.convertToFileContent())});return t}M.prototype.getDirtyChanges=function(){return this._aDirtyChanges};M.prototype.deleteChange=function(e,t){var n=this._aDirtyChanges.indexOf(e);if(n>-1){if(e.getState()===v.states.DELETED){return}this._aDirtyChanges.splice(n,1);this._deleteChangeInMap(e,t);return}e.markForDeletion();this.addDirtyChange(e);this._deleteChangeInMap(e,t)};M.prototype.removeChange=function(e){var t=this._aDirtyChanges.indexOf(e);if(t>-1){this._aDirtyChanges.splice(t,1)}this._deleteChangeInMap(e)};M.prototype._deleteChangeInMap=function(e,t){var n=e.getId();c.removeChangeFromMap(this._mChanges,n);c.removeChangeFromDependencies(t?this._mChangesInitial:this._mChanges,n)};function W(e,t){return(t.getRequest()==="$TMP"||t.getRequest()==="")&&t.getLayer()===e}function k(e,t){return t.getState()===v.states.PERSISTED&&t.getLayer()===e}function G(){var e=[];var t=u.getCompVariantsMap(this.getComponentName());for(var n in t){for(var a in t[n].byId){e.push(t[n].byId[a])}}return e}M.prototype.transportAllUIChanges=function(e,t,n,a){return this.getChangesForComponent({currentLayer:n,includeCtrlVariants:true}).then(function(r){var i=G.call(this);r=r.concat(i.filter(W.bind(this,n)));return m.publish({transportDialogSettings:{rootControl:e,styleClass:t},layer:n,reference:this.getComponentName(),localChanges:r,appVariantDescriptors:a})}.bind(this))};M.prototype._getChangesFromMapByNames=function(e){return this._mChanges.aChanges.filter(function(t){return e.indexOf(t.getId())!==-1})};M.prototype.removeDirtyChanges=function(e,t,n,a,r){var s=[].concat(e||[]);var o=this._aDirtyChanges;var h=o.filter(function(e){var o=true;if(s.length&&!s.includes(e.getLayer())){return false}if(a&&e.getSupportInformation().generator!==a){return false}if(n){var h=e.getSelector();o=n.getId()===i.getControlIdBySelector(h,t)}if(r){o=o&&r.indexOf(e.getChangeType())!==-1}return o});h.forEach(function(e){var t=o.indexOf(e);o.splice(t,1)});return Promise.resolve(h)};M.prototype.resetChanges=function(e,t,n,a){var r=n&&n.length>0;var i=a&&a.length>0;var s=d.getInstanceOrUndef()&&d.getInstanceOrUndef().isPublicLayerAvailable();var o=t===undefined&&n===undefined&&a===undefined;var h=[];if(s&&o){h=G.call(this).filter(k.bind(this,e))}return this.getChangesForComponent({currentLayer:e,includeCtrlVariants:true}).then(function(s){s=s.concat(h);var o={reference:this.getComponentName(),layer:e,changes:s};if(t){o.generator=t}if(r){o.selectorIds=n}if(i){o.changeTypes=a}return m.reset(o)}.bind(this)).then(function(e){var t=[];if(n||a){var r=[];if(e&&e.response&&e.response.length>0){e.response.forEach(function(e){r.push(e.fileName)})}_.removeChanges(this._mComponent,r);t=this._getChangesFromMapByNames(r)}return t}.bind(this))};return M});