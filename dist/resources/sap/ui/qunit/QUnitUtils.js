/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/qunit/QUnitUtils",["jquery.sap.global","sap/base/util/ObjectPath","sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/base/strings/camelize","sap/base/strings/capitalize","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,n,a,i,o,s){"use strict";if(typeof QUnit!=="undefined"){var u=!(parseFloat(QUnit.version)>=2);var f=o.fromQuery(window.location.search);if(u){QUnit.equals=window.equals=window.equal}var c=f.get("sap-ui-qunittimeout");if(c!=null||!("testTimeout"in QUnit.config)){if(!c||isNaN(c)){c="30000"}QUnit.config.testTimeout=parseInt(c)}if(u){QUnit.config.reorder=false}if(window["sap-ui-qunit-coverage"]!=="client"&&/x|true/i.test(f.get("coverage-report"))){QUnit.done(function(e,t){if(window._$blanket){var r=window.QUnit;window.QUnit=undefined;sap.ui.requireSync("sap/ui/thirdparty/blanket");window.QUnit=r;window.blanket.report({})}})}}e.now=function(){return Date.now()};var l={};l.delayTestStart=function(t){QUnit.config.autostart=false;if(t){window.setTimeout(function(){QUnit.start()},t)}else{e(function(){QUnit.start()})}};var v=e.noop;try{new e.Event({type:"mousedown"}).preventDefault()}catch(t){v=function(t){if(t){t.preventDefault=t.preventDefault||e.noop;t.stopPropagation=t.stopPropagation||e.noop;t.stopImmediatePropagation=t.stopImmediatePropagation||e.noop}};var g=e.Event;e.Event=function(e,t){var r=new g(e,t);v(r.originalEvent);return r};e.Event.prototype=g.prototype}function p(t,r,n){var a=e.Event({type:t});if(r!=null){a.target=r}if(n){for(var i in n){a[i]=n[i];if(i==="originalEvent"){v(a[i])}else{a.originalEvent[i]=n[i]}}}return a}l.triggerEvent=function(t,r,n){if(typeof r=="string"){r=r?document.getElementById(r):null}var a=p(t,null,n);e(r).trigger(a)};l.triggerTouchEvent=function(t,r,n,a){if(typeof r=="string"){r=r?document.getElementById(r):null}var i=p(t,r,n),o=e(r).control(0),s=(a==null?"on":a)+t;if(o&&o[s]){o[s].call(o,i)}};function d(e){if(!e){return undefined}if(!isNaN(e)){var t=Object.keys(n).filter(function(t){return n[t]===e});if(t.length===1){e=t[0]}}if(e.toLowerCase().startsWith("numpad_")){return"NUMPAD"}}function h(e){if(!isNaN(e)){e=y(e)}if(!e){return undefined}e=e.toLowerCase();e=a(e.replace(/_/g,"-"));var t=i(e);if(t.startsWith("Digit")){return t.substring("Digit".length)}else if(t.startsWith("Numpad")){t=t.substring("Numpad".length)}switch(t){case"Break":return"Pause";case"Space":return" ";case"Print":return"PrintScreen";case"Windows":return"Meta";case"Sleep":return"Standby";case"TurnOff":return"PowerOff";case"Asterisk":return"*";case"Plus":return"+";case"Minus":return"-";case"Comma":return",";case"Slash":return"/";case"OpenBracket":return";";case"Dot":return".";case"Pipe":return"|";case"Semicolon":return";";case"Equals":return"=";case"SingleQUote":return"=";case"Backslash":return"\\";case"GreatAccent":return"`";default:return t}}function y(e){for(var t in n){if(n.hasOwnProperty(t)){if(n[t]===e){return t}}}}l.triggerKeyEvent=function(e,t,r,a,i,o){var s={};var u=!isNaN(r);s.keyCode=u?r:n[r];if(u){r=y(r)}s.key=h(r);s.location=d(r);s.which=s.keyCode;s.shiftKey=!!a;s.altKey=!!i;s.metaKey=!!o;s.ctrlKey=!!o;l.triggerEvent(e,t,s)};l.triggerKeydown=function(e,t,r,n,a){l.triggerKeyEvent("keydown",e,t,r,n,a)};l.triggerKeyup=function(e,t,r,n,a){l.triggerKeyEvent("keyup",e,t,r,n,a)};l.triggerKeyboardEvent=function(e,t,r,n,a){l.triggerKeydown(e,t,r,n,a)};l.triggerKeypress=function(e,t,r,a,i){var o=t&&t.toUpperCase();if(n[o]===null){QUnit.ok(false,"Invalid character for triggerKeypress: '"+t+"'")}var s=t.charCodeAt(0);var u={};u.charCode=s;u.which=s;u.key=h(o);u.location=d(o);u.shiftKey=!!r;u.altKey=!!a;u.metaKey=!!i;u.ctrlKey=!!i;l.triggerEvent("keypress",e,u)};l.triggerCharacterInput=function(t,r,n){l.triggerKeypress(t,r);if(typeof t=="string"){t=t?document.getElementById(t):null}var a=e(t);if(typeof n!=="undefined"){a.val(n)}else{a.val(a.val()+r)}};l.triggerMouseEvent=function(e,t,r,n,a,i,o){var s={};s.offsetX=r;s.offsetY=n;s.pageX=a;s.pageY=i;s.button=o;l.triggerEvent(t,e,s)};l._removeAllWhitespaces=function(e){return e.replace(/\s/g,"")};l.triggerSelectAll=function(){document.getSelection().selectAllChildren(document.body)};l.isSelectedTextEqual=function(e){var t=l.getSelectedText();return e?e===t:!!t};l.includesSelectedText=function(e){var t=l.getSelectedText();if(!e){return!!t}if(!Array.isArray(e)){e=[e]}return e.every(function(e){return t.indexOf(e)>-1})};l.getSelectedText=function(){return l._removeAllWhitespaces(document.getSelection().toString())};var w={normal:400,bold:700};e.fn.extend({_sapTest_dataEvents:function(){var t=this[0];return t?e._data(t,"events"):null},_sapTest_cssFontWeight:function(){var e=this.css("font-weight");return e?w[e]||e:e}});(function(){function n(e){s.info(e)}var a={boolean:[false,true],int:[0,1,5,10,100],float:[NaN,0,.01,3.14,97.7],string:["","some","very long otherwise not normal and so on whatever","<"+"script>alert('XSS attack!');</"+"script>"]};var i=Object.create(a);function o(e){return e&&!(e instanceof Array)?[e]:e}l.resetDefaultTestValues=function(e){if(typeof e==="string"){delete i[e]}else{i=Object.create(a)}};l.setDefaultTestValues=function(t,r){if(typeof t==="string"){i[t]=o(r)}else if(typeof t==="object"){e.extend(i,t)}};l.createSettingsDomain=function(n,a){function s(n){if(i[n]){return i[n]}try{e.sap.require(n)}catch(e){}var a=t.get(n);if(!(a instanceof r)){var o=[];for(var s in a){o.push(a[s])}i[n]=o;return o}return[]}var n=(new n).getMetadata().getClass();var a=a||{};var u={};var f=n.getMetadata().getAllProperties();for(var c in f){u[c]=o(a[c])||s(f[c].type)}return u};l.genericTest=function(e,t,r){if(r&&r.skip===true){return}var e=(new e).getMetadata().getClass();var r=r||{};var a=l.createSettingsDomain(e,r.allPairTestValues||{});n("domain");for(var i in a){var o=a[i].length;var s=[];s.push("  ",i,":","[");for(var u=0;u<o;u++){s.push(a[i][u],",")}s.push("]");n(s.join(""))}function f(e,t){return e+t.substring(0,1).toUpperCase()+t.substring(1)}function c(e,t){var r={};for(var n in t){if(e[f("get",n)]){r[n]=e[f("get",n)]()}}return r}var v;var g;var p=new l.AllPairsGenerator(a);var d=[];while(p.hasNext()){d.push(p.next())}var h=0;function y(){n("testNextCombination("+h+")");if(h>=d.length){n("last combination -> done");QUnit.start();return}v=new e(g);var r=c(v,g);QUnit.deepEqual(r,g,"settings");v.placeAt(t);n("before explicit rerender");v.getUIArea().rerender();n("after explicit rerender");n("info");setTimeout(w,0)}QUnit.stop(15e3);y();function w(){n("continueAfterRendering("+h+")");var e=d[d.length-h-1];for(var t in e){var r=v[f("set",t)](e[t]);QUnit.equal(v[f("get",t)](),e[t],"setter for property '"+t+"'");QUnit.ok(r==v,"setter for property '"+t+"' supports chaining (after rendering)")}h=h+1;setTimeout(y,0)}};l.suppressErrors=function(e){if(e!==false){n("suppress global errors")}else{n("reenable global errors")}};l.RandomPairsGenerator=function(e){var t=0;for(var r in e){if(e[r]&&!(e[r]instanceof Array)){e[r]=[e[r]]}if(e[r]&&e[r].length>0){if(t==0){t=e[r].length}else{t=t*e[r].length}}}function n(t){var r={};for(var n in e){var a=e[n]&&e[n].length;if(a==1){r[n]=e[n][0]}else if(a>1){var i=t%a;r[n]=e[n][i];t=(t-i)/a}}return r}this.hasNext=function(){return true};this.next=function(){return n(Math.floor(100*t*Math.random()))}};l.AllPairsGenerator=function(e){var t=[];for(var r in e){t.push({name:r,n:e[r].length,values:e[r]})}var n=t.length;var a=[];var i=[];var o=0;for(var s=0;s<n-1;s++){var u=t[s];for(var f=s+1;f<n;f++){var c=t[f];i[s*n+f]=o;for(var l=u.n*c.n;l>0;l--){a[o++]=0}}}function v(e,r,a,o){return i[e*n+r]+a*t[r].n+o}function g(){var e=[];function r(r,i){var o={va:i,pairs:0,redundant:0};for(var s=0;s<n;s++){var u;if(s<r){u=a[v(s,r,e[s],i)]}else if(s>r){var f=v(r,s,i,0),c=f+t[s].n;for(u=a[f];u>0&&f<c;f++){if(a[f]<u){u=a[f]}}}o.redundant=o.redundant+u;if(u==0){o.pairs++}}return o}for(var i=0;i<n;i++){var o=t[i];var s=r(i,0);for(var u=1;u<o.n;u++){var f=r(i,u);if(f.pairs>s.pairs||f.pairs==s.pairs&&f.redundant<s.redundant){s=f}}e[i]=s.va}return e}this.hasNext=function(){return o>0};var p;var d=-1;this.next=function(){p=g();d=0;var e={};for(var r=0;r<n;r++){for(var i=r+1;i<n;i++){var s=v(r,i,p[r],p[i]);if(a[s]==0){o--;d++}a[s]++}e[t[r].name]=t[r].values[p[r]]}return e};this.lastPairs=function(){return d}}})();t.set("sap.ui.test.qunit",l);window.qutils=l;return l},true);