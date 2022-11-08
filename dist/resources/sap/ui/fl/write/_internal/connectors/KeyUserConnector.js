/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/Layer","sap/ui/fl/write/_internal/connectors/BackendConnector","sap/ui/fl/initial/_internal/connectors/KeyUserConnector","sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/base/util/restricted/_pick","sap/ui/fl/write/_internal/FlexInfoSession"],function(e,n,t,r,s,a,i,o){"use strict";var u="/flex/keyuser";var l=e({},t,{layers:[n.CUSTOMER,n.PUBLIC],ROUTES:{CHANGES:u+r.API_VERSION+"/changes/",SETTINGS:u+r.API_VERSION+"/settings",TOKEN:u+r.API_VERSION+"/settings",VERSIONS:{GET:u+r.API_VERSION+"/versions/",ACTIVATE:u+r.API_VERSION+"/versions/activate/",DISCARD:u+r.API_VERSION+"/versions/draft/"},TRANSLATION:{UPLOAD:u+r.API_VERSION+"/translation/texts",DOWNLOAD:u+r.API_VERSION+"/translation/texts/",GET_SOURCELANGUAGE:u+r.API_VERSION+"/translation/sourcelanguages/"},CONTEXTS:u+r.API_VERSION+"/contexts/"},isLanguageInfoRequired:true,loadFeatures:function(e){return t.loadFeatures.call(l,e).then(function(e){e.isContextSharingEnabled=true;return e})},getContexts:function(e){var n=["type","$skip","$filter"];var t=i(e,n);var a=s.getUrl(l.ROUTES.CONTEXTS,e,t);return s.sendRequest(a,"GET",{initialConnector:r}).then(function(e){return e.response})},loadContextDescriptions:function(e){var n={};s.addLanguageInfo(n);c(e);var t=s.getUrl(l.ROUTES.CONTEXTS,e,n);e.payload=JSON.stringify(e.flexObjects);e.dataType="json";e.contentType="application/json; charset=utf-8";return a.sendRequest(t,"POST",e)},isContextSharingEnabled:function(){return Promise.resolve(true)},getFlexInfo:function(e){return o.get(e.selector)||{}}});function c(e){e.initialConnector=r;e.tokenUrl=l.ROUTES.TOKEN}function S(e){var n={title:e.title};e.payload=JSON.stringify(n);e.dataType="json";e.contentType="application/json; charset=utf-8"}function T(e){e.version=e.versionNumber.toString();delete e.versionNumber;return e}l.versions={load:function(e){c(e);var n={};s.addLanguageInfo(n);n.limit=e.limit;var t=s.getUrl(l.ROUTES.VERSIONS.GET,e,n);return s.sendRequest(t,"GET",e).then(function(e){return e.response.versions.map(function(e){return T(e)})})},activate:function(e){c(e);S(e);var n={version:e.version};s.addLanguageInfo(n);var t=s.getUrl(l.ROUTES.VERSIONS.ACTIVATE,e,n);return a.sendRequest(t,"POST",e).then(function(e){var n=e.response;return T(n)})},discardDraft:function(e){c(e);var n=s.getUrl(l.ROUTES.VERSIONS.DISCARD,e);return a.sendRequest(n,"DELETE",e)}};l.translation={getTexts:function(e){c(e);var n=i(e,["sourceLanguage","targetLanguage"]);var t=s.getUrl(l.ROUTES.TRANSLATION.DOWNLOAD,e,n);return s.sendRequest(t,"GET",e).then(function(e){return e.response})},getSourceLanguages:function(e){c(e);var n={};var t=s.getUrl(l.ROUTES.TRANSLATION.GET_SOURCELANGUAGE,e,n);return s.sendRequest(t,"GET",e).then(function(e){return e&&e.response&&e.response.sourceLanguages?e.response.sourceLanguages:[]})},postTranslationTexts:function(e){c(e);var n=s.getUrl(l.ROUTES.TRANSLATION.UPLOAD,e,{});return s.sendRequest(n,"POST",e)}};l.initialConnector=r;return l});