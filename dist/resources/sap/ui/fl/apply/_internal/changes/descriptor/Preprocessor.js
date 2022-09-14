/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/changes/descriptor/Applier","sap/ui/fl/apply/_internal/changes/descriptor/ApplyStrategyFactory","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/performance/Measurement","sap/ui/fl/Utils"],function(e,t,n,a,i,r){"use strict";var s={preprocessManifest:function(s,p){if(!r.isApplication(s,true)||!p.id){return Promise.resolve(s)}i.start("flexStateInitialize","Initialization of flex state",["sap.ui.fl"]);var l=p.componentData||{};var f=a.getFlexReference({manifest:s,componentData:l});if(!a.getChangeManifestFromAsyncHints(p.asyncHints)){n.initialize({componentData:l,asyncHints:p.asyncHints,rawManifest:s,componentId:p.id,reference:f,partialFlexState:true}).then(i.end.bind(undefined,"flexStateInitialize"));return Promise.resolve(s)}return n.initialize({componentData:l,asyncHints:p.asyncHints,rawManifest:s,componentId:p.id,reference:f,partialFlexState:true}).then(function(){i.end("flexStateInitialize");i.start("flexAppDescriptorMerger","Client side app descriptor merger",["sap.ui.fl"]);var a=Object.assign({},s);var r=n.getAppDescriptorChanges(f);return e.applyChanges(a,r,t.getRuntimeStrategy())}).then(function(e){i.end("flexAppDescriptorMerger");return e})}};return s});