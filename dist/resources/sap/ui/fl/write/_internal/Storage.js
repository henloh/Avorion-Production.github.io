/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/write/_internal/StorageFeaturesMerger","sap/ui/fl/apply/_internal/flexObjects/States","sap/base/util/ObjectPath"],function(e,n,t,r){"use strict";var a="sap/ui/fl/write/_internal/connectors/";function i(){return e.getConnectors(a,false)}function o(e,n){var t=n.filter(function(n){return n.layers.indexOf("ALL")!==-1||n.layers.indexOf(e)!==-1});if(t.length===1){return t[0]}if(t.length===0){throw new Error("No Connector configuration could be found to write into layer: "+e)}if(t.length>1){throw new Error("sap.ui.core.Configuration 'flexibilityServices' has a misconfiguration: Multiple Connector configurations were found to write into layer: "+e)}}function u(n){var t=n.map(function(n){return n.writeConnectorModule.loadFeatures({url:n.url}).then(function(e){return{features:e,layers:n.layers}}).catch(e.logAndResolveDefault.bind(null,{features:{},layers:n.layers},n,"loadFeatures"))});return Promise.all(t)}function s(e){if(!e){return Promise.reject("No layer was provided")}return i().then(o.bind(this,e))}function l(e){if(e.draft){return new Promise(function(n,t){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(r){r.isVersioningEnabled(e.layer).then(function(r){if(r){n()}else{t("Draft is not supported for the given layer: "+e.layer)}})})})}return Promise.resolve()}function c(e){var n;if(e.allChanges&&e.allChanges.length&&e.condensedChanges){n={namespace:e.allChanges[0].convertToFileContent().namespace,layer:e.layer,delete:{change:[]},update:{change:[]},reorder:{change:[]},create:{change:[],ctrl_variant_change:[],ctrl_variant_management_change:[]}};var r=0;var a=false;e.allChanges.forEach(function(i,o){if(i.getFileType()==="ctrl_variant"){return}var u=n.create[i.getFileType()].length;if(i.condenserState){var s=false;if(i.condenserState==="delete"){if(i.getState()===t.PERSISTED){n.delete.change.push(i.getId())}r++}else if(e.condensedChanges.length){s=e.allChanges[o].getId()!==e.condensedChanges[o-r].getId()}if((i.condenserState==="select"||i.condenserState==="update")&&s&&!a){var l=e.condensedChanges.slice(o-r).map(function(e){return e.getId()});n.reorder.change=l;a=true}if(i.condenserState==="select"&&i.getState()===t.NEW){n.create.change[u]={};n.create.change[u][i.getId()]=i.convertToFileContent()}else if(i.condenserState==="update"){var c=n.update.change.length;n.update.change[c]={};n.update.change[c][i.getId()]={content:i.getContent()}}delete i.condenserState}else if(i.getState()===t.NEW){n.create[i.getFileType()][u]={};n.create[i.getFileType()][u][i.getId()]=i.convertToFileContent()}})}return n}function d(e,n){return l(n).then(s.bind(undefined,n.layer)).then(function(t){n.url=t.url;var a=r.get(e,t.writeConnectorModule);return a.call(t.writeConnectorModule,n)})}var f={};f.write=function(e){return d("write",e)};f.condense=function(e){e.flexObjects=c(e);if(!e.flexObjects){return Promise.reject("No changes were provided")}return d("condense",e)};f.remove=function(e){return d("remove",e)};f.update=function(e){return d("update",e)};f.reset=function(e){return d("reset",e)};f.getFlexInfo=function(e){return d("getFlexInfo",e)};f.getContexts=function(e){return d("getContexts",e)};f.loadContextDescriptions=function(e){return d("loadContextDescriptions",e)};f.isContextSharingEnabled=function(e){return d("isContextSharingEnabled",e)};f.loadFeatures=function(){return i().then(u).then(n.mergeResults)};f.publish=function(e){return d("publish",e)};f.versions={load:function(e){return i().then(d.bind(undefined,"versions.load",e))},activate:function(e){return i().then(d.bind(undefined,"versions.activate",e))},discardDraft:function(e){return i().then(d.bind(undefined,"versions.discardDraft",e))},publish:function(e){return i().then(d.bind(undefined,"versions.publish",e))}};f.translation={getSourceLanguages:function(e){return i().then(d.bind(undefined,"translation.getSourceLanguages",e))},getTexts:function(e){return i().then(d.bind(undefined,"translation.getTexts",e))},postTranslationTexts:function(e){return i().then(d.bind(undefined,"translation.postTranslationTexts",e))}};return f});