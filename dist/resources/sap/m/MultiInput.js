/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Input","./Tokenizer","./Token","./library","sap/ui/core/EnabledPropagator","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectMetadata","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","./MultiInputRenderer","sap/ui/dom/containsOrEquals","sap/m/inputUtils/completeTextSelected","sap/ui/events/KeyCodes","sap/ui/core/InvisibleText","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/control"],function(e,t,i,n,o,s,r,a,g,l,p,h,u,d,f,c){"use strict";var k=n.TokenizerRenderMode;var T=e.extend("sap.m.MultiInput",{metadata:{interfaces:["sap.ui.core.ISemanticFormContent"],library:"sap.m",designtime:"sap/m/designtime/MultiInput.designtime",properties:{enableMultiLineMode:{type:"boolean",group:"Behavior",defaultValue:false,deprecated:true},maxTokens:{type:"int",group:"Behavior"},_semanticFormValue:{type:"string",group:"Behavior",defaultValue:"",visibility:"hidden"}},aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},tokenizer:{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}},deprecated:true},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}},dnd:{draggable:false,droppable:true}},renderer:p});o.apply(T.prototype,[true]);var y=sap.ui.getCore().getLibraryResourceBundle("sap.m");T.prototype.init=function(){var i=this;this._bShowListWithTokens=false;e.prototype.init.call(this);this._getClearIcon();this._bIsValidating=false;var n=new t({renderMode:k.Narrow,tokenDelete:this._tokenDelete.bind(this)});n.updateTokens=function(){this.destroyTokens();this.updateAggregation("tokens")};this.setAggregation("tokenizer",n);n.getTokensPopup().attachBeforeOpen(this._onBeforeOpenTokensPicker.bind(this)).attachAfterClose(this._onAfterCloseTokensPicker.bind(this))._getPopup().setExtraContent([n,this]);this.setAggregation("tokenizer",n);this._oTokenizerObserver=new a(function(e){var i=e.mutation;var n=e.child;switch(i){case"insert":n.attachEvent("_change",this.invalidate,this);this.fireTokenChange({type:t.TokenChangeType.Added,token:n,tokens:[n],removedTokens:[]});break;case"remove":var o=e.object.getTokens().length?t.TokenChangeType.Removed:t.TokenChangeType.RemovedAll;n.detachEvent("_change",this.invalidate,this);this.fireTokenChange({type:o,token:n,removedTokens:[n]});break;default:break}this.updateFormValueProperty();this.invalidate()}.bind(this));this._oTokenizerObserver.observe(n,{aggregations:["tokens"]});this._bShowListWithTokens=false;this._bIsValidating=false;n.addEventDelegate({onThemeChanged:this._handleInnerVisibility.bind(this),onAfterRendering:function(){if(this.isMobileDevice()&&this.getEditable()){n.addStyleClass("sapMTokenizerIndicatorDisabled")}else{n.removeStyleClass("sapMTokenizerIndicatorDisabled")}this._syncInputWidth(n);if(this.getTokens().length){this._handleInnerVisibility();this._handleNMoreAccessibility();this._registerTokenizerResizeHandler()}}.bind(this)},this);this._aTokenValidators=[];this.setShowValueHelp(true);this.setShowSuggestion(true);this._getSuggestionsPopover().getPopover().attachBeforeOpen(function(){if(i.isMobileDevice()!==true){return}var e=n._getTokensList();n._fillTokensList(e);this.addContent(e);i._manageListsVisibility(!!n.getTokens().length)}).attachAfterOpen(function(){var e=i.getTokens().length?y.getText("MULTIINPUT_NAVIGATION_POPUP_AND_TOKENS"):y.getText("MULTIINPUT_NAVIGATION_POPUP");i._oInvisibleMessage.announce(e)});this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(this._onValueHelpRequested,this);this._getValueHelpIcon().setProperty("visible",true,true);this._onResize=this._onResize.bind(this)};T.prototype.exit=function(){this._deregisterResizeHandler();this._deregisterTokenizerResizeHandler();this._oTokenizerObserver.disconnect();this._oTokenizerObserver.destroy();this._oTokenizerObserver=null;e.prototype.exit.call(this)};T.prototype.onAfterRendering=function(){var t=this.getAggregation("tokenizer");this._bTokenIsValidated=false;t.setMaxWidth(this._calculateSpaceForTokenizer());t.scrollToEnd();this._registerResizeHandler();e.prototype.onAfterRendering.apply(this,arguments)};T.prototype._tokenDelete=function(e){if(!this.getEditable()||!this.getEnabled()){return}this._deleteTokens(e.getParameter("tokens"),e.getParameters())};T.prototype._deleteTokens=function(e,i){var n=this.getAggregation("tokenizer");var o=0;var s=i.keyCode===d.BACKSPACE;var r=e[e.length-1];var a=e[0];o=this.getTokens().indexOf(s?a:r);n.focusToken(o,i,function(){this.focus()}.bind(this));this.fireTokenUpdate({type:t.TokenUpdateType.Removed,addedTokens:[],removedTokens:e});e.filter(function(e){return this.getEditable()&&this.getEnabled()&&e.getEditable()}.bind(this)).forEach(function(e){e.destroy()});if(this.getTokens().length===0){n.getTokensPopup().close()}if(!i.keyCode){this.focus()}};T.prototype._handleInnerVisibility=function(){var e=!!this.getAggregation("tokenizer").getHiddenTokensCount();this._setValueVisible(!e)};T.prototype.oninput=function(t){this.setProperty("selectedKey","",true);e.prototype.oninput.call(this,t);if(t.isMarked("invalid")||!this.getEditable()){return}this._setValueVisible(true);this._manageListsVisibility(false);this.getAggregation("tokenizer").getTokensPopup().close()};T.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){this._iResizeHandlerId=g.register(this,this._onResize)}};T.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){g.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};T.prototype._registerTokenizerResizeHandler=function(){if(!this._iTokenizerResizeHandler){this._iTokenizerResizeHandler=g.register(this.getAggregation("tokenizer"),this._onResize)}};T.prototype._deregisterTokenizerResizeHandler=function(){if(this._iTokenizerResizeHandler){g.deregister(this._iTokenizerResizeHandler);this._iTokenizerResizeHandler=null}};T.prototype._onResize=function(){this.getAggregation("tokenizer").setMaxWidth(this._calculateSpaceForTokenizer())};T.prototype._onSuggestionItemSelected=function(e){var t=this.getAggregation("tokenizer"),n=null,o=null,r=t.getTokens().length;if(this.getMaxTokens()&&r>=this.getMaxTokens()||this._bValueHelpOpen){return}if(this._hasTabularSuggestions()){n=e.getParameter("selectedRow")}else{n=e.getParameter("selectedItem");if(n){o=new i({text:s.escapeSettingsValue(n.getText()),key:s.escapeSettingsValue(n.getKey())})}}if(n&&!this._bTokenIsAdded){var a=this.getValue();this.addValidateToken({text:a,token:o,suggestionObject:n,validationCallback:this._validationCallback.bind(this,r)})}if(this.isMobileDevice()){var g=t.getTokens().length;if(r<g){this.setValue("")}if(this._getSuggestionsList().isA("sap.m.Table")){this._getSuggestionsList().addStyleClass("sapMInputSuggestionTableHidden")}else{this._getSuggestionsList().destroyItems()}var l=this.getAggregation("tokenizer").getScrollDelegate();if(l){l.scrollTo(0,0,0)}this._getSuggestionsPopover().getInput().focus()}this._bTokenIsAdded=false};T.prototype._onValueHelpRequested=function(){this._bValueHelpOpen=true};T.prototype._onLiveChange=function(e){var t=this.getAggregation("tokenizer").getTokens().every(function(e){return e.getSelected()});if(!t){return}this.removeAllTokens()};T.prototype._setValueVisible=function(e){var t=e?"1":"0";this.$("inner").css("opacity",t)};T.prototype.onmousedown=function(e){if(e.target==this.getDomRef("content")){e.preventDefault();e.stopPropagation()}};T.prototype.openMultiLine=function(){};T.prototype.closeMultiLine=function(){};T.prototype.showItems=function(){e.prototype.showItems.apply(this,arguments);this._manageListsVisibility(false)};T.prototype.onBeforeRendering=function(){var t=this.getAggregation("tokenizer");var i=t._getTokensList();e.prototype.onBeforeRendering.apply(this,arguments);this._hideTokensOverLimit();t.setEnabled(this.getEnabled());t._fillTokensList(i)};T.prototype._hideTokensOverLimit=function(){if(!this.getMaxTokens()){return}this.getTokens().forEach(function(e,t){if(t>=this.getMaxTokens()){return e.setVisible(false)}return e.setVisible(true)},this)};T.prototype.onsapnext=function(e){var t=this.getAggregation("tokenizer");if(e.isMarked()){return}var i=c(document.activeElement).control()[0];if(!i){return}if(t===i||t.$().find(i.$()).length>0){t.scrollToEnd();this.$().find("input").trigger("focus")}};T.prototype.onsapbackspace=function(e){var t=this.getValue();var i=this.getFocusDomRef()===document.activeElement;var n=this.getTokens();var o=n[n.length-1];if(!this.getEnabled()||!this.getEditable()){e.preventDefault();return}if(t===""&&i&&o&&e.srcControl===this){var s=n.filter(function(e){return e.getSelected()}).length===n.length;if(s){return this._deleteTokens(n,{keyCode:d.BACKSPACE})}o.focus();e.preventDefault()}};T.prototype.onsapdelete=function(e){if(!this.getEditable()){return}if(this.getValue()&&!u(this.getFocusDomRef())){return}if(e.isMarked("forwardFocusToParent")){this.focus()}};T.prototype.onkeydown=function(t){var i=this.getAggregation("tokenizer");e.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()){return}if(t.which===d.TAB){i.selectAllTokens(false)}if((t.ctrlKey||t.metaKey)&&t.which===d.A&&i.getTokens().length>0){i.focus();i.selectAllTokens(true);t.preventDefault()}if((t.ctrlKey||t.metaKey)&&(t.which===d.C||t.which===d.INSERT)){i._copy()}if((t.ctrlKey||t.metaKey)&&t.which===d.X||t.shiftKey&&t.which===d.DELETE){if(this.getEditable()){i._cut()}else{i._copy()}}if((t.ctrlKey||t.metaKey)&&t.which===d.I&&i.getTokens().length){i._togglePopup(i.getTokensPopup());t.preventDefault()}};T.prototype.onpaste=function(e){var i,n,o,s=[];if(this.getValueHelpOnly()){return}i=e.originalEvent.clipboardData.getData("text/plain");if(i.length&&i.endsWith("\r\n")){i=i.substring(0,i.lastIndexOf("\r\n"))}o=i.split(/\r\n|\r|\n|\t/g);if(o.length<=1){return}setTimeout(function(){if(o){if(this.fireEvent("_validateOnPaste",{texts:o},true)){var e="";for(n=0;n<o.length;n++){if(o[n]){var i=this._convertTextToToken(o[n],true);if(this._addUniqueToken(i)){s.push(i)}else{e=o[n]}}}this.updateDomValue(e);if(s.length>0){this.fireTokenUpdate({addedTokens:s,removedTokens:[],type:t.TokenUpdateType.Added});this.fireTokenChange({addedTokens:s,removedTokens:[],type:t.TokenChangeType.TokensChanged})}}if(s.length){this.cancelPendingSuggest()}}}.bind(this),0)};T.prototype._validationCallback=function(e,t){var i=this.getAggregation("tokenizer").getTokens().length;var n=this._getSuggestionsPopover();this._bIsValidating=false;if(t){this.setValue("");this._bTokenIsValidated=true;if(this.isMobileDevice()&&n&&n.getInput()&&e<i){n.getInput().setValue("")}}};T.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return}if(this._$input.cursorPos()===0){if(e.srcControl===this){t.prototype.onsapprevious.apply(this.getAggregation("tokenizer"),arguments)}}if(e.keyCode===d.ARROW_UP){e.preventDefault()}};T.prototype.onsaphome=function(i){if(!this.getFocusDomRef().selectionStart){t.prototype.onsaphome.apply(this.getAggregation("tokenizer"),arguments)}e.prototype.onsaphome.apply(this,arguments)};T.prototype.onsapend=function(t){if(t.isMarked("forwardFocusToParent")){this.focus()}e.prototype.onsapend.apply(this,arguments)};T.prototype.onsapenter=function(t){var i=this.getDOMValue();e.prototype.onsapenter.apply(this,arguments);var n=true,o=this.getAggregation("tokenizer");if(this._getIsSuggestionPopupOpen()){if(this._hasTabularSuggestions()){n=!this._getSuggestionsTable().getSelectedItem()}else{n=!this._getSuggestionsList().getSelectedItem()}}if(n){this._validateCurrentText()}if(t&&t.setMarked&&(this._bTokenIsValidated||i)){t.setMarked()}if(!this.getEditable()&&o.getHiddenTokensCount()&&t.target===this.getFocusDomRef()){o._togglePopup(o.getTokensPopup())}this.focus()};T.prototype.onsapfocusleave=function(t){var i=this._getSuggestionsPopoverPopup(),n=this.getAggregation("tokenizer"),o=n.getTokensPopup(),s=false,r=false,a=this.getDomRef()&&h(this.getDomRef(),document.activeElement),g,l;if(i&&i.isA("sap.m.Popover")){if(t.relatedControlId){g=sap.ui.getCore().byId(t.relatedControlId).getFocusDomRef();s=h(i.getFocusDomRef(),g);r=h(n.getFocusDomRef(),g);if(o){l=h(o.getFocusDomRef(),g)}}}e.prototype.onsapfocusleave.apply(this,arguments);if(this._bIsValidating||this._bValueHelpOpen){return}if(!this.isMobileDevice()&&!s&&t.relatedControlId!==this.getId()&&!r){this._validateCurrentText(true)}if(!this.isMobileDevice()&&this.getEditable()){if(a||s){return}}if(!l&&!r){o.isOpen()&&!this.isMobileDevice()&&n._togglePopup(o);n.setRenderMode(k.Narrow)}this._handleInnerVisibility()};T.prototype.ontap=function(t){var i=this.getAggregation("tokenizer");if(document.activeElement===this._$input[0]||document.activeElement===i.getDomRef()){i.selectAllTokens(false)}if(t&&t.isMarked("tokenDeletePress")){return}e.prototype.ontap.apply(this,arguments)};T.prototype.onfocusin=function(t){var i=this.getAggregation("tokenizer");this._deregisterTokenizerResizeHandler();this._bValueHelpOpen=false;if(t.target===this.getFocusDomRef()){e.prototype.onfocusin.apply(this,arguments);if(i.hasOneTruncatedToken()&&this.getEnabled()&&this.getEditable()){i.getTokens()[0].setSelected(false);!this.isMobileDevice()&&i.setFirstTokenTruncated(false)}}if(!this.isMobileDevice()&&this.getEditable()&&t.target===this.getDomRef("inner")&&!this._getIsSuggestionPopupOpen()){i.setRenderMode(k.Loose);this._setValueVisible(true)}this._registerResizeHandler()};T.prototype.onsapescape=function(t){var i=this.getAggregation("tokenizer"),n=i.getTokensPopup();this.getAggregation("tokenizer").selectAllTokens(false);this.selectText(0,0);if(n.isOpen()){i._togglePopup(n)}e.prototype.onsapescape.apply(this,arguments)};T.prototype._getIsSuggestionPopupOpen=function(){var e=this._getSuggestionsPopover(),t=this._getSuggestionsPopoverPopup();return e&&t&&t.isOpen()};T.prototype.setEditable=function(t){var i=this.getAggregation("tokenizer");t=this.validateProperty("editable",t);if(t===this.getEditable()){return this}if(e.prototype.setEditable){e.prototype.setEditable.apply(this,arguments)}i.setEditable(t);return this};T.prototype._findItem=function(e,t,i,n){if(!e){return}if(!(t&&t.length)){return}e=e.toLowerCase();var o=t.length;for(var s=0;s<o;s++){var r=t[s];var a=n(r);if(!a){continue}a=a.toLowerCase();if(a===e){return r}if(!i&&a.indexOf(e)===0){return r}}};T.prototype._getSuggestionItem=function(e,t){var i=null;var n=null;if(this._hasTabularSuggestions()){i=this.getSuggestionRows();n=this._findItem(e,i,t,function(e){var t=e.getCells();var i=null;if(t){var n;for(n=0;n<t.length;n++){if(t[n].getText){i=t[n].getText();break}}}return i})}else{i=this.getSuggestionItems();n=this._findItem(e,i,t,function(e){return e.getText()})}return n};T.prototype.clone=function(){var t;this.detachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.detachLiveChange(this._onLiveChange,this);this.detachValueHelpRequest(this._onValueHelpRequested,this);t=e.prototype.clone.apply(this,arguments);this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(this._onValueHelpRequested,this);return t};T.getMetadata().forwardAggregation("tokens",{getter:function(){return this.getAggregation("tokenizer")},aggregation:"tokens",forwardBinding:true});T.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("content")};T.prototype.setTokens=function(e){if(!Array.isArray(e)){return}this.removeAllTokens();e.forEach(function(e){r.addAPIParentInfoBegin(e,this,"tokens")},this);e.forEach(function(e){this.addToken(e)},this);e.forEach(function(e){r.addAPIParentInfoEnd(e)},this);this.fireTokenChange({type:t.TokenChangeType.TokensChanged,addedTokens:e,removedTokens:[]});return this};T.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};T.WaitForAsyncValidation="sap.m.MultiInput.WaitForAsyncValidation";T.prototype.getDomRefForValueStateMessage=T.prototype.getPopupAnchorDomRef;T.prototype.updateInputField=function(t){e.prototype.updateInputField.call(this,t);var i=this._getSuggestionsPopover();this.setDOMValue("");if(i.getInput()){i.getInput().setDOMValue("")}};T.prototype.onChange=function(e,t,i){t=t||this.getChangeEventParams();if(!this.getEditable()||!this.getEnabled()){return}var n=this._getInputValue(i);if(n===this.getLastValue()){this._bCheckDomValue=false;return}if(!this._bTokenIsValidated){this.setValue(n);n=this.getValue();this.setLastValue(n)}this.fireChangeEvent(n,t);return true};T.prototype.getAccessibilityInfo=function(){var t=this.getTokens().map(function(e){return e.getText()}).join(" ");var i=e.prototype.getAccessibilityInfo.apply(this,arguments);i.type=y.getText("ACC_CTR_TYPE_MULTIINPUT");i.description=(this.getValueDescriptionInfo()+" "+t).trim();return i};T.prototype.getValueDescriptionInfo=function(){var e=this.getTokens().length;var t=this.getDescription()||"";var i=this.getValue();if(i){return i}if(e>0){return t}else{return t?t:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_EMPTY")}};T.prototype._decoratePopupInput=function(t){e.prototype._decoratePopupInput.apply(this,arguments);if(!t){return}if(!this._oPopupInputDelegate){this._oPopupInputDelegate={oninput:this._manageListsVisibility.bind(this,false),onsapenter:this._handleConfirmation.bind(this,false)}}t.addEventDelegate(this._oPopupInputDelegate,this);return t};T.prototype._hasShowSelectedButton=function(){return true};T.prototype.forwardEventHandlersToSuggPopover=function(e){e.setShowSelectedPressHandler(this._handleShowSelectedPress.bind(this));e.setOkPressHandler(this._handleConfirmation.bind(this,true));e.setCancelPressHandler(this._handleCancelPress.bind(this))};T.prototype._handleConfirmation=function(e,t){var i=this._getSuggestionsPopover().getInput();if(e||!e&&i.getValue()){this._closeSuggestionPopup()}this._validateCurrentText();this._setValueVisible(false);this.onChange(t,null,i.getValue())};T.prototype._handleCancelPress=function(e){this._getSuggestionsPopover().getInput().setDOMValue(this.getLastValue());this._closeSuggestionPopup()};T.prototype._handleShowSelectedPress=function(e){this._bShowListWithTokens=e.getSource().getPressed();this._manageListsVisibility(this._bShowListWithTokens)};T.prototype._onBeforeOpenTokensPicker=function(){var e=this.getAggregation("tokenizer"),t=e.getTokensPopup(),i=this.getDomRef(),o=this.getEditable(),s,r;this._setValueVisible(false);this._manageListsVisibility(true);if(i&&t){s=parseInt(t.getContentWidth());r=isNaN(s)||i.offsetWidth>s?i.offsetWidth:s;r=e.getTokens().length===1||!o?"auto":r/parseFloat(n.BaseFontSize)+"rem";t.setContentWidth(r)}};T.prototype._onAfterCloseTokensPicker=function(){if(document.activeElement!==this.getDomRef("inner")){this.getAggregation("tokenizer").setRenderMode(k.Narrow)}};T.prototype.getDialogTitle=function(){var e=this._getSuggestionsPopoverPopup(),t=e&&e.getCustomHeader();if(t){return t.getContentMiddle()[0]}return null};T.prototype._updatePickerHeaderTitle=function(){var e,t;t=this.getLabels();if(t.length){e=t[0];if(e&&typeof e.getText==="function"){this.getDialogTitle().setText(e.getText())}}else{this.getDialogTitle().setText(y.getText("COMBOBOX_PICKER_TITLE"))}};T.prototype._getSuggestionsList=function(){var e=this._getSuggestionsPopover();return e&&e.getItemsContainer()};T.prototype._getSuggestionsPopoverPopup=function(){return this._oSuggestionPopup};T.prototype._manageListsVisibility=function(e){if(!this.isMobileDevice()){return}this.getAggregation("tokenizer")._getTokensList().setVisible(e);this._getSuggestionsList()&&this._getSuggestionsList().setVisible(!e);this._getSuggestionsPopover().getFilterSelectedButton().setPressed(e)};T.prototype._handleNMoreAccessibility=function(){var e=f.getStaticId("sap.m","MULTICOMBOBOX_OPEN_NMORE_POPOVER"),t=this.getFocusDomRef(),i=t&&t.getAttribute("aria-describedby"),n=i?i.split(" "):[],o=n.indexOf(e),s=this.getEnabled(),r=!this.getEditable()&&this.getAggregation("tokenizer").getHiddenTokensCount();if(r&&o===-1){n.push(e);s&&this.getFocusDomRef().setAttribute("aria-keyshortcuts","Enter")}else if(o!==-1&&!r){n.splice(o,1);this.getFocusDomRef().removeAttribute("aria-keyshortcuts")}if(t&&n.length){t.setAttribute("aria-describedby",n.join(" ").trim())}};T.prototype._calculateSpaceForTokenizer=function(){var e=this.getDomRef();if(e){var t,i=this.$().find(".sapMInputDescriptionWrapper"),n=this.$().find(".sapMInputBaseInner"),o=e.offsetWidth||0,s=i.width()||0,r=this._calculateIconsSpace(),a=["min-width","padding-right","padding-left"],g=a.reduce(function(e,t){return e+(parseInt(n.css(t))||0)},0);t=o-(r+g+s);t=t<0?0:t;return t+"px"}else{return null}};T.prototype._syncInputWidth=function(e){var t=this.getDomRef("inner"),i,n;if(!t||e&&!e.getDomRef()){return}i=this._calculateIconsSpace();n=e.getDomRef().scrollWidth;t.style.width="calc(100% - "+Math.floor(i+n)+"px"};T.prototype.isValueHelpOnlyOpener=function(e){return[this._$input[0],this._getValueHelpIcon().getDomRef()].indexOf(e)>-1};T.prototype._shouldTriggerSuggest=function(){var t=e.prototype._shouldTriggerSuggest.apply(this,arguments);return t&&!this._bShowListWithTokens};T.prototype.addValidator=function(e){if(typeof e==="function"){this._aTokenValidators.push(e)}};T.prototype.removeValidator=function(e){var t=this._aTokenValidators.indexOf(e);if(t!==-1){this._aTokenValidators.splice(t,1)}};T.prototype.removeAllValidators=function(){this._aTokenValidators=[]};T.prototype.getValidators=function(){return this._aTokenValidators};T.prototype.addValidateToken=function(e,i){var n=this._validateToken(e,i),o=this._addUniqueToken(n,e.validationCallback);if(o){this.fireTokenUpdate({addedTokens:[n],removedTokens:[],type:t.TokenUpdateType.Added});this.fireTokenChange({addedTokens:[n],removedTokens:[],type:t.TokenChangeType.TokensChanged})}};T.prototype._validateToken=function(e,t){var i=e.token,n=e.validationCallback,o=e.suggestionObject,s=i&&i.getText(),r=s?s:e.text,a;t=t?t:this._aTokenValidators;a=t.length;if(!a){if(!i&&n){n(false)}return i}for(var g=0;g<a;g++){i=t[g]({text:r,suggestedToken:i,suggestionObject:o,asyncCallback:this._getAsyncValidationCallback(t,g,r,o,n)});if(!i){if(n){n(false)}return null}if(i===T.WaitForAsyncValidation){return null}}return i};T.prototype._addUniqueToken=function(e,t){if(!e){return false}var i=!this._tokenExists(e);i&&this.addToken(e);if(t){t(i)}return i};T.prototype._tokenExists=function(e){var t=this.getTokens(),i=t.length,n=e&&e.getKey();if(!n){return false}for(var o=0;o<i;o++){if(t[o].getKey()===n){return true}}return false};T.prototype._convertTextToToken=function(e,t){var i=this.getAggregation("tokenizer"),n=i.getTokens().length,o=this._configureTokenOptions(e,false,t),s=o.text,r=o.item,a=o.token;if(!s){return null}return this._validateToken({text:s,token:a,suggestionObject:r,validationCallback:this._validationCallback.bind(this,n)})};T.prototype._validateCurrentText=function(e){var t=this.getAggregation("tokenizer"),i=t.getTokens().length,n=this._configureTokenOptions(this.getValue(),e),o=n.text,s=n.item,r=n.token;if(!o){return null}if(s){this._bTokenIsAdded=true}if(!this.getMaxTokens()||this.getTokens().length<this.getMaxTokens()){this._bIsValidating=true;this.addValidateToken({text:o,token:r,suggestionObject:s,validationCallback:this._validationCallback.bind(this,i)})}};T.prototype._configureTokenOptions=function(e,t,n){var o,r;if(e&&this.getEditable()){e=e.trim()}if(e&&(t||n||this._getIsSuggestionPopupOpen())){if(this._hasTabularSuggestions()){o=this._getSuggestionsTable().getSelectedItem()}else{o=this._getSuggestionItem(e,t)}}if(o&&o.getText&&o.getKey){r=new i({text:s.escapeSettingsValue(o.getText()),key:o.getKey()})}return{text:e,item:o,token:r}};T.prototype._getAsyncValidationCallback=function(e,t,i,n,o){var s=this;return function(r){if(r){r=s.addValidateToken({text:i,token:r,suggestionObject:n,validationCallback:o},e.slice(t+1))}else{o&&o(false)}}};T.prototype.getFormFormattedValue=function(){return this.getTokens().map(function(e){return e.getText()}).join(", ")};T.prototype.getFormValueProperty=function(){return"_semanticFormValue"};T.prototype.updateFormValueProperty=function(){this.setProperty("_semanticFormValue",this.getFormFormattedValue(),true)};return T});