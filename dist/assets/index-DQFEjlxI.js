(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function Ac(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wa={exports:{}},ki={},ka={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mr=Symbol.for("react.element"),$c=Symbol.for("react.portal"),Wc=Symbol.for("react.fragment"),Uc=Symbol.for("react.strict_mode"),Bc=Symbol.for("react.profiler"),Vc=Symbol.for("react.provider"),Hc=Symbol.for("react.context"),Qc=Symbol.for("react.forward_ref"),Yc=Symbol.for("react.suspense"),Kc=Symbol.for("react.memo"),Gc=Symbol.for("react.lazy"),ns=Symbol.iterator;function Xc(t){return t===null||typeof t!="object"?null:(t=ns&&t[ns]||t["@@iterator"],typeof t=="function"?t:null)}var Sa={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ca=Object.assign,Ea={};function Nn(t,e,n){this.props=t,this.context=e,this.refs=Ea,this.updater=n||Sa}Nn.prototype.isReactComponent={};Nn.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Nn.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Na(){}Na.prototype=Nn.prototype;function oo(t,e,n){this.props=t,this.context=e,this.refs=Ea,this.updater=n||Sa}var so=oo.prototype=new Na;so.constructor=oo;Ca(so,Nn.prototype);so.isPureReactComponent=!0;var rs=Array.isArray,ja=Object.prototype.hasOwnProperty,ao={current:null},ba={key:!0,ref:!0,__self:!0,__source:!0};function Ta(t,e,n){var r,i={},l=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(l=""+e.key),e)ja.call(e,r)&&!ba.hasOwnProperty(r)&&(i[r]=e[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in s=t.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:mr,type:t,key:l,ref:o,props:i,_owner:ao.current}}function Zc(t,e){return{$$typeof:mr,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function uo(t){return typeof t=="object"&&t!==null&&t.$$typeof===mr}function Jc(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var is=/\/+/g;function Ii(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Jc(""+t.key):e.toString(36)}function Ar(t,e,n,r,i){var l=typeof t;(l==="undefined"||l==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case mr:case $c:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Ii(o,0):r,rs(i)?(n="",t!=null&&(n=t.replace(is,"$&/")+"/"),Ar(i,e,n,"",function(c){return c})):i!=null&&(uo(i)&&(i=Zc(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(is,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",rs(t))for(var s=0;s<t.length;s++){l=t[s];var u=r+Ii(l,s);o+=Ar(l,e,n,u,i)}else if(u=Xc(t),typeof u=="function")for(t=u.call(t),s=0;!(l=t.next()).done;)l=l.value,u=r+Ii(l,s++),o+=Ar(l,e,n,u,i);else if(l==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function kr(t,e,n){if(t==null)return t;var r=[],i=0;return Ar(t,r,"","",function(l){return e.call(n,l,i++)}),r}function qc(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Se={current:null},$r={transition:null},ed={ReactCurrentDispatcher:Se,ReactCurrentBatchConfig:$r,ReactCurrentOwner:ao};function Pa(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:kr,forEach:function(t,e,n){kr(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return kr(t,function(){e++}),e},toArray:function(t){return kr(t,function(e){return e})||[]},only:function(t){if(!uo(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};O.Component=Nn;O.Fragment=Wc;O.Profiler=Bc;O.PureComponent=oo;O.StrictMode=Uc;O.Suspense=Yc;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ed;O.act=Pa;O.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Ca({},t.props),i=t.key,l=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(l=e.ref,o=ao.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(u in e)ja.call(e,u)&&!ba.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&s!==void 0?s[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:mr,type:t.type,key:i,ref:l,props:r,_owner:o}};O.createContext=function(t){return t={$$typeof:Hc,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Vc,_context:t},t.Consumer=t};O.createElement=Ta;O.createFactory=function(t){var e=Ta.bind(null,t);return e.type=t,e};O.createRef=function(){return{current:null}};O.forwardRef=function(t){return{$$typeof:Qc,render:t}};O.isValidElement=uo;O.lazy=function(t){return{$$typeof:Gc,_payload:{_status:-1,_result:t},_init:qc}};O.memo=function(t,e){return{$$typeof:Kc,type:t,compare:e===void 0?null:e}};O.startTransition=function(t){var e=$r.transition;$r.transition={};try{t()}finally{$r.transition=e}};O.unstable_act=Pa;O.useCallback=function(t,e){return Se.current.useCallback(t,e)};O.useContext=function(t){return Se.current.useContext(t)};O.useDebugValue=function(){};O.useDeferredValue=function(t){return Se.current.useDeferredValue(t)};O.useEffect=function(t,e){return Se.current.useEffect(t,e)};O.useId=function(){return Se.current.useId()};O.useImperativeHandle=function(t,e,n){return Se.current.useImperativeHandle(t,e,n)};O.useInsertionEffect=function(t,e){return Se.current.useInsertionEffect(t,e)};O.useLayoutEffect=function(t,e){return Se.current.useLayoutEffect(t,e)};O.useMemo=function(t,e){return Se.current.useMemo(t,e)};O.useReducer=function(t,e,n){return Se.current.useReducer(t,e,n)};O.useRef=function(t){return Se.current.useRef(t)};O.useState=function(t){return Se.current.useState(t)};O.useSyncExternalStore=function(t,e,n){return Se.current.useSyncExternalStore(t,e,n)};O.useTransition=function(){return Se.current.useTransition()};O.version="18.3.1";ka.exports=O;var S=ka.exports;const td=Ac(S);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nd=S,rd=Symbol.for("react.element"),id=Symbol.for("react.fragment"),ld=Object.prototype.hasOwnProperty,od=nd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,sd={key:!0,ref:!0,__self:!0,__source:!0};function Ra(t,e,n){var r,i={},l=null,o=null;n!==void 0&&(l=""+n),e.key!==void 0&&(l=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)ld.call(e,r)&&!sd.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:rd,type:t,key:l,ref:o,props:i,_owner:od.current}}ki.Fragment=id;ki.jsx=Ra;ki.jsxs=Ra;wa.exports=ki;var a=wa.exports,fl={},La={exports:{}},De={},_a={exports:{}},Da={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(x,_){var R=x.length;x.push(_);e:for(;0<R;){var z=R-1>>>1,V=x[z];if(0<i(V,_))x[z]=_,x[R]=V,R=z;else break e}}function n(x){return x.length===0?null:x[0]}function r(x){if(x.length===0)return null;var _=x[0],R=x.pop();if(R!==_){x[0]=R;e:for(var z=0,V=x.length,it=V>>>1;z<it;){var ye=2*(z+1)-1,Ft=x[ye],lt=ye+1,It=x[lt];if(0>i(Ft,R))lt<V&&0>i(It,Ft)?(x[z]=It,x[lt]=R,z=lt):(x[z]=Ft,x[ye]=R,z=ye);else if(lt<V&&0>i(It,R))x[z]=It,x[lt]=R,z=lt;else break e}}return _}function i(x,_){var R=x.sortIndex-_.sortIndex;return R!==0?R:x.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;t.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var u=[],c=[],d=1,v=null,p=3,g=!1,y=!1,w=!1,N=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(x){for(var _=n(c);_!==null;){if(_.callback===null)r(c);else if(_.startTime<=x)r(c),_.sortIndex=_.expirationTime,e(u,_);else break;_=n(c)}}function k(x){if(w=!1,m(x),!y)if(n(u)!==null)y=!0,rt(j);else{var _=n(c);_!==null&&Xe(k,_.startTime-x)}}function j(x,_){y=!1,w&&(w=!1,h(P),P=-1),g=!0;var R=p;try{for(m(_),v=n(u);v!==null&&(!(v.expirationTime>_)||x&&!F());){var z=v.callback;if(typeof z=="function"){v.callback=null,p=v.priorityLevel;var V=z(v.expirationTime<=_);_=t.unstable_now(),typeof V=="function"?v.callback=V:v===n(u)&&r(u),m(_)}else r(u);v=n(u)}if(v!==null)var it=!0;else{var ye=n(c);ye!==null&&Xe(k,ye.startTime-_),it=!1}return it}finally{v=null,p=R,g=!1}}var C=!1,b=null,P=-1,M=5,D=-1;function F(){return!(t.unstable_now()-D<M)}function G(){if(b!==null){var x=t.unstable_now();D=x;var _=!0;try{_=b(!0,x)}finally{_?Q():(C=!1,b=null)}}else C=!1}var Q;if(typeof f=="function")Q=function(){f(G)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,ce=B.port2;B.port1.onmessage=G,Q=function(){ce.postMessage(null)}}else Q=function(){N(G,0)};function rt(x){b=x,C||(C=!0,Q())}function Xe(x,_){P=N(function(){x(t.unstable_now())},_)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(x){x.callback=null},t.unstable_continueExecution=function(){y||g||(y=!0,rt(j))},t.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<x?Math.floor(1e3/x):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(x){switch(p){case 1:case 2:case 3:var _=3;break;default:_=p}var R=p;p=_;try{return x()}finally{p=R}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(x,_){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var R=p;p=x;try{return _()}finally{p=R}},t.unstable_scheduleCallback=function(x,_,R){var z=t.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?z+R:z):R=z,x){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=R+V,x={id:d++,callback:_,priorityLevel:x,startTime:R,expirationTime:V,sortIndex:-1},R>z?(x.sortIndex=R,e(c,x),n(u)===null&&x===n(c)&&(w?(h(P),P=-1):w=!0,Xe(k,R-z))):(x.sortIndex=V,e(u,x),y||g||(y=!0,rt(j))),x},t.unstable_shouldYield=F,t.unstable_wrapCallback=function(x){var _=p;return function(){var R=p;p=_;try{return x.apply(this,arguments)}finally{p=R}}}})(Da);_a.exports=Da;var ad=_a.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ud=S,_e=ad;function E(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var za=new Set,Zn={};function Xt(t,e){yn(t,e),yn(t+"Capture",e)}function yn(t,e){for(Zn[t]=e,t=0;t<e.length;t++)za.add(e[t])}var dt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hl=Object.prototype.hasOwnProperty,cd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ls={},os={};function dd(t){return hl.call(os,t)?!0:hl.call(ls,t)?!1:cd.test(t)?os[t]=!0:(ls[t]=!0,!1)}function pd(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function fd(t,e,n,r){if(e===null||typeof e>"u"||pd(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ce(t,e,n,r,i,l,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=l,this.removeEmptyString=o}var fe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){fe[t]=new Ce(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];fe[e]=new Ce(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){fe[t]=new Ce(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){fe[t]=new Ce(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){fe[t]=new Ce(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){fe[t]=new Ce(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){fe[t]=new Ce(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){fe[t]=new Ce(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){fe[t]=new Ce(t,5,!1,t.toLowerCase(),null,!1,!1)});var co=/[\-:]([a-z])/g;function po(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(co,po);fe[e]=new Ce(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(co,po);fe[e]=new Ce(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(co,po);fe[e]=new Ce(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){fe[t]=new Ce(t,1,!1,t.toLowerCase(),null,!1,!1)});fe.xlinkHref=new Ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){fe[t]=new Ce(t,1,!1,t.toLowerCase(),null,!0,!0)});function fo(t,e,n,r){var i=fe.hasOwnProperty(e)?fe[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(fd(e,n,i,r)&&(n=null),r||i===null?dd(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var mt=ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sr=Symbol.for("react.element"),qt=Symbol.for("react.portal"),en=Symbol.for("react.fragment"),ho=Symbol.for("react.strict_mode"),ml=Symbol.for("react.profiler"),Ma=Symbol.for("react.provider"),Fa=Symbol.for("react.context"),mo=Symbol.for("react.forward_ref"),vl=Symbol.for("react.suspense"),gl=Symbol.for("react.suspense_list"),vo=Symbol.for("react.memo"),gt=Symbol.for("react.lazy"),Ia=Symbol.for("react.offscreen"),ss=Symbol.iterator;function Pn(t){return t===null||typeof t!="object"?null:(t=ss&&t[ss]||t["@@iterator"],typeof t=="function"?t:null)}var ee=Object.assign,Oi;function In(t){if(Oi===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Oi=e&&e[1]||""}return`
`+Oi+t}var Ai=!1;function $i(t,e){if(!t||Ai)return"";Ai=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),l=r.stack.split(`
`),o=i.length-1,s=l.length-1;1<=o&&0<=s&&i[o]!==l[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==l[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==l[s]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=s);break}}}finally{Ai=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?In(t):""}function hd(t){switch(t.tag){case 5:return In(t.type);case 16:return In("Lazy");case 13:return In("Suspense");case 19:return In("SuspenseList");case 0:case 2:case 15:return t=$i(t.type,!1),t;case 11:return t=$i(t.type.render,!1),t;case 1:return t=$i(t.type,!0),t;default:return""}}function yl(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case en:return"Fragment";case qt:return"Portal";case ml:return"Profiler";case ho:return"StrictMode";case vl:return"Suspense";case gl:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Fa:return(t.displayName||"Context")+".Consumer";case Ma:return(t._context.displayName||"Context")+".Provider";case mo:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case vo:return e=t.displayName||null,e!==null?e:yl(t.type)||"Memo";case gt:e=t._payload,t=t._init;try{return yl(t(e))}catch{}}return null}function md(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yl(e);case 8:return e===ho?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Lt(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Oa(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function vd(t){var e=Oa(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,l=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Cr(t){t._valueTracker||(t._valueTracker=vd(t))}function Aa(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Oa(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Zr(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function xl(t,e){var n=e.checked;return ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function as(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Lt(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $a(t,e){e=e.checked,e!=null&&fo(t,"checked",e,!1)}function wl(t,e){$a(t,e);var n=Lt(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?kl(t,e.type,n):e.hasOwnProperty("defaultValue")&&kl(t,e.type,Lt(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function us(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function kl(t,e,n){(e!=="number"||Zr(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var On=Array.isArray;function pn(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Lt(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Sl(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(E(91));return ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function cs(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(E(92));if(On(n)){if(1<n.length)throw Error(E(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Lt(n)}}function Wa(t,e){var n=Lt(e.value),r=Lt(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function ds(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Ua(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Cl(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Ua(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Er,Ba=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Er=Er||document.createElement("div"),Er.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Er.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Jn(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Wn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gd=["Webkit","ms","Moz","O"];Object.keys(Wn).forEach(function(t){gd.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Wn[e]=Wn[t]})});function Va(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Wn.hasOwnProperty(t)&&Wn[t]?(""+e).trim():e+"px"}function Ha(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Va(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var yd=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function El(t,e){if(e){if(yd[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(E(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(E(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(E(61))}if(e.style!=null&&typeof e.style!="object")throw Error(E(62))}}function Nl(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var jl=null;function go(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var bl=null,fn=null,hn=null;function ps(t){if(t=yr(t)){if(typeof bl!="function")throw Error(E(280));var e=t.stateNode;e&&(e=ji(e),bl(t.stateNode,t.type,e))}}function Qa(t){fn?hn?hn.push(t):hn=[t]:fn=t}function Ya(){if(fn){var t=fn,e=hn;if(hn=fn=null,ps(t),e)for(t=0;t<e.length;t++)ps(e[t])}}function Ka(t,e){return t(e)}function Ga(){}var Wi=!1;function Xa(t,e,n){if(Wi)return t(e,n);Wi=!0;try{return Ka(t,e,n)}finally{Wi=!1,(fn!==null||hn!==null)&&(Ga(),Ya())}}function qn(t,e){var n=t.stateNode;if(n===null)return null;var r=ji(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(E(231,e,typeof n));return n}var Tl=!1;if(dt)try{var Rn={};Object.defineProperty(Rn,"passive",{get:function(){Tl=!0}}),window.addEventListener("test",Rn,Rn),window.removeEventListener("test",Rn,Rn)}catch{Tl=!1}function xd(t,e,n,r,i,l,o,s,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Un=!1,Jr=null,qr=!1,Pl=null,wd={onError:function(t){Un=!0,Jr=t}};function kd(t,e,n,r,i,l,o,s,u){Un=!1,Jr=null,xd.apply(wd,arguments)}function Sd(t,e,n,r,i,l,o,s,u){if(kd.apply(this,arguments),Un){if(Un){var c=Jr;Un=!1,Jr=null}else throw Error(E(198));qr||(qr=!0,Pl=c)}}function Zt(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Za(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function fs(t){if(Zt(t)!==t)throw Error(E(188))}function Cd(t){var e=t.alternate;if(!e){if(e=Zt(t),e===null)throw Error(E(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return fs(i),t;if(l===r)return fs(i),e;l=l.sibling}throw Error(E(188))}if(n.return!==r.return)n=i,r=l;else{for(var o=!1,s=i.child;s;){if(s===n){o=!0,n=i,r=l;break}if(s===r){o=!0,r=i,n=l;break}s=s.sibling}if(!o){for(s=l.child;s;){if(s===n){o=!0,n=l,r=i;break}if(s===r){o=!0,r=l,n=i;break}s=s.sibling}if(!o)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?t:e}function Ja(t){return t=Cd(t),t!==null?qa(t):null}function qa(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=qa(t);if(e!==null)return e;t=t.sibling}return null}var eu=_e.unstable_scheduleCallback,hs=_e.unstable_cancelCallback,Ed=_e.unstable_shouldYield,Nd=_e.unstable_requestPaint,re=_e.unstable_now,jd=_e.unstable_getCurrentPriorityLevel,yo=_e.unstable_ImmediatePriority,tu=_e.unstable_UserBlockingPriority,ei=_e.unstable_NormalPriority,bd=_e.unstable_LowPriority,nu=_e.unstable_IdlePriority,Si=null,tt=null;function Td(t){if(tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Si,t,void 0,(t.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:Ld,Pd=Math.log,Rd=Math.LN2;function Ld(t){return t>>>=0,t===0?32:31-(Pd(t)/Rd|0)|0}var Nr=64,jr=4194304;function An(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ti(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,l=t.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s!==0?r=An(s):(l&=o,l!==0&&(r=An(l)))}else o=n&~i,o!==0?r=An(o):l!==0&&(r=An(l));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,l=e&-e,i>=l||i===16&&(l&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Ye(e),i=1<<n,r|=t[n],e&=~i;return r}function _d(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Dd(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,l=t.pendingLanes;0<l;){var o=31-Ye(l),s=1<<o,u=i[o];u===-1?(!(s&n)||s&r)&&(i[o]=_d(s,e)):u<=e&&(t.expiredLanes|=s),l&=~s}}function Rl(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ru(){var t=Nr;return Nr<<=1,!(Nr&4194240)&&(Nr=64),t}function Ui(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function vr(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ye(e),t[e]=n}function zd(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Ye(n),l=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~l}}function xo(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Ye(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var U=0;function iu(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var lu,wo,ou,su,au,Ll=!1,br=[],Ct=null,Et=null,Nt=null,er=new Map,tr=new Map,xt=[],Md="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ms(t,e){switch(t){case"focusin":case"focusout":Ct=null;break;case"dragenter":case"dragleave":Et=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":er.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":tr.delete(e.pointerId)}}function Ln(t,e,n,r,i,l){return t===null||t.nativeEvent!==l?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},e!==null&&(e=yr(e),e!==null&&wo(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Fd(t,e,n,r,i){switch(e){case"focusin":return Ct=Ln(Ct,t,e,n,r,i),!0;case"dragenter":return Et=Ln(Et,t,e,n,r,i),!0;case"mouseover":return Nt=Ln(Nt,t,e,n,r,i),!0;case"pointerover":var l=i.pointerId;return er.set(l,Ln(er.get(l)||null,t,e,n,r,i)),!0;case"gotpointercapture":return l=i.pointerId,tr.set(l,Ln(tr.get(l)||null,t,e,n,r,i)),!0}return!1}function uu(t){var e=$t(t.target);if(e!==null){var n=Zt(e);if(n!==null){if(e=n.tag,e===13){if(e=Za(n),e!==null){t.blockedOn=e,au(t.priority,function(){ou(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Wr(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=_l(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);jl=r,n.target.dispatchEvent(r),jl=null}else return e=yr(n),e!==null&&wo(e),t.blockedOn=n,!1;e.shift()}return!0}function vs(t,e,n){Wr(t)&&n.delete(e)}function Id(){Ll=!1,Ct!==null&&Wr(Ct)&&(Ct=null),Et!==null&&Wr(Et)&&(Et=null),Nt!==null&&Wr(Nt)&&(Nt=null),er.forEach(vs),tr.forEach(vs)}function _n(t,e){t.blockedOn===e&&(t.blockedOn=null,Ll||(Ll=!0,_e.unstable_scheduleCallback(_e.unstable_NormalPriority,Id)))}function nr(t){function e(i){return _n(i,t)}if(0<br.length){_n(br[0],t);for(var n=1;n<br.length;n++){var r=br[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Ct!==null&&_n(Ct,t),Et!==null&&_n(Et,t),Nt!==null&&_n(Nt,t),er.forEach(e),tr.forEach(e),n=0;n<xt.length;n++)r=xt[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<xt.length&&(n=xt[0],n.blockedOn===null);)uu(n),n.blockedOn===null&&xt.shift()}var mn=mt.ReactCurrentBatchConfig,ni=!0;function Od(t,e,n,r){var i=U,l=mn.transition;mn.transition=null;try{U=1,ko(t,e,n,r)}finally{U=i,mn.transition=l}}function Ad(t,e,n,r){var i=U,l=mn.transition;mn.transition=null;try{U=4,ko(t,e,n,r)}finally{U=i,mn.transition=l}}function ko(t,e,n,r){if(ni){var i=_l(t,e,n,r);if(i===null)Ji(t,e,r,ri,n),ms(t,r);else if(Fd(i,t,e,n,r))r.stopPropagation();else if(ms(t,r),e&4&&-1<Md.indexOf(t)){for(;i!==null;){var l=yr(i);if(l!==null&&lu(l),l=_l(t,e,n,r),l===null&&Ji(t,e,r,ri,n),l===i)break;i=l}i!==null&&r.stopPropagation()}else Ji(t,e,r,null,n)}}var ri=null;function _l(t,e,n,r){if(ri=null,t=go(r),t=$t(t),t!==null)if(e=Zt(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Za(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ri=t,null}function cu(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(jd()){case yo:return 1;case tu:return 4;case ei:case bd:return 16;case nu:return 536870912;default:return 16}default:return 16}}var kt=null,So=null,Ur=null;function du(){if(Ur)return Ur;var t,e=So,n=e.length,r,i="value"in kt?kt.value:kt.textContent,l=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[l-r];r++);return Ur=i.slice(t,1<r?1-r:void 0)}function Br(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Tr(){return!0}function gs(){return!1}function ze(t){function e(n,r,i,l,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Tr:gs,this.isPropagationStopped=gs,this}return ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),e}var jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Co=ze(jn),gr=ee({},jn,{view:0,detail:0}),$d=ze(gr),Bi,Vi,Dn,Ci=ee({},gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Eo,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Dn&&(Dn&&t.type==="mousemove"?(Bi=t.screenX-Dn.screenX,Vi=t.screenY-Dn.screenY):Vi=Bi=0,Dn=t),Bi)},movementY:function(t){return"movementY"in t?t.movementY:Vi}}),ys=ze(Ci),Wd=ee({},Ci,{dataTransfer:0}),Ud=ze(Wd),Bd=ee({},gr,{relatedTarget:0}),Hi=ze(Bd),Vd=ee({},jn,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=ze(Vd),Qd=ee({},jn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Yd=ze(Qd),Kd=ee({},jn,{data:0}),xs=ze(Kd),Gd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Jd(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Zd[t])?!!e[t]:!1}function Eo(){return Jd}var qd=ee({},gr,{key:function(t){if(t.key){var e=Gd[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Br(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Xd[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Eo,charCode:function(t){return t.type==="keypress"?Br(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Br(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ep=ze(qd),tp=ee({},Ci,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ws=ze(tp),np=ee({},gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Eo}),rp=ze(np),ip=ee({},jn,{propertyName:0,elapsedTime:0,pseudoElement:0}),lp=ze(ip),op=ee({},Ci,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),sp=ze(op),ap=[9,13,27,32],No=dt&&"CompositionEvent"in window,Bn=null;dt&&"documentMode"in document&&(Bn=document.documentMode);var up=dt&&"TextEvent"in window&&!Bn,pu=dt&&(!No||Bn&&8<Bn&&11>=Bn),ks=" ",Ss=!1;function fu(t,e){switch(t){case"keyup":return ap.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hu(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var tn=!1;function cp(t,e){switch(t){case"compositionend":return hu(e);case"keypress":return e.which!==32?null:(Ss=!0,ks);case"textInput":return t=e.data,t===ks&&Ss?null:t;default:return null}}function dp(t,e){if(tn)return t==="compositionend"||!No&&fu(t,e)?(t=du(),Ur=So=kt=null,tn=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return pu&&e.locale!=="ko"?null:e.data;default:return null}}var pp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!pp[t.type]:e==="textarea"}function mu(t,e,n,r){Qa(r),e=ii(e,"onChange"),0<e.length&&(n=new Co("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Vn=null,rr=null;function fp(t){ju(t,0)}function Ei(t){var e=ln(t);if(Aa(e))return t}function hp(t,e){if(t==="change")return e}var vu=!1;if(dt){var Qi;if(dt){var Yi="oninput"in document;if(!Yi){var Es=document.createElement("div");Es.setAttribute("oninput","return;"),Yi=typeof Es.oninput=="function"}Qi=Yi}else Qi=!1;vu=Qi&&(!document.documentMode||9<document.documentMode)}function Ns(){Vn&&(Vn.detachEvent("onpropertychange",gu),rr=Vn=null)}function gu(t){if(t.propertyName==="value"&&Ei(rr)){var e=[];mu(e,rr,t,go(t)),Xa(fp,e)}}function mp(t,e,n){t==="focusin"?(Ns(),Vn=e,rr=n,Vn.attachEvent("onpropertychange",gu)):t==="focusout"&&Ns()}function vp(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ei(rr)}function gp(t,e){if(t==="click")return Ei(e)}function yp(t,e){if(t==="input"||t==="change")return Ei(e)}function xp(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ge=typeof Object.is=="function"?Object.is:xp;function ir(t,e){if(Ge(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!hl.call(e,i)||!Ge(t[i],e[i]))return!1}return!0}function js(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function bs(t,e){var n=js(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=js(n)}}function yu(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?yu(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function xu(){for(var t=window,e=Zr();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Zr(t.document)}return e}function jo(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function wp(t){var e=xu(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&yu(n.ownerDocument.documentElement,n)){if(r!==null&&jo(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!t.extend&&l>r&&(i=r,r=l,l=i),i=bs(n,l);var o=bs(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),l>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var kp=dt&&"documentMode"in document&&11>=document.documentMode,nn=null,Dl=null,Hn=null,zl=!1;function Ts(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zl||nn==null||nn!==Zr(r)||(r=nn,"selectionStart"in r&&jo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hn&&ir(Hn,r)||(Hn=r,r=ii(Dl,"onSelect"),0<r.length&&(e=new Co("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=nn)))}function Pr(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var rn={animationend:Pr("Animation","AnimationEnd"),animationiteration:Pr("Animation","AnimationIteration"),animationstart:Pr("Animation","AnimationStart"),transitionend:Pr("Transition","TransitionEnd")},Ki={},wu={};dt&&(wu=document.createElement("div").style,"AnimationEvent"in window||(delete rn.animationend.animation,delete rn.animationiteration.animation,delete rn.animationstart.animation),"TransitionEvent"in window||delete rn.transitionend.transition);function Ni(t){if(Ki[t])return Ki[t];if(!rn[t])return t;var e=rn[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in wu)return Ki[t]=e[n];return t}var ku=Ni("animationend"),Su=Ni("animationiteration"),Cu=Ni("animationstart"),Eu=Ni("transitionend"),Nu=new Map,Ps="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(t,e){Nu.set(t,e),Xt(e,[t])}for(var Gi=0;Gi<Ps.length;Gi++){var Xi=Ps[Gi],Sp=Xi.toLowerCase(),Cp=Xi[0].toUpperCase()+Xi.slice(1);Dt(Sp,"on"+Cp)}Dt(ku,"onAnimationEnd");Dt(Su,"onAnimationIteration");Dt(Cu,"onAnimationStart");Dt("dblclick","onDoubleClick");Dt("focusin","onFocus");Dt("focusout","onBlur");Dt(Eu,"onTransitionEnd");yn("onMouseEnter",["mouseout","mouseover"]);yn("onMouseLeave",["mouseout","mouseover"]);yn("onPointerEnter",["pointerout","pointerover"]);yn("onPointerLeave",["pointerout","pointerover"]);Xt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $n="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ep=new Set("cancel close invalid load scroll toggle".split(" ").concat($n));function Rs(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Sd(r,e,void 0,t),t.currentTarget=null}function ju(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var l=void 0;if(e)for(var o=r.length-1;0<=o;o--){var s=r[o],u=s.instance,c=s.currentTarget;if(s=s.listener,u!==l&&i.isPropagationStopped())break e;Rs(i,s,c),l=u}else for(o=0;o<r.length;o++){if(s=r[o],u=s.instance,c=s.currentTarget,s=s.listener,u!==l&&i.isPropagationStopped())break e;Rs(i,s,c),l=u}}}if(qr)throw t=Pl,qr=!1,Pl=null,t}function Y(t,e){var n=e[Al];n===void 0&&(n=e[Al]=new Set);var r=t+"__bubble";n.has(r)||(bu(e,t,2,!1),n.add(r))}function Zi(t,e,n){var r=0;e&&(r|=4),bu(n,t,r,e)}var Rr="_reactListening"+Math.random().toString(36).slice(2);function lr(t){if(!t[Rr]){t[Rr]=!0,za.forEach(function(n){n!=="selectionchange"&&(Ep.has(n)||Zi(n,!1,t),Zi(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Rr]||(e[Rr]=!0,Zi("selectionchange",!1,e))}}function bu(t,e,n,r){switch(cu(e)){case 1:var i=Od;break;case 4:i=Ad;break;default:i=ko}n=i.bind(null,e,n,t),i=void 0,!Tl||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Ji(t,e,n,r,i){var l=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;s!==null;){if(o=$t(s),o===null)return;if(u=o.tag,u===5||u===6){r=l=o;continue e}s=s.parentNode}}r=r.return}Xa(function(){var c=l,d=go(n),v=[];e:{var p=Nu.get(t);if(p!==void 0){var g=Co,y=t;switch(t){case"keypress":if(Br(n)===0)break e;case"keydown":case"keyup":g=ep;break;case"focusin":y="focus",g=Hi;break;case"focusout":y="blur",g=Hi;break;case"beforeblur":case"afterblur":g=Hi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=ys;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=Ud;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=rp;break;case ku:case Su:case Cu:g=Hd;break;case Eu:g=lp;break;case"scroll":g=$d;break;case"wheel":g=sp;break;case"copy":case"cut":case"paste":g=Yd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=ws}var w=(e&4)!==0,N=!w&&t==="scroll",h=w?p!==null?p+"Capture":null:p;w=[];for(var f=c,m;f!==null;){m=f;var k=m.stateNode;if(m.tag===5&&k!==null&&(m=k,h!==null&&(k=qn(f,h),k!=null&&w.push(or(f,k,m)))),N)break;f=f.return}0<w.length&&(p=new g(p,y,null,n,d),v.push({event:p,listeners:w}))}}if(!(e&7)){e:{if(p=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",p&&n!==jl&&(y=n.relatedTarget||n.fromElement)&&($t(y)||y[pt]))break e;if((g||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,g?(y=n.relatedTarget||n.toElement,g=c,y=y?$t(y):null,y!==null&&(N=Zt(y),y!==N||y.tag!==5&&y.tag!==6)&&(y=null)):(g=null,y=c),g!==y)){if(w=ys,k="onMouseLeave",h="onMouseEnter",f="mouse",(t==="pointerout"||t==="pointerover")&&(w=ws,k="onPointerLeave",h="onPointerEnter",f="pointer"),N=g==null?p:ln(g),m=y==null?p:ln(y),p=new w(k,f+"leave",g,n,d),p.target=N,p.relatedTarget=m,k=null,$t(d)===c&&(w=new w(h,f+"enter",y,n,d),w.target=m,w.relatedTarget=N,k=w),N=k,g&&y)t:{for(w=g,h=y,f=0,m=w;m;m=Jt(m))f++;for(m=0,k=h;k;k=Jt(k))m++;for(;0<f-m;)w=Jt(w),f--;for(;0<m-f;)h=Jt(h),m--;for(;f--;){if(w===h||h!==null&&w===h.alternate)break t;w=Jt(w),h=Jt(h)}w=null}else w=null;g!==null&&Ls(v,p,g,w,!1),y!==null&&N!==null&&Ls(v,N,y,w,!0)}}e:{if(p=c?ln(c):window,g=p.nodeName&&p.nodeName.toLowerCase(),g==="select"||g==="input"&&p.type==="file")var j=hp;else if(Cs(p))if(vu)j=yp;else{j=vp;var C=mp}else(g=p.nodeName)&&g.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(j=gp);if(j&&(j=j(t,c))){mu(v,j,n,d);break e}C&&C(t,p,c),t==="focusout"&&(C=p._wrapperState)&&C.controlled&&p.type==="number"&&kl(p,"number",p.value)}switch(C=c?ln(c):window,t){case"focusin":(Cs(C)||C.contentEditable==="true")&&(nn=C,Dl=c,Hn=null);break;case"focusout":Hn=Dl=nn=null;break;case"mousedown":zl=!0;break;case"contextmenu":case"mouseup":case"dragend":zl=!1,Ts(v,n,d);break;case"selectionchange":if(kp)break;case"keydown":case"keyup":Ts(v,n,d)}var b;if(No)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else tn?fu(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(pu&&n.locale!=="ko"&&(tn||P!=="onCompositionStart"?P==="onCompositionEnd"&&tn&&(b=du()):(kt=d,So="value"in kt?kt.value:kt.textContent,tn=!0)),C=ii(c,P),0<C.length&&(P=new xs(P,t,null,n,d),v.push({event:P,listeners:C}),b?P.data=b:(b=hu(n),b!==null&&(P.data=b)))),(b=up?cp(t,n):dp(t,n))&&(c=ii(c,"onBeforeInput"),0<c.length&&(d=new xs("onBeforeInput","beforeinput",null,n,d),v.push({event:d,listeners:c}),d.data=b))}ju(v,e)})}function or(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ii(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=qn(t,n),l!=null&&r.unshift(or(t,l,i)),l=qn(t,e),l!=null&&r.push(or(t,l,i))),t=t.return}return r}function Jt(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Ls(t,e,n,r,i){for(var l=e._reactName,o=[];n!==null&&n!==r;){var s=n,u=s.alternate,c=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&c!==null&&(s=c,i?(u=qn(n,l),u!=null&&o.unshift(or(n,u,s))):i||(u=qn(n,l),u!=null&&o.push(or(n,u,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Np=/\r\n?/g,jp=/\u0000|\uFFFD/g;function _s(t){return(typeof t=="string"?t:""+t).replace(Np,`
`).replace(jp,"")}function Lr(t,e,n){if(e=_s(e),_s(t)!==e&&n)throw Error(E(425))}function li(){}var Ml=null,Fl=null;function Il(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ol=typeof setTimeout=="function"?setTimeout:void 0,bp=typeof clearTimeout=="function"?clearTimeout:void 0,Ds=typeof Promise=="function"?Promise:void 0,Tp=typeof queueMicrotask=="function"?queueMicrotask:typeof Ds<"u"?function(t){return Ds.resolve(null).then(t).catch(Pp)}:Ol;function Pp(t){setTimeout(function(){throw t})}function qi(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),nr(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);nr(e)}function jt(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function zs(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var bn=Math.random().toString(36).slice(2),et="__reactFiber$"+bn,sr="__reactProps$"+bn,pt="__reactContainer$"+bn,Al="__reactEvents$"+bn,Rp="__reactListeners$"+bn,Lp="__reactHandles$"+bn;function $t(t){var e=t[et];if(e)return e;for(var n=t.parentNode;n;){if(e=n[pt]||n[et]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=zs(t);t!==null;){if(n=t[et])return n;t=zs(t)}return e}t=n,n=t.parentNode}return null}function yr(t){return t=t[et]||t[pt],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ln(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(E(33))}function ji(t){return t[sr]||null}var $l=[],on=-1;function zt(t){return{current:t}}function K(t){0>on||(t.current=$l[on],$l[on]=null,on--)}function H(t,e){on++,$l[on]=t.current,t.current=e}var _t={},ge=zt(_t),je=zt(!1),Ht=_t;function xn(t,e){var n=t.type.contextTypes;if(!n)return _t;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in n)i[l]=e[l];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function be(t){return t=t.childContextTypes,t!=null}function oi(){K(je),K(ge)}function Ms(t,e,n){if(ge.current!==_t)throw Error(E(168));H(ge,e),H(je,n)}function Tu(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(E(108,md(t)||"Unknown",i));return ee({},n,r)}function si(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||_t,Ht=ge.current,H(ge,t),H(je,je.current),!0}function Fs(t,e,n){var r=t.stateNode;if(!r)throw Error(E(169));n?(t=Tu(t,e,Ht),r.__reactInternalMemoizedMergedChildContext=t,K(je),K(ge),H(ge,t)):K(je),H(je,n)}var st=null,bi=!1,el=!1;function Pu(t){st===null?st=[t]:st.push(t)}function _p(t){bi=!0,Pu(t)}function Mt(){if(!el&&st!==null){el=!0;var t=0,e=U;try{var n=st;for(U=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}st=null,bi=!1}catch(i){throw st!==null&&(st=st.slice(t+1)),eu(yo,Mt),i}finally{U=e,el=!1}}return null}var sn=[],an=0,ai=null,ui=0,Fe=[],Ie=0,Qt=null,at=1,ut="";function Ot(t,e){sn[an++]=ui,sn[an++]=ai,ai=t,ui=e}function Ru(t,e,n){Fe[Ie++]=at,Fe[Ie++]=ut,Fe[Ie++]=Qt,Qt=t;var r=at;t=ut;var i=32-Ye(r)-1;r&=~(1<<i),n+=1;var l=32-Ye(e)+i;if(30<l){var o=i-i%5;l=(r&(1<<o)-1).toString(32),r>>=o,i-=o,at=1<<32-Ye(e)+i|n<<i|r,ut=l+t}else at=1<<l|n<<i|r,ut=t}function bo(t){t.return!==null&&(Ot(t,1),Ru(t,1,0))}function To(t){for(;t===ai;)ai=sn[--an],sn[an]=null,ui=sn[--an],sn[an]=null;for(;t===Qt;)Qt=Fe[--Ie],Fe[Ie]=null,ut=Fe[--Ie],Fe[Ie]=null,at=Fe[--Ie],Fe[Ie]=null}var Le=null,Re=null,X=!1,Qe=null;function Lu(t,e){var n=Oe(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Is(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Le=t,Re=jt(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Le=t,Re=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Qt!==null?{id:at,overflow:ut}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Oe(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Le=t,Re=null,!0):!1;default:return!1}}function Wl(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ul(t){if(X){var e=Re;if(e){var n=e;if(!Is(t,e)){if(Wl(t))throw Error(E(418));e=jt(n.nextSibling);var r=Le;e&&Is(t,e)?Lu(r,n):(t.flags=t.flags&-4097|2,X=!1,Le=t)}}else{if(Wl(t))throw Error(E(418));t.flags=t.flags&-4097|2,X=!1,Le=t}}}function Os(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Le=t}function _r(t){if(t!==Le)return!1;if(!X)return Os(t),X=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Il(t.type,t.memoizedProps)),e&&(e=Re)){if(Wl(t))throw _u(),Error(E(418));for(;e;)Lu(t,e),e=jt(e.nextSibling)}if(Os(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(E(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Re=jt(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Re=null}}else Re=Le?jt(t.stateNode.nextSibling):null;return!0}function _u(){for(var t=Re;t;)t=jt(t.nextSibling)}function wn(){Re=Le=null,X=!1}function Po(t){Qe===null?Qe=[t]:Qe.push(t)}var Dp=mt.ReactCurrentBatchConfig;function zn(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,t));var i=r,l=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===l?e.ref:(e=function(o){var s=i.refs;o===null?delete s[l]:s[l]=o},e._stringRef=l,e)}if(typeof t!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,t))}return t}function Dr(t,e){throw t=Object.prototype.toString.call(e),Error(E(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function As(t){var e=t._init;return e(t._payload)}function Du(t){function e(h,f){if(t){var m=h.deletions;m===null?(h.deletions=[f],h.flags|=16):m.push(f)}}function n(h,f){if(!t)return null;for(;f!==null;)e(h,f),f=f.sibling;return null}function r(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function i(h,f){return h=Rt(h,f),h.index=0,h.sibling=null,h}function l(h,f,m){return h.index=m,t?(m=h.alternate,m!==null?(m=m.index,m<f?(h.flags|=2,f):m):(h.flags|=2,f)):(h.flags|=1048576,f)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function s(h,f,m,k){return f===null||f.tag!==6?(f=sl(m,h.mode,k),f.return=h,f):(f=i(f,m),f.return=h,f)}function u(h,f,m,k){var j=m.type;return j===en?d(h,f,m.props.children,k,m.key):f!==null&&(f.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===gt&&As(j)===f.type)?(k=i(f,m.props),k.ref=zn(h,f,m),k.return=h,k):(k=Xr(m.type,m.key,m.props,null,h.mode,k),k.ref=zn(h,f,m),k.return=h,k)}function c(h,f,m,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=al(m,h.mode,k),f.return=h,f):(f=i(f,m.children||[]),f.return=h,f)}function d(h,f,m,k,j){return f===null||f.tag!==7?(f=Vt(m,h.mode,k,j),f.return=h,f):(f=i(f,m),f.return=h,f)}function v(h,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=sl(""+f,h.mode,m),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Sr:return m=Xr(f.type,f.key,f.props,null,h.mode,m),m.ref=zn(h,null,f),m.return=h,m;case qt:return f=al(f,h.mode,m),f.return=h,f;case gt:var k=f._init;return v(h,k(f._payload),m)}if(On(f)||Pn(f))return f=Vt(f,h.mode,m,null),f.return=h,f;Dr(h,f)}return null}function p(h,f,m,k){var j=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return j!==null?null:s(h,f,""+m,k);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Sr:return m.key===j?u(h,f,m,k):null;case qt:return m.key===j?c(h,f,m,k):null;case gt:return j=m._init,p(h,f,j(m._payload),k)}if(On(m)||Pn(m))return j!==null?null:d(h,f,m,k,null);Dr(h,m)}return null}function g(h,f,m,k,j){if(typeof k=="string"&&k!==""||typeof k=="number")return h=h.get(m)||null,s(f,h,""+k,j);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Sr:return h=h.get(k.key===null?m:k.key)||null,u(f,h,k,j);case qt:return h=h.get(k.key===null?m:k.key)||null,c(f,h,k,j);case gt:var C=k._init;return g(h,f,m,C(k._payload),j)}if(On(k)||Pn(k))return h=h.get(m)||null,d(f,h,k,j,null);Dr(f,k)}return null}function y(h,f,m,k){for(var j=null,C=null,b=f,P=f=0,M=null;b!==null&&P<m.length;P++){b.index>P?(M=b,b=null):M=b.sibling;var D=p(h,b,m[P],k);if(D===null){b===null&&(b=M);break}t&&b&&D.alternate===null&&e(h,b),f=l(D,f,P),C===null?j=D:C.sibling=D,C=D,b=M}if(P===m.length)return n(h,b),X&&Ot(h,P),j;if(b===null){for(;P<m.length;P++)b=v(h,m[P],k),b!==null&&(f=l(b,f,P),C===null?j=b:C.sibling=b,C=b);return X&&Ot(h,P),j}for(b=r(h,b);P<m.length;P++)M=g(b,h,P,m[P],k),M!==null&&(t&&M.alternate!==null&&b.delete(M.key===null?P:M.key),f=l(M,f,P),C===null?j=M:C.sibling=M,C=M);return t&&b.forEach(function(F){return e(h,F)}),X&&Ot(h,P),j}function w(h,f,m,k){var j=Pn(m);if(typeof j!="function")throw Error(E(150));if(m=j.call(m),m==null)throw Error(E(151));for(var C=j=null,b=f,P=f=0,M=null,D=m.next();b!==null&&!D.done;P++,D=m.next()){b.index>P?(M=b,b=null):M=b.sibling;var F=p(h,b,D.value,k);if(F===null){b===null&&(b=M);break}t&&b&&F.alternate===null&&e(h,b),f=l(F,f,P),C===null?j=F:C.sibling=F,C=F,b=M}if(D.done)return n(h,b),X&&Ot(h,P),j;if(b===null){for(;!D.done;P++,D=m.next())D=v(h,D.value,k),D!==null&&(f=l(D,f,P),C===null?j=D:C.sibling=D,C=D);return X&&Ot(h,P),j}for(b=r(h,b);!D.done;P++,D=m.next())D=g(b,h,P,D.value,k),D!==null&&(t&&D.alternate!==null&&b.delete(D.key===null?P:D.key),f=l(D,f,P),C===null?j=D:C.sibling=D,C=D);return t&&b.forEach(function(G){return e(h,G)}),X&&Ot(h,P),j}function N(h,f,m,k){if(typeof m=="object"&&m!==null&&m.type===en&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Sr:e:{for(var j=m.key,C=f;C!==null;){if(C.key===j){if(j=m.type,j===en){if(C.tag===7){n(h,C.sibling),f=i(C,m.props.children),f.return=h,h=f;break e}}else if(C.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===gt&&As(j)===C.type){n(h,C.sibling),f=i(C,m.props),f.ref=zn(h,C,m),f.return=h,h=f;break e}n(h,C);break}else e(h,C);C=C.sibling}m.type===en?(f=Vt(m.props.children,h.mode,k,m.key),f.return=h,h=f):(k=Xr(m.type,m.key,m.props,null,h.mode,k),k.ref=zn(h,f,m),k.return=h,h=k)}return o(h);case qt:e:{for(C=m.key;f!==null;){if(f.key===C)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(h,f.sibling),f=i(f,m.children||[]),f.return=h,h=f;break e}else{n(h,f);break}else e(h,f);f=f.sibling}f=al(m,h.mode,k),f.return=h,h=f}return o(h);case gt:return C=m._init,N(h,f,C(m._payload),k)}if(On(m))return y(h,f,m,k);if(Pn(m))return w(h,f,m,k);Dr(h,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(h,f.sibling),f=i(f,m),f.return=h,h=f):(n(h,f),f=sl(m,h.mode,k),f.return=h,h=f),o(h)):n(h,f)}return N}var kn=Du(!0),zu=Du(!1),ci=zt(null),di=null,un=null,Ro=null;function Lo(){Ro=un=di=null}function _o(t){var e=ci.current;K(ci),t._currentValue=e}function Bl(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function vn(t,e){di=t,Ro=un=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Ne=!0),t.firstContext=null)}function $e(t){var e=t._currentValue;if(Ro!==t)if(t={context:t,memoizedValue:e,next:null},un===null){if(di===null)throw Error(E(308));un=t,di.dependencies={lanes:0,firstContext:t}}else un=un.next=t;return e}var Wt=null;function Do(t){Wt===null?Wt=[t]:Wt.push(t)}function Mu(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Do(e)):(n.next=i.next,i.next=n),e.interleaved=n,ft(t,r)}function ft(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var yt=!1;function zo(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fu(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function ct(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function bt(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,$&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,ft(t,n)}return i=r.interleaved,i===null?(e.next=e,Do(r)):(e.next=i.next,i.next=e),r.interleaved=e,ft(t,n)}function Vr(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,xo(t,n)}}function $s(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?i=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?i=l=e:l=l.next=e}else i=l=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function pi(t,e,n,r){var i=t.updateQueue;yt=!1;var l=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var u=s,c=u.next;u.next=null,o===null?l=c:o.next=c,o=u;var d=t.alternate;d!==null&&(d=d.updateQueue,s=d.lastBaseUpdate,s!==o&&(s===null?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=u))}if(l!==null){var v=i.baseState;o=0,d=c=u=null,s=l;do{var p=s.lane,g=s.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:g,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=t,w=s;switch(p=e,g=n,w.tag){case 1:if(y=w.payload,typeof y=="function"){v=y.call(g,v,p);break e}v=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,p=typeof y=="function"?y.call(g,v,p):y,p==null)break e;v=ee({},v,p);break e;case 2:yt=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,p=i.effects,p===null?i.effects=[s]:p.push(s))}else g={eventTime:g,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},d===null?(c=d=g,u=v):d=d.next=g,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(u=v),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=d,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else l===null&&(i.shared.lanes=0);Kt|=o,t.lanes=o,t.memoizedState=v}}function Ws(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(E(191,i));i.call(r)}}}var xr={},nt=zt(xr),ar=zt(xr),ur=zt(xr);function Ut(t){if(t===xr)throw Error(E(174));return t}function Mo(t,e){switch(H(ur,e),H(ar,t),H(nt,xr),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Cl(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Cl(e,t)}K(nt),H(nt,e)}function Sn(){K(nt),K(ar),K(ur)}function Iu(t){Ut(ur.current);var e=Ut(nt.current),n=Cl(e,t.type);e!==n&&(H(ar,t),H(nt,n))}function Fo(t){ar.current===t&&(K(nt),K(ar))}var J=zt(0);function fi(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var tl=[];function Io(){for(var t=0;t<tl.length;t++)tl[t]._workInProgressVersionPrimary=null;tl.length=0}var Hr=mt.ReactCurrentDispatcher,nl=mt.ReactCurrentBatchConfig,Yt=0,q=null,oe=null,ae=null,hi=!1,Qn=!1,cr=0,zp=0;function he(){throw Error(E(321))}function Oo(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Ge(t[n],e[n]))return!1;return!0}function Ao(t,e,n,r,i,l){if(Yt=l,q=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Hr.current=t===null||t.memoizedState===null?Op:Ap,t=n(r,i),Qn){l=0;do{if(Qn=!1,cr=0,25<=l)throw Error(E(301));l+=1,ae=oe=null,e.updateQueue=null,Hr.current=$p,t=n(r,i)}while(Qn)}if(Hr.current=mi,e=oe!==null&&oe.next!==null,Yt=0,ae=oe=q=null,hi=!1,e)throw Error(E(300));return t}function $o(){var t=cr!==0;return cr=0,t}function qe(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ae===null?q.memoizedState=ae=t:ae=ae.next=t,ae}function We(){if(oe===null){var t=q.alternate;t=t!==null?t.memoizedState:null}else t=oe.next;var e=ae===null?q.memoizedState:ae.next;if(e!==null)ae=e,oe=t;else{if(t===null)throw Error(E(310));oe=t,t={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},ae===null?q.memoizedState=ae=t:ae=ae.next=t}return ae}function dr(t,e){return typeof e=="function"?e(t):e}function rl(t){var e=We(),n=e.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=t;var r=oe,i=r.baseQueue,l=n.pending;if(l!==null){if(i!==null){var o=i.next;i.next=l.next,l.next=o}r.baseQueue=i=l,n.pending=null}if(i!==null){l=i.next,r=r.baseState;var s=o=null,u=null,c=l;do{var d=c.lane;if((Yt&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var v={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(s=u=v,o=r):u=u.next=v,q.lanes|=d,Kt|=d}c=c.next}while(c!==null&&c!==l);u===null?o=r:u.next=s,Ge(r,e.memoizedState)||(Ne=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do l=i.lane,q.lanes|=l,Kt|=l,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function il(t){var e=We(),n=e.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,l=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do l=t(l,o.action),o=o.next;while(o!==i);Ge(l,e.memoizedState)||(Ne=!0),e.memoizedState=l,e.baseQueue===null&&(e.baseState=l),n.lastRenderedState=l}return[l,r]}function Ou(){}function Au(t,e){var n=q,r=We(),i=e(),l=!Ge(r.memoizedState,i);if(l&&(r.memoizedState=i,Ne=!0),r=r.queue,Wo(Uu.bind(null,n,r,t),[t]),r.getSnapshot!==e||l||ae!==null&&ae.memoizedState.tag&1){if(n.flags|=2048,pr(9,Wu.bind(null,n,r,i,e),void 0,null),ue===null)throw Error(E(349));Yt&30||$u(n,e,i)}return i}function $u(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=q.updateQueue,e===null?(e={lastEffect:null,stores:null},q.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Wu(t,e,n,r){e.value=n,e.getSnapshot=r,Bu(e)&&Vu(t)}function Uu(t,e,n){return n(function(){Bu(e)&&Vu(t)})}function Bu(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Ge(t,n)}catch{return!0}}function Vu(t){var e=ft(t,1);e!==null&&Ke(e,t,1,-1)}function Us(t){var e=qe();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:dr,lastRenderedState:t},e.queue=t,t=t.dispatch=Ip.bind(null,q,t),[e.memoizedState,t]}function pr(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=q.updateQueue,e===null?(e={lastEffect:null,stores:null},q.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Hu(){return We().memoizedState}function Qr(t,e,n,r){var i=qe();q.flags|=t,i.memoizedState=pr(1|e,n,void 0,r===void 0?null:r)}function Ti(t,e,n,r){var i=We();r=r===void 0?null:r;var l=void 0;if(oe!==null){var o=oe.memoizedState;if(l=o.destroy,r!==null&&Oo(r,o.deps)){i.memoizedState=pr(e,n,l,r);return}}q.flags|=t,i.memoizedState=pr(1|e,n,l,r)}function Bs(t,e){return Qr(8390656,8,t,e)}function Wo(t,e){return Ti(2048,8,t,e)}function Qu(t,e){return Ti(4,2,t,e)}function Yu(t,e){return Ti(4,4,t,e)}function Ku(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Gu(t,e,n){return n=n!=null?n.concat([t]):null,Ti(4,4,Ku.bind(null,e,t),n)}function Uo(){}function Xu(t,e){var n=We();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Oo(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Zu(t,e){var n=We();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Oo(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Ju(t,e,n){return Yt&21?(Ge(n,e)||(n=ru(),q.lanes|=n,Kt|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Ne=!0),t.memoizedState=n)}function Mp(t,e){var n=U;U=n!==0&&4>n?n:4,t(!0);var r=nl.transition;nl.transition={};try{t(!1),e()}finally{U=n,nl.transition=r}}function qu(){return We().memoizedState}function Fp(t,e,n){var r=Pt(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ec(t))tc(e,n);else if(n=Mu(t,e,n,r),n!==null){var i=ke();Ke(n,t,r,i),nc(n,e,r)}}function Ip(t,e,n){var r=Pt(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ec(t))tc(e,i);else{var l=t.alternate;if(t.lanes===0&&(l===null||l.lanes===0)&&(l=e.lastRenderedReducer,l!==null))try{var o=e.lastRenderedState,s=l(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ge(s,o)){var u=e.interleaved;u===null?(i.next=i,Do(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Mu(t,e,i,r),n!==null&&(i=ke(),Ke(n,t,r,i),nc(n,e,r))}}function ec(t){var e=t.alternate;return t===q||e!==null&&e===q}function tc(t,e){Qn=hi=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function nc(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,xo(t,n)}}var mi={readContext:$e,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},Op={readContext:$e,useCallback:function(t,e){return qe().memoizedState=[t,e===void 0?null:e],t},useContext:$e,useEffect:Bs,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Qr(4194308,4,Ku.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Qr(4194308,4,t,e)},useInsertionEffect:function(t,e){return Qr(4,2,t,e)},useMemo:function(t,e){var n=qe();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=qe();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Fp.bind(null,q,t),[r.memoizedState,t]},useRef:function(t){var e=qe();return t={current:t},e.memoizedState=t},useState:Us,useDebugValue:Uo,useDeferredValue:function(t){return qe().memoizedState=t},useTransition:function(){var t=Us(!1),e=t[0];return t=Mp.bind(null,t[1]),qe().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=q,i=qe();if(X){if(n===void 0)throw Error(E(407));n=n()}else{if(n=e(),ue===null)throw Error(E(349));Yt&30||$u(r,e,n)}i.memoizedState=n;var l={value:n,getSnapshot:e};return i.queue=l,Bs(Uu.bind(null,r,l,t),[t]),r.flags|=2048,pr(9,Wu.bind(null,r,l,n,e),void 0,null),n},useId:function(){var t=qe(),e=ue.identifierPrefix;if(X){var n=ut,r=at;n=(r&~(1<<32-Ye(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=cr++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=zp++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ap={readContext:$e,useCallback:Xu,useContext:$e,useEffect:Wo,useImperativeHandle:Gu,useInsertionEffect:Qu,useLayoutEffect:Yu,useMemo:Zu,useReducer:rl,useRef:Hu,useState:function(){return rl(dr)},useDebugValue:Uo,useDeferredValue:function(t){var e=We();return Ju(e,oe.memoizedState,t)},useTransition:function(){var t=rl(dr)[0],e=We().memoizedState;return[t,e]},useMutableSource:Ou,useSyncExternalStore:Au,useId:qu,unstable_isNewReconciler:!1},$p={readContext:$e,useCallback:Xu,useContext:$e,useEffect:Wo,useImperativeHandle:Gu,useInsertionEffect:Qu,useLayoutEffect:Yu,useMemo:Zu,useReducer:il,useRef:Hu,useState:function(){return il(dr)},useDebugValue:Uo,useDeferredValue:function(t){var e=We();return oe===null?e.memoizedState=t:Ju(e,oe.memoizedState,t)},useTransition:function(){var t=il(dr)[0],e=We().memoizedState;return[t,e]},useMutableSource:Ou,useSyncExternalStore:Au,useId:qu,unstable_isNewReconciler:!1};function Ve(t,e){if(t&&t.defaultProps){e=ee({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Vl(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ee({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Pi={isMounted:function(t){return(t=t._reactInternals)?Zt(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=ke(),i=Pt(t),l=ct(r,i);l.payload=e,n!=null&&(l.callback=n),e=bt(t,l,i),e!==null&&(Ke(e,t,i,r),Vr(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=ke(),i=Pt(t),l=ct(r,i);l.tag=1,l.payload=e,n!=null&&(l.callback=n),e=bt(t,l,i),e!==null&&(Ke(e,t,i,r),Vr(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ke(),r=Pt(t),i=ct(n,r);i.tag=2,e!=null&&(i.callback=e),e=bt(t,i,r),e!==null&&(Ke(e,t,r,n),Vr(e,t,r))}};function Vs(t,e,n,r,i,l,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,l,o):e.prototype&&e.prototype.isPureReactComponent?!ir(n,r)||!ir(i,l):!0}function rc(t,e,n){var r=!1,i=_t,l=e.contextType;return typeof l=="object"&&l!==null?l=$e(l):(i=be(e)?Ht:ge.current,r=e.contextTypes,l=(r=r!=null)?xn(t,i):_t),e=new e(n,l),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Pi,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=l),e}function Hs(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Pi.enqueueReplaceState(e,e.state,null)}function Hl(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},zo(t);var l=e.contextType;typeof l=="object"&&l!==null?i.context=$e(l):(l=be(e)?Ht:ge.current,i.context=xn(t,l)),i.state=t.memoizedState,l=e.getDerivedStateFromProps,typeof l=="function"&&(Vl(t,e,l,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Pi.enqueueReplaceState(i,i.state,null),pi(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Cn(t,e){try{var n="",r=e;do n+=hd(r),r=r.return;while(r);var i=n}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:t,source:e,stack:i,digest:null}}function ll(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Ql(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Wp=typeof WeakMap=="function"?WeakMap:Map;function ic(t,e,n){n=ct(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){gi||(gi=!0,no=r),Ql(t,e)},n}function lc(t,e,n){n=ct(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Ql(t,e)}}var l=t.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Ql(t,e),typeof r!="function"&&(Tt===null?Tt=new Set([this]):Tt.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Qs(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Wp;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=tf.bind(null,t,e,n),e.then(t,t))}function Ys(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ks(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=ct(-1,1),e.tag=2,bt(n,e,1))),n.lanes|=1),t)}var Up=mt.ReactCurrentOwner,Ne=!1;function xe(t,e,n,r){e.child=t===null?zu(e,null,n,r):kn(e,t.child,n,r)}function Gs(t,e,n,r,i){n=n.render;var l=e.ref;return vn(e,i),r=Ao(t,e,n,r,l,i),n=$o(),t!==null&&!Ne?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,ht(t,e,i)):(X&&n&&bo(e),e.flags|=1,xe(t,e,r,i),e.child)}function Xs(t,e,n,r,i){if(t===null){var l=n.type;return typeof l=="function"&&!Xo(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=l,oc(t,e,l,r,i)):(t=Xr(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(l=t.child,!(t.lanes&i)){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:ir,n(o,r)&&t.ref===e.ref)return ht(t,e,i)}return e.flags|=1,t=Rt(l,r),t.ref=e.ref,t.return=e,e.child=t}function oc(t,e,n,r,i){if(t!==null){var l=t.memoizedProps;if(ir(l,r)&&t.ref===e.ref)if(Ne=!1,e.pendingProps=r=l,(t.lanes&i)!==0)t.flags&131072&&(Ne=!0);else return e.lanes=t.lanes,ht(t,e,i)}return Yl(t,e,n,r,i)}function sc(t,e,n){var r=e.pendingProps,i=r.children,l=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(dn,Pe),Pe|=n;else{if(!(n&1073741824))return t=l!==null?l.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,H(dn,Pe),Pe|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,H(dn,Pe),Pe|=r}else l!==null?(r=l.baseLanes|n,e.memoizedState=null):r=n,H(dn,Pe),Pe|=r;return xe(t,e,i,n),e.child}function ac(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Yl(t,e,n,r,i){var l=be(n)?Ht:ge.current;return l=xn(e,l),vn(e,i),n=Ao(t,e,n,r,l,i),r=$o(),t!==null&&!Ne?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,ht(t,e,i)):(X&&r&&bo(e),e.flags|=1,xe(t,e,n,i),e.child)}function Zs(t,e,n,r,i){if(be(n)){var l=!0;si(e)}else l=!1;if(vn(e,i),e.stateNode===null)Yr(t,e),rc(e,n,r),Hl(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,s=e.memoizedProps;o.props=s;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=$e(c):(c=be(n)?Ht:ge.current,c=xn(e,c));var d=n.getDerivedStateFromProps,v=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";v||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||u!==c)&&Hs(e,o,r,c),yt=!1;var p=e.memoizedState;o.state=p,pi(e,r,o,i),u=e.memoizedState,s!==r||p!==u||je.current||yt?(typeof d=="function"&&(Vl(e,n,d,r),u=e.memoizedState),(s=yt||Vs(e,n,s,r,p,u,c))?(v||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Fu(t,e),s=e.memoizedProps,c=e.type===e.elementType?s:Ve(e.type,s),o.props=c,v=e.pendingProps,p=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=$e(u):(u=be(n)?Ht:ge.current,u=xn(e,u));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==v||p!==u)&&Hs(e,o,r,u),yt=!1,p=e.memoizedState,o.state=p,pi(e,r,o,i);var y=e.memoizedState;s!==v||p!==y||je.current||yt?(typeof g=="function"&&(Vl(e,n,g,r),y=e.memoizedState),(c=yt||Vs(e,n,c,r,p,y,u)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=y),o.props=r,o.state=y,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),r=!1)}return Kl(t,e,n,r,l,i)}function Kl(t,e,n,r,i,l){ac(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Fs(e,n,!1),ht(t,e,l);r=e.stateNode,Up.current=e;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=kn(e,t.child,null,l),e.child=kn(e,null,s,l)):xe(t,e,s,l),e.memoizedState=r.state,i&&Fs(e,n,!0),e.child}function uc(t){var e=t.stateNode;e.pendingContext?Ms(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Ms(t,e.context,!1),Mo(t,e.containerInfo)}function Js(t,e,n,r,i){return wn(),Po(i),e.flags|=256,xe(t,e,n,r),e.child}var Gl={dehydrated:null,treeContext:null,retryLane:0};function Xl(t){return{baseLanes:t,cachePool:null,transitions:null}}function cc(t,e,n){var r=e.pendingProps,i=J.current,l=!1,o=(e.flags&128)!==0,s;if((s=o)||(s=t!==null&&t.memoizedState===null?!1:(i&2)!==0),s?(l=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),H(J,i&1),t===null)return Ul(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,l?(r=e.mode,l=e.child,o={mode:"hidden",children:o},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=_i(o,r,0,null),t=Vt(t,r,n,null),l.return=e,t.return=e,l.sibling=t,e.child=l,e.child.memoizedState=Xl(n),e.memoizedState=Gl,t):Bo(e,o));if(i=t.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return Bp(t,e,o,r,s,i,n);if(l){l=r.fallback,o=e.mode,i=t.child,s=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Rt(i,u),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?l=Rt(s,l):(l=Vt(l,o,n,null),l.flags|=2),l.return=e,r.return=e,r.sibling=l,e.child=r,r=l,l=e.child,o=t.child.memoizedState,o=o===null?Xl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=t.childLanes&~n,e.memoizedState=Gl,r}return l=t.child,t=l.sibling,r=Rt(l,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Bo(t,e){return e=_i({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function zr(t,e,n,r){return r!==null&&Po(r),kn(e,t.child,null,n),t=Bo(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Bp(t,e,n,r,i,l,o){if(n)return e.flags&256?(e.flags&=-257,r=ll(Error(E(422))),zr(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(l=r.fallback,i=e.mode,r=_i({mode:"visible",children:r.children},i,0,null),l=Vt(l,i,o,null),l.flags|=2,r.return=e,l.return=e,r.sibling=l,e.child=r,e.mode&1&&kn(e,t.child,null,o),e.child.memoizedState=Xl(o),e.memoizedState=Gl,l);if(!(e.mode&1))return zr(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(E(419)),r=ll(l,r,void 0),zr(t,e,o,r)}if(s=(o&t.childLanes)!==0,Ne||s){if(r=ue,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,ft(t,i),Ke(r,t,i,-1))}return Go(),r=ll(Error(E(421))),zr(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=nf.bind(null,t),i._reactRetry=e,null):(t=l.treeContext,Re=jt(i.nextSibling),Le=e,X=!0,Qe=null,t!==null&&(Fe[Ie++]=at,Fe[Ie++]=ut,Fe[Ie++]=Qt,at=t.id,ut=t.overflow,Qt=e),e=Bo(e,r.children),e.flags|=4096,e)}function qs(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Bl(t.return,e,n)}function ol(t,e,n,r,i){var l=t.memoizedState;l===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(l.isBackwards=e,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=i)}function dc(t,e,n){var r=e.pendingProps,i=r.revealOrder,l=r.tail;if(xe(t,e,r.children,n),r=J.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&qs(t,n,e);else if(t.tag===19)qs(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(H(J,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&fi(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),ol(e,!1,i,n,l);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&fi(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}ol(e,!0,n,null,l);break;case"together":ol(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Yr(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function ht(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Kt|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(E(153));if(e.child!==null){for(t=e.child,n=Rt(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Rt(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Vp(t,e,n){switch(e.tag){case 3:uc(e),wn();break;case 5:Iu(e);break;case 1:be(e.type)&&si(e);break;case 4:Mo(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;H(ci,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(H(J,J.current&1),e.flags|=128,null):n&e.child.childLanes?cc(t,e,n):(H(J,J.current&1),t=ht(t,e,n),t!==null?t.sibling:null);H(J,J.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return dc(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(J,J.current),r)break;return null;case 22:case 23:return e.lanes=0,sc(t,e,n)}return ht(t,e,n)}var pc,Zl,fc,hc;pc=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Zl=function(){};fc=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Ut(nt.current);var l=null;switch(n){case"input":i=xl(t,i),r=xl(t,r),l=[];break;case"select":i=ee({},i,{value:void 0}),r=ee({},r,{value:void 0}),l=[];break;case"textarea":i=Sl(t,i),r=Sl(t,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=li)}El(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var s=i[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Zn.hasOwnProperty(c)?l||(l=[]):(l=l||[]).push(c,null));for(c in r){var u=r[c];if(s=i?.[c],r.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&s[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(l||(l=[]),l.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(l=l||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Zn.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&Y("scroll",t),l||s===u||(l=[])):(l=l||[]).push(c,u))}n&&(l=l||[]).push("style",n);var c=l;(e.updateQueue=c)&&(e.flags|=4)}};hc=function(t,e,n,r){n!==r&&(e.flags|=4)};function Mn(t,e){if(!X)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function me(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function Hp(t,e,n){var r=e.pendingProps;switch(To(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return me(e),null;case 1:return be(e.type)&&oi(),me(e),null;case 3:return r=e.stateNode,Sn(),K(je),K(ge),Io(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(_r(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Qe!==null&&(lo(Qe),Qe=null))),Zl(t,e),me(e),null;case 5:Fo(e);var i=Ut(ur.current);if(n=e.type,t!==null&&e.stateNode!=null)fc(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(E(166));return me(e),null}if(t=Ut(nt.current),_r(e)){r=e.stateNode,n=e.type;var l=e.memoizedProps;switch(r[et]=e,r[sr]=l,t=(e.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(i=0;i<$n.length;i++)Y($n[i],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":as(r,l),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Y("invalid",r);break;case"textarea":cs(r,l),Y("invalid",r)}El(n,l),i=null;for(var o in l)if(l.hasOwnProperty(o)){var s=l[o];o==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&Lr(r.textContent,s,t),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&Lr(r.textContent,s,t),i=["children",""+s]):Zn.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&Y("scroll",r)}switch(n){case"input":Cr(r),us(r,l,!0);break;case"textarea":Cr(r),ds(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=li)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Ua(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[et]=e,t[sr]=r,pc(t,e,!1,!1),e.stateNode=t;e:{switch(o=Nl(n,r),n){case"dialog":Y("cancel",t),Y("close",t),i=r;break;case"iframe":case"object":case"embed":Y("load",t),i=r;break;case"video":case"audio":for(i=0;i<$n.length;i++)Y($n[i],t);i=r;break;case"source":Y("error",t),i=r;break;case"img":case"image":case"link":Y("error",t),Y("load",t),i=r;break;case"details":Y("toggle",t),i=r;break;case"input":as(t,r),i=xl(t,r),Y("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=ee({},r,{value:void 0}),Y("invalid",t);break;case"textarea":cs(t,r),i=Sl(t,r),Y("invalid",t);break;default:i=r}El(n,i),s=i;for(l in s)if(s.hasOwnProperty(l)){var u=s[l];l==="style"?Ha(t,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Ba(t,u)):l==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Jn(t,u):typeof u=="number"&&Jn(t,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Zn.hasOwnProperty(l)?u!=null&&l==="onScroll"&&Y("scroll",t):u!=null&&fo(t,l,u,o))}switch(n){case"input":Cr(t),us(t,r,!1);break;case"textarea":Cr(t),ds(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Lt(r.value));break;case"select":t.multiple=!!r.multiple,l=r.value,l!=null?pn(t,!!r.multiple,l,!1):r.defaultValue!=null&&pn(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=li)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return me(e),null;case 6:if(t&&e.stateNode!=null)hc(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(E(166));if(n=Ut(ur.current),Ut(nt.current),_r(e)){if(r=e.stateNode,n=e.memoizedProps,r[et]=e,(l=r.nodeValue!==n)&&(t=Le,t!==null))switch(t.tag){case 3:Lr(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Lr(r.nodeValue,n,(t.mode&1)!==0)}l&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[et]=e,e.stateNode=r}return me(e),null;case 13:if(K(J),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(X&&Re!==null&&e.mode&1&&!(e.flags&128))_u(),wn(),e.flags|=98560,l=!1;else if(l=_r(e),r!==null&&r.dehydrated!==null){if(t===null){if(!l)throw Error(E(318));if(l=e.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(E(317));l[et]=e}else wn(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;me(e),l=!1}else Qe!==null&&(lo(Qe),Qe=null),l=!0;if(!l)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||J.current&1?se===0&&(se=3):Go())),e.updateQueue!==null&&(e.flags|=4),me(e),null);case 4:return Sn(),Zl(t,e),t===null&&lr(e.stateNode.containerInfo),me(e),null;case 10:return _o(e.type._context),me(e),null;case 17:return be(e.type)&&oi(),me(e),null;case 19:if(K(J),l=e.memoizedState,l===null)return me(e),null;if(r=(e.flags&128)!==0,o=l.rendering,o===null)if(r)Mn(l,!1);else{if(se!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=fi(t),o!==null){for(e.flags|=128,Mn(l,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)l=n,t=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=t,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,t=o.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return H(J,J.current&1|2),e.child}t=t.sibling}l.tail!==null&&re()>En&&(e.flags|=128,r=!0,Mn(l,!1),e.lanes=4194304)}else{if(!r)if(t=fi(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Mn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!X)return me(e),null}else 2*re()-l.renderingStartTime>En&&n!==1073741824&&(e.flags|=128,r=!0,Mn(l,!1),e.lanes=4194304);l.isBackwards?(o.sibling=e.child,e.child=o):(n=l.last,n!==null?n.sibling=o:e.child=o,l.last=o)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=re(),e.sibling=null,n=J.current,H(J,r?n&1|2:n&1),e):(me(e),null);case 22:case 23:return Ko(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Pe&1073741824&&(me(e),e.subtreeFlags&6&&(e.flags|=8192)):me(e),null;case 24:return null;case 25:return null}throw Error(E(156,e.tag))}function Qp(t,e){switch(To(e),e.tag){case 1:return be(e.type)&&oi(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Sn(),K(je),K(ge),Io(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Fo(e),null;case 13:if(K(J),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(E(340));wn()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return K(J),null;case 4:return Sn(),null;case 10:return _o(e.type._context),null;case 22:case 23:return Ko(),null;case 24:return null;default:return null}}var Mr=!1,ve=!1,Yp=typeof WeakSet=="function"?WeakSet:Set,L=null;function cn(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ne(t,e,r)}else n.current=null}function Jl(t,e,n){try{n()}catch(r){ne(t,e,r)}}var ea=!1;function Kp(t,e){if(Ml=ni,t=xu(),jo(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,s=-1,u=-1,c=0,d=0,v=t,p=null;t:for(;;){for(var g;v!==n||i!==0&&v.nodeType!==3||(s=o+i),v!==l||r!==0&&v.nodeType!==3||(u=o+r),v.nodeType===3&&(o+=v.nodeValue.length),(g=v.firstChild)!==null;)p=v,v=g;for(;;){if(v===t)break t;if(p===n&&++c===i&&(s=o),p===l&&++d===r&&(u=o),(g=v.nextSibling)!==null)break;v=p,p=v.parentNode}v=g}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Fl={focusedElem:t,selectionRange:n},ni=!1,L=e;L!==null;)if(e=L,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,L=t;else for(;L!==null;){e=L;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,N=y.memoizedState,h=e.stateNode,f=h.getSnapshotBeforeUpdate(e.elementType===e.type?w:Ve(e.type,w),N);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(k){ne(e,e.return,k)}if(t=e.sibling,t!==null){t.return=e.return,L=t;break}L=e.return}return y=ea,ea=!1,y}function Yn(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var l=i.destroy;i.destroy=void 0,l!==void 0&&Jl(e,n,l)}i=i.next}while(i!==r)}}function Ri(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function ql(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function mc(t){var e=t.alternate;e!==null&&(t.alternate=null,mc(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[et],delete e[sr],delete e[Al],delete e[Rp],delete e[Lp])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function vc(t){return t.tag===5||t.tag===3||t.tag===4}function ta(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||vc(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function eo(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=li));else if(r!==4&&(t=t.child,t!==null))for(eo(t,e,n),t=t.sibling;t!==null;)eo(t,e,n),t=t.sibling}function to(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(to(t,e,n),t=t.sibling;t!==null;)to(t,e,n),t=t.sibling}var de=null,He=!1;function vt(t,e,n){for(n=n.child;n!==null;)gc(t,e,n),n=n.sibling}function gc(t,e,n){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Si,n)}catch{}switch(n.tag){case 5:ve||cn(n,e);case 6:var r=de,i=He;de=null,vt(t,e,n),de=r,He=i,de!==null&&(He?(t=de,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):de.removeChild(n.stateNode));break;case 18:de!==null&&(He?(t=de,n=n.stateNode,t.nodeType===8?qi(t.parentNode,n):t.nodeType===1&&qi(t,n),nr(t)):qi(de,n.stateNode));break;case 4:r=de,i=He,de=n.stateNode.containerInfo,He=!0,vt(t,e,n),de=r,He=i;break;case 0:case 11:case 14:case 15:if(!ve&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Jl(n,e,o),i=i.next}while(i!==r)}vt(t,e,n);break;case 1:if(!ve&&(cn(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ne(n,e,s)}vt(t,e,n);break;case 21:vt(t,e,n);break;case 22:n.mode&1?(ve=(r=ve)||n.memoizedState!==null,vt(t,e,n),ve=r):vt(t,e,n);break;default:vt(t,e,n)}}function na(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Yp),e.forEach(function(r){var i=rf.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Be(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var l=t,o=e,s=o;e:for(;s!==null;){switch(s.tag){case 5:de=s.stateNode,He=!1;break e;case 3:de=s.stateNode.containerInfo,He=!0;break e;case 4:de=s.stateNode.containerInfo,He=!0;break e}s=s.return}if(de===null)throw Error(E(160));gc(l,o,i),de=null,He=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){ne(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)yc(e,t),e=e.sibling}function yc(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Be(e,t),Ze(t),r&4){try{Yn(3,t,t.return),Ri(3,t)}catch(w){ne(t,t.return,w)}try{Yn(5,t,t.return)}catch(w){ne(t,t.return,w)}}break;case 1:Be(e,t),Ze(t),r&512&&n!==null&&cn(n,n.return);break;case 5:if(Be(e,t),Ze(t),r&512&&n!==null&&cn(n,n.return),t.flags&32){var i=t.stateNode;try{Jn(i,"")}catch(w){ne(t,t.return,w)}}if(r&4&&(i=t.stateNode,i!=null)){var l=t.memoizedProps,o=n!==null?n.memoizedProps:l,s=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&$a(i,l),Nl(s,o);var c=Nl(s,l);for(o=0;o<u.length;o+=2){var d=u[o],v=u[o+1];d==="style"?Ha(i,v):d==="dangerouslySetInnerHTML"?Ba(i,v):d==="children"?Jn(i,v):fo(i,d,v,c)}switch(s){case"input":wl(i,l);break;case"textarea":Wa(i,l);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var g=l.value;g!=null?pn(i,!!l.multiple,g,!1):p!==!!l.multiple&&(l.defaultValue!=null?pn(i,!!l.multiple,l.defaultValue,!0):pn(i,!!l.multiple,l.multiple?[]:"",!1))}i[sr]=l}catch(w){ne(t,t.return,w)}}break;case 6:if(Be(e,t),Ze(t),r&4){if(t.stateNode===null)throw Error(E(162));i=t.stateNode,l=t.memoizedProps;try{i.nodeValue=l}catch(w){ne(t,t.return,w)}}break;case 3:if(Be(e,t),Ze(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{nr(e.containerInfo)}catch(w){ne(t,t.return,w)}break;case 4:Be(e,t),Ze(t);break;case 13:Be(e,t),Ze(t),i=t.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Qo=re())),r&4&&na(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(ve=(c=ve)||d,Be(e,t),ve=c):Be(e,t),Ze(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(L=t,d=t.child;d!==null;){for(v=L=d;L!==null;){switch(p=L,g=p.child,p.tag){case 0:case 11:case 14:case 15:Yn(4,p,p.return);break;case 1:cn(p,p.return);var y=p.stateNode;if(typeof y.componentWillUnmount=="function"){r=p,n=p.return;try{e=r,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(w){ne(r,n,w)}}break;case 5:cn(p,p.return);break;case 22:if(p.memoizedState!==null){ia(v);continue}}g!==null?(g.return=p,L=g):ia(v)}d=d.sibling}e:for(d=null,v=t;;){if(v.tag===5){if(d===null){d=v;try{i=v.stateNode,c?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=v.stateNode,u=v.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Va("display",o))}catch(w){ne(t,t.return,w)}}}else if(v.tag===6){if(d===null)try{v.stateNode.nodeValue=c?"":v.memoizedProps}catch(w){ne(t,t.return,w)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===t)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===t)break e;for(;v.sibling===null;){if(v.return===null||v.return===t)break e;d===v&&(d=null),v=v.return}d===v&&(d=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Be(e,t),Ze(t),r&4&&na(t);break;case 21:break;default:Be(e,t),Ze(t)}}function Ze(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(vc(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Jn(i,""),r.flags&=-33);var l=ta(t);to(t,l,i);break;case 3:case 4:var o=r.stateNode.containerInfo,s=ta(t);eo(t,s,o);break;default:throw Error(E(161))}}catch(u){ne(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Gp(t,e,n){L=t,xc(t)}function xc(t,e,n){for(var r=(t.mode&1)!==0;L!==null;){var i=L,l=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Mr;if(!o){var s=i.alternate,u=s!==null&&s.memoizedState!==null||ve;s=Mr;var c=ve;if(Mr=o,(ve=u)&&!c)for(L=i;L!==null;)o=L,u=o.child,o.tag===22&&o.memoizedState!==null?la(i):u!==null?(u.return=o,L=u):la(i);for(;l!==null;)L=l,xc(l),l=l.sibling;L=i,Mr=s,ve=c}ra(t)}else i.subtreeFlags&8772&&l!==null?(l.return=i,L=l):ra(t)}}function ra(t){for(;L!==null;){var e=L;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ve||Ri(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ve)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Ve(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=e.updateQueue;l!==null&&Ws(e,l,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ws(e,o,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var v=d.dehydrated;v!==null&&nr(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}ve||e.flags&512&&ql(e)}catch(p){ne(e,e.return,p)}}if(e===t){L=null;break}if(n=e.sibling,n!==null){n.return=e.return,L=n;break}L=e.return}}function ia(t){for(;L!==null;){var e=L;if(e===t){L=null;break}var n=e.sibling;if(n!==null){n.return=e.return,L=n;break}L=e.return}}function la(t){for(;L!==null;){var e=L;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ri(4,e)}catch(u){ne(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){ne(e,i,u)}}var l=e.return;try{ql(e)}catch(u){ne(e,l,u)}break;case 5:var o=e.return;try{ql(e)}catch(u){ne(e,o,u)}}}catch(u){ne(e,e.return,u)}if(e===t){L=null;break}var s=e.sibling;if(s!==null){s.return=e.return,L=s;break}L=e.return}}var Xp=Math.ceil,vi=mt.ReactCurrentDispatcher,Vo=mt.ReactCurrentOwner,Ae=mt.ReactCurrentBatchConfig,$=0,ue=null,le=null,pe=0,Pe=0,dn=zt(0),se=0,fr=null,Kt=0,Li=0,Ho=0,Kn=null,Ee=null,Qo=0,En=1/0,ot=null,gi=!1,no=null,Tt=null,Fr=!1,St=null,yi=0,Gn=0,ro=null,Kr=-1,Gr=0;function ke(){return $&6?re():Kr!==-1?Kr:Kr=re()}function Pt(t){return t.mode&1?$&2&&pe!==0?pe&-pe:Dp.transition!==null?(Gr===0&&(Gr=ru()),Gr):(t=U,t!==0||(t=window.event,t=t===void 0?16:cu(t.type)),t):1}function Ke(t,e,n,r){if(50<Gn)throw Gn=0,ro=null,Error(E(185));vr(t,n,r),(!($&2)||t!==ue)&&(t===ue&&(!($&2)&&(Li|=n),se===4&&wt(t,pe)),Te(t,r),n===1&&$===0&&!(e.mode&1)&&(En=re()+500,bi&&Mt()))}function Te(t,e){var n=t.callbackNode;Dd(t,e);var r=ti(t,t===ue?pe:0);if(r===0)n!==null&&hs(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&hs(n),e===1)t.tag===0?_p(oa.bind(null,t)):Pu(oa.bind(null,t)),Tp(function(){!($&6)&&Mt()}),n=null;else{switch(iu(r)){case 1:n=yo;break;case 4:n=tu;break;case 16:n=ei;break;case 536870912:n=nu;break;default:n=ei}n=bc(n,wc.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function wc(t,e){if(Kr=-1,Gr=0,$&6)throw Error(E(327));var n=t.callbackNode;if(gn()&&t.callbackNode!==n)return null;var r=ti(t,t===ue?pe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=xi(t,r);else{e=r;var i=$;$|=2;var l=Sc();(ue!==t||pe!==e)&&(ot=null,En=re()+500,Bt(t,e));do try{qp();break}catch(s){kc(t,s)}while(!0);Lo(),vi.current=l,$=i,le!==null?e=0:(ue=null,pe=0,e=se)}if(e!==0){if(e===2&&(i=Rl(t),i!==0&&(r=i,e=io(t,i))),e===1)throw n=fr,Bt(t,0),wt(t,r),Te(t,re()),n;if(e===6)wt(t,r);else{if(i=t.current.alternate,!(r&30)&&!Zp(i)&&(e=xi(t,r),e===2&&(l=Rl(t),l!==0&&(r=l,e=io(t,l))),e===1))throw n=fr,Bt(t,0),wt(t,r),Te(t,re()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(E(345));case 2:At(t,Ee,ot);break;case 3:if(wt(t,r),(r&130023424)===r&&(e=Qo+500-re(),10<e)){if(ti(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){ke(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Ol(At.bind(null,t,Ee,ot),e);break}At(t,Ee,ot);break;case 4:if(wt(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Ye(r);l=1<<o,o=e[o],o>i&&(i=o),r&=~l}if(r=i,r=re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Xp(r/1960))-r,10<r){t.timeoutHandle=Ol(At.bind(null,t,Ee,ot),r);break}At(t,Ee,ot);break;case 5:At(t,Ee,ot);break;default:throw Error(E(329))}}}return Te(t,re()),t.callbackNode===n?wc.bind(null,t):null}function io(t,e){var n=Kn;return t.current.memoizedState.isDehydrated&&(Bt(t,e).flags|=256),t=xi(t,e),t!==2&&(e=Ee,Ee=n,e!==null&&lo(e)),t}function lo(t){Ee===null?Ee=t:Ee.push.apply(Ee,t)}function Zp(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],l=i.getSnapshot;i=i.value;try{if(!Ge(l(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wt(t,e){for(e&=~Ho,e&=~Li,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Ye(e),r=1<<n;t[n]=-1,e&=~r}}function oa(t){if($&6)throw Error(E(327));gn();var e=ti(t,0);if(!(e&1))return Te(t,re()),null;var n=xi(t,e);if(t.tag!==0&&n===2){var r=Rl(t);r!==0&&(e=r,n=io(t,r))}if(n===1)throw n=fr,Bt(t,0),wt(t,e),Te(t,re()),n;if(n===6)throw Error(E(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,At(t,Ee,ot),Te(t,re()),null}function Yo(t,e){var n=$;$|=1;try{return t(e)}finally{$=n,$===0&&(En=re()+500,bi&&Mt())}}function Gt(t){St!==null&&St.tag===0&&!($&6)&&gn();var e=$;$|=1;var n=Ae.transition,r=U;try{if(Ae.transition=null,U=1,t)return t()}finally{U=r,Ae.transition=n,$=e,!($&6)&&Mt()}}function Ko(){Pe=dn.current,K(dn)}function Bt(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,bp(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(To(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&oi();break;case 3:Sn(),K(je),K(ge),Io();break;case 5:Fo(r);break;case 4:Sn();break;case 13:K(J);break;case 19:K(J);break;case 10:_o(r.type._context);break;case 22:case 23:Ko()}n=n.return}if(ue=t,le=t=Rt(t.current,null),pe=Pe=e,se=0,fr=null,Ho=Li=Kt=0,Ee=Kn=null,Wt!==null){for(e=0;e<Wt.length;e++)if(n=Wt[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=i,r.next=o}n.pending=r}Wt=null}return t}function kc(t,e){do{var n=le;try{if(Lo(),Hr.current=mi,hi){for(var r=q.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}hi=!1}if(Yt=0,ae=oe=q=null,Qn=!1,cr=0,Vo.current=null,n===null||n.return===null){se=1,fr=e,le=null;break}e:{var l=t,o=n.return,s=n,u=e;if(e=pe,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=s,v=d.tag;if(!(d.mode&1)&&(v===0||v===11||v===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=Ys(o);if(g!==null){g.flags&=-257,Ks(g,o,s,l,e),g.mode&1&&Qs(l,c,e),e=g,u=c;var y=e.updateQueue;if(y===null){var w=new Set;w.add(u),e.updateQueue=w}else y.add(u);break e}else{if(!(e&1)){Qs(l,c,e),Go();break e}u=Error(E(426))}}else if(X&&s.mode&1){var N=Ys(o);if(N!==null){!(N.flags&65536)&&(N.flags|=256),Ks(N,o,s,l,e),Po(Cn(u,s));break e}}l=u=Cn(u,s),se!==4&&(se=2),Kn===null?Kn=[l]:Kn.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,e&=-e,l.lanes|=e;var h=ic(l,u,e);$s(l,h);break e;case 1:s=u;var f=l.type,m=l.stateNode;if(!(l.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Tt===null||!Tt.has(m)))){l.flags|=65536,e&=-e,l.lanes|=e;var k=lc(l,s,e);$s(l,k);break e}}l=l.return}while(l!==null)}Ec(n)}catch(j){e=j,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function Sc(){var t=vi.current;return vi.current=mi,t===null?mi:t}function Go(){(se===0||se===3||se===2)&&(se=4),ue===null||!(Kt&268435455)&&!(Li&268435455)||wt(ue,pe)}function xi(t,e){var n=$;$|=2;var r=Sc();(ue!==t||pe!==e)&&(ot=null,Bt(t,e));do try{Jp();break}catch(i){kc(t,i)}while(!0);if(Lo(),$=n,vi.current=r,le!==null)throw Error(E(261));return ue=null,pe=0,se}function Jp(){for(;le!==null;)Cc(le)}function qp(){for(;le!==null&&!Ed();)Cc(le)}function Cc(t){var e=jc(t.alternate,t,Pe);t.memoizedProps=t.pendingProps,e===null?Ec(t):le=e,Vo.current=null}function Ec(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Qp(n,e),n!==null){n.flags&=32767,le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{se=6,le=null;return}}else if(n=Hp(n,e,Pe),n!==null){le=n;return}if(e=e.sibling,e!==null){le=e;return}le=e=t}while(e!==null);se===0&&(se=5)}function At(t,e,n){var r=U,i=Ae.transition;try{Ae.transition=null,U=1,ef(t,e,n,r)}finally{Ae.transition=i,U=r}return null}function ef(t,e,n,r){do gn();while(St!==null);if($&6)throw Error(E(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(E(177));t.callbackNode=null,t.callbackPriority=0;var l=n.lanes|n.childLanes;if(zd(t,l),t===ue&&(le=ue=null,pe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Fr||(Fr=!0,bc(ei,function(){return gn(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Ae.transition,Ae.transition=null;var o=U;U=1;var s=$;$|=4,Vo.current=null,Kp(t,n),yc(n,t),wp(Fl),ni=!!Ml,Fl=Ml=null,t.current=n,Gp(n),Nd(),$=s,U=o,Ae.transition=l}else t.current=n;if(Fr&&(Fr=!1,St=t,yi=i),l=t.pendingLanes,l===0&&(Tt=null),Td(n.stateNode),Te(t,re()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(gi)throw gi=!1,t=no,no=null,t;return yi&1&&t.tag!==0&&gn(),l=t.pendingLanes,l&1?t===ro?Gn++:(Gn=0,ro=t):Gn=0,Mt(),null}function gn(){if(St!==null){var t=iu(yi),e=Ae.transition,n=U;try{if(Ae.transition=null,U=16>t?16:t,St===null)var r=!1;else{if(t=St,St=null,yi=0,$&6)throw Error(E(331));var i=$;for($|=4,L=t.current;L!==null;){var l=L,o=l.child;if(L.flags&16){var s=l.deletions;if(s!==null){for(var u=0;u<s.length;u++){var c=s[u];for(L=c;L!==null;){var d=L;switch(d.tag){case 0:case 11:case 15:Yn(8,d,l)}var v=d.child;if(v!==null)v.return=d,L=v;else for(;L!==null;){d=L;var p=d.sibling,g=d.return;if(mc(d),d===c){L=null;break}if(p!==null){p.return=g,L=p;break}L=g}}}var y=l.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var N=w.sibling;w.sibling=null,w=N}while(w!==null)}}L=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,L=o;else e:for(;L!==null;){if(l=L,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Yn(9,l,l.return)}var h=l.sibling;if(h!==null){h.return=l.return,L=h;break e}L=l.return}}var f=t.current;for(L=f;L!==null;){o=L;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,L=m;else e:for(o=f;L!==null;){if(s=L,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ri(9,s)}}catch(j){ne(s,s.return,j)}if(s===o){L=null;break e}var k=s.sibling;if(k!==null){k.return=s.return,L=k;break e}L=s.return}}if($=i,Mt(),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Si,t)}catch{}r=!0}return r}finally{U=n,Ae.transition=e}}return!1}function sa(t,e,n){e=Cn(n,e),e=ic(t,e,1),t=bt(t,e,1),e=ke(),t!==null&&(vr(t,1,e),Te(t,e))}function ne(t,e,n){if(t.tag===3)sa(t,t,n);else for(;e!==null;){if(e.tag===3){sa(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Tt===null||!Tt.has(r))){t=Cn(n,t),t=lc(e,t,1),e=bt(e,t,1),t=ke(),e!==null&&(vr(e,1,t),Te(e,t));break}}e=e.return}}function tf(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=ke(),t.pingedLanes|=t.suspendedLanes&n,ue===t&&(pe&n)===n&&(se===4||se===3&&(pe&130023424)===pe&&500>re()-Qo?Bt(t,0):Ho|=n),Te(t,e)}function Nc(t,e){e===0&&(t.mode&1?(e=jr,jr<<=1,!(jr&130023424)&&(jr=4194304)):e=1);var n=ke();t=ft(t,e),t!==null&&(vr(t,e,n),Te(t,n))}function nf(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Nc(t,n)}function rf(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(e),Nc(t,n)}var jc;jc=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||je.current)Ne=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Ne=!1,Vp(t,e,n);Ne=!!(t.flags&131072)}else Ne=!1,X&&e.flags&1048576&&Ru(e,ui,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Yr(t,e),t=e.pendingProps;var i=xn(e,ge.current);vn(e,n),i=Ao(null,e,r,t,i,n);var l=$o();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,be(r)?(l=!0,si(e)):l=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,zo(e),i.updater=Pi,e.stateNode=i,i._reactInternals=e,Hl(e,r,t,n),e=Kl(null,e,r,!0,l,n)):(e.tag=0,X&&l&&bo(e),xe(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Yr(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=of(r),t=Ve(r,t),i){case 0:e=Yl(null,e,r,t,n);break e;case 1:e=Zs(null,e,r,t,n);break e;case 11:e=Gs(null,e,r,t,n);break e;case 14:e=Xs(null,e,r,Ve(r.type,t),n);break e}throw Error(E(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ve(r,i),Yl(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ve(r,i),Zs(t,e,r,i,n);case 3:e:{if(uc(e),t===null)throw Error(E(387));r=e.pendingProps,l=e.memoizedState,i=l.element,Fu(t,e),pi(e,r,null,n);var o=e.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=l,e.memoizedState=l,e.flags&256){i=Cn(Error(E(423)),e),e=Js(t,e,r,n,i);break e}else if(r!==i){i=Cn(Error(E(424)),e),e=Js(t,e,r,n,i);break e}else for(Re=jt(e.stateNode.containerInfo.firstChild),Le=e,X=!0,Qe=null,n=zu(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(wn(),r===i){e=ht(t,e,n);break e}xe(t,e,r,n)}e=e.child}return e;case 5:return Iu(e),t===null&&Ul(e),r=e.type,i=e.pendingProps,l=t!==null?t.memoizedProps:null,o=i.children,Il(r,i)?o=null:l!==null&&Il(r,l)&&(e.flags|=32),ac(t,e),xe(t,e,o,n),e.child;case 6:return t===null&&Ul(e),null;case 13:return cc(t,e,n);case 4:return Mo(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=kn(e,null,r,n):xe(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ve(r,i),Gs(t,e,r,i,n);case 7:return xe(t,e,e.pendingProps,n),e.child;case 8:return xe(t,e,e.pendingProps.children,n),e.child;case 12:return xe(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,l=e.memoizedProps,o=i.value,H(ci,r._currentValue),r._currentValue=o,l!==null)if(Ge(l.value,o)){if(l.children===i.children&&!je.current){e=ht(t,e,n);break e}}else for(l=e.child,l!==null&&(l.return=e);l!==null;){var s=l.dependencies;if(s!==null){o=l.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=ct(-1,n&-n),u.tag=2;var c=l.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}l.lanes|=n,u=l.alternate,u!==null&&(u.lanes|=n),Bl(l.return,n,e),s.lanes|=n;break}u=u.next}}else if(l.tag===10)o=l.type===e.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(E(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Bl(o,n,e),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}xe(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,vn(e,n),i=$e(i),r=r(i),e.flags|=1,xe(t,e,r,n),e.child;case 14:return r=e.type,i=Ve(r,e.pendingProps),i=Ve(r.type,i),Xs(t,e,r,i,n);case 15:return oc(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ve(r,i),Yr(t,e),e.tag=1,be(r)?(t=!0,si(e)):t=!1,vn(e,n),rc(e,r,i),Hl(e,r,i,n),Kl(null,e,r,!0,t,n);case 19:return dc(t,e,n);case 22:return sc(t,e,n)}throw Error(E(156,e.tag))};function bc(t,e){return eu(t,e)}function lf(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Oe(t,e,n,r){return new lf(t,e,n,r)}function Xo(t){return t=t.prototype,!(!t||!t.isReactComponent)}function of(t){if(typeof t=="function")return Xo(t)?1:0;if(t!=null){if(t=t.$$typeof,t===mo)return 11;if(t===vo)return 14}return 2}function Rt(t,e){var n=t.alternate;return n===null?(n=Oe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Xr(t,e,n,r,i,l){var o=2;if(r=t,typeof t=="function")Xo(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case en:return Vt(n.children,i,l,e);case ho:o=8,i|=8;break;case ml:return t=Oe(12,n,e,i|2),t.elementType=ml,t.lanes=l,t;case vl:return t=Oe(13,n,e,i),t.elementType=vl,t.lanes=l,t;case gl:return t=Oe(19,n,e,i),t.elementType=gl,t.lanes=l,t;case Ia:return _i(n,i,l,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ma:o=10;break e;case Fa:o=9;break e;case mo:o=11;break e;case vo:o=14;break e;case gt:o=16,r=null;break e}throw Error(E(130,t==null?t:typeof t,""))}return e=Oe(o,n,e,i),e.elementType=t,e.type=r,e.lanes=l,e}function Vt(t,e,n,r){return t=Oe(7,t,r,e),t.lanes=n,t}function _i(t,e,n,r){return t=Oe(22,t,r,e),t.elementType=Ia,t.lanes=n,t.stateNode={isHidden:!1},t}function sl(t,e,n){return t=Oe(6,t,null,e),t.lanes=n,t}function al(t,e,n){return e=Oe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function sf(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ui(0),this.expirationTimes=Ui(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ui(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Zo(t,e,n,r,i,l,o,s,u){return t=new sf(t,e,n,s,u),e===1?(e=1,l===!0&&(e|=8)):e=0,l=Oe(3,null,null,e),t.current=l,l.stateNode=t,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},zo(l),t}function af(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qt,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Tc(t){if(!t)return _t;t=t._reactInternals;e:{if(Zt(t)!==t||t.tag!==1)throw Error(E(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(be(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(E(171))}if(t.tag===1){var n=t.type;if(be(n))return Tu(t,n,e)}return e}function Pc(t,e,n,r,i,l,o,s,u){return t=Zo(n,r,!0,t,i,l,o,s,u),t.context=Tc(null),n=t.current,r=ke(),i=Pt(n),l=ct(r,i),l.callback=e??null,bt(n,l,i),t.current.lanes=i,vr(t,i,r),Te(t,r),t}function Di(t,e,n,r){var i=e.current,l=ke(),o=Pt(i);return n=Tc(n),e.context===null?e.context=n:e.pendingContext=n,e=ct(l,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=bt(i,e,o),t!==null&&(Ke(t,i,o,l),Vr(t,i,o)),o}function wi(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function aa(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Jo(t,e){aa(t,e),(t=t.alternate)&&aa(t,e)}function uf(){return null}var Rc=typeof reportError=="function"?reportError:function(t){console.error(t)};function qo(t){this._internalRoot=t}zi.prototype.render=qo.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(E(409));Di(t,e,null,null)};zi.prototype.unmount=qo.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gt(function(){Di(null,t,null,null)}),e[pt]=null}};function zi(t){this._internalRoot=t}zi.prototype.unstable_scheduleHydration=function(t){if(t){var e=su();t={blockedOn:null,target:t,priority:e};for(var n=0;n<xt.length&&e!==0&&e<xt[n].priority;n++);xt.splice(n,0,t),n===0&&uu(t)}};function es(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Mi(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ua(){}function cf(t,e,n,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var c=wi(o);l.call(c)}}var o=Pc(e,r,t,0,null,!1,!1,"",ua);return t._reactRootContainer=o,t[pt]=o.current,lr(t.nodeType===8?t.parentNode:t),Gt(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var c=wi(u);s.call(c)}}var u=Zo(t,0,!1,null,null,!1,!1,"",ua);return t._reactRootContainer=u,t[pt]=u.current,lr(t.nodeType===8?t.parentNode:t),Gt(function(){Di(e,u,n,r)}),u}function Fi(t,e,n,r,i){var l=n._reactRootContainer;if(l){var o=l;if(typeof i=="function"){var s=i;i=function(){var u=wi(o);s.call(u)}}Di(e,o,t,i)}else o=cf(n,e,t,i,r);return wi(o)}lu=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=An(e.pendingLanes);n!==0&&(xo(e,n|1),Te(e,re()),!($&6)&&(En=re()+500,Mt()))}break;case 13:Gt(function(){var r=ft(t,1);if(r!==null){var i=ke();Ke(r,t,1,i)}}),Jo(t,1)}};wo=function(t){if(t.tag===13){var e=ft(t,134217728);if(e!==null){var n=ke();Ke(e,t,134217728,n)}Jo(t,134217728)}};ou=function(t){if(t.tag===13){var e=Pt(t),n=ft(t,e);if(n!==null){var r=ke();Ke(n,t,e,r)}Jo(t,e)}};su=function(){return U};au=function(t,e){var n=U;try{return U=t,e()}finally{U=n}};bl=function(t,e,n){switch(e){case"input":if(wl(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=ji(r);if(!i)throw Error(E(90));Aa(r),wl(r,i)}}}break;case"textarea":Wa(t,n);break;case"select":e=n.value,e!=null&&pn(t,!!n.multiple,e,!1)}};Ka=Yo;Ga=Gt;var df={usingClientEntryPoint:!1,Events:[yr,ln,ji,Qa,Ya,Yo]},Fn={findFiberByHostInstance:$t,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pf={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:mt.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Ja(t),t===null?null:t.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||uf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ir=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ir.isDisabled&&Ir.supportsFiber)try{Si=Ir.inject(pf),tt=Ir}catch{}}De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=df;De.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!es(e))throw Error(E(200));return af(t,e,null,n)};De.createRoot=function(t,e){if(!es(t))throw Error(E(299));var n=!1,r="",i=Rc;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Zo(t,1,!1,null,null,n,!1,r,i),t[pt]=e.current,lr(t.nodeType===8?t.parentNode:t),new qo(e)};De.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(E(188)):(t=Object.keys(t).join(","),Error(E(268,t)));return t=Ja(e),t=t===null?null:t.stateNode,t};De.flushSync=function(t){return Gt(t)};De.hydrate=function(t,e,n){if(!Mi(e))throw Error(E(200));return Fi(null,t,e,!0,n)};De.hydrateRoot=function(t,e,n){if(!es(t))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,i=!1,l="",o=Rc;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Pc(e,null,t,1,n??null,i,!1,l,o),t[pt]=e.current,lr(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new zi(e)};De.render=function(t,e,n){if(!Mi(e))throw Error(E(200));return Fi(null,t,e,!1,n)};De.unmountComponentAtNode=function(t){if(!Mi(t))throw Error(E(40));return t._reactRootContainer?(Gt(function(){Fi(null,null,t,!1,function(){t._reactRootContainer=null,t[pt]=null})}),!0):!1};De.unstable_batchedUpdates=Yo;De.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Mi(n))throw Error(E(200));if(t==null||t._reactInternals===void 0)throw Error(E(38));return Fi(t,e,n,!1,r)};De.version="18.3.1-next-f1338f8080-20240426";function Lc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lc)}catch(t){console.error(t)}}Lc(),La.exports=De;var ff=La.exports,ca=ff;fl.createRoot=ca.createRoot,fl.hydrateRoot=ca.hydrateRoot;const hf={layers:[{id:"video-layer-1",name:"Video Track 1",type:"video",clips:[],zIndex:2},{id:"audio-layer-1",name:"Audio Track 1",type:"audio",clips:[],zIndex:1}],currentTime:0,duration:0,selectedClip:null,selectedLayer:null,isPlaying:!1},te={ADD_CLIP:"ADD_CLIP",REMOVE_CLIP:"REMOVE_CLIP",UPDATE_CLIP:"UPDATE_CLIP",MOVE_CLIP:"MOVE_CLIP",SELECT_CLIP:"SELECT_CLIP",SELECT_LAYER:"SELECT_LAYER",SET_CURRENT_TIME:"SET_CURRENT_TIME",SET_DURATION:"SET_DURATION",SET_PLAYING:"SET_PLAYING",ADD_LAYER:"ADD_LAYER",REMOVE_LAYER:"REMOVE_LAYER"};function mf(t,e){switch(e.type){case te.ADD_CLIP:{const{layerId:n,clip:r}=e.payload;return{...t,layers:t.layers.map(i=>i.id===n?{...i,clips:[...i.clips,{...r,id:`clip-${Date.now()}`}]}:i)}}case te.REMOVE_CLIP:{const{layerId:n,clipId:r}=e.payload;return{...t,layers:t.layers.map(i=>i.id===n?{...i,clips:i.clips.filter(l=>l.id!==r)}:i),selectedClip:t.selectedClip===r?null:t.selectedClip}}case te.UPDATE_CLIP:{const{layerId:n,clipId:r,updates:i}=e.payload;return{...t,layers:t.layers.map(l=>l.id===n?{...l,clips:l.clips.map(o=>o.id===r?{...o,...i}:o)}:l)}}case te.MOVE_CLIP:{const{fromLayerId:n,toLayerId:r,clipId:i,newStartTime:l}=e.payload,o=t.layers.find(s=>s.id===n)?.clips.find(s=>s.id===i);return o?{...t,layers:t.layers.map(s=>s.id===n?{...s,clips:s.clips.filter(u=>u.id!==i)}:s.id===r?{...s,clips:[...s.clips,{...o,start:l}]}:s)}:t}case te.SELECT_CLIP:return{...t,selectedClip:e.payload.clipId,selectedLayer:e.payload.layerId};case te.SELECT_LAYER:return{...t,selectedLayer:e.payload.layerId};case te.SET_CURRENT_TIME:return{...t,currentTime:e.payload.currentTime};case te.SET_DURATION:return{...t,duration:e.payload.duration};case te.SET_PLAYING:return{...t,isPlaying:e.payload.isPlaying};case te.ADD_LAYER:return{...t,layers:[...t.layers,{id:`layer-${Date.now()}`,name:e.payload.name,type:e.payload.type,clips:[],zIndex:t.layers.length+1}]};case te.REMOVE_LAYER:return{...t,layers:t.layers.filter(n=>n.id!==e.payload.layerId)};default:return t}}const vf=S.createContext();function da({children:t}){const[e,n]=S.useReducer(mf,hf),r={addClip:S.useCallback((l,o)=>{n({type:te.ADD_CLIP,payload:{layerId:l,clip:o}})},[]),removeClip:S.useCallback((l,o)=>{n({type:te.REMOVE_CLIP,payload:{layerId:l,clipId:o}})},[]),updateClip:S.useCallback((l,o,s)=>{n({type:te.UPDATE_CLIP,payload:{layerId:l,clipId:o,updates:s}})},[]),moveClip:S.useCallback((l,o,s,u)=>{n({type:te.MOVE_CLIP,payload:{fromLayerId:l,toLayerId:o,clipId:s,newStartTime:u}})},[]),selectClip:S.useCallback((l,o)=>{n({type:te.SELECT_CLIP,payload:{clipId:l,layerId:o}})},[]),selectLayer:S.useCallback(l=>{n({type:te.SELECT_LAYER,payload:{layerId:l}})},[]),setCurrentTime:S.useCallback(l=>{n({type:te.SET_CURRENT_TIME,payload:{currentTime:l}})},[]),setDuration:S.useCallback(l=>{n({type:te.SET_DURATION,payload:{duration:l}})},[]),setPlaying:S.useCallback(l=>{n({type:te.SET_PLAYING,payload:{isPlaying:l}})},[]),addLayer:S.useCallback((l,o)=>{n({type:te.ADD_LAYER,payload:{name:l,type:o}})},[]),removeLayer:S.useCallback(l=>{n({type:te.REMOVE_LAYER,payload:{layerId:l}})},[])},i={...e,...r};return a.jsx(vf.Provider,{value:i,children:t})}function we(t,e,n,r){return new(n||(n=Promise))(function(i,l){function o(c){try{u(r.next(c))}catch(d){l(d)}}function s(c){try{u(r.throw(c))}catch(d){l(d)}}function u(c){var d;c.done?i(c.value):(d=c.value,d instanceof n?d:new n(function(v){v(d)})).then(o,s)}u((r=r.apply(t,e||[])).next())})}class wr{constructor(){this.listeners={}}on(e,n,r){if(this.listeners[e]||(this.listeners[e]=new Set),r?.once){const i=(...l)=>{this.un(e,i),n(...l)};return this.listeners[e].add(i),()=>this.un(e,i)}return this.listeners[e].add(n),()=>this.un(e,n)}un(e,n){var r;(r=this.listeners[e])===null||r===void 0||r.delete(n)}once(e,n){return this.on(e,n,{once:!0})}unAll(){this.listeners={}}emit(e,...n){this.listeners[e]&&this.listeners[e].forEach(r=>r(...n))}}const Or={decode:function(t,e){return we(this,void 0,void 0,function*(){const n=new AudioContext({sampleRate:e});try{return yield n.decodeAudioData(t)}finally{n.close()}})},createBuffer:function(t,e){if(!t||t.length===0)throw new Error("channelData must be a non-empty array");if(e<=0)throw new Error("duration must be greater than 0");if(typeof t[0]=="number"&&(t=[t]),!t[0]||t[0].length===0)throw new Error("channelData must contain non-empty channel arrays");(function(r){const i=r[0];if(i.some(l=>l>1||l<-1)){const l=i.length;let o=0;for(let s=0;s<l;s++){const u=Math.abs(i[s]);u>o&&(o=u)}for(const s of r)for(let u=0;u<l;u++)s[u]/=o}})(t);const n=t.map(r=>r instanceof Float32Array?r:Float32Array.from(r));return{duration:e,length:n[0].length,sampleRate:n[0].length/e,numberOfChannels:n.length,getChannelData:r=>{const i=n[r];if(!i)throw new Error(`Channel ${r} not found`);return i},copyFromChannel:AudioBuffer.prototype.copyFromChannel,copyToChannel:AudioBuffer.prototype.copyToChannel}}};function _c(t,e){const n=e.xmlns?document.createElementNS(e.xmlns,t):document.createElement(t);for(const[r,i]of Object.entries(e))if(r==="children"&&i)for(const[l,o]of Object.entries(i))o instanceof Node?n.appendChild(o):typeof o=="string"?n.appendChild(document.createTextNode(o)):n.appendChild(_c(l,o));else r==="style"?Object.assign(n.style,i):r==="textContent"?n.textContent=i:n.setAttribute(r,i.toString());return n}function pa(t,e,n){const r=_c(t,e||{});return n?.appendChild(r),r}var gf=Object.freeze({__proto__:null,createElement:pa,default:pa});const yf={fetchBlob:function(t,e,n){return we(this,void 0,void 0,function*(){const r=yield fetch(t,n);if(r.status>=400)throw new Error(`Failed to fetch ${t}: ${r.status} (${r.statusText})`);return function(i,l){we(this,void 0,void 0,function*(){if(!i.body||!i.headers)return;const o=i.body.getReader(),s=Number(i.headers.get("Content-Length"))||0;let u=0;const c=d=>{u+=d?.length||0;const v=Math.round(u/s*100);l(v)};try{for(;;){const d=yield o.read();if(d.done)break;c(d.value)}}catch(d){console.warn("Progress tracking error:",d)}})}(r.clone(),e),r.blob()})}};class xf extends wr{constructor(e){super(),this.isExternalMedia=!1,e.media?(this.media=e.media,this.isExternalMedia=!0):this.media=document.createElement("audio"),e.mediaControls&&(this.media.controls=!0),e.autoplay&&(this.media.autoplay=!0),e.playbackRate!=null&&this.onMediaEvent("canplay",()=>{e.playbackRate!=null&&(this.media.playbackRate=e.playbackRate)},{once:!0})}onMediaEvent(e,n,r){return this.media.addEventListener(e,n,r),()=>this.media.removeEventListener(e,n,r)}getSrc(){return this.media.currentSrc||this.media.src||""}revokeSrc(){const e=this.getSrc();e.startsWith("blob:")&&URL.revokeObjectURL(e)}canPlayType(e){return this.media.canPlayType(e)!==""}setSrc(e,n){const r=this.getSrc();if(e&&r===e)return;this.revokeSrc();const i=n instanceof Blob&&(this.canPlayType(n.type)||!e)?URL.createObjectURL(n):e;if(r&&this.media.removeAttribute("src"),i||e)try{this.media.src=i}catch{this.media.src=e}}destroy(){this.isExternalMedia||(this.media.pause(),this.revokeSrc(),this.media.removeAttribute("src"),this.media.load(),this.media.remove())}setMediaElement(e){this.media=e}play(){return we(this,void 0,void 0,function*(){try{return yield this.media.play()}catch(e){if(e instanceof DOMException&&e.name==="AbortError")return;throw e}})}pause(){this.media.pause()}isPlaying(){return!this.media.paused&&!this.media.ended}setTime(e){this.media.currentTime=Math.max(0,Math.min(e,this.getDuration()))}getDuration(){return this.media.duration}getCurrentTime(){return this.media.currentTime}getVolume(){return this.media.volume}setVolume(e){this.media.volume=e}getMuted(){return this.media.muted}setMuted(e){this.media.muted=e}getPlaybackRate(){return this.media.playbackRate}isSeeking(){return this.media.seeking}setPlaybackRate(e,n){n!=null&&(this.media.preservesPitch=n),this.media.playbackRate=e}getMediaElement(){return this.media}setSinkId(e){return this.media.setSinkId(e)}}function ul(t){return t<0?0:t>1?1:t}function wf({maxTop:t,maxBottom:e,halfHeight:n,vScale:r}){const i=Math.round(t*n*r);return{topHeight:i,totalHeight:i+Math.round(e*n*r)||1}}function kf({barAlign:t,halfHeight:e,topHeight:n,totalHeight:r,canvasHeight:i}){return t==="top"?0:t==="bottom"?i-r:e-n}function fa(t,e,n){const r=e-t.left,i=n-t.top;return[r/t.width,i/t.height]}function Dc(t){return!!(t.barWidth||t.barGap||t.barAlign)}function ha(t,e){if(!Dc(e))return t;const n=e.barWidth||.5,r=n+(e.barGap||n/2);return r===0?t:Math.floor(t/r)*r}function ma({scrollLeft:t,totalWidth:e,numCanvases:n}){if(e===0)return[0];const r=t/e,i=Math.floor(r*n);return[i-1,i,i+1]}function va({scrollLeft:t,clientWidth:e,scrollWidth:n}){return n===0?{startX:0,endX:0}:{startX:t/n,endX:(t+e)/n}}class Sf extends wr{constructor(e,n){super(),this.timeouts=[],this.isScrollable=!1,this.audioData=null,this.resizeObserver=null,this.lastContainerWidth=0,this.isDragging=!1,this.subscriptions=[],this.unsubscribeOnScroll=[],this.dragUnsubscribe=null,this.subscriptions=[],this.options=e;const r=this.parentFromOptionsContainer(e.container);this.parent=r;const[i,l]=this.initHtml();r.appendChild(i),this.container=i,this.scrollContainer=l.querySelector(".scroll"),this.wrapper=l.querySelector(".wrapper"),this.canvasWrapper=l.querySelector(".canvases"),this.progressWrapper=l.querySelector(".progress"),this.cursor=l.querySelector(".cursor"),n&&l.appendChild(n),this.initEvents()}parentFromOptionsContainer(e){let n;if(typeof e=="string"?n=document.querySelector(e):e instanceof HTMLElement&&(n=e),!n)throw new Error("Container not found");return n}initEvents(){if(this.wrapper.addEventListener("click",e=>{const n=this.wrapper.getBoundingClientRect(),[r,i]=fa(n,e.clientX,e.clientY);this.emit("click",r,i)}),this.wrapper.addEventListener("dblclick",e=>{const n=this.wrapper.getBoundingClientRect(),[r,i]=fa(n,e.clientX,e.clientY);this.emit("dblclick",r,i)}),this.options.dragToSeek!==!0&&typeof this.options.dragToSeek!="object"||this.initDrag(),this.scrollContainer.addEventListener("scroll",()=>{const{scrollLeft:e,scrollWidth:n,clientWidth:r}=this.scrollContainer,{startX:i,endX:l}=va({scrollLeft:e,scrollWidth:n,clientWidth:r});this.emit("scroll",i,l,e,e+r)}),typeof ResizeObserver=="function"){const e=this.createDelay(100);this.resizeObserver=new ResizeObserver(()=>{e().then(()=>this.onContainerResize()).catch(()=>{})}),this.resizeObserver.observe(this.scrollContainer)}}onContainerResize(){const e=this.parent.clientWidth;e===this.lastContainerWidth&&this.options.height!=="auto"||(this.lastContainerWidth=e,this.reRender(),this.emit("resize"))}initDrag(){this.dragUnsubscribe||(this.dragUnsubscribe=function(e,n,r,i,l=3,o=0,s=100){if(!e)return()=>{};const u=new Map,c=matchMedia("(pointer: coarse)").matches;let d=()=>{};const v=p=>{if(p.button!==o||(u.set(p.pointerId,p),u.size>1))return;let g=p.clientX,y=p.clientY,w=!1;const N=Date.now(),h=C=>{if(C.defaultPrevented||u.size>1||c&&Date.now()-N<s)return;const b=C.clientX,P=C.clientY,M=b-g,D=P-y;if(w||Math.abs(M)>l||Math.abs(D)>l){C.preventDefault(),C.stopPropagation();const F=e.getBoundingClientRect(),{left:G,top:Q}=F;w||(r?.(g-G,y-Q),w=!0),n(M,D,b-G,P-Q),g=b,y=P}},f=C=>{if(u.delete(C.pointerId),w){const b=C.clientX,P=C.clientY,M=e.getBoundingClientRect(),{left:D,top:F}=M;i?.(b-D,P-F)}d()},m=C=>{u.delete(C.pointerId),C.relatedTarget&&C.relatedTarget!==document.documentElement||f(C)},k=C=>{w&&(C.stopPropagation(),C.preventDefault())},j=C=>{C.defaultPrevented||u.size>1||w&&C.preventDefault()};document.addEventListener("pointermove",h),document.addEventListener("pointerup",f),document.addEventListener("pointerout",m),document.addEventListener("pointercancel",m),document.addEventListener("touchmove",j,{passive:!1}),document.addEventListener("click",k,{capture:!0}),d=()=>{document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",f),document.removeEventListener("pointerout",m),document.removeEventListener("pointercancel",m),document.removeEventListener("touchmove",j),setTimeout(()=>{document.removeEventListener("click",k,{capture:!0})},10)}};return e.addEventListener("pointerdown",v),()=>{d(),e.removeEventListener("pointerdown",v),u.clear()}}(this.wrapper,(e,n,r)=>{const i=this.wrapper.getBoundingClientRect().width;this.emit("drag",ul(r/i))},e=>{this.isDragging=!0;const n=this.wrapper.getBoundingClientRect().width;this.emit("dragstart",ul(e/n))},e=>{this.isDragging=!1;const n=this.wrapper.getBoundingClientRect().width;this.emit("dragend",ul(e/n))}),this.subscriptions.push(this.dragUnsubscribe))}initHtml(){const e=document.createElement("div"),n=e.attachShadow({mode:"open"}),r=this.options.cspNonce&&typeof this.options.cspNonce=="string"?this.options.cspNonce.replace(/"/g,""):"";return n.innerHTML=`
      <style${r?` nonce="${r}"`:""}>
        :host {
          user-select: none;
          min-width: 1px;
        }
        :host audio {
          display: block;
          width: 100%;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          position: relative;
        }
        :host .noScrollbar {
          scrollbar-color: transparent;
          scrollbar-width: none;
        }
        :host .noScrollbar::-webkit-scrollbar {
          display: none;
          -webkit-appearance: none;
        }
        :host .wrapper {
          position: relative;
          overflow: visible;
          z-index: 2;
        }
        :host .canvases {
          min-height: ${this.getHeight(this.options.height,this.options.splitChannels)}px;
          pointer-events: none;
        }
        :host .canvases > div {
          position: relative;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          image-rendering: pixelated;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
        }
        :host .progress > div {
          position: relative;
        }
        :host .cursor {
          pointer-events: none;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 2px;
        }
      </style>

      <div class="scroll" part="scroll">
        <div class="wrapper" part="wrapper">
          <div class="canvases" part="canvases"></div>
          <div class="progress" part="progress"></div>
          <div class="cursor" part="cursor"></div>
        </div>
      </div>
    `,[e,n]}setOptions(e){if(this.options.container!==e.container){const n=this.parentFromOptionsContainer(e.container);n.appendChild(this.container),this.parent=n}e.dragToSeek!==!0&&typeof this.options.dragToSeek!="object"||this.initDrag(),this.options=e,this.reRender()}getWrapper(){return this.wrapper}getWidth(){return this.scrollContainer.clientWidth}getScroll(){return this.scrollContainer.scrollLeft}setScroll(e){this.scrollContainer.scrollLeft=e}setScrollPercentage(e){const{scrollWidth:n}=this.scrollContainer,r=n*e;this.setScroll(r)}destroy(){var e;this.subscriptions.forEach(n=>n()),this.container.remove(),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),(e=this.unsubscribeOnScroll)===null||e===void 0||e.forEach(n=>n()),this.unsubscribeOnScroll=[]}createDelay(e=10){let n,r;const i=()=>{n&&(clearTimeout(n),n=void 0),r&&(r(),r=void 0)};return this.timeouts.push(i),()=>new Promise((l,o)=>{i(),r=o,n=setTimeout(()=>{n=void 0,r=void 0,l()},e)})}getHeight(e,n){var r;const i=((r=this.audioData)===null||r===void 0?void 0:r.numberOfChannels)||1;return function({optionsHeight:l,optionsSplitChannels:o,parentHeight:s,numberOfChannels:u,defaultHeight:c=128}){if(l==null)return c;const d=Number(l);if(!isNaN(d))return d;if(l==="auto"){const v=s||c;return o?.every(p=>!p.overlay)?v/u:v}return c}({optionsHeight:e,optionsSplitChannels:n,parentHeight:this.parent.clientHeight,numberOfChannels:i,defaultHeight:128})}convertColorValues(e){return function(n,r){if(!Array.isArray(n))return n||"";if(n.length===0)return"#999";if(n.length<2)return n[0]||"";const i=document.createElement("canvas"),l=i.getContext("2d"),o=i.height*r,s=l.createLinearGradient(0,0,0,o||r),u=1/(n.length-1);return n.forEach((c,d)=>{s.addColorStop(d*u,c)}),s}(e,this.getPixelRatio())}getPixelRatio(){return e=window.devicePixelRatio,Math.max(1,e||1);var e}renderBarWaveform(e,n,r,i){const{width:l,height:o}=r.canvas,{halfHeight:s,barWidth:u,barRadius:c,barIndexScale:d,barSpacing:v}=function({width:g,height:y,length:w,options:N,pixelRatio:h}){const f=y/2,m=N.barWidth?N.barWidth*h:1,k=N.barGap?N.barGap*h:N.barWidth?m/2:0,j=m+k||1;return{halfHeight:f,barWidth:m,barGap:k,barRadius:N.barRadius||0,barIndexScale:w>0?g/j/w:0,barSpacing:j}}({width:l,height:o,length:(e[0]||[]).length,options:n,pixelRatio:this.getPixelRatio()}),p=function({channelData:g,barIndexScale:y,barSpacing:w,barWidth:N,halfHeight:h,vScale:f,canvasHeight:m,barAlign:k}){const j=g[0]||[],C=g[1]||j,b=j.length,P=[];let M=0,D=0,F=0;for(let G=0;G<=b;G++){const Q=Math.round(G*y);if(Q>M){const{topHeight:rt,totalHeight:Xe}=wf({maxTop:D,maxBottom:F,halfHeight:h,vScale:f}),x=kf({barAlign:k,halfHeight:h,topHeight:rt,totalHeight:Xe,canvasHeight:m});P.push({x:M*w,y:x,width:N,height:Xe}),M=Q,D=0,F=0}const B=Math.abs(j[G]||0),ce=Math.abs(C[G]||0);B>D&&(D=B),ce>F&&(F=ce)}return P}({channelData:e,barIndexScale:d,barSpacing:v,barWidth:u,halfHeight:s,vScale:i,canvasHeight:o,barAlign:n.barAlign});r.beginPath();for(const g of p)c&&"roundRect"in r?r.roundRect(g.x,g.y,g.width,g.height,c):r.rect(g.x,g.y,g.width,g.height);r.fill(),r.closePath()}renderLineWaveform(e,n,r,i){const{width:l,height:o}=r.canvas,s=function({channelData:u,width:c,height:d,vScale:v}){const p=d/2,g=u[0]||[];return[g,u[1]||g].map((y,w)=>{const N=y.length,h=N?c/N:0,f=p,m=w===0?-1:1,k=[{x:0,y:f}];let j=0,C=0;for(let b=0;b<=N;b++){const P=Math.round(b*h);if(P>j){const D=f+(Math.round(C*p*v)||1)*m;k.push({x:j,y:D}),j=P,C=0}const M=Math.abs(y[b]||0);M>C&&(C=M)}return k.push({x:j,y:f}),k})}({channelData:e,width:l,height:o,vScale:i});r.beginPath();for(const u of s)if(u.length){r.moveTo(u[0].x,u[0].y);for(let c=1;c<u.length;c++){const d=u[c];r.lineTo(d.x,d.y)}}r.fill(),r.closePath()}renderWaveform(e,n,r){if(r.fillStyle=this.convertColorValues(n.waveColor),n.renderFunction)return void n.renderFunction(e,r);const i=function({channelData:l,barHeight:o,normalize:s}){var u;const c=o||1;if(!s)return c;const d=l[0];if(!d||d.length===0)return c;let v=0;for(let p=0;p<d.length;p++){const g=(u=d[p])!==null&&u!==void 0?u:0,y=Math.abs(g);y>v&&(v=y)}return v?c/v:c}({channelData:e,barHeight:n.barHeight,normalize:n.normalize});Dc(n)?this.renderBarWaveform(e,n,r,i):this.renderLineWaveform(e,n,r,i)}renderSingleCanvas(e,n,r,i,l,o,s){const u=this.getPixelRatio(),c=document.createElement("canvas");c.width=Math.round(r*u),c.height=Math.round(i*u),c.style.width=`${r}px`,c.style.height=`${i}px`,c.style.left=`${Math.round(l)}px`,o.appendChild(c);const d=c.getContext("2d");if(n.renderFunction?(d.fillStyle=this.convertColorValues(n.waveColor),n.renderFunction(e,d)):this.renderWaveform(e,n,d),c.width>0&&c.height>0){const v=c.cloneNode(),p=v.getContext("2d");p.drawImage(c,0,0),p.globalCompositeOperation="source-in",p.fillStyle=this.convertColorValues(n.progressColor),p.fillRect(0,0,c.width,c.height),s.appendChild(v)}}renderMultiCanvas(e,n,r,i,l,o){const s=this.getPixelRatio(),{clientWidth:u}=this.scrollContainer,c=r/s,d=function({clientWidth:y,totalWidth:w,options:N}){return ha(Math.min(8e3,y,w),N)}({clientWidth:u,totalWidth:c,options:n});let v={};if(d===0)return;const p=y=>{if(y<0||y>=g||v[y])return;v[y]=!0;const w=y*d;let N=Math.min(c-w,d);if(N=ha(N,n),N<=0)return;const h=function({channelData:f,offset:m,clampedWidth:k,totalWidth:j}){return f.map(C=>{const b=Math.floor(m/j*C.length),P=Math.floor((m+k)/j*C.length);return C.slice(b,P)})}({channelData:e,offset:w,clampedWidth:N,totalWidth:c});this.renderSingleCanvas(h,n,N,i,w,l,o)},g=Math.ceil(c/d);if(!this.isScrollable){for(let y=0;y<g;y++)p(y);return}if(ma({scrollLeft:this.scrollContainer.scrollLeft,totalWidth:c,numCanvases:g}).forEach(y=>p(y)),g>1){const y=this.on("scroll",()=>{const{scrollLeft:w}=this.scrollContainer;Object.keys(v).length>10&&(l.innerHTML="",o.innerHTML="",v={}),ma({scrollLeft:w,totalWidth:c,numCanvases:g}).forEach(N=>p(N))});this.unsubscribeOnScroll.push(y)}}renderChannel(e,n,r,i){var{overlay:l}=n,o=function(d,v){var p={};for(var g in d)Object.prototype.hasOwnProperty.call(d,g)&&v.indexOf(g)<0&&(p[g]=d[g]);if(d!=null&&typeof Object.getOwnPropertySymbols=="function"){var y=0;for(g=Object.getOwnPropertySymbols(d);y<g.length;y++)v.indexOf(g[y])<0&&Object.prototype.propertyIsEnumerable.call(d,g[y])&&(p[g[y]]=d[g[y]])}return p}(n,["overlay"]);const s=document.createElement("div"),u=this.getHeight(o.height,o.splitChannels);s.style.height=`${u}px`,l&&i>0&&(s.style.marginTop=`-${u}px`),this.canvasWrapper.style.minHeight=`${u}px`,this.canvasWrapper.appendChild(s);const c=s.cloneNode();this.progressWrapper.appendChild(c),this.renderMultiCanvas(e,o,r,u,s,c)}render(e){return we(this,void 0,void 0,function*(){var n;this.timeouts.forEach(c=>c()),this.timeouts=[],this.canvasWrapper.innerHTML="",this.progressWrapper.innerHTML="",this.options.width!=null&&(this.scrollContainer.style.width=typeof this.options.width=="number"?`${this.options.width}px`:this.options.width);const r=this.getPixelRatio(),i=this.scrollContainer.clientWidth,{scrollWidth:l,isScrollable:o,useParentWidth:s,width:u}=function({duration:c,minPxPerSec:d=0,parentWidth:v,fillParent:p,pixelRatio:g}){const y=Math.ceil(c*d),w=y>v,N=!!(p&&!w);return{scrollWidth:y,isScrollable:w,useParentWidth:N,width:(N?v:y)*g}}({duration:e.duration,minPxPerSec:this.options.minPxPerSec||0,parentWidth:i,fillParent:this.options.fillParent,pixelRatio:r});if(this.isScrollable=o,this.wrapper.style.width=s?"100%":`${l}px`,this.scrollContainer.style.overflowX=this.isScrollable?"auto":"hidden",this.scrollContainer.classList.toggle("noScrollbar",!!this.options.hideScrollbar),this.cursor.style.backgroundColor=`${this.options.cursorColor||this.options.progressColor}`,this.cursor.style.width=`${this.options.cursorWidth}px`,this.audioData=e,this.emit("render"),this.options.splitChannels)for(let c=0;c<e.numberOfChannels;c++){const d=Object.assign(Object.assign({},this.options),(n=this.options.splitChannels)===null||n===void 0?void 0:n[c]);this.renderChannel([e.getChannelData(c)],d,u,c)}else{const c=[e.getChannelData(0)];e.numberOfChannels>1&&c.push(e.getChannelData(1)),this.renderChannel(c,this.options,u,0)}Promise.resolve().then(()=>this.emit("rendered"))})}reRender(){if(this.unsubscribeOnScroll.forEach(r=>r()),this.unsubscribeOnScroll=[],!this.audioData)return;const{scrollWidth:e}=this.scrollContainer,{right:n}=this.progressWrapper.getBoundingClientRect();if(this.render(this.audioData),this.isScrollable&&e!==this.scrollContainer.scrollWidth){const{right:r}=this.progressWrapper.getBoundingClientRect(),i=function(l){const o=2*l;return(o<0?Math.floor(o):Math.ceil(o))/2}(r-n);this.scrollContainer.scrollLeft+=i}}zoom(e){this.options.minPxPerSec=e,this.reRender()}scrollIntoView(e,n=!1){const{scrollLeft:r,scrollWidth:i,clientWidth:l}=this.scrollContainer,o=e*i,s=r,u=r+l,c=l/2;if(this.isDragging)o+30>u?this.scrollContainer.scrollLeft+=30:o-30<s&&(this.scrollContainer.scrollLeft-=30);else{(o<s||o>u)&&(this.scrollContainer.scrollLeft=o-(this.options.autoCenter?c:0));const d=o-r-c;n&&this.options.autoCenter&&d>0&&(this.scrollContainer.scrollLeft+=d)}{const d=this.scrollContainer.scrollLeft,{startX:v,endX:p}=va({scrollLeft:d,scrollWidth:i,clientWidth:l});this.emit("scroll",v,p,d,d+l)}}renderProgress(e,n){if(isNaN(e))return;const r=100*e;this.canvasWrapper.style.clipPath=`polygon(${r}% 0%, 100% 0%, 100% 100%, ${r}% 100%)`,this.progressWrapper.style.width=`${r}%`,this.cursor.style.left=`${r}%`,this.cursor.style.transform=this.options.cursorWidth?`translateX(-${e*this.options.cursorWidth}px)`:"",this.isScrollable&&this.options.autoScroll&&this.scrollIntoView(e,n)}exportImage(e,n,r){return we(this,void 0,void 0,function*(){const i=this.canvasWrapper.querySelectorAll("canvas");if(!i.length)throw new Error("No waveform data");if(r==="dataURL"){const l=Array.from(i).map(o=>o.toDataURL(e,n));return Promise.resolve(l)}return Promise.all(Array.from(i).map(l=>new Promise((o,s)=>{l.toBlob(u=>{u?o(u):s(new Error("Could not export image"))},e,n)})))})}}class Cf extends wr{constructor(){super(...arguments),this.animationFrameId=null,this.isRunning=!1}start(){if(this.isRunning)return;this.isRunning=!0;const e=()=>{this.isRunning&&(this.emit("tick"),this.animationFrameId=requestAnimationFrame(e))};e()}stop(){this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}destroy(){this.stop()}}class cl extends wr{constructor(e=new AudioContext){super(),this.bufferNode=null,this.playStartTime=0,this.playedDuration=0,this._muted=!1,this._playbackRate=1,this._duration=void 0,this.buffer=null,this.currentSrc="",this.paused=!0,this.crossOrigin=null,this.seeking=!1,this.autoplay=!1,this.addEventListener=this.on,this.removeEventListener=this.un,this.audioContext=e,this.gainNode=this.audioContext.createGain(),this.gainNode.connect(this.audioContext.destination)}load(){return we(this,void 0,void 0,function*(){})}get src(){return this.currentSrc}set src(e){if(this.currentSrc=e,this._duration=void 0,!e)return this.buffer=null,void this.emit("emptied");fetch(e).then(n=>{if(n.status>=400)throw new Error(`Failed to fetch ${e}: ${n.status} (${n.statusText})`);return n.arrayBuffer()}).then(n=>this.currentSrc!==e?null:this.audioContext.decodeAudioData(n)).then(n=>{this.currentSrc===e&&(this.buffer=n,this.emit("loadedmetadata"),this.emit("canplay"),this.autoplay&&this.play())}).catch(n=>{console.error("WebAudioPlayer load error:",n)})}_play(){if(!this.paused)return;this.paused=!1,this.bufferNode&&(this.bufferNode.onended=null,this.bufferNode.disconnect()),this.bufferNode=this.audioContext.createBufferSource(),this.buffer&&(this.bufferNode.buffer=this.buffer),this.bufferNode.playbackRate.value=this._playbackRate,this.bufferNode.connect(this.gainNode);let e=this.playedDuration*this._playbackRate;(e>=this.duration||e<0)&&(e=0,this.playedDuration=0),this.bufferNode.start(this.audioContext.currentTime,e),this.playStartTime=this.audioContext.currentTime,this.bufferNode.onended=()=>{this.currentTime>=this.duration&&(this.pause(),this.emit("ended"))}}_pause(){var e;this.paused=!0,(e=this.bufferNode)===null||e===void 0||e.stop(),this.playedDuration+=this.audioContext.currentTime-this.playStartTime}play(){return we(this,void 0,void 0,function*(){this.paused&&(this._play(),this.emit("play"))})}pause(){this.paused||(this._pause(),this.emit("pause"))}stopAt(e){const n=e-this.currentTime,r=this.bufferNode;r?.stop(this.audioContext.currentTime+n),r?.addEventListener("ended",()=>{r===this.bufferNode&&(this.bufferNode=null,this.pause())},{once:!0})}setSinkId(e){return we(this,void 0,void 0,function*(){return this.audioContext.setSinkId(e)})}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this.bufferNode&&(this.bufferNode.playbackRate.value=e)}get currentTime(){return(this.paused?this.playedDuration:this.playedDuration+(this.audioContext.currentTime-this.playStartTime))*this._playbackRate}set currentTime(e){const n=!this.paused;n&&this._pause(),this.playedDuration=e/this._playbackRate,n&&this._play(),this.emit("seeking"),this.emit("timeupdate")}get duration(){var e,n;return(e=this._duration)!==null&&e!==void 0?e:((n=this.buffer)===null||n===void 0?void 0:n.duration)||0}set duration(e){this._duration=e}get volume(){return this.gainNode.gain.value}set volume(e){this.gainNode.gain.value=e,this.emit("volumechange")}get muted(){return this._muted}set muted(e){this._muted!==e&&(this._muted=e,this._muted?this.gainNode.disconnect():this.gainNode.connect(this.audioContext.destination))}canPlayType(e){return/^(audio|video)\//.test(e)}getGainNode(){return this.gainNode}getChannelData(){const e=[];if(!this.buffer)return e;const n=this.buffer.numberOfChannels;for(let r=0;r<n;r++)e.push(this.buffer.getChannelData(r));return e}removeAttribute(e){switch(e){case"src":this.src="";break;case"playbackRate":this.playbackRate=0;break;case"currentTime":this.currentTime=0;break;case"duration":this.duration=0;break;case"volume":this.volume=0;break;case"muted":this.muted=!1}}}const Ef={waveColor:"#999",progressColor:"#555",cursorWidth:1,minPxPerSec:0,fillParent:!0,interact:!0,dragToSeek:!1,autoScroll:!0,autoCenter:!0,sampleRate:8e3};class hr extends xf{static create(e){return new hr(e)}constructor(e){const n=e.media||(e.backend==="WebAudio"?new cl:void 0);super({media:n,mediaControls:e.mediaControls,autoplay:e.autoplay,playbackRate:e.audioRate}),this.plugins=[],this.decodedData=null,this.stopAtPosition=null,this.subscriptions=[],this.mediaSubscriptions=[],this.abortController=null,this.options=Object.assign({},Ef,e),this.timer=new Cf;const r=n?void 0:this.getMediaElement();this.renderer=new Sf(this.options,r),this.initPlayerEvents(),this.initRendererEvents(),this.initTimerEvents(),this.initPlugins();const i=this.options.url||this.getSrc()||"";Promise.resolve().then(()=>{this.emit("init");const{peaks:l,duration:o}=this.options;(i||l&&o)&&this.load(i,l,o).catch(s=>{this.emit("error",s instanceof Error?s:new Error(String(s)))})})}updateProgress(e=this.getCurrentTime()){return this.renderer.renderProgress(e/this.getDuration(),this.isPlaying()),e}initTimerEvents(){this.subscriptions.push(this.timer.on("tick",()=>{if(!this.isSeeking()){const e=this.updateProgress();this.emit("timeupdate",e),this.emit("audioprocess",e),this.stopAtPosition!=null&&this.isPlaying()&&e>=this.stopAtPosition&&this.pause()}}))}initPlayerEvents(){this.isPlaying()&&(this.emit("play"),this.timer.start()),this.mediaSubscriptions.push(this.onMediaEvent("timeupdate",()=>{const e=this.updateProgress();this.emit("timeupdate",e)}),this.onMediaEvent("play",()=>{this.emit("play"),this.timer.start()}),this.onMediaEvent("pause",()=>{this.emit("pause"),this.timer.stop(),this.stopAtPosition=null}),this.onMediaEvent("emptied",()=>{this.timer.stop(),this.stopAtPosition=null}),this.onMediaEvent("ended",()=>{this.emit("timeupdate",this.getDuration()),this.emit("finish"),this.stopAtPosition=null}),this.onMediaEvent("seeking",()=>{this.emit("seeking",this.getCurrentTime())}),this.onMediaEvent("error",()=>{var e;this.emit("error",(e=this.getMediaElement().error)!==null&&e!==void 0?e:new Error("Media error")),this.stopAtPosition=null}))}initRendererEvents(){this.subscriptions.push(this.renderer.on("click",(e,n)=>{this.options.interact&&(this.seekTo(e),this.emit("interaction",e*this.getDuration()),this.emit("click",e,n))}),this.renderer.on("dblclick",(e,n)=>{this.emit("dblclick",e,n)}),this.renderer.on("scroll",(e,n,r,i)=>{const l=this.getDuration();this.emit("scroll",e*l,n*l,r,i)}),this.renderer.on("render",()=>{this.emit("redraw")}),this.renderer.on("rendered",()=>{this.emit("redrawcomplete")}),this.renderer.on("dragstart",e=>{this.emit("dragstart",e)}),this.renderer.on("dragend",e=>{this.emit("dragend",e)}),this.renderer.on("resize",()=>{this.emit("resize")}));{let e;const n=this.renderer.on("drag",r=>{var i;if(!this.options.interact)return;this.renderer.renderProgress(r),clearTimeout(e);let l=0;const o=this.options.dragToSeek;this.isPlaying()?l=0:o===!0?l=200:o&&typeof o=="object"&&(l=(i=o.debounceTime)!==null&&i!==void 0?i:200),e=setTimeout(()=>{this.seekTo(r)},l),this.emit("interaction",r*this.getDuration()),this.emit("drag",r)});this.subscriptions.push(()=>{clearTimeout(e),n()})}}initPlugins(){var e;!((e=this.options.plugins)===null||e===void 0)&&e.length&&this.options.plugins.forEach(n=>{this.registerPlugin(n)})}unsubscribePlayerEvents(){this.mediaSubscriptions.forEach(e=>e()),this.mediaSubscriptions=[]}setOptions(e){this.options=Object.assign({},this.options,e),e.duration&&!e.peaks&&(this.decodedData=Or.createBuffer(this.exportPeaks(),e.duration)),e.peaks&&e.duration&&(this.decodedData=Or.createBuffer(e.peaks,e.duration)),this.renderer.setOptions(this.options),e.audioRate&&this.setPlaybackRate(e.audioRate),e.mediaControls!=null&&(this.getMediaElement().controls=e.mediaControls)}registerPlugin(e){if(this.plugins.includes(e))return e;e._init(this),this.plugins.push(e);const n=e.once("destroy",()=>{this.plugins=this.plugins.filter(r=>r!==e),this.subscriptions=this.subscriptions.filter(r=>r!==n)});return this.subscriptions.push(n),e}unregisterPlugin(e){this.plugins=this.plugins.filter(n=>n!==e),e.destroy()}getWrapper(){return this.renderer.getWrapper()}getWidth(){return this.renderer.getWidth()}getScroll(){return this.renderer.getScroll()}setScroll(e){return this.renderer.setScroll(e)}setScrollTime(e){const n=e/this.getDuration();this.renderer.setScrollPercentage(n)}getActivePlugins(){return this.plugins}loadAudio(e,n,r,i){return we(this,void 0,void 0,function*(){var l;if(this.emit("load",e),!this.options.media&&this.isPlaying()&&this.pause(),this.decodedData=null,this.stopAtPosition=null,(l=this.abortController)===null||l===void 0||l.abort(),this.abortController=null,!n&&!r){const s=this.options.fetchParams||{};window.AbortController&&!s.signal&&(this.abortController=new AbortController,s.signal=this.abortController.signal);const u=d=>this.emit("loading",d);n=yield yf.fetchBlob(e,u,s);const c=this.options.blobMimeType;c&&(n=new Blob([n],{type:c}))}this.setSrc(e,n);const o=yield new Promise(s=>{const u=i||this.getDuration();u?s(u):this.mediaSubscriptions.push(this.onMediaEvent("loadedmetadata",()=>s(this.getDuration()),{once:!0}))});if(!e&&!n){const s=this.getMediaElement();s instanceof cl&&(s.duration=o)}if(r)this.decodedData=Or.createBuffer(r,o||0);else if(n){const s=yield n.arrayBuffer();this.decodedData=yield Or.decode(s,this.options.sampleRate)}this.decodedData&&(this.emit("decode",this.getDuration()),this.renderer.render(this.decodedData)),this.emit("ready",this.getDuration())})}load(e,n,r){return we(this,void 0,void 0,function*(){try{return yield this.loadAudio(e,void 0,n,r)}catch(i){throw this.emit("error",i),i}})}loadBlob(e,n,r){return we(this,void 0,void 0,function*(){try{return yield this.loadAudio("",e,n,r)}catch(i){throw this.emit("error",i),i}})}zoom(e){if(!this.decodedData)throw new Error("No audio loaded");this.renderer.zoom(e),this.emit("zoom",e)}getDecodedData(){return this.decodedData}exportPeaks({channels:e=2,maxLength:n=8e3,precision:r=1e4}={}){if(!this.decodedData)throw new Error("The audio has not been decoded yet");const i=Math.min(e,this.decodedData.numberOfChannels),l=[];for(let o=0;o<i;o++){const s=this.decodedData.getChannelData(o),u=[],c=s.length/n;for(let d=0;d<n;d++){const v=s.slice(Math.floor(d*c),Math.ceil((d+1)*c));let p=0;for(let g=0;g<v.length;g++){const y=v[g];Math.abs(y)>Math.abs(p)&&(p=y)}u.push(Math.round(p*r)/r)}l.push(u)}return l}getDuration(){let e=super.getDuration()||0;return e!==0&&e!==1/0||!this.decodedData||(e=this.decodedData.duration),e}toggleInteraction(e){this.options.interact=e}setTime(e){this.stopAtPosition=null,super.setTime(e),this.updateProgress(e),this.emit("timeupdate",e)}seekTo(e){const n=this.getDuration()*e;this.setTime(n)}play(e,n){const r=Object.create(null,{play:{get:()=>super.play}});return we(this,void 0,void 0,function*(){e!=null&&this.setTime(e);const i=yield r.play.call(this);return n!=null&&(this.media instanceof cl?this.media.stopAt(n):this.stopAtPosition=n),i})}playPause(){return we(this,void 0,void 0,function*(){return this.isPlaying()?this.pause():this.play()})}stop(){this.pause(),this.setTime(0)}skip(e){this.setTime(this.getCurrentTime()+e)}empty(){this.load("",[[0]],.001)}setMediaElement(e){this.unsubscribePlayerEvents(),super.setMediaElement(e),this.initPlayerEvents()}exportImage(){return we(this,arguments,void 0,function*(e="image/png",n=1,r="dataURL"){return this.renderer.exportImage(e,n,r)})}destroy(){var e;this.emit("destroy"),(e=this.abortController)===null||e===void 0||e.abort(),this.plugins.forEach(n=>n.destroy()),this.subscriptions.forEach(n=>n()),this.unsubscribePlayerEvents(),this.timer.destroy(),this.renderer.destroy(),super.destroy()}}hr.BasePlugin=class extends wr{constructor(t){super(),this.subscriptions=[],this.isDestroyed=!1,this.options=t}onInit(){}_init(t){this.isDestroyed&&(this.subscriptions=[],this.isDestroyed=!1),this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach(t=>t()),this.subscriptions=[],this.isDestroyed=!0,this.wavesurfer=void 0}},hr.dom=gf;class Nf{constructor(){this.zoomLevel=1,this.pixelsPerSecond=100,this.duration=60,this.currentTime=0,this.tracks=[],this.snappingEnabled=!0,this.snapThreshold=10,this.selectedClips=new Set}setZoomLevel(e){return this.zoomLevel=Math.max(.1,Math.min(10,e)),this.zoomLevel}getZoomLevel(){return this.zoomLevel}getPixelsPerSecond(){return this.pixelsPerSecond*this.zoomLevel}getTimelineWidth(){return this.duration*this.getPixelsPerSecond()}pixelsToTime(e){return e/this.getPixelsPerSecond()}timeToPixels(e){return e*this.getPixelsPerSecond()}setDuration(e){this.duration=e}getDuration(){return this.duration}setCurrentTime(e){this.currentTime=Math.max(0,Math.min(this.duration,e))}getCurrentTime(){return this.currentTime}addTrack(e){const n={id:Date.now(),name:`Track ${this.tracks.length+1}`,clips:[],muted:!1,locked:!1,...e};return this.tracks.push(n),n}removeTrack(e){this.tracks=this.tracks.filter(n=>n.id!==e)}getTracks(){return this.tracks}addClip(e,n){const r=this.tracks.find(l=>l.id===e);if(!r)return null;const i={id:Date.now(),startTime:0,duration:10,name:"New Clip",type:"video",...n};return r.clips.push(i),i}removeClip(e,n){const r=this.tracks.find(i=>i.id===e);r&&(r.clips=r.clips.filter(i=>i.id!==n))}moveClip(e,n,r){const i=this.tracks.find(s=>s.id===e);if(!i)return;const l=i.clips.find(s=>s.id===n);if(!l)return;const o=this.snappingEnabled?this.applySnapping(r,e,n):r;l.startTime=Math.max(0,o)}applySnapping(e,n,r){const i=this.getSnapPoints(n,r);let l=null,o=this.snapThreshold;return i.forEach(s=>{const u=Math.abs(e-s);u<o&&(o=u,l=s)}),l!==null?l:e}getSnapPoints(e,n){const r=[];return this.tracks.forEach(i=>{r.push(0),r.push(this.duration),i.clips.forEach(l=>{l.id!==n&&(r.push(l.startTime),r.push(l.startTime+l.duration))})}),r.push(this.currentTime),r}splitClip(e,n,r){const i=this.tracks.find(c=>c.id===e);if(!i)return null;const l=i.clips.findIndex(c=>c.id===n);if(l===-1)return null;const o=i.clips[l];if(r<=o.startTime||r>=o.startTime+o.duration)return null;const s={...o,id:Date.now(),duration:r-o.startTime,name:`${o.name} (1)`},u={...o,id:Date.now()+1,startTime:r,duration:o.startTime+o.duration-r,name:`${o.name} (2)`};return i.clips.splice(l,1,s,u),[s,u]}rippleDelete(e,n){const r=this.tracks.find(u=>u.id===e);if(!r)return;const i=r.clips.findIndex(u=>u.id===n);if(i===-1)return;const l=r.clips[i],o=l.startTime,s=l.duration;r.clips.splice(i,1),r.clips.forEach(u=>{u.startTime>o&&(u.startTime-=s)})}selectClip(e,n,r=!1){r||this.selectedClips.clear(),this.selectedClips.add(`${e}:${n}`)}deselectClip(e,n){this.selectedClips.delete(`${e}:${n}`)}getSelectedClips(){return Array.from(this.selectedClips)}clearSelection(){this.selectedClips.clear()}getClipAt(e,n){const r=this.tracks.find(i=>i.id===e);return r?r.clips.find(i=>n>=i.startTime&&n<i.startTime+i.duration):null}getVisibleClips(e,n){const r=[];return this.tracks.forEach((i,l)=>{i.clips.forEach(o=>{o.startTime<n&&o.startTime+o.duration>e&&r.push({...o,trackId:i.id,trackIndex:l})})}),r}exportTimeline(){return{duration:this.duration,tracks:this.tracks.map(e=>({...e,clips:e.clips.map(n=>({id:n.id,startTime:n.startTime,duration:n.duration,name:n.name,type:n.type,src:n.src}))}))}}importTimeline(e){this.duration=e.duration||60,this.tracks=e.tracks||[]}}const jf=({timelineEngine:t,onTimeChange:e,onClipSelect:n,currentTime:r=0,duration:i=60})=>{const l=S.useRef(null),o=S.useRef(null),[s,u]=S.useState(!1),[c,d]=S.useState(1),[v,p]=S.useState(null),[g,y]=S.useState(new Set),w=100*c,N=i*w,h=r*w,f=S.useCallback(x=>{x.preventDefault(),u(!0)},[]),m=S.useCallback(x=>{if(!s||!l.current)return;const _=l.current.getBoundingClientRect(),R=x.clientX-_.left,z=Math.max(0,Math.min(i,R/w));e(z)},[s,w,i,e]),k=S.useCallback(()=>{u(!1)},[]),j=S.useCallback(x=>{if(!l.current)return;const _=l.current.getBoundingClientRect(),R=x.clientX-_.left,z=Math.max(0,Math.min(i,R/w));e(z)},[w,i,e]),C=S.useCallback((x,_)=>{_.stopPropagation();const R=`${x.trackId}:${x.id}`,z=new Set(g);z.has(R)?z.delete(R):z.add(R),y(z),n(x)},[g,n]),b=S.useCallback((x,_)=>{if(!t||!r)return;const R=t.current.splitClip(_,x.id,r);R&&(n(R[0]),setMessage(`Split "${x.name}" at ${B(r)}`))},[t,r,n]),P=S.useCallback((x,_)=>{if(!t)return;const R=prompt("Enter new start time (seconds):",x.startTime.toString()),z=prompt("Enter new end time (seconds):",(x.startTime+x.duration).toString());if(R!==null&&z!==null){const V=Math.max(0,parseFloat(R)),ye=Math.min(i,parseFloat(z))-V;ye>0&&(t.current.moveClip(_,x.id,V),x.startTime=V,x.duration=ye,setMessage(`Trimmed "${x.name}" to ${B(ye)}`))}},[t,i]),M=S.useCallback((x,_)=>{if(!t)return;const R={...x,id:Date.now(),name:`${x.name} (Copy)`,startTime:x.startTime+x.duration+1};t.current.addClip(_,R),setMessage(`Duplicated "${x.name}"`)},[t]),D=S.useCallback(()=>{d(x=>Math.min(x*1.2,5))},[]),F=S.useCallback(()=>{d(x=>Math.max(x/1.2,.5))},[]),G=S.useCallback(()=>{d(1)},[]),Q=S.useCallback(x=>{if(!l.current)return;const _=l.current.getBoundingClientRect(),R=x.clientX-_.left,z=Math.max(0,Math.min(i,R/w));p(z)},[w,i]);S.useEffect(()=>{if(s)return document.addEventListener("mousemove",m),document.addEventListener("mouseup",k),()=>{document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",k)}},[s,m,k]);const B=x=>{const _=Math.floor(x/60),R=Math.floor(x%60),z=Math.floor(x%1*30);return`${_.toString().padStart(2,"0")}:${R.toString().padStart(2,"0")}:${z.toString().padStart(2,"0")}`},rt=(()=>{const x=[],_=c>2?5:c>1?10:30;for(let R=0;R<=i;R+=_)x.push({time:R,position:R*w,label:B(R)});return x})(),Xe=t?.getTracks()||[];return a.jsxs("div",{className:"interactive-timeline",children:[a.jsxs("div",{className:"timeline-controls",children:[a.jsxs("div",{className:"zoom-controls",children:[a.jsxs("button",{onClick:F,disabled:c<=.5,children:[a.jsx("span",{children:"−"})," Zoom Out"]}),a.jsxs("span",{className:"zoom-level",children:[Math.round(c*100),"%"]}),a.jsxs("button",{onClick:D,disabled:c>=5,children:["Zoom In ",a.jsx("span",{children:"+"})]}),a.jsx("button",{onClick:G,children:"Reset"})]}),v!==null&&a.jsx("div",{className:"hover-time",children:B(v)})]}),a.jsxs("div",{ref:l,className:"timeline-container",style:{width:`${N}px`},onClick:j,onMouseMove:Q,onMouseLeave:()=>p(null),children:[a.jsx("div",{className:"time-ruler",children:rt.map(x=>a.jsxs("div",{className:"time-marker",style:{left:`${x.position}px`},children:[a.jsx("div",{className:"marker-tick"}),a.jsx("div",{className:"marker-label",children:x.label})]},x.time))}),a.jsx("div",{className:"tracks-container",children:Xe.map((x,_)=>a.jsxs("div",{className:"track",children:[a.jsxs("div",{className:"track-header",children:[a.jsx("span",{className:"track-name",children:x.name}),a.jsxs("div",{className:"track-controls",children:[a.jsx("button",{className:`track-mute ${x.muted?"muted":""}`,onClick:()=>x.muted=!x.muted,children:"M"}),a.jsx("button",{className:`track-lock ${x.locked?"locked":""}`,onClick:()=>x.locked=!x.locked,children:"L"}),x.clips.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"track-split",onClick:()=>b(x.clips[0],x.id),title:"Split clip at playhead",children:"⚡"}),a.jsx("button",{className:"track-trim",onClick:()=>P(x.clips[0],x.id),title:"Trim clip",children:"✂️"}),a.jsx("button",{className:"track-duplicate",onClick:()=>M(x.clips[0],x.id),title:"Duplicate clip",children:"📋"})]})]})]}),a.jsx("div",{className:"track-content",children:x.clips.map(R=>{const z=`${x.id}:${R.id}`,V=g.has(z),it=R.startTime*w,ye=R.duration*w;return a.jsx("div",{className:`timeline-clip ${V?"selected":""}`,style:{left:`${it}px`,width:`${ye}px`},onClick:Ft=>C(R,Ft),children:a.jsxs("div",{className:"clip-content",children:[a.jsx("span",{className:"clip-name",children:R.name}),a.jsx("span",{className:"clip-duration",children:B(R.duration)})]})},R.id)})})]},x.id))}),a.jsxs("div",{ref:o,className:"playhead",style:{left:`${h}px`},onMouseDown:f,children:[a.jsx("div",{className:"playhead-line"}),a.jsx("div",{className:"playhead-handle",children:a.jsx("div",{className:"playhead-time",children:B(r)})})]})]}),a.jsx("style",{jsx:!0,children:`
        .interactive-timeline {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          overflow-x: auto;
        }

        .timeline-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: var(--surface-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .zoom-controls button {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .zoom-controls button:hover:not(:disabled) {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }

        .zoom-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .zoom-level {
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 50px;
          text-align: center;
        }

        .hover-time {
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .timeline-container {
          position: relative;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          min-height: 200px;
          cursor: crosshair;
        }

        .time-ruler {
          position: relative;
          height: 30px;
          background: var(--surface);
          border-bottom: 1px solid var(--glass-border);
        }

        .time-marker {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
        }

        .marker-tick {
          width: 1px;
          height: 10px;
          background: var(--text-tertiary);
          margin: 0 auto;
        }

        .marker-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 2px;
          font-family: var(--font-mono);
        }

        .tracks-container {
          position: relative;
        }

        .track {
          border-bottom: 1px solid var(--glass-border);
          min-height: 60px;
        }

        .track-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem;
          background: var(--surface);
          border-right: 1px solid var(--glass-border);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 10;
        }

        .track-name {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .track-controls {
          display: flex;
          gap: 0.25rem;
        }

        .track-mute, .track-lock, .track-split, .track-trim, .track-duplicate {
          width: 24px;
          height: 24px;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 0.7rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .track-split:hover, .track-trim:hover, .track-duplicate:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }

        .track-mute.muted, .track-lock.locked {
          background: var(--electric-purple);
          color: white;
          border-color: var(--electric-purple);
        }

        .track-content {
          margin-left: 150px;
          padding: 0.5rem;
          position: relative;
          height: 59px;
        }

        .timeline-clip {
          position: absolute;
          top: 8px;
          height: 40px;
          background: var(--electric-purple-alpha);
          border: 1px solid var(--electric-purple);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .timeline-clip:hover {
          background: var(--electric-purple);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .timeline-clip.selected {
          background: var(--electric-purple);
          border-color: var(--electric-purple-hover);
          box-shadow: 0 0 0 2px var(--electric-purple-hover);
        }

        .clip-content {
          padding: 0.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .clip-name {
          font-size: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .clip-duration {
          font-size: 0.65rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .playhead {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--electric-purple);
          z-index: 20;
          cursor: ew-resize;
          transform: translateX(-50%);
        }

        .playhead-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: var(--electric-purple);
        }

        .playhead-handle {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: var(--electric-purple);
          border-radius: 50%;
          border: 2px solid white;
          cursor: grab;
        }

        .playhead-handle:active {
          cursor: grabbing;
        }

        .playhead-time {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--electric-purple);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
      `})]})};var W;(function(t){t.LOAD="LOAD",t.EXEC="EXEC",t.FFPROBE="FFPROBE",t.WRITE_FILE="WRITE_FILE",t.READ_FILE="READ_FILE",t.DELETE_FILE="DELETE_FILE",t.RENAME="RENAME",t.CREATE_DIR="CREATE_DIR",t.LIST_DIR="LIST_DIR",t.DELETE_DIR="DELETE_DIR",t.ERROR="ERROR",t.DOWNLOAD="DOWNLOAD",t.PROGRESS="PROGRESS",t.LOG="LOG",t.MOUNT="MOUNT",t.UNMOUNT="UNMOUNT"})(W||(W={}));const bf=(()=>{let t=0;return()=>t++})(),Tf=new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),Pf=new Error("called FFmpeg.terminate()");class zc{#t=null;#r={};#n={};#i=[];#l=[];loaded=!1;#o=()=>{this.#t&&(this.#t.onmessage=({data:{id:e,type:n,data:r}})=>{switch(n){case W.LOAD:this.loaded=!0,this.#r[e](r);break;case W.MOUNT:case W.UNMOUNT:case W.EXEC:case W.FFPROBE:case W.WRITE_FILE:case W.READ_FILE:case W.DELETE_FILE:case W.RENAME:case W.CREATE_DIR:case W.LIST_DIR:case W.DELETE_DIR:this.#r[e](r);break;case W.LOG:this.#i.forEach(i=>i(r));break;case W.PROGRESS:this.#l.forEach(i=>i(r));break;case W.ERROR:this.#n[e](r);break}delete this.#r[e],delete this.#n[e]})};#e=({type:e,data:n},r=[],i)=>this.#t?new Promise((l,o)=>{const s=bf();this.#t&&this.#t.postMessage({id:s,type:e,data:n},r),this.#r[s]=l,this.#n[s]=o,i?.addEventListener("abort",()=>{o(new DOMException(`Message # ${s} was aborted`,"AbortError"))},{once:!0})}):Promise.reject(Tf);on(e,n){e==="log"?this.#i.push(n):e==="progress"&&this.#l.push(n)}off(e,n){e==="log"?this.#i=this.#i.filter(r=>r!==n):e==="progress"&&(this.#l=this.#l.filter(r=>r!==n))}load=({classWorkerURL:e,...n}={},{signal:r}={})=>(this.#t||(this.#t=e?new Worker(new URL(e,import.meta.url),{type:"module"}):new Worker(new URL(""+new URL("worker-BAOIWoxA.js",import.meta.url).href,import.meta.url),{type:"module"}),this.#o()),this.#e({type:W.LOAD,data:n},void 0,r));exec=(e,n=-1,{signal:r}={})=>this.#e({type:W.EXEC,data:{args:e,timeout:n}},void 0,r);ffprobe=(e,n=-1,{signal:r}={})=>this.#e({type:W.FFPROBE,data:{args:e,timeout:n}},void 0,r);terminate=()=>{const e=Object.keys(this.#n);for(const n of e)this.#n[n](Pf),delete this.#n[n],delete this.#r[n];this.#t&&(this.#t.terminate(),this.#t=null,this.loaded=!1)};writeFile=(e,n,{signal:r}={})=>{const i=[];return n instanceof Uint8Array&&i.push(n.buffer),this.#e({type:W.WRITE_FILE,data:{path:e,data:n}},i,r)};mount=(e,n,r)=>{const i=[];return this.#e({type:W.MOUNT,data:{fsType:e,options:n,mountPoint:r}},i)};unmount=e=>{const n=[];return this.#e({type:W.UNMOUNT,data:{mountPoint:e}},n)};readFile=(e,n="binary",{signal:r}={})=>this.#e({type:W.READ_FILE,data:{path:e,encoding:n}},void 0,r);deleteFile=(e,{signal:n}={})=>this.#e({type:W.DELETE_FILE,data:{path:e}},void 0,n);rename=(e,n,{signal:r}={})=>this.#e({type:W.RENAME,data:{oldPath:e,newPath:n}},void 0,r);createDir=(e,{signal:n}={})=>this.#e({type:W.CREATE_DIR,data:{path:e}},void 0,n);listDir=(e,{signal:n}={})=>this.#e({type:W.LIST_DIR,data:{path:e}},void 0,n);deleteDir=(e,{signal:n}={})=>this.#e({type:W.DELETE_DIR,data:{path:e}},void 0,n)}var ga;(function(t){t.MEMFS="MEMFS",t.NODEFS="NODEFS",t.NODERAWFS="NODERAWFS",t.IDBFS="IDBFS",t.WORKERFS="WORKERFS",t.PROXYFS="PROXYFS"})(ga||(ga={}));const Rf=new Error("failed to get response body reader"),Lf=new Error("failed to complete download"),_f="Content-Length",Df=t=>new Promise((e,n)=>{const r=new FileReader;r.onload=()=>{const{result:i}=r;i instanceof ArrayBuffer?e(new Uint8Array(i)):e(new Uint8Array)},r.onerror=i=>{n(Error(`File could not be read! Code=${i?.target?.error?.code||-1}`))},r.readAsArrayBuffer(t)}),Je=async t=>{let e;if(typeof t=="string")/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(t)?e=atob(t.split(",")[1]).split("").map(n=>n.charCodeAt(0)):e=await(await fetch(t)).arrayBuffer();else if(t instanceof URL)e=await(await fetch(t)).arrayBuffer();else if(t instanceof File||t instanceof Blob)e=await Df(t);else return new Uint8Array;return new Uint8Array(e)},zf=async(t,e)=>{const n=await fetch(t);let r;try{const i=parseInt(n.headers.get(_f)||"-1"),l=n.body?.getReader();if(!l)throw Rf;const o=[];let s=0;for(;;){const{done:d,value:v}=await l.read(),p=v?v.length:0;if(d){if(i!=-1&&i!==s)throw Lf;e&&e({url:t,total:i,received:s,delta:p,done:d});break}o.push(v),s+=p,e&&e({url:t,total:i,received:s,delta:p,done:d})}const u=new Uint8Array(s);let c=0;for(const d of o)u.set(d,c),c+=d.length;r=u.buffer}catch(i){console.log("failed to send download progress event: ",i),r=await n.arrayBuffer()}return r},Xn=async(t,e,n=!1,r)=>{const i=n?await zf(t,r):await(await fetch(t)).arrayBuffer(),l=new Blob([i],{type:e});return URL.createObjectURL(l)},ya="https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd",dl=new zc;function Mf(){const[t,e]=S.useState(!1),[n,r]=S.useState(0),i=S.useRef(!1);async function l(){if(!(t||i.current)){i.current=!0,dl.on("progress",({progress:o})=>{r(Math.round(o*100))});try{await dl.load({coreURL:await Xn(`${ya}/ffmpeg-core.js`,"text/javascript"),wasmURL:await Xn(`${ya}/ffmpeg-core.wasm`,"application/wasm")}),e(!0)}finally{i.current=!1}}}return{ffmpeg:dl,fetchFile:Je,loaded:t,progress:n,load:l}}class Ff{constructor(){this.canvas=null,this.context=null,this.video=null,this.scale=1,this.position={x:0,y:0},this.rotation=0,this.opacity=1,this.cropArea={x:0,y:0,width:1,height:1},this.isPlaying=!1,this.currentTime=0,this.duration=0,this.fps=30,this.frameCallback=null}initialize(e,n){this.canvas=e,this.context=e.getContext("2d"),this.video=n,this.video.addEventListener("loadedmetadata",()=>{this.duration=this.video.duration,this.resizeCanvas()}),this.video.addEventListener("timeupdate",()=>{this.currentTime=this.video.currentTime}),this.resizeCanvas()}resizeCanvas(){if(!this.canvas||!this.video)return;const e=this.canvas.getBoundingClientRect();this.canvas.width=e.width,this.canvas.height=e.height,this.render()}setScale(e){this.scale=Math.max(.1,Math.min(10,e)),this.render()}getScale(){return this.scale}setPosition(e,n){this.position={x:e,y:n},this.render()}getPosition(){return{...this.position}}setRotation(e){this.rotation=e*Math.PI/180,this.render()}getRotation(){return this.rotation*180/Math.PI}setOpacity(e){this.opacity=Math.max(0,Math.min(1,e)),this.render()}getOpacity(){return this.opacity}setCropArea(e,n,r,i){this.cropArea={x:Math.max(0,Math.min(1,e)),y:Math.max(0,Math.min(1,n)),width:Math.max(.01,Math.min(1-e,r)),height:Math.max(.01,Math.min(1-n,i))},this.render()}getCropArea(){return{...this.cropArea}}render(){!this.context||!this.video||(this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.save(),this.applyTransformations(),this.drawVideo(),this.context.restore())}applyTransformations(){const e=this.canvas.width/2,n=this.canvas.height/2;this.context.translate(e+this.position.x,n+this.position.y),this.context.rotate(this.rotation),this.context.scale(this.scale,this.scale),this.context.globalAlpha=this.opacity}drawVideo(){if(!this.video.videoWidth||!this.video.videoHeight)return;const e=this.video.videoWidth,n=this.video.videoHeight,r=e*this.cropArea.x,i=n*this.cropArea.y,l=e*this.cropArea.width,o=n*this.cropArea.height,s=this.canvas.width/this.canvas.height,u=l/o;let c,d;u>s?(c=this.canvas.width,d=this.canvas.width/u):(d=this.canvas.height,c=this.canvas.height*u);const v=-c/2,p=-d/2;this.context.drawImage(this.video,r,i,l,o,v,p,c,d)}play(){this.video&&!this.isPlaying&&(this.video.play(),this.isPlaying=!0,this.startRenderLoop())}pause(){this.video&&this.isPlaying&&(this.video.pause(),this.isPlaying=!1,this.stopRenderLoop())}seek(e){this.video&&(this.video.currentTime=Math.max(0,Math.min(this.duration,e)),this.render())}getCurrentTime(){return this.currentTime}getDuration(){return this.duration}startRenderLoop(){const e=()=>{this.isPlaying&&(this.render(),this.frameCallback=requestAnimationFrame(e))};e()}stopRenderLoop(){this.frameCallback&&(cancelAnimationFrame(this.frameCallback),this.frameCallback=null)}exportFrame(e=null){const n=e!==null?e:this.currentTime,r=document.createElement("canvas"),i=r.getContext("2d");r.width=this.video.videoWidth,r.height=this.video.videoHeight;const l=this.video.currentTime;return new Promise(o=>{this.video.addEventListener("seeked",()=>{i.drawImage(this.video,0,0),r.toBlob(s=>{this.video.currentTime=l,o(s)},"image/png")},{once:!0}),this.video.currentTime=n})}reset(){this.scale=1,this.position={x:0,y:0},this.rotation=0,this.opacity=1,this.cropArea={x:0,y:0,width:1,height:1},this.render()}fitToCanvas(){if(!this.video||!this.video.videoWidth)return;const e=this.video.videoWidth/this.video.videoHeight,n=this.canvas.width/this.canvas.height;e>n?this.scale=this.canvas.width/this.video.videoWidth:this.scale=this.canvas.height/this.video.videoHeight,this.position={x:0,y:0},this.render()}zoomToArea(e,n,r,i){if(!this.canvas)return;const l=this.canvas.width/this.canvas.height,o=r/i;let s;o>l?s=this.canvas.width/r:s=this.canvas.height/i,this.scale=s;const u=e+r/2,c=n+i/2;this.position={x:this.canvas.width/2-u*s,y:this.canvas.height/2-c*s},this.render()}getVisibleArea(){if(!this.video||!this.video.videoWidth)return null;const e=this.video.videoWidth,n=this.video.videoHeight,r=this.canvas.width/this.scale,i=this.canvas.height/this.scale,l=-this.position.x/this.scale,o=-this.position.y/this.scale;return{x:Math.max(0,l),y:Math.max(0,o),width:Math.min(e,r),height:Math.min(n,i)}}}class xa{constructor(){this.ffmpeg=null,this.loaded=!1,this.baseURL="https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm"}async initialize(){if(!this.loaded){this.ffmpeg=new zc;try{await this.ffmpeg.load({coreURL:await Xn(`${this.baseURL}/ffmpeg-core.js`,"text/javascript"),wasmURL:await Xn(`${this.baseURL}/ffmpeg-core.wasm`,"application/wasm"),workerURL:await Xn(`${this.baseURL}/ffmpeg-core.worker.js`,"text/javascript")}),this.loaded=!0,console.log("FFmpeg loaded successfully")}catch(e){throw console.error("Failed to load FFmpeg:",e),e}}}async exportVideo(e,n,r={}){this.loaded||await this.initialize();const{width:i=1920,height:l=1080,bitrate:o="2M",fps:s=30,crop:u=null,format:c="mp4"}=r;try{await this.ffmpeg.writeFile(e,await Je(e));const d=["-i",e];u&&d.push("-vf",`crop=${u.width}:${u.height}:${u.x}:${u.y}`),d.push("-c:v","libx264","-preset","medium","-b:v",o,"-r",s.toString(),"-s",`${i}x${l}`,"-c:a","aac","-b:a","128k",n),await this.ffmpeg.exec(d);const v=await this.ffmpeg.readFile(n),p=new Blob([v.buffer],{type:`video/${c}`});return await this.ffmpeg.deleteFile(e),await this.ffmpeg.deleteFile(n),p}catch(d){throw console.error("Export failed:",d),d}}async addWatermark(e,n,r,i="bottom-right"){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile(e,await Je(e)),await this.ffmpeg.writeFile(n,await Je(n));const l={"top-left":"10:10","top-right":"W-w-10:10","bottom-left":"10:H-h-10","bottom-right":"W-w-10:H-h-10"},o=l[i]||l["bottom-right"];await this.ffmpeg.exec(["-i",e,"-i",n,"-filter_complex",`[1:v]scale=100:-1[wm];[0:v][wm]overlay=${o}[v]`,"-map","[v]","-map","0:a","-c:v","libx264","-preset","medium","-c:a","aac",r]);const s=await this.ffmpeg.readFile(r),u=new Blob([s.buffer],{type:"video/mp4"});return await this.ffmpeg.deleteFile(e),await this.ffmpeg.deleteFile(n),await this.ffmpeg.deleteFile(r),u}catch(l){throw console.error("Watermark failed:",l),l}}async getVideoMetadata(e){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e)),await this.ffmpeg.exec(["-i","input.mp4","-f","null","-"]);const n=await this.ffmpeg.readFile("input.mp4");return await this.ffmpeg.deleteFile("input.mp4"),{duration:0,width:1920,height:1080,fps:30}}catch(n){throw console.error("Failed to get metadata:",n),n}}async addTextOverlay(e,n,r){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e));const i=this.generateTextFile(r);await this.ffmpeg.writeFile("text.txt",i);const l=["-i","input.mp4","-i","text.txt","-filter_complex",`[1:v]scale=1920:1080,drawtext=text='${r.text.replace(/'/g,"\\'")}':fontfile=/path/to/font.ttf:fontsize=${r.fontSize}:fontcolor=${r.color.replace("#","0x")}:x=${r.position.x}:y=${r.position.y}`,"-map","[v]","-c:v","libx264","-preset","medium","-crf","23","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-shortest",n];await this.ffmpeg.exec(l);const o=await this.ffmpeg.readFile(n),s=new Blob([o.buffer],{type:"video/mp4"});return await this.ffmpeg.deleteFile("input.mp4"),await this.ffmpeg.deleteFile("text.txt"),s}catch(i){throw console.error("Failed to add text overlay:",i),i}}generateTextFile(e){const{text:n,fontSize:r,fontFamily:i,color:l,position:o}=e;return`
;FFmpeg drawtext filter configuration
;Generated by Kinetic Video Editor

[Drawing]
text=${n.replace(/'/g,"\\'")}
fontfile=/path/to/font.ttf
fontsize=${r}
fontcolor=${l.replace("#","0x")}
x=${o.x}
y=${o.y}
`}async exportWithTextOverlays(e,n,r=[]){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e));let i="[1:v]scale=1920:1080";r.forEach((u,c)=>{const{text:d,fontSize:v,fontFamily:p,color:g,position:y,startTime:w,duration:N}=u,h=`between(t,${w})`;i+=`,drawtext=text='${d.replace(/'/g,"\\'")}':fontfile=/path/to/font.ttf:fontsize=${v}:fontcolor=${g.replace("#","0x")}:x=${y.x}:y=${y.y}:enable=${h}`}),i+=",format=yuv420p[v]";const l=["-i","input.mp4","-filter_complex",i,"-map","[v]","-c:v","libx264","-preset","medium","-crf","23","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-shortest",n];await this.ffmpeg.exec(l);const o=await this.ffmpeg.readFile(n),s=new Blob([o.buffer],{type:"video/mp4"});return await this.ffmpeg.deleteFile("input.mp4"),s}catch(i){throw console.error("Failed to export with text overlays:",i),i}}async exportAsGIF(e,n,r={}){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e));const{gifFps:i=10,gifDuration:l=5,resolution:o="640x360",quality:s="medium"}=r,u=["-i","input.mp4","-t",l.toString(),"-vf",`fps=${i},scale=${o.split("x")[0]}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,"-loop","0",n];await this.ffmpeg.exec(u);const c=await this.ffmpeg.readFile(n),d=new Blob([c.buffer],{type:"image/gif"});return await this.ffmpeg.deleteFile("input.mp4"),d}catch(i){throw console.error("Failed to export as GIF:",i),i}}async exportWithSettings(e,n,r={}){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e));const{format:i="mp4",resolution:l="1920x1080",quality:o="high",bitrate:s="5M",fps:u=30}=r;let c=["-i","input.mp4"];switch(c.push("-vf",`scale=${l.split("x")[0]}:${l.split("x")[1]}`),c.push("-r",u.toString()),i){case"mp4":c.push("-c:v","libx264","-preset","medium","-crf",o==="high"?"20":o==="medium"?"23":"28","-b:v",s,"-pix_fmt","yuv420p","-c:a","aac","-b:a","128k");break;case"webm":c.push("-c:v","libvpx-vp9","-b:v",s,"-crf","31","-c:a","libopus","-b:a","128k");break;case"mov":c.push("-c:v","libx264","-preset","medium","-crf","20","-b:v",s,"-pix_fmt","yuv420p","-c:a","aac","-b:a","128k");break;default:c.push("-c:v","libx264","-preset","medium","-crf","23","-b:v",s,"-pix_fmt","yuv420p","-c:a","aac","-b:a","128k")}c.push(n),await this.ffmpeg.exec(c);const d=await this.ffmpeg.readFile(n),v=i==="gif"?"image/gif":`video/${i}`,p=new Blob([d.buffer],{type:v});return await this.ffmpeg.deleteFile("input.mp4"),p}catch(i){throw console.error("Failed to export with settings:",i),i}}async createPreviewGIF(e,n,r=0,i=3){this.loaded||await this.initialize();try{await this.ffmpeg.writeFile("input.mp4",await Je(e));const l=["-i","input.mp4","-ss",r.toString(),"-t",i.toString(),"-vf","fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse","-loop","0",n];await this.ffmpeg.exec(l);const o=await this.ffmpeg.readFile(n),s=new Blob([o.buffer],{type:"image/gif"});return await this.ffmpeg.deleteFile("input.mp4"),s}catch(l){throw console.error("Failed to create preview GIF:",l),l}}}class If{constructor(){this.effects=[],this.activeEffects=new Map,this.presets=this.initializePresets()}initializePresets(){return{warm:{name:"Warm",brightness:1.1,contrast:1.05,saturation:1.2,temperature:1.1},cool:{name:"Cool",brightness:.95,contrast:1.05,saturation:.8,temperature:.9},vintage:{name:"Vintage",brightness:1.1,contrast:.9,saturation:.7,sepia:.3},dramatic:{name:"Dramatic",brightness:.9,contrast:1.3,saturation:1.1,blacks:.1},"fade-in":{name:"Fade In",type:"transition",duration:1,easing:"ease-in"},"fade-out":{name:"Fade Out",type:"transition",duration:1,easing:"ease-out"},dissolve:{name:"Dissolve",type:"transition",duration:1.5,easing:"ease-in-out"},blur:{name:"Blur",type:"filter",intensity:5},sharpen:{name:"Sharpen",type:"filter",intensity:.5},glow:{name:"Glow",type:"filter",intensity:.3,color:"#ffffff"}}}addEffect(e){const n={id:Date.now(),enabled:!0,...e};return this.effects.push(n),n}removeEffect(e){this.effects=this.effects.filter(n=>n.id!==e),this.activeEffects.delete(e)}getEffect(e){return this.effects.find(n=>n.id===e)}getAllEffects(){return[...this.effects]}getPreset(e){return this.presets[e]}getAllPresets(){return Object.keys(this.presets).map(e=>({key:e,...this.presets[e]}))}applyPreset(e,n=null){const r=this.presets[e];return r?this.addEffect({...r,preset:e,clipId:n,startTime:0,endTime:10}):null}addColorCorrection(e,n={}){const{brightness:r=1,contrast:i=1,saturation:l=1,temperature:o=1,tint:s=0,blacks:u=0,whites:c=1,highlights:d=1,shadows:v=1}=n;return this.addEffect({type:"color-correction",clipId:e,settings:{brightness:r,contrast:i,saturation:l,temperature:o,tint:s,blacks:u,whites:c,highlights:d,shadows:v}})}addTransition(e,n,r="dissolve",i=1){return this.addEffect({type:"transition",fromClipId:e,toClipId:n,transitionType:r,duration:i,easing:"ease-in-out"})}addFilter(e,n,r=1,i={}){return this.addEffect({type:"filter",clipId:e,filterType:n,intensity:r,...i})}addBlur(e,n=5){return this.addFilter(e,"blur",n)}addSharpen(e,n=.5){return this.addFilter(e,"sharpen",n)}addGlow(e,n=.3,r="#ffffff"){return this.addFilter(e,"glow",n,{color:r})}addChromaKey(e,n="#00ff00",r=.4,i=.1){return this.addEffect({type:"chroma-key",clipId:e,color:n,threshold:r,smoothness:i})}applyEffects(e,n,r){this.effects.filter(l=>l.enabled&&(l.clipId===n||!l.clipId)&&this.isEffectActive(l,r)).forEach(l=>{this.applyEffect(e,l,r)})}isEffectActive(e,n){return e.startTime!==void 0&&e.endTime!==void 0?n>=e.startTime&&n<=e.endTime:!0}applyEffect(e,n,r){switch(n.type){case"color-correction":this.applyColorCorrection(e,n.settings);break;case"filter":this.applyFilter(e,n);break;case"transition":this.applyTransition(e,n,r);break;case"chroma-key":this.applyChromaKey(e,n);break;default:console.warn(`Unknown effect type: ${n.type}`)}}applyColorCorrection(e,n){const r=e.getImageData(0,0,e.canvas.width,e.canvas.height),i=r.data;for(let l=0;l<i.length;l+=4){let o=i[l],s=i[l+1],u=i[l+2];o*=n.brightness,s*=n.brightness,u*=n.brightness,o=((o/255-.5)*n.contrast+.5)*255,s=((s/255-.5)*n.contrast+.5)*255,u=((u/255-.5)*n.contrast+.5)*255;const c=.299*o+.587*s+.114*u;o=c+n.saturation*(o-c),s=c+n.saturation*(s-c),u=c+n.saturation*(u-c),o*=n.temperature,u/=n.temperature,i[l]=Math.max(0,Math.min(255,o)),i[l+1]=Math.max(0,Math.min(255,s)),i[l+2]=Math.max(0,Math.min(255,u))}e.putImageData(r,0,0)}applyFilter(e,n){switch(n.filterType){case"blur":this.applyBlurFilter(e,n.intensity);break;case"sharpen":this.applySharpenFilter(e,n.intensity);break;case"glow":this.applyGlowFilter(e,n.intensity,n.color);break}}applyBlurFilter(e,n){e.filter=`blur(${n}px)`;const r=e.getImageData(0,0,e.canvas.width,e.canvas.height);e.putImageData(r,0,0),e.filter="none"}applySharpenFilter(e,n){const r=e.getImageData(0,0,e.canvas.width,e.canvas.height),i=r.data,l=r.width,o=r.height,s=[0,-n,0,-n,1+4*n,-n,0,-n,0],u=new Uint8ClampedArray(i);for(let c=1;c<o-1;c++)for(let d=1;d<l-1;d++)for(let v=0;v<3;v++){let p=0;for(let g=-1;g<=1;g++)for(let y=-1;y<=1;y++){const w=((c+g)*l+(d+y))*4+v;p+=i[w]*s[(g+1)*3+(y+1)]}u[(c*l+d)*4+v]=p}for(let c=0;c<i.length;c++)i[c]=u[c];e.putImageData(r,0,0)}applyGlowFilter(e,n,r){e.shadowBlur=n*20,e.shadowColor=r,e.globalCompositeOperation="screen";const i=e.getImageData(0,0,e.canvas.width,e.canvas.height);e.putImageData(i,0,0),e.globalCompositeOperation="source-over",e.shadowBlur=0}applyChromaKey(e,n){const r=e.getImageData(0,0,e.canvas.width,e.canvas.height),i=r.data,l=this.hexToRgb(n.color);for(let o=0;o<i.length;o+=4){const s=i[o],u=i[o+1],c=i[o+2];Math.sqrt(Math.pow(s-l.r,2)+Math.pow(u-l.g,2)+Math.pow(c-l.b,2))<n.threshold*255&&(i[o+3]=0)}e.putImageData(r,0,0)}hexToRgb(e){const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:{r:0,g:255,b:0}}exportEffects(){return{effects:this.effects.map(e=>({id:e.id,type:e.type,enabled:e.enabled,preset:e.preset,clipId:e.clipId,startTime:e.startTime,endTime:e.endTime,settings:e.settings}))}}importEffects(e){this.effects=e.effects||[]}addTransition(e,n,r="dissolve",i=1){const l={id:Date.now(),type:"transition",transitionType:r,fromClipId:e,toClipId:n,duration:i,startTime:null,endTime:null,enabled:!0,name:`${r} transition`};return this.effects.push(l),l}removeTransition(e){this.effects=this.effects.filter(n=>n.id!==e)}getTransitions(){return this.effects.filter(e=>e.type==="transition")}applyTransition(e,n,r,i,l){const{transitionType:o,duration:s}=i,u=this.calculateTransitionProgress(i,l);switch(o){case"fade":this.applyFadeTransition(e,n,r,u);break;case"dissolve":this.applyDissolveTransition(e,n,r,u);break;case"wipe":this.applyWipeTransition(e,n,r,u);break;case"slide":this.applySlideTransition(e,n,r,u);break;default:console.warn(`Unknown transition type: ${o}`)}}calculateTransitionProgress(e,n){if(!e.startTime||!e.endTime)return 0;const r=e.startTime,i=e.endTime,l=i-r;return n<=r?0:n>=i?1:(n-r)/l}applyFadeTransition(e,n,r,i){const{width:l,height:o}=e.canvas;e.globalAlpha=1-i,i<.5?(e.globalAlpha=1-i*2,this.drawClip(e,n)):(e.globalAlpha=(i-.5)*2,this.drawClip(e,r)),e.globalAlpha=1}applyDissolveTransition(e,n,r,i){const{width:l,height:o}=e.canvas;e.globalAlpha=1,e.globalAlpha=1-i,this.drawClip(e,n),e.save(),e.globalCompositeOperation="source-over",e.globalAlpha=i,this.drawClip(e,r),e.restore(),e.globalAlpha=1}applyWipeTransition(e,n,r,i){const{width:l,height:o}=e.canvas;e.save(),e.globalAlpha=1,this.drawClip(e,n),e.globalCompositeOperation="destination-in";const s=l*i;e.fillStyle="black",e.fillRect(0,0,s,o),e.globalCompositeOperation="source-atop",this.drawClip(e,r),e.restore()}applySlideTransition(e,n,r,i){const{width:l,height:o}=e.canvas,s=l*(1-i);e.save(),e.globalAlpha=1,this.drawClip(e,n),e.globalAlpha=1,this.drawClip(e,r,s,0),e.restore()}drawClip(e,n,r=0,i=0){const{width:l,height:o}=e.canvas;e.fillStyle="rgba(191, 0, 255, 0.3)",e.fillRect(r,i,l,o),e.fillStyle="rgba(255, 255, 255, 0.8)",e.font="14px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(n?.name||"Clip",r+l/2,i+o/2)}cloneEffect(e){const n=this.getEffect(e);return n?this.addEffect({...n,id:void 0,name:`${n.name} (Copy)`}):null}}const Of=({effectsEngine:t,selectedClips:e,onTransitionAdd:n,tracks:r})=>{const[i,l]=S.useState("fade"),[o,s]=S.useState(1),[u,c]=S.useState(!1),[d,v]=S.useState(null),[p,g]=S.useState(null),y=[{id:"fade",name:"Fade",icon:"🌅"},{id:"dissolve",name:"Dissolve",icon:"🌊"},{id:"wipe",name:"Wipe",icon:"📄"},{id:"slide",name:"Slide",icon:"➡️"}],w=S.useCallback(()=>{if(e.size!==2){alert("Please select exactly 2 clips to create a transition");return}const m=Array.from(e),[k,j]=m,[C,b]=k.split(":").map(Number),[P,M]=j.split(":").map(Number),D=r.find(ce=>ce.id===C),F=r.find(ce=>ce.id===P),G=D?.clips?.find(ce=>ce.id===b),Q=F?.clips?.find(ce=>ce.id===M);if(!G||!Q){alert("Could not find selected clips");return}const B=t.addTransition(G.id,Q.id,i,o);n&&n(B),c(!1),v(null),g(null)},[e,t,n,i,o]);S.useCallback((m,k)=>{k==="from"?v(m):g(m)},[]);const N=S.useCallback(()=>{c(!1),v(null),g(null)},[]),h=S.useCallback(()=>{if(e.size===2){c(!0);const m=Array.from(e),[k,j]=m,[C,b]=k.split(":").map(Number),[P,M]=j.split(":").map(Number),D=r.find(B=>B.id===C),F=r.find(B=>B.id===P),G=D?.clips?.find(B=>B.id===b),Q=F?.clips?.find(B=>B.id===M);v(G),g(Q)}else alert("Please select exactly 2 clips to add a transition")},[e,r]),f=m=>{const k=Math.floor(m/60),j=(m%60).toFixed(1);return`${k}:${j.padStart(4,"0")}`};return a.jsxs("div",{className:"transition-controls",children:[a.jsxs("div",{className:"transition-header",children:[a.jsx("h3",{children:"Transitions"}),a.jsxs("button",{onClick:h,disabled:e.size!==2,className:"add-transition-btn",children:[a.jsx("span",{children:"➕"})," Add Transition",a.jsxs("span",{className:"selection-count",children:["(",e.size,"/2 clips selected)"]})]})]}),u&&a.jsx("div",{className:"transition-dialog-overlay",children:a.jsxs("div",{className:"transition-dialog",children:[a.jsxs("div",{className:"dialog-header",children:[a.jsx("h4",{children:"Add Transition"}),a.jsx("button",{onClick:N,className:"close-btn",children:"✕"})]}),a.jsxs("div",{className:"dialog-content",children:[a.jsxs("div",{className:"transition-selection",children:[a.jsx("label",{children:"Transition Type"}),a.jsx("div",{className:"transition-types",children:y.map(m=>a.jsxs("button",{className:`transition-type ${i===m.id?"selected":""}`,onClick:()=>l(m.id),children:[a.jsx("span",{className:"transition-icon",children:m.icon}),a.jsx("span",{className:"transition-name",children:m.name})]},m.id))})]}),a.jsxs("div",{className:"transition-settings",children:[a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"From Clip"}),a.jsx("div",{className:"clip-selector",children:d?a.jsxs("div",{className:"selected-clip",children:[a.jsx("span",{className:"clip-name",children:d.name}),a.jsx("span",{className:"clip-duration",children:f(d.duration)})]}):a.jsx("div",{className:"clip-placeholder",children:"Select clip..."})})]}),a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"To Clip"}),a.jsx("div",{className:"clip-selector",children:p?a.jsxs("div",{className:"selected-clip",children:[a.jsx("span",{className:"clip-name",children:p.name}),a.jsx("span",{className:"clip-duration",children:f(p.duration)})]}):a.jsx("div",{className:"clip-placeholder",children:"Select clip..."})})]}),a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"Duration"}),a.jsxs("div",{className:"duration-control",children:[a.jsx("input",{type:"range",min:"0.1",max:"5.0",step:"0.1",value:o,onChange:m=>s(parseFloat(m.target.value)),className:"duration-slider"}),a.jsx("span",{className:"duration-value",children:f(o)})]})]})]}),a.jsxs("div",{className:"dialog-actions",children:[a.jsx("button",{onClick:N,className:"cancel-btn",children:"Cancel"}),a.jsx("button",{onClick:w,className:"apply-btn",children:"Apply Transition"})]})]})]})}),a.jsx("style",{jsx:!0,children:`
        .transition-controls {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .transition-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .transition-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .add-transition-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-transition-btn:hover:not(:disabled) {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .add-transition-btn:disabled {
          background: var(--glass-border);
          color: var(--text-disabled);
          cursor: not-allowed;
          transform: none;
        }

        .selection-count {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .transition-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .transition-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-secondary);
        }

        .dialog-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .dialog-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .transition-selection {
          margin-bottom: 1.5rem;
        }

        .transition-selection label {
          display: block;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .transition-types {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .transition-type {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .transition-type:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .transition-type.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .transition-icon {
          font-size: 1.5rem;
        }

        .transition-name {
          font-weight: 500;
        }

        .transition-settings {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
        }

        .setting-group label {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .clip-selector {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .selected-clip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .clip-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .clip-duration {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .clip-placeholder {
          color: var(--text-tertiary);
          font-style: italic;
        }

        .duration-control {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .duration-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .duration-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .duration-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
        }

        .duration-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 60px;
        }

        .dialog-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .cancel-btn {
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: var(--surface-hover);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }

        .apply-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }
      `})]})},Af=({onTextAdd:t,onTextUpdate:e,onTextRemove:n,selectedTexts:r=new Set})=>{const[i,l]=S.useState(!1),[o,s]=S.useState({text:"",fontSize:48,fontFamily:"Arial",color:"#FFFFFF",position:{x:50,y:50},duration:5,startTime:0}),u=["Arial","Helvetica","Times New Roman","Courier New","Georgia","Verdana"],c=["#FFFFFF","#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#FF1493","#000000"];S.useCallback(()=>{const p={...o,id:Date.now(),name:`Text ${r.size+1}`};t&&t(p),l(!1),s({text:"",fontSize:48,fontFamily:"Arial",color:"#FFFFFF",position:{x:50,y:50},duration:5,startTime:0})},[t,r,o]),S.useCallback((p,g)=>{e&&e(p,g)},[e]),S.useCallback(p=>{n&&n(p)},[n]);const d=S.useCallback(()=>{if(!o.text.trim()){alert("Please enter text content");return}const p={...o,id:Date.now(),name:`Text ${r.size+1}`};t&&t(p),l(!1)},[t,r,o]),v=p=>{const g=Math.floor(p/60),y=Math.floor(p%60);return`${g.toString().padStart(2,"0")}:${y.toString().padStart(2,"0")}`};return a.jsxs("div",{className:"text-overlay-controls",children:[a.jsxs("div",{className:"text-header",children:[a.jsx("h3",{children:"Text Overlays"}),a.jsxs("button",{onClick:()=>l(!0),className:"add-text-btn",children:[a.jsx("span",{children:"📝"})," Add Text Overlay"]})]}),i&&a.jsx("div",{className:"text-dialog-overlay",children:a.jsxs("div",{className:"text-dialog",children:[a.jsxs("div",{className:"dialog-header",children:[a.jsx("h4",{children:"Add Text Overlay"}),a.jsx("button",{onClick:()=>l(!1),className:"close-btn",children:"✕"})]}),a.jsxs("div",{className:"dialog-content",children:[a.jsxs("div",{className:"text-input-section",children:[a.jsx("label",{children:"Text Content"}),a.jsx("textarea",{value:o.text,onChange:p=>s(g=>({...g,text:p.target.value})),placeholder:"Enter your text here...",className:"text-input",rows:3})]}),a.jsxs("div",{className:"text-properties",children:[a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Font Family"}),a.jsx("select",{value:o.fontFamily,onChange:p=>s(g=>({...g,fontFamily:p.target.value})),className:"font-select",children:u.map(p=>a.jsx("option",{value:p,children:p},p))})]}),a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Font Size"}),a.jsxs("div",{className:"font-size-control",children:[a.jsx("input",{type:"range",min:"16",max:"128",value:o.fontSize,onChange:p=>s(g=>({...g,fontSize:parseInt(p.target.value)})),className:"font-size-slider"}),a.jsxs("span",{className:"font-size-value",children:[o.fontSize,"px"]})]})]}),a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Text Color"}),a.jsx("div",{className:"color-picker",children:c.map(p=>a.jsx("button",{className:`color-option ${o.color===p?"selected":""}`,style:{backgroundColor:p},onClick:()=>s(g=>({...g,color:p}))},p))})]}),a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Position"}),a.jsxs("div",{className:"position-controls",children:[a.jsxs("div",{className:"position-input",children:[a.jsx("label",{children:"X:"}),a.jsx("input",{type:"number",min:"0",max:"100",value:o.position.x,onChange:p=>s(g=>({...g,position:{...g.position,x:parseInt(p.target.value)}})),className:"position-input-field"})]}),a.jsxs("div",{className:"position-input",children:[a.jsx("label",{children:"Y:"}),a.jsx("input",{type:"number",min:"0",max:"100",value:o.position.y,onChange:p=>s(g=>({...g,position:{...g.position,y:parseInt(p.target.value)}})),className:"position-input-field"})]})]})]}),a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Duration"}),a.jsxs("div",{className:"duration-control",children:[a.jsx("input",{type:"number",min:"0.5",max:"30",step:"0.5",value:o.duration,onChange:p=>s(g=>({...g,duration:parseFloat(p.target.value)})),className:"duration-input"}),a.jsx("span",{className:"duration-value",children:v(o.duration)})]})]}),a.jsxs("div",{className:"property-group",children:[a.jsx("label",{children:"Start Time"}),a.jsxs("div",{className:"duration-control",children:[a.jsx("input",{type:"number",min:"0",max:"300",step:"0.5",value:o.startTime,onChange:p=>s(g=>({...g,startTime:parseFloat(p.target.value)})),className:"duration-input"}),a.jsx("span",{className:"duration-value",children:v(o.startTime)})]})]})]}),a.jsxs("div",{className:"dialog-actions",children:[a.jsx("button",{onClick:()=>l(!1),className:"cancel-btn",children:"Cancel"}),a.jsx("button",{onClick:d,className:"apply-btn",children:"Add Text Overlay"})]})]})]})}),a.jsx("style",{jsx:!0,children:`
        .text-overlay-controls {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .text-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .text-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .add-text-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-text-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .text-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .text-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-secondary);
        }

        .dialog-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .dialog-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .text-input-section {
          margin-bottom: 1.5rem;
        }

        .text-input-section label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .text-input {
          width: 100%;
          padding: 0.75rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          resize: vertical;
          min-height: 80px;
        }

        .text-input:focus {
          outline: none;
          border-color: var(--electric-purple);
          box-shadow: 0 0 0 2px var(--electric-purple-alpha);
        }

        .text-properties {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .property-group {
          display: flex;
          flex-direction: column;
        }

        .property-group label {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .font-select {
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .font-size-control {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .font-size-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .font-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .font-size-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
        }

        .font-size-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 50px;
        }

        .color-picker {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
          gap: 0.5rem;
        }

        .color-option {
          width: 40px;
          height: 40px;
          border: 2px solid var(--glass-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-option:hover {
          border-color: var(--electric-purple);
          transform: scale(1.1);
        }

        .color-option.selected {
          border-color: var(--electric-purple);
          border-width: 3px;
          box-shadow: 0 0 0 2px var(--electric-purple);
        }

        .position-controls {
          display: flex;
          gap: 1rem;
        }

        .position-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .position-input label {
          min-width: 20px;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .position-input-field {
          width: 80px;
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .duration-control {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .duration-input {
          width: 80px;
          padding: 0.5rem;
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .duration-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 60px;
        }

        .dialog-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .cancel-btn {
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: var(--surface-hover);
          border-color: var(--electric-purple);
          color: var(--text-primary);
        }

        .apply-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }
      `})]})},$f=({audioTracks:t=[],onVolumeChange:e,onMuteToggle:n,onSoloToggle:r,selectedTracks:i=new Set})=>{const[l,o]=S.useState(!1),s=S.useCallback((g,y)=>{e&&e(g,y)},[e]),u=S.useCallback(g=>{n&&n(g)},[n]),c=S.useCallback(g=>{r&&r(g)},[r]),d=g=>`${Math.round(g*100)}%`,v=S.useCallback(()=>{o(!0)},[]),p=S.useCallback(()=>{o(!1)},[]);return a.jsxs("div",{className:"audio-mixer",children:[a.jsxs("div",{className:"mixer-header",children:[a.jsx("h3",{children:"Audio Mixer"}),a.jsxs("button",{onClick:v,className:"open-mixer-btn",children:[a.jsx("span",{children:"🎚️"})," Audio Mixer"]})]}),l&&a.jsx("div",{className:"audio-mixer-dialog-overlay",children:a.jsxs("div",{className:"audio-mixer-dialog",children:[a.jsxs("div",{className:"dialog-header",children:[a.jsx("h4",{children:"Audio Mixer"}),a.jsx("button",{onClick:p,className:"close-btn",children:"✕"})]}),a.jsxs("div",{className:"dialog-content",children:[a.jsx("div",{className:"tracks-list",children:t.map((g,y)=>a.jsxs("div",{className:`audio-track ${g.solo?"solo":""}`,children:[a.jsxs("div",{className:"track-header",children:[a.jsxs("div",{className:"track-info",children:[a.jsx("span",{className:"track-name",children:g.name}),a.jsx("span",{className:"track-type",children:g.type})]}),a.jsxs("div",{className:"track-controls",children:[a.jsx("button",{className:`solo-btn ${g.solo?"active":""}`,onClick:()=>c(g.id),title:"Solo track",children:"🔊"}),a.jsx("button",{className:`mute-btn ${g.muted?"muted":""}`,onClick:()=>u(g.id),title:g.muted?"Unmute track":"Mute track",children:g.muted?"🔇":"🔈"})]})]}),a.jsxs("div",{className:"volume-control",children:[a.jsx("label",{children:"Volume"}),a.jsxs("div",{className:"volume-slider-container",children:[a.jsx("input",{type:"range",min:"0",max:"200",value:g.volume,onChange:w=>s(g.id,parseFloat(w.target.value)/100),className:"volume-slider"}),a.jsx("span",{className:"volume-value",children:d(g.volume)})]})]}),a.jsx("div",{className:"track-visualizer",children:a.jsx("div",{className:"waveform-placeholder",children:a.jsx("div",{className:"waveform-bars",children:[...Array(20)].map((w,N)=>a.jsx("div",{className:"waveform-bar",style:{height:`${Math.random()*40+10}px`,opacity:g.muted?.3:.8}},N))})})})]},g.id))}),a.jsxs("div",{className:"mixer-controls",children:[a.jsxs("div",{className:"control-group",children:[a.jsx("h5",{children:"Master Controls"}),a.jsxs("div",{className:"master-controls",children:[a.jsx("button",{className:"master-mute-all-btn",children:"🔇 Mute All"}),a.jsx("button",{className:"master-solo-none-btn",children:"🔊 Solo None"})]})]}),a.jsxs("div",{className:"control-group",children:[a.jsx("h5",{children:"Background Music"}),a.jsxs("div",{className:"bg-music-controls",children:[a.jsx("button",{className:"import-music-btn",children:"📁 Import Music"}),a.jsx("button",{className:"record-music-btn",children:"🎙️ Record Voice"})]})]})]})]})]})}),a.jsx("style",{jsx:!0,children:`
        .audio-mixer {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .mixer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .mixer-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .open-mixer-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .open-mixer-btn:hover {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .audio-mixer-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .audio-mixer-dialog {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--surface-secondary);
        }

        .dialog-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .dialog-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .tracks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .audio-track {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          gap: 1rem;
          transition: all 0.2s ease;
        }

        .audio-track.solo {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .track-header {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-width: 0;
        }

        .track-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .track-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .track-type {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .track-controls {
          display: flex;
          gap: 0.5rem;
        }

        .solo-btn, .mute-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .solo-btn.active, .mute-btn.muted {
          background: var(--electric-purple);
          color: white;
          border-color: var(--electric-purple);
        }

        .solo-btn:hover, .mute-btn:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .volume-control {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 150px;
        }

        .volume-control label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .volume-slider-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .volume-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-border);
          outline: none;
          -webkit-appearance: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--electric-purple);
          cursor: pointer;
          border: none;
        }

        .volume-value {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-weight: 500;
          min-width: 45px;
          text-align: center;
        }

        .track-visualizer {
          flex: 1;
          align-items: center;
          justify-content: center;
        }

        .waveform-placeholder {
          width: 100%;
          height: 60px;
          background: var(--surface);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .waveform-bars {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 100%;
        }

        .waveform-bar {
          width: 3px;
          background: var(--electric-purple);
          border-radius: 1.5px;
          transition: height 0.3s ease;
        }

        .mixer-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .control-group {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .control-group h5 {
          margin: 0 0 0.75rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .master-controls {
          display: flex;
          gap: 0.5rem;
        }

        .master-mute-all-btn, .master-solo-none-btn {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .master-mute-all-btn:hover, .master-solo-none-btn:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }

        .bg-music-controls {
          display: flex;
          gap: 0.5rem;
        }

        .import-music-btn, .record-music-btn {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .import-music-btn:hover, .record-music-btn:hover {
          background: var(--electric-purple-alpha);
          border-color: var(--electric-purple);
          color: var(--electric-purple);
        }
      `})]})},Wf=({onExport:t,ffmpegLoaded:e,selectedClips:n=new Set})=>{const[r,i]=S.useState({format:"mp4",resolution:"1920x1080",quality:"high",bitrate:"5M",fps:30,gifFps:10,gifDuration:5}),l=S.useCallback(async()=>{if(!e){alert("FFmpeg is still loading. Please wait...");return}t&&await t(r)},[e,t,r]),o=[{value:"mp4",label:"MP4",description:"Standard video format"},{value:"webm",label:"WebM",description:"Web optimized format"},{value:"mov",label:"MOV",description:"Apple QuickTime format"},{value:"gif",label:"GIF",description:"Animated image format"}],s=[{value:"3840x2160",label:"4K UHD"},{value:"1920x1080",label:"1080p HD"},{value:"1280x720",label:"720p HD"},{value:"854x480",label:"480p SD"},{value:"640x360",label:"360p Web"},{value:"1080x1920",label:"Vertical 1080p"},{value:"1080x1080",label:"Square 1080p"}],u=[{value:"high",label:"High Quality",bitrate:"8M"},{value:"medium",label:"Medium Quality",bitrate:"5M"},{value:"low",label:"Low Quality",bitrate:"2M"}],c=[24,30,60];return a.jsxs("div",{className:"export-options",children:[a.jsxs("div",{className:"export-header",children:[a.jsx("h3",{children:"Export Options"}),a.jsxs("button",{onClick:l,disabled:!e,className:"export-btn",children:[a.jsx("span",{children:"📤"})," Export Video"]})]}),a.jsxs("div",{className:"export-settings",children:[a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"Format"}),a.jsx("div",{className:"format-options",children:o.map(d=>a.jsxs("button",{className:`format-option ${r.format===d.value?"selected":""}`,onClick:()=>i(v=>({...v,format:d.value})),children:[a.jsx("span",{className:"format-label",children:d.label}),a.jsx("span",{className:"format-desc",children:d.description})]},d.value))})]}),a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"Resolution"}),a.jsx("select",{value:r.resolution,onChange:d=>i(v=>({...v,resolution:d.target.value})),className:"resolution-select",children:s.map(d=>a.jsx("option",{value:d.value,children:d.label},d.value))})]}),r.format!=="gif"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"Quality"}),a.jsx("div",{className:"quality-options",children:u.map(d=>a.jsxs("button",{className:`quality-option ${r.quality===d.value?"selected":""}`,onClick:()=>i(v=>({...v,quality:d.value,bitrate:d.bitrate})),children:[a.jsx("span",{className:"quality-label",children:d.label}),a.jsx("span",{className:"quality-bitrate",children:d.bitrate})]},d.value))})]}),a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"Frame Rate"}),a.jsx("div",{className:"fps-options",children:c.map(d=>a.jsxs("button",{className:`fps-option ${r.fps===d?"selected":""}`,onClick:()=>i(v=>({...v,fps:d})),children:[d," fps"]},d))})]})]}),r.format==="gif"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"GIF Frame Rate"}),a.jsx("div",{className:"gif-fps-options",children:[5,10,15,20].map(d=>a.jsxs("button",{className:`gif-fps-option ${r.gifFps===d?"selected":""}`,onClick:()=>i(v=>({...v,gifFps:d})),children:[d," fps"]},d))})]}),a.jsxs("div",{className:"setting-group",children:[a.jsx("label",{children:"GIF Duration"}),a.jsx("input",{type:"number",min:"1",max:"30",value:r.gifDuration,onChange:d=>i(v=>({...v,gifDuration:parseInt(d.target.value)})),className:"gif-duration-input"}),a.jsx("span",{className:"duration-label",children:"seconds"})]})]})]}),a.jsx("style",{jsx:!0,children:`
        .export-options {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1rem;
          margin-top: 1rem;
        }

        .export-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .export-header h3 {
          margin: 0;
          color: var(--text-primary);
          font-weight: 600;
        }

        .export-btn {
          background: var(--electric-purple);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .export-btn:hover:not(:disabled) {
          background: var(--electric-purple-hover);
          transform: translateY(-1px);
        }

        .export-btn:disabled {
          background: var(--glass-border);
          color: var(--text-disabled);
          cursor: not-allowed;
        }

        .export-settings {
          display: grid;
          gap: 1rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-group label {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .format-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.5rem;
        }

        .format-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .format-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .format-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .format-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .format-desc {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .resolution-select {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .quality-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .quality-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .quality-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .quality-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .quality-label {
          display: block;
          font-weight: 500;
        }

        .quality-bitrate {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .fps-options, .gif-fps-options {
          display: flex;
          gap: 0.5rem;
        }

        .fps-option, .gif-fps-option {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fps-option:hover, .gif-fps-option:hover {
          border-color: var(--electric-purple);
          background: var(--electric-purple-alpha);
        }

        .fps-option.selected, .gif-fps-option.selected {
          border-color: var(--electric-purple);
          background: var(--electric-purple);
          color: white;
        }

        .gif-duration-input {
          background: var(--surface-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          width: 80px;
        }

        .duration-label {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin-left: 0.5rem;
        }
      `})]})};function pl(t){if(t==null||isNaN(t))return"0:00.0";const e=Math.floor(t/60),n=(t%60).toFixed(1).padStart(4,"0");return`${e}:${n}`}function Uf(){const t=S.useRef(null),e=S.useRef(null),n=S.useRef(null);S.useRef(null);const r=S.useRef(new Nf);S.useRef(new Ff),S.useRef(new xa);const i=S.useRef(new If),[l,o]=S.useState([]),[s,u]=S.useState(null),[c,d]=S.useState("Ready. Add a video to get started."),[v,p]=S.useState(!1),[g,y]=S.useState(!1),[w,N]=S.useState(1),[h,f]=S.useState(1),[m,k]=S.useState({x:0,y:0}),[j,C]=S.useState(!1),[b,P]=S.useState(0),[M,D]=S.useState(1),{ffmpeg:F,fetchFile:G,loaded:Q,progress:B,load:ce}=Mf();S.useEffect(()=>(e.current=hr.create({container:"#waveform",waveColor:"#0ea5a4",progressColor:"#3b82f6",height:80,interact:!0}),()=>e.current?.destroy()),[]),S.useEffect(()=>{const T=t.current;if(!T)return;const A=()=>{const I=e.current;I&&n.current&&T.duration>0&&I.seekTo(T.currentTime/T.duration),P(T.currentTime)};return T.addEventListener("timeupdate",A),()=>T.removeEventListener("timeupdate",A)},[]);const rt=useCallback(T=>{P(T),t.current&&(t.current.currentTime=T)},[]),Xe=useCallback(T=>{u(T)},[]),x=useCallback(T=>{d(`Added ${T.name} transition`)},[]),_=useCallback(T=>{d(`Added text overlay: "${T.text}"`)},[]),R=useCallback((T,A)=>{d(`Updated text overlay ${T}`)},[]),z=useCallback(T=>{d(`Removed text overlay ${T}`)},[]),V=useCallback((T,A)=>{d(`Adjusted audio volume for track ${T}`)},[]),it=useCallback(T=>{d(`${T} track ${volume?"unmuted":"muted"}`)},[]),ye=useCallback(T=>{d(`${T} track ${solo?"soloed":"unsoloed"}`)},[]),Ft=useCallback(async T=>{if(!F||!Q){alert("FFmpeg is not loaded yet. Please wait...");return}try{d("Exporting video...");const A=l[0];if(!A){alert("No video clips to export");return}const I=new xa;await I.initialize();let Z;const ie=`output.${T.format}`;T.format==="gif"?Z=await I.exportAsGIF(A.file,ie,T):Z=await I.exportWithSettings(A.file,ie,T);const Me=URL.createObjectURL(Z),Ue=document.createElement("a");Ue.href=Me,Ue.download=`kinetic-export.${T.format}`,document.body.appendChild(Ue),Ue.click(),document.body.removeChild(Ue),URL.revokeObjectURL(Me),d(`Export completed: ${T.format.toUpperCase()} format`)}catch(A){console.error("Export failed:",A),d(`Export failed: ${A.message}`)}},[F,Q,l]);function lt(T){Array.from(T.target.files).filter(I=>I.type.startsWith("video/")).forEach(I=>{const Z=URL.createObjectURL(I),ie=document.createElement("video");ie.src=Z,ie.onloadedmetadata=()=>{o(Me=>[...Me,{file:I,name:I.name,start:0,end:ie.duration,duration:ie.duration,url:Z}])}}),T.target.value=""}function It(T,A,I){o(Z=>Z.map((ie,Me)=>Me===T?{...ie,start:Number(A),end:I===null?null:Number(I)}:ie))}function Mc(T){o(A=>A.filter((I,Z)=>Z!==T)),s===T?u(null):s>T&&u(A=>A-1)}function Fc(T){const A=t.current;A.src=T.url,A.currentTime=T.start||0,A.play(),n.current=!1,e.current?.load(T.url),e.current?.once("ready",()=>{n.current=!0})}function ts(T,A,I){const Z=URL.createObjectURL(new Blob([T.buffer],{type:I})),ie=document.createElement("a");ie.href=Z,ie.download=A,ie.click(),setTimeout(()=>URL.revokeObjectURL(Z),1e4)}async function Ic(){if(l.length===0)return alert("Add at least one clip first.");try{d("Loading FFmpeg…"),await ce();const T=[];for(let I=0;I<l.length;I++){const Z=l[I],ie=`in${I}.mp4`,Me=`seg${I}.mp4`;d(`Encoding clip ${I+1} of ${l.length}…`),await F.writeFile(ie,await G(Z.file));const Ue=Z.start||0,Tn=Z.end!=null?Z.end-Ue:null;await F.exec(["-ss",`${Ue}`,"-i",ie,...Tn?["-t",`${Tn}`]:[],"-c:v","libx264","-preset","veryfast","-c:a","aac",Me]),T.push(Me)}await F.writeFile("concat.txt",T.map(I=>`file '${I}'`).join(`
`)),d("Joining clips…");try{await F.exec(["-f","concat","-safe","0","-i","concat.txt","-c","copy","output.mp4"])}catch{d("Re-encoding for compatibility…"),await F.exec(["-f","concat","-safe","0","-i","concat.txt","-c:v","libx264","-preset","veryfast","-c:a","aac","output.mp4"])}const A=await F.readFile("output.mp4");ts(A,"edited-video.mp4","video/mp4"),d("✅ MP4 download started!")}catch(T){console.error(T),d(`❌ Export failed: ${T.message}`)}}async function Oc(){if(l.length===0)return alert("Add at least one clip first.");try{d("Loading FFmpeg…"),await ce();const T=[];for(let I=0;I<l.length;I++){const Z=l[I],ie=`in${I}.mp4`,Me=`seg${I}.mp3`;d(`Extracting audio ${I+1} of ${l.length}…`),await F.writeFile(ie,await G(Z.file));const Ue=Z.start||0,Tn=Z.end!=null?Z.end-Ue:null;await F.exec(["-ss",`${Ue}`,"-i",ie,...Tn?["-t",`${Tn}`]:[],"-vn","-c:a","libmp3lame",Me]),T.push(Me)}await F.writeFile("concat.txt",T.map(I=>`file '${I}'`).join(`
`)),d("Merging audio…"),await F.exec(["-f","concat","-safe","0","-i","concat.txt","-c","copy","output.mp3"]);const A=await F.readFile("output.mp3");ts(A,"audio.mp3","audio/mp3"),d("✅ MP3 download started!")}catch(T){console.error(T),d(`❌ Export failed: ${T.message}`)}}return a.jsxs("div",{className:"video-editor",children:[a.jsxs("div",{className:"toolbar-row",children:[a.jsxs("label",{className:"file-label",children:["📁 Add Videos",a.jsx("input",{className:"file-input",type:"file",accept:"video/*",multiple:!0,onChange:lt})]}),a.jsx("button",{className:"secondary",onClick:()=>ce().then(()=>d("✅ FFmpeg ready!")),disabled:Q,children:Q?"✅ FFmpeg Ready":"⚡ Preload FFmpeg"}),a.jsx("button",{onClick:Ic,disabled:l.length===0,children:"⬇ Export MP4"}),a.jsx("button",{onClick:Oc,disabled:l.length===0,children:"🎵 Export MP3"})]}),B>0&&B<100&&a.jsxs("div",{className:"progress-container",children:[a.jsx("div",{className:"progress-bar",style:{width:`${B}%`}}),a.jsxs("span",{className:"progress-label",children:[B,"%"]})]}),a.jsxs("div",{className:"editor-body",children:[a.jsxs("div",{className:"preview-column",children:[a.jsxs("div",{style:{position:"relative"},children:[a.jsx("video",{ref:t,className:`editor-preview ${l.length>0&&s!==null?"playing":""}`,controls:!1}),a.jsxs("div",{className:"playback-controls",children:[a.jsx("button",{onClick:()=>t.current?.play(),title:"Play",children:"▶"}),a.jsx("button",{onClick:()=>t.current?.pause(),title:"Pause",children:"⏸"}),a.jsx("button",{onClick:()=>{t.current&&(t.current.currentTime=0)},title:"Stop",children:"⏹"})]})]}),a.jsx("div",{id:"waveform",style:{width:"100%",marginTop:12,borderRadius:6,overflow:"hidden"}}),a.jsxs("div",{className:"waveform-controls",children:[a.jsx("button",{onClick:()=>e.current?.play(),children:"▶ Play"}),a.jsx("button",{onClick:()=>e.current?.pause(),children:"⏸ Pause"}),a.jsx("label",{children:"Zoom:"}),a.jsx("input",{type:"range",min:"0",max:"200",defaultValue:"0",onChange:T=>e.current?.zoom(Number(T.target.value))})]}),l.length>0&&a.jsx("p",{className:"hint",children:"💡 Click Preview on a clip to load it here. Use the floating controls for playback."})]}),a.jsxs("aside",{className:"clips-sidebar",children:[a.jsxs("h3",{children:["Clips ",l.length>0&&a.jsx("span",{className:"badge",children:l.length})]}),l.length===0&&a.jsx("p",{className:"muted",children:'No clips yet — use "Add Videos" above.'}),l.map((T,A)=>a.jsxs("div",{className:`clip-item${s===A?" selected":""}`,children:[a.jsxs("div",{className:"clip-row",children:[a.jsx("div",{className:"clip-name",title:T.name,children:T.name}),a.jsxs("div",{className:"clip-actions",children:[a.jsx("button",{onClick:()=>{u(A),Fc(T)},children:"▶ Preview"}),a.jsx("button",{className:"danger",onClick:()=>Mc(A),children:"✕"})]})]}),a.jsxs("div",{className:"clip-controls",children:[a.jsxs("div",{className:"range-row",children:[a.jsxs("label",{children:["Start ",a.jsx("span",{className:"time-badge",children:pl(T.start)})]}),a.jsx("input",{type:"range",min:"0",max:T.duration??30,step:"0.1",value:T.start,onChange:I=>It(A,I.target.value,T.end)})]}),a.jsxs("div",{className:"range-row",children:[a.jsxs("label",{children:["End ",a.jsx("span",{className:"time-badge",children:pl(T.end??T.duration)})]}),a.jsx("input",{type:"range",min:T.start,max:T.duration??30,step:"0.1",value:T.end??T.duration??30,onChange:I=>It(A,T.start,I.target.value)})]}),a.jsxs("div",{className:"clip-duration-info",children:["Duration: ",pl((T.end??T.duration??0)-T.start)]})]})]},A))]})]}),l.length>0&&a.jsx(jf,{timelineEngine:r.current,currentTime:b,duration:t.current?.duration||60,onTimeChange:rt,onClipSelect:Xe}),a.jsx(Of,{effectsEngine:i.current,selectedClips:new Set,onTransitionAdd:x,tracks:r.current?.getTracks()||[]}),a.jsx(Af,{onTextAdd:_,onTextUpdate:R,onTextRemove:z,selectedTexts:new Set}),a.jsx($f,{audioTracks:[{id:1,name:"Main Audio",type:"video",volume:1,muted:!1,solo:!1},{id:2,name:"Background Music",type:"music",volume:.7,muted:!1,solo:!1}],onVolumeChange:V,onMuteToggle:it,onSoloToggle:ye,selectedTracks:new Set}),a.jsx(Wf,{onExport:Ft,ffmpegLoaded:Q,selectedClips:new Set}),a.jsxs("div",{className:"status-row",children:[a.jsx("span",{className:"status-dot",style:{background:Q?"#22c55e":"#f59e0b"}}),a.jsx("strong",{children:"Status:"})," ",c]}),a.jsx("div",{className:"note muted",children:a.jsx("small",{children:"🔒 All processing happens in your browser. No uploads. No watermarks."})})]})}function Bf({currentTheme:t,onThemeChange:e,onFFmpegReload:n,onBrandKitOpen:r,ffmpegLoaded:i}){const[l,o]=S.useState(!1),s=S.useRef(null),u=S.useRef(null);S.useEffect(()=>{function p(g){u.current&&!u.current.contains(g.target)&&o(!1)}return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[]);const c=[{value:"dark",label:"🌙 Dark Mode",description:"Cyber Midnight theme"},{value:"light",label:"☀️ Light Mode",description:"Frosted Silver theme"},{value:"system",label:"🖥️ System",description:"Follow system preference"}],d=p=>{e(p),o(!1)},v=()=>{n(),o(!1)};return a.jsxs("div",{className:"settings-wheel",ref:s,children:[a.jsxs("button",{className:"settings-button",onClick:()=>o(!l),title:"Settings",children:["⚙️",a.jsx("div",{className:"settings-indicator",children:i&&a.jsx("div",{className:"status-dot active"})})]}),l&&a.jsxs("div",{className:"settings-dropdown",ref:u,children:[a.jsxs("div",{className:"settings-section",children:[a.jsx("h4",{children:"🌓 Appearance"}),a.jsx("div",{className:"theme-options",children:c.map(p=>a.jsxs("button",{className:`theme-option ${t===p.value?"active":""}`,onClick:()=>d(p.value),children:[a.jsx("span",{className:"theme-label",children:p.label}),a.jsx("span",{className:"theme-description",children:p.description})]},p.value))})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h4",{children:"⚡ Engine Config"}),a.jsxs("button",{className:"engine-option",onClick:v,children:[a.jsx("span",{className:"engine-icon",children:"🔄"}),a.jsxs("div",{className:"engine-info",children:[a.jsx("div",{className:"engine-title",children:"Reinitialize FFmpeg"}),a.jsxs("div",{className:"engine-status",children:["Status: ",i?"✅ Loaded":"⏳ Loading"]})]})]})]}),a.jsxs("div",{className:"settings-section",children:[a.jsx("h4",{children:"🎨 Brand Kit"}),a.jsxs("button",{className:"brand-option",onClick:()=>{r(),o(!1)},children:[a.jsx("span",{className:"brand-icon",children:"🎨"}),a.jsxs("div",{className:"brand-info",children:[a.jsx("div",{className:"brand-title",children:"Open Brand Kit"}),a.jsx("div",{className:"brand-description",children:"Add logos and custom colors"})]})]})]}),a.jsx("div",{className:"settings-footer",children:a.jsxs("div",{className:"app-info",children:[a.jsx("strong",{children:"Kinetic v1.0.0"}),a.jsx("div",{className:"app-status",children:"High-Performance Video Editor"})]})})]})]})}function Vf({onBrandUpdate:t}){const[e,n]=S.useState(null),[r,i]=S.useState("#BF00FF"),[l,o]=S.useState(!0),[s,u]=S.useState("bottom-right"),c=S.useRef(null),d=N=>{const h=N.target.files[0];if(h&&h.type.startsWith("image/")){const f=new FileReader;f.onload=m=>{n(m.target.result),t({logo:m.target.result,brandColor:r,neonGlow:l,position:s})},f.readAsDataURL(h)}},v=N=>{i(N),e&&t({logo:e,brandColor:N,neonGlow:l,position:s})},p=()=>{const N=!l;o(N),e&&t({logo:e,brandColor:r,neonGlow:N,position:s})},g=N=>{u(N),e&&t({logo:e,brandColor:r,neonGlow:l,position:N})},y=[{name:"Kinetic Purple",value:"#BF00FF"},{name:"Electric Blue",value:"#00D4FF"},{name:"Neon Green",value:"#00FF88"},{name:"Cyber Red",value:"#FF006E"},{name:"Solar Orange",value:"#FF6B00"},{name:"Custom",value:"custom"}],w=[{value:"top-left",label:"↖ Top Left"},{value:"top-right",label:"↗ Top Right"},{value:"bottom-left",label:"↙ Bottom Left"},{value:"bottom-right",label:"↘ Bottom Right"},{value:"center",label:"⊙ Center"}];return a.jsxs("div",{className:"brand-kit",children:[a.jsxs("div",{className:"brand-kit-header",children:[a.jsx("h3",{children:"🎨 Brand Kit"}),a.jsx("p",{children:"Add your logo and brand colors to videos"})]}),a.jsxs("div",{className:"brand-kit-content",children:[a.jsxs("div",{className:"brand-section",children:[a.jsx("label",{className:"brand-label",children:"Logo"}),a.jsxs("div",{className:"logo-upload-area",children:[a.jsx("input",{ref:c,type:"file",accept:"image/*",onChange:d,style:{display:"none"}}),e?a.jsxs("div",{className:"logo-preview",children:[a.jsx("img",{src:e,alt:"Brand logo"}),a.jsx("button",{className:"remove-logo-btn",onClick:()=>{n(null),t(null)},children:"✕"})]}):a.jsxs("div",{className:"upload-placeholder",onClick:()=>c.current?.click(),children:[a.jsx("div",{className:"upload-icon",children:"📁"}),a.jsxs("div",{className:"upload-text",children:["Click to upload logo",a.jsx("br",{}),a.jsx("small",{children:"PNG, JPG recommended"})]})]})]})]}),a.jsxs("div",{className:"brand-section",children:[a.jsx("label",{className:"brand-label",children:"Brand Color"}),a.jsx("div",{className:"color-presets",children:y.map(N=>a.jsx("button",{className:`color-preset ${r===N.value?"active":""}`,style:{backgroundColor:N.value!=="custom"?N.value:r,border:N.value==="custom"?"2px dashed var(--border)":"none"},onClick:()=>{N.value!=="custom"&&v(N.value)},title:N.name,children:N.value==="custom"&&"+"},N.value))}),r==="custom"&&a.jsx("input",{type:"color",value:r,onChange:N=>v(N.target.value),className:"custom-color-picker"})]}),a.jsxs("div",{className:"brand-section",children:[a.jsx("label",{className:"brand-label",children:"Position"}),a.jsx("div",{className:"position-grid",children:w.map(N=>a.jsx("button",{className:`position-btn ${s===N.value?"active":""}`,onClick:()=>g(N.value),children:N.label},N.value))})]}),a.jsxs("div",{className:"brand-section",children:[a.jsx("label",{className:"brand-label",children:"Effects"}),a.jsxs("div",{className:"effect-controls",children:[a.jsxs("label",{className:"toggle-switch",children:[a.jsx("input",{type:"checkbox",checked:l,onChange:p}),a.jsx("span",{className:"toggle-slider"}),a.jsx("span",{className:"toggle-label",children:"Kinetic Glow"})]}),a.jsx("p",{className:"effect-description",children:"Apply a subtle purple-tinted color filter matching Kinetic's aesthetic"})]})]}),e&&a.jsxs("div",{className:"brand-section",children:[a.jsx("label",{className:"brand-label",children:"Preview"}),a.jsx("div",{className:"brand-preview",children:a.jsx("div",{className:"preview-video",children:a.jsxs("div",{className:"preview-content",children:[a.jsx("span",{className:"preview-text",children:"Your video preview"}),a.jsx("div",{className:"preview-logo",style:{[s]:"20px",filter:l?`drop-shadow(0 0 10px ${r})`:"none"},children:a.jsx("img",{src:e,alt:"Logo preview",style:{maxWidth:"80px",maxHeight:"40px"}})})]})})})]})]})]})}function Hf(){const[t,e]=S.useState("dark"),[n,r]=S.useState(!1),[i,l]=S.useState(!1),[o,s]=S.useState(!0),[u,c]=S.useState(!1),[d,v]=S.useState(!1);S.useEffect(()=>{const h=localStorage.getItem("kinetic-theme")||"dark";e(h),document.documentElement.setAttribute("data-theme",h);const f=setTimeout(()=>{v(!0)},2e3);return()=>clearTimeout(f)},[]);const p=h=>{e(h),document.documentElement.setAttribute("data-theme",h),localStorage.setItem("kinetic-theme",h)},g=()=>{v(!1),setTimeout(()=>{v(!0)},1500)},y=()=>{c(!0)},w=()=>{c(!1)};function N(){s(!1)}return o?a.jsx(da,{children:a.jsxs("div",{className:"landing-page",children:[a.jsxs("header",{className:"header",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[a.jsx("img",{src:"/assets/kinetic-logo.png",alt:"Kinetic Video Editor",style:{height:"48px",width:"48px",objectFit:"contain"}}),a.jsxs("div",{children:[a.jsx("span",{style:{fontSize:"1.5rem",fontWeight:700},children:"Kinetic"}),a.jsx("div",{style:{fontSize:"0.9rem",color:"var(--muted)",marginTop:"-2px"},children:"Professional Video Editor"})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[a.jsx("button",{className:"primary",onClick:N,style:{fontSize:"1.1rem",padding:"12px 24px"},children:"⚡ Start Editing"}),a.jsx("button",{className:"secondary",onClick:()=>p(t==="dark"?"light":"dark"),title:"Toggle theme",style:{fontSize:"1.1rem",padding:"8px 12px"},children:t==="dark"?"☀️":"🌙"})]})]}),a.jsxs("div",{className:"landing-content",children:[a.jsx("div",{className:"hero-section",children:a.jsxs("div",{className:"hero-content",children:[a.jsxs("div",{className:"hero-text",children:[a.jsx("h1",{className:"hero-title",children:"Your Video. Your Browser. Your Privacy."}),a.jsxs("p",{className:"hero-subtitle",children:["Experience ",a.jsx("strong",{children:"Kinetic"}),"—the browser-based video editor that doesn't compromise on power. Real-time processing, hardened privacy, and pro-grade simplicity in a stunning Electric Purple interface."]})]}),a.jsx("div",{className:"hero-poster",children:a.jsx("img",{src:"/assets/kinetic-poster-landing-page-copy (2).png",alt:"Kinetic Video Editor - Professional Browser-Based Video Editing",className:"hero-image"})})]})}),a.jsxs("div",{className:"features-grid",children:[a.jsxs("div",{className:"feature-card",children:[a.jsx("div",{className:"feature-icon",children:"⚡"}),a.jsx("h3",{children:"Real-Time Velocity"}),a.jsx("p",{children:"Don't wait for cloud renders. Kinetic uses your local hardware to process video in real-time."})]}),a.jsxs("div",{className:"feature-card",children:[a.jsx("div",{className:"feature-icon",children:"🔒"}),a.jsx("h3",{children:"Hardened Privacy"}),a.jsx("p",{children:"Your footage never leaves your machine. 100% offline-capable once loaded."})]}),a.jsxs("div",{className:"feature-card",children:[a.jsx("div",{className:"feature-icon",children:"🎨"}),a.jsx("h3",{children:"Pro-Grade Simplicity"}),a.jsx("p",{children:"No cluttered menus. Just a sharp Electric Purple interface designed for focus and flow."})]})]}),a.jsxs("div",{className:"cta-section",children:[a.jsx("button",{className:"primary cta-button",onClick:N,style:{fontSize:"1.2rem",padding:"16px 32px"},children:"🎬 Start Creating Now"}),a.jsxs("p",{style:{marginTop:"16px",color:"var(--muted)"},children:[a.jsx("strong",{children:"Zero Footprint:"})," No uploads • No watermarks • Open source"]})]})]}),a.jsxs("footer",{style:{textAlign:"center",padding:"20px",borderTop:"1px solid var(--border)",marginTop:"60px",color:"var(--muted)",fontSize:"0.85rem"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8},children:["🔒 ",a.jsx("span",{children:"Privacy-First Editing"})]}),a.jsxs("div",{style:{marginBottom:8},children:[a.jsx("strong",{children:"Kinetic Video Editor"})," — Open Source • No Watermarks • No Uploads Required"]}),a.jsx("div",{style:{fontSize:"0.8rem",opacity:.8},children:"Build for content creators by 103 Software Solutions LLC"})]})]})}):a.jsx(da,{children:a.jsxs(a.Fragment,{children:[a.jsxs("header",{className:"header",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[a.jsx("img",{src:"/assets/kinetic-logo.png",alt:"Kinetic Video Editor",style:{height:"36px",width:"36px",objectFit:"contain"}}),a.jsxs("div",{children:[a.jsx("span",{style:{fontSize:"1.2rem",fontWeight:700},children:"Kinetic"}),a.jsx("div",{style:{fontSize:"0.75rem",color:"var(--muted)",marginTop:"-2px"},children:"Professional Video Editor"})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[a.jsxs("div",{className:"dropdown",children:[a.jsxs("button",{className:"secondary",onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),style:{display:"flex",alignItems:"center",gap:6},children:["📁 Project",a.jsx("span",{style:{fontSize:"0.7rem"},children:"▼"})]}),n&&a.jsxs("div",{className:"dropdown-content",onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),children:[a.jsx("a",{href:"#",className:"dropdown-item",onClick:h=>{h.preventDefault(),document.querySelector(".file-input").click()},children:"📹 Add Videos"}),a.jsx("a",{href:"#",className:"dropdown-item",onClick:h=>{h.preventDefault()},children:"⚡ Preload FFmpeg"}),a.jsx("a",{href:"#",className:"dropdown-item",onClick:h=>{h.preventDefault()},children:"🗑️ Clear Project"})]})]}),a.jsxs("div",{className:"dropdown",children:[a.jsxs("button",{className:"primary",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),style:{display:"flex",alignItems:"center",gap:6},children:["📤 Export",a.jsx("span",{style:{fontSize:"0.7rem"},children:"▼"})]}),i&&a.jsxs("div",{className:"dropdown-content",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),children:[a.jsx("a",{href:"#",className:"dropdown-item",onClick:h=>{h.preventDefault()},children:"🎬 Export as MP4"}),a.jsx("a",{href:"#",className:"dropdown-item",onClick:h=>{h.preventDefault()},children:"🎵 Export as MP3"})]})]}),a.jsx(Bf,{currentTheme:t,onThemeChange:p,onFFmpegReload:g,onBrandKitOpen:y,ffmpegLoaded:d})]})]}),a.jsx("div",{className:"app-container",children:a.jsxs("div",{className:"content",children:[a.jsx(Uf,{}),u&&a.jsxs("div",{className:"brand-kit-modal",children:[a.jsx("div",{className:"brand-kit-overlay",onClick:w}),a.jsxs("div",{className:"brand-kit-content",children:[a.jsx("button",{className:"close-button",onClick:w,children:"✕"}),a.jsx(Vf,{onBrandUpdate:h=>{console.log("Brand settings updated:",h)}})]})]})]})}),a.jsxs("footer",{style:{textAlign:"center",padding:"20px",borderTop:"1px solid var(--border)",marginTop:"40px",color:"var(--muted)",fontSize:"0.85rem"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8},children:["🔒 ",a.jsx("span",{children:"Privacy-First Editing"})]}),a.jsxs("div",{style:{marginBottom:8},children:[a.jsx("strong",{children:"Kinetic Video Editor"})," — Open Source • No Watermarks • No Uploads Required"]}),a.jsx("div",{style:{fontSize:"0.8rem",opacity:.8},children:"Build for content creators by 103 Software Solutions LLC"})]})]})})}fl.createRoot(document.getElementById("root")).render(a.jsx(td.StrictMode,{children:a.jsx(Hf,{})}));
