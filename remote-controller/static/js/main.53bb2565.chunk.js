(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{140:function(e,t,n){e.exports=n.p+"static/media/logo.55a7e322.svg"},141:function(e,t,n){e.exports=n.p+"static/media/dots.269586e3.svg"},142:function(e,t,n){e.exports=n.p+"static/media/bluetooth-icon.da0085d1.svg"},153:function(e,t,n){e.exports=n.p+"static/media/coxal-pulse-scheme.3bf6add8.svg"},154:function(e,t,n){e.exports=n.p+"static/media/femur-pulse-scheme.e8cb12f7.svg"},155:function(e,t,n){e.exports=n.p+"static/media/tibia-pulse-scheme.07ab316f.svg"},166:function(e,t,n){e.exports=n(318)},176:function(e,t,n){"use strict";n.r(t),n.d(t,"disconnect",function(){return o}),n.d(t,"sendCommand",function(){return s}),n.d(t,"createConnectionChannel",function(){return u});var a=n(8),r=n(50),c=n(39),i=n.n(c),l=n(49),o=function(e){var t=e.id;return new Promise(function(e,n){i.a.disconnect(t,e,n)})},s=function(e,t){return new Promise(function(n,a){i.a.write(e.id,e.service,e.characteristic,t,n,a)})},u=function(e){return Object(r.b)(function(t){var n=setTimeout(function(){t({status:a.b.DISCONNECTED,error:"Connection timeout. Check the power of your bot and retry!"})},5500),r=null,c=null,o=function(){r&&i.a.stopNotification(r.id,r.service,r.characteristic)};return i.a.scan([],5,function(s){s.name===e&&(clearTimeout(n),i.a.stopScan(function(){console.log("scan stopped!")},function(){console.log("scan failed to stop :(")}),t({status:a.b.CONNECTING}),i.a.connect(s.id,function(e){var n=e.characteristics;r={id:s.id,service:n[0].service,characteristic:n[0].characteristic},t({status:a.b.CONNECTED,device:r}),i.a.startNotification(s.id,r.service,r.characteristic,function(e){var n=Object(l.a)(e);n.startsWith("START")?c=n.substr(5):c&&(c+=n),c&&c.endsWith("DONE")&&(c=c.slice(0,-4),t({data:c}),c=null)},function(e){console.log(e)})},function(e){console.log(e),o(),t({status:a.b.DISCONNECTED,error:e.message})}))},function(e){console.log(e),clearTimeout(n),o(),t({status:a.b.DISCONNECTED,error:e.message})}),function(){o()}})}},177:function(e,t,n){"use strict";n.r(t),n.d(t,"disconnect",function(){return i}),n.d(t,"sendCommand",function(){return l}),n.d(t,"createConnectionChannel",function(){return o});var a=n(8),r=n(50),c=n(49),i=function(e){var t=e.ref;return new Promise(function(e){t.gatt.disconnect(),e()})},l=function(e,t){return e.characteristic.writeValue(t)},o=function(e){return Object(r.b)(function(e){var t=null,n=null,r=null,i=function(){e({status:a.b.DISCONNECTED})},l=function(t){var n=t.target.value;n=n.buffer?n:new DataView(n);var a=Object(c.a)(n.buffer);a.startsWith("START")?r=a.substr(5):r&&(r+=a),r&&r.endsWith("DONE")&&(r=r.slice(0,-4),e({data:r}),r=null)},o=function(){n&&(n.stopNotifications(),n.removeEventListener("characteristicvaluechanged",l),n=null)};return navigator.bluetooth.requestDevice({filters:[{services:[65504]}]}).then(function(n){return t=n,e({status:a.b.CONNECTING}),n.addEventListener("gattserverdisconnected",i),n.gatt.connect()}).then(function(e){return e.getPrimaryService(65504)}).then(function(e){return e.getCharacteristic(65505)}).then(function(n){return e({status:a.b.CONNECTED,device:{ref:t,characteristic:n}}),n.startNotifications()}).then(function(e){(n=e).addEventListener("characteristicvaluechanged",l)}).catch(function(t){o(),e({status:a.b.DISCONNECTED,error:t.message})}),function(){o(),t&&t.removeEventListener("gattserverdisconnected",i)}})}},317:function(e,t,n){},318:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(35),i=n.n(c),l=n(27),o=n(37),s=n(22),u=n(50),d={SETUP_PLATFORM:"katpat/app/SETUP_PLATFORM"},m={platform:null};var f,E=function(e){return{type:d.SETUP_PLATFORM,payload:e}},h=n(8),p=Object(s.c)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case d.SETUP_PLATFORM:return Object(o.a)({},e,{platform:t.payload});default:return e}},katpat:h.d}),v=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,g=Object(u.a)(),b=n(20),w=n.n(b),C=n(19),x=n(49),O=w.a.mark(j),N=w.a.mark(I),y=w.a.mark(F),k=w.a.mark(M),T=w.a.mark(z),S=w.a.mark(A),D=w.a.mark(R);function j(){var e;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(C.f)(h.e.getDevice);case 2:return e=t.sent,t.prev=3,t.next=6,Object(C.b)(f.disconnect,e);case 6:return t.next=8,Object(C.e)(h.a.updateStatus(h.b.DISCONNECTED));case 8:t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),console.log(t.t0),console.log("cannot disconnect from katpat :(");case 14:case"end":return t.stop()}},O,null,[[3,10]])}function I(e){var t,n;return w.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.id,a.next=3,Object(C.e)(h.a.updateStatus(h.b.SCANNING));case 3:return a.next=5,Object(C.c)(100);case 5:return a.next=7,Object(C.f)(h.e.getKaptpatName);case 7:return t=a.sent,a.next=10,Object(C.b)(f.createConnectionChannel,t);case 10:return n=a.sent,a.prev=11,a.next=14,Object(C.g)(n,w.a.mark(function e(t){var n,a,r,c,i,l;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.data,a=t.status,r=t.device,c=t.error,!n){e.next=8;break}console.log(n),i=n.split(";"),l=parseInt(i.pop(),10)-1,i.join(";").length===l&&console.log("integrity check OK"),e.next=13;break;case 8:return e.next=10,Object(C.e)(h.a.updateStatus(a,r,c));case 10:if(a!==h.b.CONNECTED||!r){e.next=13;break}return e.next=13,Object(C.e)(h.a.send(h.c.INIT));case 13:case"end":return e.stop()}},e)}));case 14:a.next=21;break;case 16:return a.prev=16,a.t0=a.catch(11),console.log(a.t0),a.next=21,Object(C.e)(h.a.updateStatus(h.b.DISCONNECTED,null,a.t0.message));case 21:case"end":return a.stop()}},N,null,[[11,16]])}function F(e){var t,n;return w.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload,console.log("send: ",t),a.next=4,Object(C.f)(h.e.getDevice);case 4:if(!(n=a.sent)){a.next=8;break}return a.next=8,Object(C.b)(f.sendCommand,n,Object(x.b)("/".concat(t,"/")));case 8:case"end":return a.stop()}},y)}function M(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.g)(h.f.CONNECT,I);case 2:case"end":return e.stop()}},k)}function z(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.g)(h.f.DISCONNECT,j);case 2:case"end":return e.stop()}},T)}function A(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.g)(h.f.SEND,F);case 2:case"end":return e.stop()}},S)}function R(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)([Object(C.d)(M),Object(C.d)(z),Object(C.d)(A)]);case 2:case"end":return e.stop()}},D)}f=window.cordova?n(176):n(177);var L=w.a.mark(P);function P(){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)([Object(C.d)(R)]);case 2:case"end":return e.stop()}},L)}var W=P,B=n(38),U=n(41),_=n(156),G=n(78),K=n(323),V=n(322),H=n(140),X=n.n(H),J=n(141),Y=n.n(J),q=n(142),$=n.n(q),Q={width:"8em",height:"8em",borderRadius:"2em",background:"#e3eac5",display:"flex",justifyContent:"center",alignItems:"center"},Z={background:"#93d12f",width:"8em",height:"8em",borderRadius:"2em",color:"white"},ee=Object(l.b)(function(e){var t=e.katpat;return{isConnecting:!t.device&&t.status!==h.b.DISCONNECTED,isConnected:null!==t.device,status:t.status}},function(e){return{connectKatpat:Object(s.b)(h.a.connect,e),disconnectKatpat:Object(s.b)(h.a.disconnect,e)}})(function(e){return r.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flexGrow:1,justifyContent:"center"}},r.a.createElement(_.a,{src:X.a,style:{width:"10em"}}),r.a.createElement(_.a,{src:Y.a,style:{width:".5em",marginTop:"-1em",marginBottom:"1em"}}),e.isConnected&&r.a.createElement(a.Fragment,null,r.a.createElement(G.a,null,"CONNECTED"),r.a.createElement(K.a,{onClick:e.disconnectKatpat},"DISCONNECT")),e.isConnecting&&r.a.createElement("div",{style:Q},r.a.createElement(V.a,{size:"large",active:!0,inline:!0})),!e.isConnected&&!e.isConnecting&&r.a.createElement(K.a,{onClick:e.connectKatpat,style:Z},r.a.createElement(_.a,{size:"mini",src:$.a,style:{margin:"1em auto"}}),r.a.createElement("div",null,"CONNECT")))}),te=n(324),ne=function(e){var t=e.color,n=void 0===t?"#fff":t;return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 60.861 60.861"},r.a.createElement("circle",{fill:"none",stroke:n,strokeWidth:"6",strokeMiterlimit:"10",cx:"30.43",cy:"30.43",r:"26.248"}),r.a.createElement("path",{fill:"none",stroke:n,strokeWidth:"6",strokeMiterlimit:"10",d:"M26.946 19.809l10.619 10.62-10.619 10.622"}))},ae=function(e){var t=e.color,n=void 0===t?"#fff":t;return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 60.861 60.861"},r.a.createElement("g",{fill:n,stroke:n,strokeWidth:"6",strokeMiterlimit:"10"},r.a.createElement("path",{d:"M30.431 0v15.034M30.431 45.827v15.034"})),r.a.createElement("circle",{fill:"none",stroke:n,strokeWidth:"6",strokeMiterlimit:"10",cx:"30.436",cy:"30.431",r:"18.427"}),r.a.createElement("g",{fill:n,stroke:n,strokeWidth:"6",strokeMiterlimit:"10"},r.a.createElement("path",{d:"M60.861 30.431H45.827M15.034 30.431H0"})),r.a.createElement("circle",{fill:n,cx:"30.436",cy:"30.431",r:"5.995"}))},re=function(e){var t=e.color,n=void 0===t?"#fff":t;return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 60.861 60.861"},r.a.createElement("circle",{fill:n,cx:"6.694",cy:"17.552",r:"4.929"}),r.a.createElement("circle",{fill:n,cx:"24.65",cy:"43.309",r:"4.929"}),r.a.createElement("circle",{fill:n,cx:"33.016",cy:"17.646",r:"4.929"}),r.a.createElement("circle",{fill:n,cx:"54.167",cy:"25.543",r:"4.929"}),r.a.createElement("path",{fill:"none",stroke:n,strokeWidth:"6",strokeMiterlimit:"10",d:"M10.25 22.546l10.811 15.512M31.104 23.564l-3.667 13.481M48.606 23.018L39.05 19.34"}))},ce=function(e){var t=e.selected,n=void 0!==t&&t,a=e.rotation,c=void 0===a?0:a,i=n?"#93d12f":"#4d4d4d";return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 42.007 42.007"},r.a.createElement("g",{transform:"rotate(".concat(c,", 21, 21)")},r.a.createElement("path",{fill:"#FFF",d:"M12.274 11.283h23.783v23.785H12.274zM42.007 20.878L40.979 8.776h-5.785z"}),r.a.createElement("path",{fill:"#FFF",d:"M36.526 18.716a1.925 1.925 0 0 1-2.59.834l-4.402-2.256a1.923 1.923 0 0 1-.832-2.59l4.494-8.768a1.925 1.925 0 0 1 2.59-.835l4.4 2.257a1.925 1.925 0 0 1 .834 2.59l-4.494 8.768z"}),r.a.createElement("path",{fill:i,d:"M6.425 20.878L7.452 8.776h5.785z"}),r.a.createElement("path",{fill:i,d:"M11.905 18.716a1.925 1.925 0 0 0 2.59.834l4.4-2.256a1.924 1.924 0 0 0 .836-2.59l-4.496-8.768a1.925 1.925 0 0 0-2.59-.835l-4.4 2.257a1.923 1.923 0 0 0-.834 2.59l4.494 8.768z"}),r.a.createElement("path",{fill:"#FFF",d:"M6.425 25.406l1.027 12.102h5.785z"}),r.a.createElement("path",{fill:"#FFF",d:"M11.905 27.568a1.925 1.925 0 0 1 2.59-.835l4.4 2.256a1.926 1.926 0 0 1 .836 2.591l-4.496 8.768a1.923 1.923 0 0 1-2.59.834l-4.4-2.256a1.924 1.924 0 0 1-.834-2.59l4.494-8.768zM42.007 25.406l-1.028 12.102h-5.785z"}),r.a.createElement("path",{fill:"#FFF",d:"M36.526 27.568a1.925 1.925 0 0 0-2.59-.835l-4.402 2.256a1.924 1.924 0 0 0-.832 2.591l4.494 8.768a1.923 1.923 0 0 0 2.59.834l4.4-2.256a1.925 1.925 0 0 0 .834-2.59l-4.494-8.768z"}),r.a.createElement("path",{fill:i,d:"M12.931 26.474C5.8 26.474 0 20.673 0 13.543S5.8.612 12.931.612s12.93 5.801 12.93 12.931-5.799 12.931-12.93 12.931zm0-23.614C7.04 2.86 2.248 7.653 2.248 13.543c0 5.891 4.792 10.683 10.683 10.683s10.682-4.792 10.682-10.683C23.612 7.653 18.821 2.86 12.931 2.86z"})))},ie=function(e){var t=e.selected,n=void 0!==t&&t?"#93d12f":"#4d4d4d";return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 53.838 41.743"},r.a.createElement("path",{fill:"#FFF",d:"M36.505 31.185a2.56 2.56 0 0 1-2.559 2.559H17.938a2.56 2.56 0 0 1-2.559-2.559v-9.327a2.56 2.56 0 0 1 2.559-2.56h16.009a2.56 2.56 0 0 1 2.559 2.56v9.327z"}),r.a.createElement("path",{fill:"#FFF",d:"M35.96 25.828c-.759 1.275-2.358 1.724-3.573 1.001l-3.98-2.368c-1.215-.722-1.585-2.342-.826-3.616l10.836-18.22c.759-1.275 2.358-1.723 3.573-1.001l3.98 2.368c1.215.722 1.585 2.343.826 3.616L35.96 25.828z"}),r.a.createElement("path",{fill:"#FFF",d:"M53.049 28.289a1.013 1.013 0 0 1-1.109-.495c-.041-.074-4.229-7.571-7.656-11.937-3.305-4.214-8.491-6.22-8.544-6.24a1.014 1.014 0 0 1-.209-1.784c.118-.081 2.95-1.992 5.913-2.67 1.902-.434 3.478-.271 4.679.484 1.02.642 2.679 2.557 5.285 11.752a167.367 167.367 0 0 1 2.408 9.69 1.013 1.013 0 0 1-.767 1.2z"}),r.a.createElement("path",{fill:n,d:"M19.857 28.695l-2.283-1.288a4.387 4.387 0 0 0 0-1.686l2.283-1.287-1.576-2.667-2.282 1.288a4.962 4.962 0 0 0-1.529-.842v-2.577h-3.079v2.577a4.927 4.927 0 0 0-1.529.842l-2.283-1.288-1.576 2.667 2.283 1.287a4.387 4.387 0 0 0 0 1.686l-2.283 1.288 1.576 2.667 2.283-1.289c.455.369.973.654 1.529.842v2.577h3.079v-2.577a4.95 4.95 0 0 0 1.529-.842l2.282 1.289 1.576-2.667zm-6.927.178a2.309 2.309 0 1 1 0-4.617 2.309 2.309 0 0 1 0 4.617z"}),r.a.createElement("path",{fill:n,d:"M12.931 39.495C5.8 39.495 0 33.694 0 26.564s5.8-12.931 12.931-12.931 12.93 5.801 12.93 12.931-5.799 12.931-12.93 12.931zm0-23.613c-5.891 0-10.683 4.793-10.683 10.683 0 5.891 4.792 10.683 10.683 10.683s10.682-4.792 10.682-10.683c-.001-5.89-4.792-10.683-10.682-10.683z"}))},le=function(e){var t=e.selected,n=void 0!==t&&t?"#93d12f":"#4d4d4d";return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 53.838 41.743"},r.a.createElement("path",{fill:"#FFF",d:"M28.93 32.185a2.56 2.56 0 0 1-2.559 2.559H10.362a2.56 2.56 0 0 1-2.559-2.559v-9.327a2.56 2.56 0 0 1 2.559-2.56h16.009a2.56 2.56 0 0 1 2.559 2.56v9.327z"}),r.a.createElement("path",{fill:"#FFF",d:"M28.385 26.828c-.759 1.275-2.358 1.724-3.573 1.001l-3.98-2.368c-1.215-.722-1.585-2.342-.826-3.616l10.836-18.22c.759-1.275 2.358-1.723 3.573-1.001l3.98 2.368c1.215.722 1.585 2.343.826 3.616l-10.836 18.22z"}),r.a.createElement("path",{fill:"#FFF",d:"M45.474 29.289a1.013 1.013 0 0 1-1.109-.495c-.041-.074-4.229-7.571-7.656-11.937-3.305-4.214-8.491-6.22-8.544-6.24a1.014 1.014 0 0 1-.209-1.784c.118-.081 2.95-1.992 5.913-2.67 1.902-.434 3.478-.271 4.679.484 1.02.642 2.679 2.557 5.285 11.752a167.367 167.367 0 0 1 2.408 9.69 1.013 1.013 0 0 1-.767 1.2z"}),r.a.createElement("path",{fill:n,d:"M35.732 29.062l-2.283-1.288a4.387 4.387 0 0 0 0-1.686l2.283-1.287-1.576-2.667-2.282 1.288a4.962 4.962 0 0 0-1.529-.842v-2.577h-3.079v2.577a4.927 4.927 0 0 0-1.529.842l-2.283-1.288-1.576 2.667 2.283 1.287a4.387 4.387 0 0 0 0 1.686l-2.283 1.288 1.576 2.667 2.283-1.289c.455.369.973.654 1.529.842v2.577h3.079v-2.577a4.95 4.95 0 0 0 1.529-.842l2.282 1.289 1.576-2.667zm-6.927.178a2.309 2.309 0 1 1 0-4.617 2.309 2.309 0 0 1 0 4.617z"}),r.a.createElement("path",{fill:n,d:"M28.806 39.862c-7.131 0-12.931-5.801-12.931-12.931S21.675 14 28.806 14s12.93 5.801 12.93 12.931-5.799 12.931-12.93 12.931zm0-23.613c-5.891 0-10.683 4.793-10.683 10.683 0 5.891 4.792 10.683 10.683 10.683s10.682-4.792 10.682-10.683c-.001-5.89-4.792-10.683-10.682-10.683z"}))},oe=function(e){var t=e.selected,n=void 0!==t&&t?"#93d12f":"#4d4d4d";return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 53.838 41.743"},r.a.createElement("path",{fill:"#FFF",d:"M27.578 39.185a2.559 2.559 0 0 1-2.558 2.559H9.011a2.56 2.56 0 0 1-2.559-2.559v-9.327a2.56 2.56 0 0 1 2.559-2.56H25.02a2.559 2.559 0 0 1 2.558 2.56v9.327z"}),r.a.createElement("path",{fill:"#FFF",d:"M27.033 33.828c-.758 1.275-2.358 1.724-3.573 1.001l-3.98-2.368c-1.215-.722-1.585-2.342-.826-3.616l10.836-18.22c.758-1.275 2.357-1.723 3.572-1.001l3.98 2.368c1.215.722 1.586 2.343.826 3.616l-10.835 18.22z"}),r.a.createElement("path",{fill:"#FFF",d:"M44.123 36.289a1.013 1.013 0 0 1-1.109-.495c-.041-.074-4.23-7.571-7.656-11.937-3.305-4.214-8.492-6.22-8.544-6.24a1.014 1.014 0 0 1-.209-1.784c.118-.081 2.951-1.992 5.914-2.67 1.902-.434 3.477-.271 4.678.484 1.02.642 2.68 2.557 5.285 11.752 1.395 4.918 2.4 9.645 2.408 9.69a1.013 1.013 0 0 1-.767 1.2z"}),r.a.createElement("path",{fill:n,d:"M41.383 15.062L39.1 13.773a4.387 4.387 0 0 0 0-1.686l2.283-1.287-1.576-2.667-2.283 1.288a4.939 4.939 0 0 0-1.529-.842V6.003h-3.078V8.58a4.927 4.927 0 0 0-1.529.842l-2.283-1.288-1.576 2.667 2.283 1.287a4.387 4.387 0 0 0 0 1.686l-2.283 1.288 1.576 2.667 2.283-1.289c.455.369.973.654 1.529.842v2.577h3.078v-2.577a4.927 4.927 0 0 0 1.529-.842l2.283 1.289 1.576-2.667zm-6.928.177a2.309 2.309 0 1 1 0-4.617 2.309 2.309 0 0 1 0 4.617z"}),r.a.createElement("path",{fill:n,d:"M34.455 25.861c-7.131 0-12.93-5.801-12.93-12.931S27.324 0 34.455 0s12.93 5.801 12.93 12.931-5.799 12.93-12.93 12.93zm0-23.613c-5.891 0-10.682 4.793-10.682 10.683 0 5.891 4.792 10.683 10.682 10.683s10.682-4.792 10.682-10.683c0-5.89-4.791-10.683-10.682-10.683z"}))},se={margin:"1em",width:"3em"},ue={width:"100vw",maxWidth:700,background:"#93d12f",borderRadius:0},de={display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},me=function(e){var t=e.title;return r.a.createElement("span",{style:{color:"white"}},t)},fe=function(){return r.a.createElement(te.a,{style:ue,widths:3},r.a.createElement(te.a.Item,{as:B.b,to:"/play",style:de},r.a.createElement("div",{style:se},r.a.createElement(ne,null)),r.a.createElement(me,{title:"PLAY"})),r.a.createElement(te.a.Item,{as:B.b,to:"/calibrate",style:de},r.a.createElement("div",{style:se},r.a.createElement(ae,null)),r.a.createElement(me,{title:"CALIBRATE"})),r.a.createElement(te.a.Item,{as:B.b,to:"/studio",style:de},r.a.createElement("div",{style:se},r.a.createElement(re,null)),r.a.createElement(me,{title:"STUDIO"})))},Ee={width:"100vw",maxWidth:700,background:"#93d12f",height:"5em",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.4em",textAlign:"center",padding:".5em"},he=Object(l.b)(function(e){var t=e.katpat;return{isConnected:null!==t.device,errorMessage:t.error}})(function(e){var t=e.isConnected,n=e.errorMessage;return r.a.createElement("div",{className:"default-layout"},r.a.createElement("div",{style:{color:"#5b7224",height:"3em"}},"@kaelhem/ KatPat-Remote v","0.1.0"," / \xa92019"),r.a.createElement(ee,null),t?r.a.createElement(fe,null):r.a.createElement("div",{style:Ee},n?r.a.createElement("span",null,n):r.a.createElement("span",null,"Connect your ",r.a.createElement("b",null,"KatPat")," bot to get started!")))}),pe=n(42),ve=Object(l.b)(function(e){e.katpat;return{}},function(e){return{send:Object(s.b)(h.a.send,e)}})(function(e){var t=Object(a.useState)(-1),n=Object(pe.a)(t,2),c=n[0],i=n[1],l=function(t){e.send("MOVE"+c+"0"+t)};return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(K.a,{onClick:function(){e.send("LOAD")}},"LOAD"),r.a.createElement(te.a,{secondary:!0,compact:!0,color:"green",inverted:!0},r.a.createElement(te.a.Item,{name:"Front Left",active:0===c,onClick:function(){return i(0)}}),r.a.createElement(te.a.Item,{name:"Front Right",active:1===c,onClick:function(){return i(1)}}),r.a.createElement(te.a.Item,{name:"Back Right",active:2===c,onClick:function(){return i(2)}}),r.a.createElement(te.a.Item,{name:"Back Left",active:3===c,onClick:function(){return i(3)}}))),-1!==c&&r.a.createElement("div",null,r.a.createElement(K.a,{onClick:function(){return l(0)}},"move coxal to 0\xb0"),r.a.createElement(K.a,{onClick:function(){return l(45)}},"move coxal to 45\xb0"),r.a.createElement(K.a,{onClick:function(){return l(90)}},"move coxal to 90\xb0")))}),ge=n(153),be=n.n(ge),we=n(154),Ce=n.n(we),xe=n(155),Oe=n.n(xe),Ne=Object(l.b)(function(e){e.katpat;return{}},function(e){return{send:Object(s.b)(h.a.send,e)}})(function(e){var t=Object(a.useState)(-1),n=Object(pe.a)(t,2),c=n[0],i=n[1],l=Object(a.useState)(-1),s=Object(pe.a)(l,2),u=s[0],d=s[1],m=Object(a.useState)(-1),f=Object(pe.a)(m,2),E=f[0],h=f[1],p=Object(a.useState)(!1),v=Object(pe.a)(p,2),g=v[0],b=v[1],w=function(e){h(-1),d(e)},C={background:"#93d12f",borderRadius:".2em",color:"white",fontSize:"2.5em",padding:".5em",margin:".5em 1em",width:"2em"},x=function(e){var t=e.name,n=e.index;return r.a.createElement(te.a.Item,{style:{background:c===n?"#4D4D4D":"#93d12f",color:"white",borderRadius:0,padding:".5em 0",marginTop:"1em",minWidth:"5.2em",border:"1px solid white",textTransform:"uppercase",whiteSpace:"nowrap"},active:c===n,onClick:function(){return e=n,w(-1),void i(e);var e}},r.a.createElement("span",{style:{fontSize:".8em"}},t),r.a.createElement("div",{style:{margin:".5em 0",width:"2.5em"}},r.a.createElement(ce,{selected:c===n,rotation:90*n})))},O=function(e){var t=e.name,n=e.index,a=e.icon;return r.a.createElement(te.a.Item,{style:{background:u===n?"#4D4D4D":"#93d12f",color:"white",borderRadius:0,padding:".3em",marginTop:".8em",marginRight:".2em",minWidth:"5.2em",border:"1px solid white",textTransform:"uppercase"},active:u===n,onClick:function(){return w(n)}},r.a.createElement("div",{style:{margin:".5em .3em",width:"3em"}},r.a.createElement(a,{selected:u===n})),r.a.createElement("span",{style:{fontSize:".9em",textAlign:"center"}},t))},N=function(t){var n=t.name,a=t.index;return r.a.createElement(te.a.Item,{style:{background:E===a?"#4D4D4D":"#93d12f",color:"white",borderRadius:0,padding:"1em",marginTop:".8em",marginRight:".2em",minWidth:"5.2em",border:"1px solid white",textTransform:"uppercase"},name:n,onClick:function(){return function(t){var n=0===t?"GOMIN":"GOMAX";e.send(n+c+u),h(t)}(a)}})};return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(te.a,{secondary:!0,icon:"labeled",widths:4,style:{width:"98vw",maxWidth:700}},r.a.createElement(x,{name:"Front Left",index:0}),r.a.createElement(x,{name:"Front Right",index:1}),r.a.createElement(x,{name:"Back Right",index:2}),r.a.createElement(x,{name:"Back Left",index:3}))),-1!==c&&r.a.createElement("div",null,r.a.createElement(te.a,{secondary:!0,widths:3},r.a.createElement(O,{name:"Coxal",index:0,icon:ie}),r.a.createElement(O,{name:"Femur",index:1,icon:le}),r.a.createElement(O,{name:"Tibia",index:2,icon:oe}))),-1!==u&&r.a.createElement("div",null,r.a.createElement(te.a,{secondary:!0,color:"grey",widths:2},r.a.createElement(N,{name:"Min pulse",index:0}),r.a.createElement(N,{name:"Max pulse",index:1})),r.a.createElement(_.a,{src:function(){switch(u){case 0:return be.a;case 1:return Ce.a;case 2:return Oe.a;default:return null}}(),fluid:!0,style:{width:"90%",maxWidth:500,margin:"auto"}})),-1!==E&&r.a.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"center",margin:".5em"}},r.a.createElement(K.a,{style:C,onClick:function(){e.send("CALI"+c+u+E+"010"),b(!0)}},"-"),r.a.createElement(K.a,{style:C,onClick:function(){e.send("CALI"+c+u+E+"110"),b(!0)}},"+")),r.a.createElement("div",{style:{position:"fixed",left:0,bottom:0,width:"100vw",textAlign:"center"}},r.a.createElement(K.a,{style:Object(o.a)({},{background:"#93d12f",borderRadius:"1em 1em 0 0",color:"white",padding:"1.5em 3em"},{opacity:g?1:.5}),onClick:function(){e.send("SAVE"),b(!1)}},"SAVE")))}),ye=function(){return r.a.createElement("div",null,r.a.createElement(G.a,null,"TODO: Studio"))},ke=n(157),Te={background:"#93d12f",color:"white",borderRadius:0,border:"none",height:"3em",width:"3em",display:"flex",alignItems:"center",margin:0},Se={display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,background:"#e3eac5",color:"#4d4d4d",textAlign:"center",height:"3em",paddingRight:"3em"},De=function(e){var t=e.component,n=e.icon,a=e.title,c=Object(ke.a)(e,["component","icon","title"]);return r.a.createElement(U.b,Object.assign({},c,{render:function(e){return r.a.createElement("div",{className:"default-layout"},r.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw"}},r.a.createElement(K.a,{icon:"chevron left",as:B.b,to:"/home",style:Te}),r.a.createElement("div",{style:Se},r.a.createElement("div",{style:{width:"2em",height:"2em",marginRight:".5em"}},r.a.createElement(n,{color:"#4d4d4d"})),r.a.createElement("span",{style:{fontSize:"1.6em",fontWeight:"bold"}},a))),r.a.createElement(t,e),r.a.createElement("div",{style:{height:"8em"}}))}}))},je=Object(l.b)(function(e){return{isConnected:null!==e.katpat.device}})(function(e){var t=e.component,n=e.icon,a=e.path,c=e.title;return e.isConnected?r.a.createElement(De,{exact:!0,path:a,title:c,component:t,icon:n}):r.a.createElement(De,{exact:!0,path:a,title:c,component:ee,icon:n})}),Ie=function(){return r.a.createElement(B.a,null,r.a.createElement(U.d,null,r.a.createElement(U.b,{exact:!0,path:"/",component:he}),r.a.createElement(je,{path:"/play",component:ve,title:"PLAY",icon:ne}),r.a.createElement(je,{path:"/calibrate",component:Ne,title:"CALIBRATE",icon:ae}),r.a.createElement(De,{path:"/studio",component:ye,title:"STUDIO",icon:re}),r.a.createElement(U.a,{to:"/"})))},Fe=n(79),Me=Fe.a.Device,ze=Fe.a.SplashScreen,Ae=Fe.a.StatusBar,Re=Object(o.a)({},Object(s.e)(p,v(Object(s.a)(g))),{runSaga:g.run});Re.runSaga(W),Me.getInfo().then(function(e){var t=e.platform;"web"!==t&&(Ae.hide(),ze.hide()),Re.dispatch(E(t))});var Le=function(){return r.a.createElement(l.a,{store:Re},r.a.createElement(Ie,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(316),n(317);i.a.render(r.a.createElement(Le,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},49:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a=function(e){return String.fromCharCode.apply(null,new Uint8Array(e))},r=function(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),a=0,r=e.length;a<r;a++)n[a]=e.charCodeAt(a);return t}},8:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"c",function(){return c}),n.d(t,"f",function(){return i}),n.d(t,"d",function(){return o}),n.d(t,"a",function(){return s}),n.d(t,"e",function(){return u});var a=n(37),r={DISCONNECTED:"DISCONNECTED",SCANNING:"SCANNING",CONNECTING:"CONNECTING",CONNECTED:"CONNECTED"},c={INIT:"INIT"},i={CONNECT:"katpat/ble/CONNECT",DISCONNECT:"katpat/ble/DISCONNECT",STATUS_UPDATE:"katpat/ble/STATUS_UPDATE",SEND:"katpat/ble/SEND"},l={katpatName:"Katpat",error:null,status:r.DISCONNECTED,device:null};function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case i.STATUS_UPDATE:return Object(a.a)({},e,t.payload);default:return e}}var s={connect:function(){return{type:i.CONNECT}},disconnect:function(){return{type:i.DISCONNECT}},updateStatus:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:i.STATUS_UPDATE,payload:{status:e,device:t,error:n}}},send:function(e){return{type:i.SEND,payload:e}}},u={getStatus:function(e){return e.katpat.status},getDevice:function(e){return e.katpat.device},getKaptpatName:function(e){return e.katpat.katpatName}}}},[[166,1,2]]]);
//# sourceMappingURL=main.53bb2565.chunk.js.map