/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/InvisibleRenderer"],function(e,t,n,i,r){"use strict";var s=e.ListType;var a=e.ListMode;var o={apiVersion:2};o.renderInvisible=function(e,t){r.render(e,t,t.TagName)};o.renderHighlight=function(e,t){var n=t.getHighlight();if(n=="None"){return}e.openStart("div");e.class("sapMLIBHighlight");e.class("sapMLIBHighlight"+n);e.openEnd();e.close("div")};o.isModeMatched=function(e,t){var n=(sap.ui.require("sap/m/ListBaseRenderer")||{}).ModeOrder||{};return n[e]==t};o.renderMode=function(e,t,n){var i=t.getMode();if(!this.isModeMatched(i,n)){return}var r=t.getModeControl(true);if(r){this.renderModeContent(e,t,r)}};o.renderModeContent=function(e,t,n){this.decorateMode(n,t);e.renderControl(n)};o.decorateMode=function(e,n){e.removeStyleClass("sapMLIBSelectAnimation sapMLIBUnselectAnimation");if(!t.getConfiguration().getAnimation()||!n.getListProperty("modeAnimationOn")){return}var i=n.getMode(),r=n.getListProperty("lastMode");if(!r||r==i){return}if(i==a.None){e.addStyleClass("sapMLIBUnselectAnimation")}else{e.addStyleClass("sapMLIBSelectAnimation")}};o.renderCounter=function(e,t){var n=t.getCounter();if(n){this.renderCounterContent(e,t,n)}};o.renderCounterContent=function(e,n,i){e.openStart("div",n.getId()+"-counter");e.attr("aria-label",t.getLibraryResourceBundle("sap.m").getText("LIST_ITEM_COUNTER",i));e.class("sapMLIBCounter");e.openEnd();e.text(i);e.close("div")};o.renderType=function(e,t){var n=t.getTypeControl(true);if(n){e.renderControl(n)}};o.openItemTag=function(e,t){e.openStart(t.TagName,t)};o.closeItemTag=function(e,t){e.close(t.TagName)};o.renderTabIndex=function(e,t){e.attr("tabindex","-1")};o.renderTooltip=function(e,t){var n=t.getTooltip_AsString();if(n){e.attr("title",n)}};o.addFocusableClasses=function(e,t){if(n.system.desktop){e.class("sapMLIBFocusable");this.addLegacyOutlineClass(e,t)}};o.addLegacyOutlineClass=function(e,t){};o.getAriaAnnouncement=function(e,t){return i.getStaticId("sap.m",t||"LIST_ITEM_"+e.toUpperCase())};o.getAriaRole=function(e){return"listitem"};o.getAriaLabelledBy=function(e){if(!e.getContentAnnouncement&&e.getAriaLabelledBy().length){return e.getId()}};o.getAriaDescribedBy=function(e){if(e.getContentAnnouncement){return""}var t=[],n=e.getType();if(e.getListProperty("showUnread")&&e.getUnread()){t.push(this.getAriaAnnouncement("unread"))}if(e.getMode()==a.Delete){t.push(this.getAriaAnnouncement("delete"))}if(n==s.Navigation){t.push(this.getAriaAnnouncement("navigation"))}else{if(n==s.Detail||n==s.DetailAndActive){t.push(this.getAriaAnnouncement("detail"))}if(n==s.Active||n==s.DetailAndActive){t.push(this.getAriaAnnouncement("active"))}}return t.join(" ")};o.getAccessibilityState=function(e){var n=this.getAriaLabelledBy(e),i=this.getAriaDescribedBy(e),r=this.getAriaRole(e),s={role:r,roledescription:r==="listitem"?e.getAccessibilityType(t.getLibraryResourceBundle("sap.m")):null};if(n){s.labelledby={value:n.trim(),append:true}}if(i){s.describedby={value:i.trim(),append:true}}if(e.getNavigated()){s.current=true}if(r==="listitem"){s.selected=null;if(e.isGroupHeader()){s.role="group";var a=e.getGroupedItems();if(a&&a.length){s.owns=a.join(" ")}}}else if(e.isSelectable()){s.selected=e.getSelected()}return s};o.renderLIContent=function(e,t){};o.renderLIAttributes=function(e,t){};o.renderContentFormer=function(e,t){this.renderHighlight(e,t);this.renderMode(e,t,-1)};o.renderContentLatter=function(e,t){this.renderCounter(e,t);this.renderType(e,t);this.renderMode(e,t,1);this.renderNavigated(e,t)};o.renderLIContentWrapper=function(e,t){e.openStart("div",t.getId()+"-content").class("sapMLIBContent").openEnd();this.renderLIContent(e,t);e.close("div")};o.renderNavigated=function(e,t){if(!t.getNavigated()){return}e.openStart("div");e.class("sapMLIBNavigated");e.openEnd();e.close("div")};o.render=function(e,i){if(!i.getVisible()){this.renderInvisible(e,i);return false}this.openItemTag(e,i);e.class("sapMLIB");e.class("sapMLIB-CTX");e.class("sapMLIBShowSeparator");e.class("sapMLIBType"+i.getType());if(n.system.desktop&&i.isActionable()){e.class("sapMLIBActionable");e.class("sapMLIBHoverable")}if(i.getSelected()){e.class("sapMLIBSelected")}if(i.getListProperty("showUnread")&&i.getUnread()){e.class("sapMLIBUnread")}this.addFocusableClasses(e,i);this.renderTooltip(e,i);this.renderTabIndex(e,i);if(t.getConfiguration().getAccessibility()){e.accessibilityState(i,this.getAccessibilityState(i))}this.renderLIAttributes(e,i);e.openEnd();this.renderContentFormer(e,i);this.renderLIContentWrapper(e,i);this.renderContentLatter(e,i);this.closeItemTag(e,i)};return o},true);