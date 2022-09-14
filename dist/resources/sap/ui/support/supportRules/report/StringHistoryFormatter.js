/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var n=Array(196).join("-"),e="|";function r(n,e){var r="",n=n||"";if(!e){e=50}r=n.replace(/(\r\n|\n|\r)/gm," ").replace(/(\")/gm,"");if(r.length>e){r=r.substring(0,e-3)+"..."}else{while(r.length<e){r+=" "}}return r}function i(i){if(i.issues.length){var s=n+"\n";s+=e+r("rule id: "+i.id,193)+e+"\n";s+=e+r("name: "+i.name,193)+e+"\n";s+=e+r("library: "+i.library,193)+e+"\n";s+=e+r("categories: "+i.categories.join(", "),193)+e+"\n";s+=e+r("audiences: "+i.audiences.join(", "),193)+e+"\n";s+=e+r("description: "+i.description,193)+e+"\n";s+=e+r("resolution: "+i.resolution,193)+e+"\n";s+=n+"\n";s+=e+r("id",50);s+=e+r("class name",30);s+=e+r("status",10);s+=e+r("details",100);s+=e+"\n";s+=n+"\n";for(var t=0;t<i.issues.length;t++){s+=e+r(i.issues[t].context.id,50);s+=e+r(i.issues[t].context.className,30);s+=e+r(i.issues[t].severity,10);s+=e+r(i.issues[t].details,100);s+=e+"\n"}s+=n+"\n";return s}return""}function s(n){var e="";if(!n){return e}for(var r in n){if(n[r].issueCount){for(var s in n[r]["rules"]){e+=i(n[r]["rules"][s])}e+="\n"}}e+="\n";return e}function t(n){var e="Rule Preset / ID : ";if(n){e+=n.title+" / "+n.id}else{e+="none"}return e}function u(n){var e="";if(!n){return e}for(var r=0;r<n.length;r++){e+="\n";e+="Run "+(r+1)+" - executed on "+n[r].analysisInfo.date+"\n";e+=t(n[r].analysisInfo.rulePreset);e+="\n";e+=s(n[r].loadedLibraries);e+="\n"}return e}return{format:u}},true);