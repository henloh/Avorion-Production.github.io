/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","sap/ui/Device","sap/ui/core/Element","../UIArea","sap/ui/thirdparty/jquery"],function(t,e,r,n,i){"use strict";var o=t.dnd.RelativeDropPosition;var a={},f=null,g=null,s=null,u=[],l=[],d=null,c,p,D,h,v={},m;function w(t,e){if(!t){return}if(t.addStyleClass){t.addStyleClass(e)}else{t.$().addClass(e)}}function C(t,e){if(!t){return}if(t.removeStyleClass){t.removeStyleClass(e)}else{t.$().removeClass(e)}}function b(t,e){var n=r.closestTo(t.target,true);if(!n){return}var o=i.Event(null,t);o.type=e;n.getUIArea()._handleEvent(o)}function E(t){return!t.disabled&&/^(input|textarea)$/.test(t.localName)}function y(t,e){if(!t||!t.getDragGhost){return}var r=t.getDragGhost();if(!r){return}if(!p){p=i('<div class="sapUiDnDGhostContainer"></div>');i(document.body).append(p)}p.append(r);window.setTimeout(function(){p.empty()},0);var n=e.originalEvent;n.dataTransfer.setDragImage(r,n.offsetX,n.offsetY)}function S(t){var e={},r,n=t.originalEvent.dataTransfer,i=function(t,e){n.setData(t,e)};return{setData:function(t,r){r=""+r;e[t]=r;i(t,r)},getData:function(t){return e[t]},setTextData:function(t){t=""+t;e["text/plain"]=t;e["text"]=t;i("text/plain",t);i("text",t)},getTextData:function(){return e["text/plain"]},setComplexData:function(t,r){e[t]=r},getComplexData:function(t){return e[t]},getIndicator:function(){return c&&c[0]},setIndicatorConfig:function(t){r=t},getIndicatorConfig:function(t){return r},getDragControl:function(){return f},getDropControl:function(){return s},setDropControl:function(t){s=t},getDropInfo:function(){return l[0]||null},getDropPosition:function(){return D}}}function T(t){f=g=s=d=null;D="";u=[];l=[]}function O(){if(c){return c}c=i("<div class='sapUiDnDIndicator'></div>");i(sap.ui.getCore().getStaticAreaRef()).append(c);return c}function A(){if(c){c.removeAttr("style");c.hide();v={}}}function x(t,e,r,n){if(!e){return}var i=t.dragSession&&t.dragSession.getIndicatorConfig(),a=e.getBoundingClientRect(),f=window.pageYOffset,g=window.pageXOffset,s=O(),u,l={},d={top:a.top+f,bottom:a.bottom+f,left:a.left+g,right:a.right+g,width:a.width,height:a.height};if(!r||r=="On"){u=o.On;n=""}else if(n=="Horizontal"){var c=t.pageX-d.left;l.height=d.height;l.top=d.top;if(r=="Between"){l.width="";if(c<d.width*.5){u=o.Before;l.left=d.left}else{u=o.After;l.left=d.right}}else if(r=="OnOrBetween"){if(c<d.width*.25){u=o.Before;l.left=d.left;l.width=""}else if(c>d.width*.75){u=o.After;l.left=d.right;l.width=""}else{u=o.On}}if(u!=o.On&&sap.ui.getCore().getConfiguration().getRTL()){u=u==o.After?o.Before:o.After}}else{var p=t.pageY-d.top;l.width=d.width;l.left=d.left;if(r=="Between"){l.height="";if(p<d.height*.5){u=o.Before;l.top=d.top}else{u=o.After;l.top=d.bottom}}else if(r=="OnOrBetween"){if(p<d.height*.25){u=o.Before;l.top=d.top;l.height=""}else if(p>d.height*.75){u=o.After;l.top=d.bottom;l.height=""}else{u=o.On}}}if(i&&i.display=="none"){return u}if(u==o.On){l.top=d.top;l.left=d.left;l.width=d.width;l.height=d.height;r=u}else{r="Between"}if(v.top!=l.top||v.left!=l.left||v.width!=l.width||v.height!=l.height){s.attr("data-drop-layout",n);s.attr("data-drop-position",r);s.css(Object.assign(l,i));s.show();v=l}return u}function I(t){var e=t.getParent(),r=t.getDragDropConfig?t.getDragDropConfig():[],n=e&&e.getDragDropConfig?e.getDragDropConfig():[];return r.concat(n)}function B(t){var e=I(t);return e.filter(function(e){return e.isDraggable(t)})}function N(t,e,r){var n=I(t);e=e||[];return n.filter(function(t){return!t.isA("sap.ui.core.dnd.IDragInfo")}).concat(e).filter(function(n){if(!n.isDroppable(t,r)){return false}var i=n.getGroupName();if(!i){return true}return e.some(function(t){return t.getGroupName()==i})})}function U(t,e){t.preventDefault();if(f){var r=e.getDropEffect().toLowerCase();t.originalEvent.dataTransfer.dropEffect=r}}function k(t,e,r){var n=e.getTargetAggregation();if(!n){return x(t,r.getDomRef())}var i;if(t.getMark("DragWithin")==n){i=r.getDomRefForSetting(n)}i=i||r.getDomRef();return x(t,i,e.getDropPosition(true),e.getDropLayout(true))}a.preprocessEvent=function(t){if(d&&t.type.indexOf("dr")==0){t.dragSession=d}var e="onbefore"+t.type;if(a[e]){a[e](t)}};a.postprocessEvent=function(t){var e="onafter"+t.type;if(a[e]){a[e](t)}};a.onbeforemousedown=function(t){if(e.browser.firefox&&E(t.target)){m=i(t.target).closest("[data-sap-ui-draggable=true]").prop("draggable",false)[0]}};a.onbeforemouseup=function(t){if(m){m.draggable=true;m=null}};a.onbeforedragstart=function(t){if(!t.target.draggable){return}if(E(document.activeElement)){t.target.getAttribute("data-sap-ui-draggable")&&t.preventDefault();return}f=r.closestTo(t.target,true);if(!f){return}u=B(f);if(!u.length){return}if(!e.system.desktop&&!t.originalEvent.dataTransfer.getData("text")){t.originalEvent.dataTransfer.setData("text"," ")}t.dragSession=d=S(t)};a.onafterdragstart=function(t){if(!u.length||t.isDefaultPrevented()){T();return}u=t.isMarked("NonDraggable")?[]:u.filter(function(e){return e.fireDragStart(t)});if(!u.length){t.preventDefault();T();return}y(f,t);w(f,"sapUiDnDDragging");if(i(t.target).closest(".sapUiScrollDelegate")[0]){i("html").addClass("sapUiDnDNoScrolling")}};a.onbeforedragenter=function(t){var e=r.closestTo(t.target,true);if(e&&g===e){t.setMark("DragWithin","SameControl")}else{h=Date.now();g=e}var n=[],i;s=e;for(var o=0;o<20&&s;o++){n=N(s,u,t);if(n.length){break}i=s.getDomRef();i=i&&i.parentElement;s=r.closestTo(i,true)}if(t.getMark("DragWithin")!="SameControl"){l=n;if(d){d.setIndicatorConfig(null)}}if(!l.length){s=null}else if(!d){t.dragSession=d=S(t)}};a.onafterdragenter=function(t){if(!s||t.isMarked("NonDroppable")){l=[]}else if(t.getMark("DragWithin")!="SameControl"){l=l.filter(function(e){return e.fireDragEnter(t)})}var e=l[0];if(!e||e.getDropEffect()=="None"){A();D=""}else{U(t,e);D=k(t,e,s)}};a.onbeforedragover=function(t){var e=Date.now();if(e-h>=1e3){b(t,"longdragover");h=e}};a.onafterdragover=function(t){var e=l[0];if(!e||e.getDropEffect()=="None"){return}l.forEach(function(e){e.fireDragOver(t)});U(t,e);if(e&&e.getDropPosition(true)=="On"){return}D=k(t,e,s)};a.onbeforedrop=function(t){if(l.length){t.preventDefault()}};a.onafterdrop=function(t){l.forEach(function(e){e.fireDrop(t)});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,t))};a.onafterdragend=function(t){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);u.forEach(function(e){e.fireDragEnd(t)});C(f,"sapUiDnDDragging");i("html").removeClass("sapUiDnDNoScrolling");A();T()};n.addEventPreprocessor(a.preprocessEvent);n.addEventPostprocessor(a.postprocessEvent);return a},true);