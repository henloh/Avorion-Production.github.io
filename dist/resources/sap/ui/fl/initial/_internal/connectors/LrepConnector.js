/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/Utils","sap/ui/dom/includeScript","sap/base/util/restricted/_pick"],function(e,i,t,n){"use strict";var s={DATA:"/flex/data/",MODULES:"/flex/modules/"};return{layers:["ALL"],xsrfToken:undefined,settings:undefined,_loadModules:function(e){return new Promise(function(i,n){t(e,undefined,i,n)})},_addClientInfo:function(e){var t=i.getUrlParameter("sap-client");if(!e&&t){e={}}if(t){e["sap-client"]=t}},loadFlexData:function(i){if(i.cacheKey==="<NO CHANGES>"){return Promise.resolve()}var t=n(i,["version","allContexts"]);this._addClientInfo(t);e.addSAPLogonLanguageInfo(t);var a;if(i.appDescriptor&&i.appDescriptor["sap.app"]){a=i.appDescriptor["sap.app"].id}if(i.preview){i.reference=i.preview.reference;t.upToLayerType=i.preview.maxLayer}var r=e.getUrl(s.DATA,i,t);return e.sendRequest(r,"GET",{xsrfToken:this.xsrfToken,siteId:i.siteId,sAppDescriptorId:a}).then(function(n){var a=n.response;if(n.xsrfToken){this.xsrfToken=n.xsrfToken}if(n.etag){a.cacheKey=n.etag}else if(i.cacheKey){a.cacheKey=i.cacheKey}a.changes=a.changes.concat(a.compVariants||[]);if(a.settings){this.settings=a.settings;this.settings.isVariantAdaptationEnabled=!!this.settings.isPublicLayerAvailable}if(!a.loadModules){return a}var r=e.getUrl(s.MODULES,i,t);return this._loadModules(r).then(function(){return a})}.bind(this))}}});