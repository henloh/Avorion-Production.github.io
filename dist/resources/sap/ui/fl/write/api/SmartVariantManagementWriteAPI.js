/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState","sap/ui/fl/write/_internal/transport/TransportSelection","sap/base/util/UriParameters","sap/ui/fl/registry/Settings"],function(t,n,e,r,a,i){"use strict";function o(e,r){e.persistencyKey=t.getPersistencyKey(e.control);if(!e.reference){e.reference=n.getFlexReferenceForControl(e.control)}return r(e)}var u={addVariant:function(t){return o(t,e.addVariant)},updateVariant:function(t){return o(t,e.updateVariant)},removeVariant:function(t){return o(t,e.removeVariant)},revert:function(t){return o(t,e.revert)},save:function(t){return o(t,e.persist)},setDefaultVariantId:function(t){return o(t,e.setDefault)},isVariantSharingEnabled:function(){return i.getInstance().then(function(t){return t.isVariantSharingEnabled()})},isVariantPersonalizationEnabled:function(){return i.getInstance().then(function(t){return t.isVariantPersonalizationEnabled()})},isVariantAdaptationEnabled:function(){return i.getInstance().then(function(t){return t.isVariantAdaptationEnabled()})},overrideStandardVariant:function(t){o(t,e.overrideStandardVariant)},revertSetDefaultVariantId:function(t){return o(t,e.revertSetDefaultVariantId)},_getTransportSelection:function(){function t(){var t=a.fromQuery(window.location.search).get("sap-ui-layer")||"";return!!t}var n=new r;n.selectTransport=function(e,a,i,o,u,s){if(!t()){a(n._createEventObject(e,{transportId:""}));return}r.prototype.selectTransport.call(this,e,a,i,o,u,s)};return n}};return u});