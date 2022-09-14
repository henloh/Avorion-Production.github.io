/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/extend","sap/base/util/ObjectPath","sap/ui/VersionInfo","sap/ui/support/supportRules/RuleSet","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/RuleSerializer","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/util/EvalUtils","sap/ui/support/supportRules/util/Utils","sap/ui/thirdparty/jquery"],function(e,t,r,u,i,a,s,n,l,o,p,c){"use strict";var f=function(){var e;return function(t){if(!e){e=document.createElement("a")}e.href=t;return e.href.replace(/\/$/,"")}}();var R="sprt";var h=sap.ui.require.toUrl("sap/ui/support");var S=h.replace("/sap/ui/support","");var b=f(S);var _={};_._mRuleSets={};_.getRuleSets=function(){return this._mRuleSets};_.addRuleSet=function(e,t){this._mRuleSets[e]=t};_.getRuleSet=function(e){return this._mRuleSets[e]};_._fetchSupportRuleSets=function(e,t){var r=this,l=t||sap.ui.getCore().getLoadedLibraries(),o=this._fetchLibraryNamesWithSupportRules(l);var p=new Promise(function(t){u.load({library:"sap.ui.core"}).then(function(u){i.versionInfo=u;o.then(function(u){var l=r._fetchLibraryFiles(u,_._fetchRuleSet);Promise.all(l).then(function(){r._bRulesCreated=true;a.publish(s.UPDATE_SUPPORT_RULES,{sRuleSet:n.serialize(r._mRuleSets),oVersionInfo:i.versionInfo});t();if(e&&typeof e==="function"){e()}})})})});return p};_.loadAdditionalRuleSets=function(e){var t=this,r=t._fetchLibraryFiles(e,t._fetchRuleSet);Promise.all(r).then(function(){t._bRulesCreated=true;a.publish(s.UPDATE_SUPPORT_RULES,{sRuleSet:n.serialize(t._mRuleSets)})})};_._fetchLibraryNamesWithSupportRules=function(e){return new Promise(function(t){p.canLoadInternalRulesAsync().then(function(r){var u={publicRules:[],internalRules:[],allRules:[]};e=e||{};var i=[];Object.keys(e).forEach(function(e){var t=new Promise(function(t){var r=b+"/"+e.replace(/\./g,"/")+"/.supportrc";c.ajax({type:"GET",dataType:"json",url:r,success:function(r){t({lib:e,rcData:r})},error:function(){t({lib:e,rcData:null})}})});i.push(t)});Promise.all(i).then(function(e){e.forEach(function(e){if(e.rcData){var i=false;if(e.rcData.publicRules){u.publicRules.push(e.lib);i=true}if(r&&e.rcData.internalRules){u.internalRules.push(e.lib);i=true}if(i&&u.allRules.indexOf(e.lib)<0){u.allRules.push(e.lib)}}t(u)})})})})};_._fetchLibraryFiles=function(e,t,r){var u=[],i=this,n=sap.ui.require.toUrl("sap/ui/support"),l=n.replace("sap/ui/support",""),o=p.canLoadInternalRules(),c=o&&e.internalRules.length>0,f=0,R=e.publicRules.length;var h=sap.ui.getCore().getConfiguration().getSupportMode();var S=h&&h.indexOf("silent")>-1;if(c){R+=e.internalRules.length}function b(){f+=1;var e=Math.ceil(f/R*100);a.publish(s.CURRENT_LOADING_PROGRESS,{value:e})}if(e.publicRules.length>0){e.publicRules.forEach(function(e){var a=i._registerLibraryPath(e,n,l);if(a){var s=i._requireRuleSet(a.customizableLibName,t);if(!S&&!r){s.then(function(){b()})}u.push(s)}})}if(o&&e.internalRules.length>0){e.internalRules.forEach(function(e){var a=i._registerLibraryPath(e,n,l);if(a){var s=i._requireRuleSet(a.internalLibName,t);if(!S&&!r){s.then(function(){b()})}u.push(s)}})}return u};_._registerLibraryPath=function(e,t,r){if(this._mRuleSets[e]){return null}var u=e.replace(/\./g,"/");var i=u;var a=this._getLoadFromSupportOrigin();var s={};if(a){i+="/"+R;s[i]=r+u}var n=i+"/internal";var l=r.replace("resources/","")+"test-resources/"+u+"/internal";s[n]=l;sap.ui.loader.config({paths:s});return{internalLibName:n.replace(/\//g,"."),customizableLibName:i.replace(/\//g,".")}};_._requireRuleSet=function(e,t){var r=this;return new Promise(function(u){try{sap.ui.require([e.replace(/\./g,"/")+"/library.support"],function(){t.call(r,e);u()},u)}catch(e){u()}})};_._fetchRuleSet=function(u){try{var a,s,n,o=r.get(u).library.support;if(!o){throw"The library.support file was not fetched successfully."}a=u.replace("."+R,"").replace(".internal","");s=t({},o);n=this._mRuleSets[a];if(!(s.ruleset instanceof i)){s=this._createRuleSet(s)}if(n){n.ruleset._mRules=t(n.ruleset._mRules,s.ruleset._mRules)}else{n=s}this._mRuleSets[a]=n}catch(t){e.error("["+l.SUPPORT_ASSISTANT_NAME+"] Failed to load RuleSet for "+u+" library",t)}};_._getLoadFromSupportOrigin=function(){var e=new URL(sap.ui.require.toUrl("sap/ui/core"),document.baseURI);var t=new URL(sap.ui.require.toUrl("sap/ui/support"),document.baseURI);return e.origin!==t.origin};_.fetchNonLoadedRuleSets=function(e){u.load().then(function(e){var t={};e.libraries.forEach(function(e){t[e.name]=e});return this._fetchLibraryNamesWithSupportRules(t)}.bind(this)).then(function(t){var r=[];t.allRules.forEach(function(t){if(e.indexOf(t)<0){r.push(t)}});a.publish(s.POST_AVAILABLE_LIBRARIES,{libNames:r})})};_._onLibraryChanged=function(e){var t=this;if(e.getParameter("stereotype")==="library"&&_._bRulesCreated){t._oMainPromise=_._fetchSupportRuleSets()}};_.updateRuleSets=function(e){this._oMainPromise=_._fetchSupportRuleSets(e)};_._createRuleSet=function(e){var t={name:e.name,niceName:e.niceName};var r=new i(t);for(var u=0;u<e.ruleset.length;u++){var a=e.ruleset[u];if(Array.isArray(a)){for(var s=0;s<a.length;s++){r.addRule(a[s])}}else{r.addRule(a)}}return{lib:t,ruleset:r}};_.getAllRules=function(){var e={};Object.keys(this._mRuleSets).map(function(r){e=t(e,this._mRuleSets[r].ruleset.getRules())},this);return e};_.getAllRuleDescriptors=function(){var e=this.getAllRules();return Object.keys(e).map(function(t){return{libName:e[t].libName,ruleId:t}})};if(o.isEvalAllowed()){_.addRuleSet(l.TEMP_RULESETS_NAME,{lib:{name:l.TEMP_RULESETS_NAME},ruleset:new i({name:l.TEMP_RULESETS_NAME})})}return _},true);