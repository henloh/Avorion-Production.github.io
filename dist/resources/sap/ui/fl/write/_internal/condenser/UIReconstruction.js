/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_isEqual","sap/base/util/each","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/write/_internal/condenser/classifications/Create","sap/ui/fl/write/_internal/condenser/classifications/Destroy","sap/ui/fl/write/_internal/condenser/classifications/Move","sap/ui/fl/write/_internal/condenser/Utils"],function(n,e,t,i,r,a,c){"use strict";var o={};var f={create:i,destroy:r,move:a};function u(n,t){e(n,function(n,i){e(i,function(e,r){t(i,n,r,e)})})}function s(n,e,t){n.splice(t,0,n.splice(e,1)[0])}function l(n,e){var t={};u(n,function(n,i,r,a){var o=r[c.TARGET_UI];o.forEach(function(n){e.forEach(function(e){if(n===e.affectedControl){if(!t[i]){t[i]={}}var r=t[i];if(!r[a]){r[a]=[]}var c=r[a];c.push(e)}})})});return t}function h(n){return!n.some(function(n){return n.classification!==t.Create})}function v(n){return!n.some(function(n){return c.isUnknown(n)})}function d(n){return n.getTargetIndex(n.change)}function E(n){n.sort(function(n,e){var t=d(n);var i=d(e);return t-i})}function g(n){return!n.some(function(n){return!c.isUnknown(n)})}function I(e,t){var i;if(e.length<t.length){i=t.slice(e.length);if(!g(i)){return false}t=t.slice(0,e.length)}else if(e.length>t.length){i=e.slice(t.length,e.length);if(!g(i)){return false}e=e.slice(0,t.length)}return n(e,t)}function T(n,e,t,i,r){var a={};r.forEach(function(n){var i=n.targetContainer;if(!a[i]){a[i]={}}var r=a[i];if(!r[e]){r[e]=c.initializeArrayWithPlaceholders(0,t.length-1)}f[n.classification].simulate(r[e],n,t)});var o=a[n][e];if(I(i,o)){return true}return false}function _(n,i){u(i,function(i,r,a){a[c.TARGET_UI].forEach(function(i,r){if(!c.isUnknown(i)){var a=n[i];var o=a[c.INDEX_RELEVANT];e(o,function(n,e){if(n!==t.Destroy){e.forEach(function(n){n.setTargetIndex(n.change,r);n.change.condenserState="select"})}})}})})}function p(n,t){u(t,function(t,i,r,a){var o=r[c.INITIAL_UI];var f=r[c.TARGET_UI];if(I(o,f)){f.forEach(function(t){var i=n[t];if(i!==undefined){e(i[c.INDEX_RELEVANT],function(n,e){e.forEach(function(n){n.change.condenserState="delete"})});delete i[c.INDEX_RELEVANT]}});delete t[a]}})}function A(n,e){u(e,function(e,t,i){var r=i[c.INITIAL_UI];var a=i[c.TARGET_UI];r.forEach(function(e,t){var i=n[e];if(!i||!i[c.INDEX_RELEVANT]){var r=c.PLACEHOLDER+t;var o=a.indexOf(e);if(o>=0){a[o]=r}}})})}o.swapChanges=function(n,e){var t=n.map(function(n){return e.indexOf(n)}).sort();n.forEach(function(n){e[t.shift()]=n})};o.sortIndexRelatedChanges=function(n,e){var t=[];var i=l(n,e);u(i,function(e,i,r,a){var o=n[i][a][c.TARGET_UI];var f=n[i][a][c.INITIAL_UI];var u=true;if(v(o)||h(r)){E(r)}else if(!T(i,a,f,o,r)){u=false;var l=r.length;while(l!==0&&!u){var d=0;var g=1;while(g<r.length&&!u){s(r,d,g);u=T(i,a,f,o,r);d++;g++}l--}}if(!u){throw Error("no correct sorting found for the container: "+i)}r.forEach(function(n){t=t.concat(n.change)})});return t};o.addChange=function(n,e){return f[e.classification].addToReconstructionMap(n,e)};o.compareAndUpdate=function(n,e){p(n,e);A(n,e);_(n,e)};return o});