(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{138:function(e,t,r){"use strict";r.d(t,"a",function(){return o}),r.d(t,"c",function(){return i}),r.d(t,"e",function(){return c}),r.d(t,"b",function(){return s}),r.d(t,"d",function(){return l});var a=r(283),n=r(102);function o(e){return e.repositories instanceof Map&&"string"===typeof e.title&&"string"===typeof e.description&&Array.isArray(e.stops)&&e.stops.every(function(e){return function(e){return"string"===typeof e.body&&"number"===typeof e.line&&"string"===typeof e.relPath&&"string"===typeof e.repository&&"string"===typeof e.title}(e)})}function i(e){var t;try{t=JSON.parse(e)}catch(r){return"Failed to parse file as JSON."}try{if("object"!=typeof t.repositories)throw new Error;if(t.repositories=new Map(t.repositories.map(function(e){return[e.repository,e.commit]})),!o(t))throw new Error}catch(r){return"Could not parse file as tour."}return t}function c(e){var t={};return Array.from(e.repositories.entries()).forEach(function(e){var r=Object(n.a)(e,2),a=r[0],o=r[1];t[a]=o}),JSON.stringify(Object(a.a)({},e,{repositories:t}))}function s(e){var t;try{t=JSON.parse(e)}catch(r){return"Failed to parse file as JSON."}return"object"!=typeof t?"Could not parse object as index.":new Map(Object.entries(t))}function l(e){var t={};return Array.from(e.entries()).forEach(function(e){var r=Object(n.a)(e,2),a=r[0],o=r[1];t[a]=o}),JSON.stringify(t)}},220:function(e,t,r){"use strict";r.d(t,"a",function(){return p});var a=r(2),n=r.n(a),o=r(519),i=r(515),c=r(285),s=r(516),l=r(513),u=Object(l.a)(function(e){return{bgErr:{backgroundColor:e.palette.error.dark},errIcon:{fontSize:20,opacity:.9,marginRight:10}}}),p=function(e){var t=u(e);return n.a.createElement(o.a,{open:e.show,anchorOrigin:{vertical:"bottom",horizontal:"center"},autoHideDuration:6e3},n.a.createElement(i.a,{message:n.a.createElement("span",null,n.a.createElement(c.a,{className:t.errIcon},"error"),e.message||"An Error Occurred"),action:[n.a.createElement(s.a,{key:"close",color:"inherit",onClick:e.hideError},n.a.createElement(c.a,null,"close"))],className:t.bgErr}))}},276:function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return j});var a=r(134),n=r.n(a),o=r(102),i=r(197),c=r(2),s=r.n(c),l=r(286),u=r(250),p=r(517),m=r(220),f=r(138),d=r(278),g=r.n(d);function h(e){return b.apply(this,arguments)}function b(){return(b=Object(i.a)(n.a.mark(function e(t){var r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=new FileReader,e.abrupt("return",new Promise(function(e,a){r.readAsText(t),r.onload=function(t){var r=t.target.result;e(r)}}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function y(e){return v.apply(this,arguments)}function v(){return(v=Object(i.a)(n.a.mark(function e(t){var r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=new FileReader,e.abrupt("return",new Promise(function(e,a){r.readAsArrayBuffer(t),r.onload=function(t){var r=t.target.result;e(r)}}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function E(e){return x.apply(this,arguments)}function x(){return(x=Object(i.a)(n.a.mark(function t(r){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=[],t.abrupt("return",new Promise(function(t,n){r.on("data",function(e){a.push(e)}),r.on("error",n),r.on("end",function(){return t(e.concat(a).toString("utf8"))})}));case 2:case"end":return t.stop()}},t)}))).apply(this,arguments)}function w(e){return k.apply(this,arguments)}function k(){return(k=Object(i.a)(n.a.mark(function e(t){var r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=new Map,e.abrupt("return",new Promise(function(e,a){g.a.fromBuffer(t,{lazyEntries:!0},function(t,n){!t&&n?(n.readEntry(),n.on("entry",function(e){/\/$/.test(e.fileName)?n.readEntry():n.openReadStream(e,function(t,o){if(t||!o)return a(t||new Error("Read stream is null."));E(o).then(function(t){r.set(e.fileName,t),n.readEntry()})})}),n.on("end",function(){n.close(),e(r)})):a(t||new Error("Zip file is null"))})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}var j=function(t){var r=Object(c.useState)(null),a=Object(o.a)(r,2),d=a[0],g=a[1];function b(){return(b=Object(i.a)(n.a.mark(function r(a){var o,i,c,s,l,u,p;return n.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(o=a.target.files[0]).name.endsWith(".tour.pkg")){r.next=20;break}return r.next=4,y(o);case 4:return i=r.sent,r.next=7,w(e.from(i));case 7:if(c=r.sent,s=c.get("tour.tour")){r.next=12;break}return g("No file called 'tour.tour' in package."),r.abrupt("return");case 12:if(c.delete("tour.tour"),"string"!==typeof(l=Object(f.c)(s))){r.next=17;break}return g(l),r.abrupt("return");case 17:t.route({kind:"ViewTour",tour:l,context:{kind:"LocalPackage",content:c}}),r.next=33;break;case 20:if(!o.name.endsWith(".tour")){r.next=32;break}return r.next=23,h(o);case 23:if(u=r.sent,"string"!==typeof(p=Object(f.c)(u))){r.next=28;break}return g(p),r.abrupt("return");case 28:localStorage.setItem("savedTour",Object(f.e)(p)),t.route({kind:"CreateIndex",tour:p}),r.next=33;break;case 32:g("Please upload a file with extension '.tour' or '.tour.pkg'.");case 33:case"end":return r.stop()}},r)}))).apply(this,arguments)}return s.a.createElement("div",null,s.a.createElement(l.a,{container:!0,justify:"center",alignItems:"center",style:{marginTop:"10%"}},s.a.createElement(l.a,{item:!0,xs:7,style:{textAlign:"center"}},s.a.createElement(u.a,{variant:"h3",style:{marginBottom:20}},"Welcome to Tourist!"),s.a.createElement("p",null,"Tourist is a new approach to documentation that allows programmers to explain low-level technical details of a system while simultaneously providing the context of how those details fit into the broader architecture. It lets programmers document code in the same way that they would explain it in person: by walking the consumer step-by-step through the important parts of a codebase."),s.a.createElement(p.a,{style:{marginTop:80},color:"primary",variant:"outlined",component:"label"},"Upload a Tour",s.a.createElement("input",{type:"file",style:{display:"none"},onInput:function(e){return b.apply(this,arguments)}})))),s.a.createElement(m.a,{show:null!==d,hideError:function(){return g(null)},message:d||void 0}))}}).call(this,r(140).Buffer)},291:function(e,t,r){e.exports=r(500)},296:function(e,t,r){},297:function(e,t,r){},316:function(e,t){},318:function(e,t){},500:function(e,t,r){"use strict";r.r(t);var a=r(2),n=r.n(a),o=r(66),i=r.n(o),c=(r(296),r(102)),s=(r(297),r(276)),l=r(286),u=r(250),p=r(517),m=r(220),f=r(606),d=r(609),g=r(607),h=function(e){var t=e.repository.provider;return n.a.createElement(l.a,{item:!0,xs:12},n.a.createElement(l.a,{container:!0,alignItems:"flex-end"},n.a.createElement(l.a,{item:!0,xs:3},n.a.createElement(u.a,{variant:"h5"},e.repoName)),n.a.createElement(l.a,{item:!0,xs:2},n.a.createElement(f.a,{value:t,onChange:function(t){return r=t.target.value,e.repository.provider=r,void e.onChange(e.repository);var r}},n.a.createElement(d.a,{value:"github"},"GitHub"),n.a.createElement(d.a,{value:"gitlab"},"GitLab"))),n.a.createElement(l.a,{item:!0,xs:"gitlab"!==t?7:5},n.a.createElement(g.a,{style:{width:"100%"},value:e.repository.name,label:e.first&&"gitlab"!==t?"Repository Tag (e.g. noobmaster69/my-repo)":"Repository Tag",onChange:function(t){return r=t.target.value,e.repository.name=r,void e.onChange(e.repository);var r}})),"gitlab"===t&&n.a.createElement(l.a,{item:!0,xs:2},n.a.createElement(g.a,{style:{width:"100%",marginLeft:10},type:"number",value:"gitlab"===e.repository.provider?e.repository.project:0,label:"GitLab Project",onChange:function(t){return r=+t.target.value,void("gitlab"===e.repository.provider&&(e.repository.project=r,e.onChange(e.repository)));var r}}))))},b=r(138),y=function(e){var t=e.page.tour,r=Object(a.useState)(new Map(Array.from(t.repositories.keys()).map(function(e){return[e,{provider:"github",name:""}]}))),o=Object(c.a)(r,2),i=o[0],s=o[1],f=Object(a.useState)(null),d=Object(c.a)(f,2),g=d[0],y=d[1];return n.a.createElement("div",null,n.a.createElement(l.a,{container:!0,style:{marginTop:"10%"},justify:"center",alignItems:"center"},n.a.createElement(l.a,{item:!0,xs:12,md:6},n.a.createElement(l.a,{container:!0},n.a.createElement(l.a,{item:!0,xs:12,style:{marginBottom:30}},n.a.createElement(u.a,{variant:"h4"},t.title)),n.a.createElement(l.a,{item:!0,xs:12},n.a.createElement(l.a,{container:!0},Array.from(t.repositories.keys()).map(function(e,t){return n.a.createElement(h,{repoName:e,repository:i.get(e),onChange:function(t){return function(e,t){var r=new Map(i);r.set(e,t),s(r)}(e,t)},key:e,first:0===t})}))),n.a.createElement(l.a,{item:!0,xs:12,style:{textAlign:"right",marginTop:50}},n.a.createElement(p.a,{onClick:function(){Array.from(i.entries()).some(function(e){var t=Object(c.a)(e,2),r=(t[0],t[1]);return""===r.name||"gitlab"===r.provider&&!r.project})?y("You must set a mapping for every repository."):(localStorage.setItem("savedIndex",Object(b.d)(i)),e.route({kind:"ViewTour",tour:e.page.tour,context:{kind:"ResolveWithIndex",index:i}}))},color:"primary",variant:"outlined"},"Start Tour"))))),n.a.createElement(m.a,{show:null!==g,hideError:function(){return y(null)},message:g||void 0}))},v=r(516),E=r(285),x=r(603),w=r(280),k=r.n(w),j=r(229),O=r(281),T=r.n(O),S=r(513),I={apex:"apex",azcli:"azcli",bat:"bat",clj:"clojure",cljs:"clojure",coffee:"coffee",cpp:"cpp",cs:"csharp",cshtml:"razor",csp:"csp",css:"css",dockerfile:"dockerfile",fs:"fsharp",fsi:"fsharp",go:"go",graphql:"graphql",h:"cpp",handlebars:"handlebars",html:"html",ini:"ini",java:"java",js:"javascript",jsx:"javascript",kt:"kotlin",less:"less",lua:"lua",m:"objective-c",md:"markdown",mm:"objective-c",msdax:"msdax",mysql:"mysql",pas:"pascal",pgsql:"pgsql",php:"php",pl:"perl",pm:"perl",postiats:"postiats",powerquery:"powerquery",pp:"pascal",ps1:"powershell",pug:"pug",py:"python",r:"r",rb:"ruby",redis:"redis",redshift:"redshift",rs:"rust",sb:"sb",scheme:"scheme",scss:"scss",sh:"shell",solidity:"solidity",sql:"sql",st:"st",swift:"swift",tcl:"tcl",ts:"typescript",tsx:"typescript",vb:"vb",xml:"xml",yaml:"yaml"};var C=Object(S.a)(function(e){return{focusLine:{borderTop:"1px solid black",borderBottom:"1px solid black"},focusLineDeco:{width:"5px !important",marginLeft:3,backgroundColor:e.palette.primary.main}}}),L=function(e){var t=C(),r=Object(a.useRef)(null);Object(a.useEffect)(function(){if(r.current){var a=r.current.editor;if(a){var n=a.getModel();n&&(n.setValue(e.code),a.revealLineInCenter(e.focusLine),a.deltaDecorations([],[{range:{startLineNumber:e.focusLine,startColumn:0,endLineNumber:e.focusLine,endColumn:0},options:{isWholeLine:!0,className:t.focusLine,linesDecorationsClassName:t.focusLineDeco}}]))}}},[r,e,t]);var o,i=e.fileName.split(/\./g),c=i.length<2?"":(o=i[i.length-1],I[o]||"text");return n.a.createElement(T.a,{ref:r,height:"80vh",language:c,options:{readOnly:!0,minimap:{enabled:!1}}})};var N=function(e){var t=function(e,t,r,a){switch(e.provider){case"github":return"https://github.com/"+e.name+"/blob/"+r+"/"+t+"#L"+a;case"gitlab":return"https://gitlab.com/"+e.name+"/blob/"+r+"/"+t+"#L"+a}}(e.repository,e.path,e.commit,e.line);return n.a.createElement(x.a,{href:t,style:{float:"right"}},"View on ","github"===e.repository.provider?"GitHub":"GitLab")},A=function(e){var t=e.stop,r="ResolveWithIndex"===e.context.kind?e.context.index.get(e.stop.repository):null,a=new j.Converter;a.setFlavor("github");var o=a.makeHtml(t.body);return n.a.createElement("div",null,n.a.createElement(u.a,{variant:"h3"},t.title),n.a.createElement("div",{dangerouslySetInnerHTML:{__html:o}}),r&&n.a.createElement(N,{repository:r,path:t.relPath,commit:e.tour.repositories.get(t.repository)||"master",line:t.line}))},R=function(e){var t=Object(a.useState)("Loading..."),r=Object(c.a)(t,2),o=r[0],i=r[1];return Object(a.useEffect)(function(){switch(e.context.kind){case"LocalPackage":i(e.context.content.get(e.stop.repository+"/"+e.stop.relPath)||"No content available in package.");break;case"ResolveWithIndex":var t=e.context.index.get(e.stop.repository);t?k.a.get(function(e,t,r){switch(e.provider){case"github":return"https://raw.githubusercontent.com/"+e.name+"/"+r+"/"+t;case"gitlab":return"https://gitlab.com/api/v4/projects/"+e.project+"/repository/files/"+t+"/raw?ref="+r}}(t,e.stop.relPath,e.tour.repositories.get(e.stop.repository)||"master")).then(function(e){i(e.data)}):i("Repository was not mapped in the index.")}},[e.stop,e.tour,e.context]),n.a.createElement(L,{code:o,focusLine:e.stop.line,fileName:e.stop.relPath})},P=function(e){return n.a.createElement(l.a,{container:!0},n.a.createElement(l.a,{item:!0,md:4,xs:12,style:{paddingRight:60}},n.a.createElement(A,{context:e.context,tour:e.tour,stop:e.stop})),n.a.createElement(l.a,{item:!0,md:8,xs:12},n.a.createElement(R,{context:e.context,tour:e.tour,stop:e.stop})))},M=function(e){var t=new j.Converter;t.setFlavor("github");var r=t.makeHtml(e.tour.description);return n.a.createElement(l.a,{container:!0},n.a.createElement(l.a,{item:!0,xs:12,style:{textAlign:"center"}},n.a.createElement(u.a,{variant:"h3"},e.tour.title)),n.a.createElement(l.a,{item:!0,xs:12,style:{textAlign:"center"}},n.a.createElement("div",{dangerouslySetInnerHTML:{__html:r},style:{marginTop:50}})))},q=function(e){var t=e.page.tour.stops,r=Object(a.useState)(-1),o=Object(c.a)(r,2),i=o[0],s=o[1];function u(e){s(e),localStorage.setItem("stopNumber",e.toString())}var p=i<t.length-1,m=i>-1;return Object(a.useEffect)(function(){var e=localStorage.getItem("stopNumber");e&&s(+e)},[]),n.a.createElement(l.a,{container:!0,style:{paddingTop:20,paddingLeft:60,paddingRight:60}},n.a.createElement(l.a,{item:!0,xs:12,style:{marginBottom:20}},n.a.createElement(v.a,{onClick:function(){u(Math.max(-1,i-1))},disabled:!m},n.a.createElement(E.a,null,"arrow_back")),n.a.createElement(v.a,{onClick:function(){u(Math.min(t.length,i+1))},disabled:!p,style:{float:"right"}},n.a.createElement(E.a,null,"arrow_forward"))),n.a.createElement(l.a,{item:!0,xs:12},-1===i?n.a.createElement(M,{tour:e.page.tour}):n.a.createElement(P,{context:e.page.context,tour:e.page.tour,stop:t[i]})))},W=r(604),B=r(605),J=function(e){var t,r=Object(a.useState)(e.page||{kind:"UploadTour"}),o=Object(c.a)(r,2),i=o[0],l=o[1];switch(Object(a.useEffect)(function(){if(!e.page){var t=function(){var e=localStorage.getItem("savedTour");if(!e)return null;var t=Object(b.c)(e);return Object(b.a)(t)?t:null}(),r=function(){var e=localStorage.getItem("savedIndex");if(!e)return null;var t=Object(b.b)(e);return"string"===typeof t?null:t}();t&&l(r?{kind:"ViewTour",tour:t,context:{kind:"ResolveWithIndex",index:r}}:{kind:"CreateIndex",tour:t})}},[e.page]),i.kind){case"UploadTour":t=n.a.createElement(s.a,{page:i,route:l});break;case"CreateIndex":t=n.a.createElement(y,{page:i,route:l});break;case"ViewTour":t=n.a.createElement(q,{page:i,route:l})}return n.a.createElement("div",{className:"App"},n.a.createElement(W.a,{position:"static"},n.a.createElement(B.a,null,"UploadTour"!==i.kind&&n.a.createElement(p.a,{onClick:function(){localStorage.clear(),l({kind:"UploadTour"})}},n.a.createElement(E.a,{style:{marginRight:20}},"refresh"),"Start Over"))),t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=r(282),z=r(610),F=Object(H.a)({palette:{primary:{light:"#67daff",main:"#03a9f4",dark:"#007ac1",contrastText:"#fff"},secondary:{light:"#80e27e",main:"#4caf50",dark:"#087f23",contrastText:"#000"}}});i.a.render(n.a.createElement(z.a,{theme:F},n.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[291,2,3]]]);
//# sourceMappingURL=main.107d9962.chunk.js.map