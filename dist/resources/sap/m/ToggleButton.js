/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./library","sap/ui/core/EnabledPropagator","./ToggleButtonRenderer","sap/ui/events/KeyCodes"],function(e,t,s,r,i){"use strict";var o=e.extend("sap.m.ToggleButton",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ToggleButton.designtime",properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}},events:{press:{parameters:{pressed:{type:"boolean"}}}}},renderer:r});s.call(o.prototype);o.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};o.prototype.setPressed=function(e){e=!!e;if(e!=this.getPressed()){this.setProperty("pressed",e);this.$().attr("aria-pressed",e);this.$("inner").toggleClass("sapMToggleBtnPressed",e&&!this._isUnstyled())}return this};o.prototype.onkeydown=function(e){if(e.which===i.ENTER&&!e.ctrlKey&&!e.metaKey){this.ontap(e)}};o.prototype.onkeyup=function(e){if(e.which===i.SPACE||e.which===i.ENTER){e.setMarked()}if(e.which===i.SPACE){this.ontap(e)}};o.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);if(this.getPressed()){t.description=((t.description||"")+" "+sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_STATE_PRESSED")).trim()}return t};return o});