sap.ui.define([],function(){"use strict";class t{constructor(t,r,s,o,c,e,u){this.Name=t;this.Dangerous=r;this.Illegal=s;this.AvgPrice=o;this.Level=c;this.Customers=e;this.Manufacturer=u}}class r{constructor(t,r,s,o,c){this.Name=t;this.ProductionCap=r;this.Cost=s;this.Products=o;this.Materials=c}}class s{constructor(t,r){this.Goods=t;this.Factories=r}getFactory(t){for(const r of this.Factories){if(r.Name==t)return r}}getProduct(t){for(const r of this.Goods){if(r.Name==t)return r}}getProductsFromFactory(t){var r=[];const s=this.getFactory(t);for(const t of s.Products){r.push(this.getProduct(t))}return r}getMaterialsForFactory(t){var r=[];const s=this.getFactory(t);for(const t of s.Materials){r.push(this.getProduct(t))}return r}getFactoriesFromProduct(t){var r=[];const s=this.getProduct(t);for(const t of s.Manufacturer){r.push(this.getFactory(t))}return r}getFactoriesForProduct(t){var r=[];const s=this.getProduct(t);for(const t of s.Manufacturer){r.push(this.getFactory(t))}return r}getCustomersOfProduct(t){var r=[];const s=this.getProduct(t);for(const t of s.Customers){r.push(this.getFactory(t))}return r}}var o={__esModule:true};o.Product=t;o.Factory=r;o.Game=s;return o});
//# sourceMappingURL=Types.js.map