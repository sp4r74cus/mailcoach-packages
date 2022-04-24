var D=Object.defineProperty,F=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var h=(e,t,n)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,L=(e,t)=>{for(var n in t||(t={}))A.call(t,n)&&h(e,n,t[n]);if(p)for(var n of p(t))C.call(t,n)&&h(e,n,t[n]);return e},y=(e,t)=>F(e,I(t));function a(e,t=document){return t.querySelector(e)}function g(e,t=document){return Array.from(t.querySelectorAll(e))}const T=['a[href]:not([disabled]):not([tabindex="-1"])','button:not([disabled]):not([tabindex="-1"])','textarea:not([disabled]):not([tabindex="-1"])','input:not([type="hidden"]):not([disabled]):not([tabindex="-1"])','select:not([disabled]):not([tabindex="-1"])'];function H(e){const t=g(T.join(", "),e),n=t[0],o=t[t.length-1];n&&n.focus();function d(s){s.key==="Tab"&&(s.shiftKey?document.activeElement===n&&(s.preventDefault(),o.focus()):document.activeElement===o&&(s.preventDefault(),n.focus()))}return window.addEventListener("keydown",d),()=>{window.removeEventListener("keydown",d)}}function f(e,t,n){document.addEventListener(e,o=>{const d=o.target.closest(t);!d||n({event:o,target:d})})}function u(){}async function q(e,t){e.classList.remove("hidden"),e.classList.add(`${t}-enter`),e.classList.add(`${t}-enter-start`),await m(),e.classList.remove(`${t}-enter-start`),e.classList.add(`${t}-enter-end`),await k(e),e.classList.remove(`${t}-enter-end`),e.classList.remove(`${t}-enter`),await m()}async function b(e,t){e.classList.add(`${t}-leave`),e.classList.add(`${t}-leave-start`),await m(),e.classList.remove(`${t}-leave-start`),e.classList.add(`${t}-leave-end`),await k(e),e.classList.remove(`${t}-leave-end`),e.classList.remove(`${t}-leave`),e.classList.add("hidden"),await m()}function k(e){return new Promise(t=>{const n=Number(getComputedStyle(e).transitionDuration.replace("s",""))*1e3;setTimeout(()=>{t()},n)})}function m(){return new Promise(e=>{requestAnimationFrame(()=>{requestAnimationFrame(e)})})}async function M(e,t){return(await fetch(e,{method:"POST",body:t,credentials:"same-origin",headers:{"X-CSRF-Token":a('[name="_token"]').value}})).json()}function w(e,{onConfirm:t=u,onDismiss:n=u}={}){const o=a(`[data-modal="${e}"]`);q(o,"fade");const d=H(o);S(o,{onConfirm:t,onDismiss:n,onClose:d}),$(!0)}function $(e){window.history.replaceState({},"",window.location.pathname+window.location.search+(e?"#modal":""))}function S(e,{onConfirm:t,onDismiss:n,onClose:o}){function d(r){r.key==="Escape"&&e.dispatchEvent(new Event("dismiss"))}function s(){t(),i(),b(e,"fade")}function l(){n(),i(),b(e,"fade")}function i(){o(),window.removeEventListener("keydown",d),e.removeEventListener("confirm",s),e.removeEventListener("dismiss",l),$(!1)}window.addEventListener("keydown",d),e.addEventListener("confirm",s),e.addEventListener("dismiss",l)}f("click","[data-modal-trigger]",({target:e})=>{w(e.dataset.modalTrigger)});f("click","[data-modal-confirm]",({target:e})=>{e.closest("[data-modal]").dispatchEvent(new Event("confirm"))});f("click","[data-modal-dismiss]",({target:e})=>{e.closest("[data-modal]").dispatchEvent(new Event("dismiss"))});f("click","[data-modal-backdrop]",({event:e,target:t})=>{e.target===t&&t.closest("[data-modal]").dispatchEvent(new Event("dismiss"))});document.addEventListener("turbo:load",()=>{g("[data-modal]").filter(e=>!e.classList.contains("hidden")).forEach(e=>{S(e,{onConfirm:u,onDismiss:u,onClose:u})})});if(window.location.hash.includes("#modal")){const e=document.querySelector("[data-modal]");if(e){const t=e.getAttribute("data-modal");w(t)}}document.addEventListener("turbo:load",v);document.addEventListener("load",v);document.addEventListener("before-visit",c);window.addEventListener("beforeunload",c);v();function c(e){if(!!document.getElementById("html")){if(document.getElementById("html").dataset.dirty==="dirty"&&!confirm("Are you sure you want to leave this page? Any unsaved changes will be lost.")){e.preventDefault();return}document.removeEventListener("turbo:before-visit",c),window.removeEventListener("beforeunload",c),window.editor.destroy(),window.editor=void 0}}function v(){document.addEventListener("turbo:before-visit",c),document.addEventListener("turbo:load",v),window.addEventListener("beforeunload",c);const e=a("#markdown-editor");if(!e||window.editor!==void 0)return;const{Editor:t}=toastui,{codeSyntaxHighlight:n,tableMergedCell:o,colorSyntax:d}=t.plugin,s=JSON.parse(e.dataset.options);window.editor=new t(y(L({},s),{el:e,plugins:[n,o,d]})),window.editor.setMarkdown(e.dataset.structuredHtml||""),window.editor.addHook("change",()=>{document.getElementById("html").dataset.dirty="dirty"}),window.editor.addHook("addImageBlobHook",(i,r)=>{const E=new FormData;E.append("file",i),M(e.dataset.upload,E).then(({success:B,file:x})=>{!B||r(x.url,"alt text")})});function l(){const i=a("#template").value,r=editor.getHTML().replaceAll("<p><br></p>","");return i.replace("::content::",r)}a("#save").addEventListener("click",i=>{i.preventDefault(),document.getElementById("html").value=l(),document.getElementById("body").value=editor.getMarkdown(),document.getElementById("html").dataset.dirty="",document.querySelector("main form").submit()}),a("#preview").addEventListener("click",i=>{i.preventDefault(),a("#html").value=l();const r=document.createEvent("Event");r.initEvent("input",!0,!0),document.getElementById("html").dispatchEvent(r),w("preview")}),a('[data-modal-trigger="edit-template"]').addEventListener("click",()=>{document.getElementById("structured_html[template]").value=a("#template").value}),a('[data-modal-confirm="edit-template"]').addEventListener("click",()=>{a("#template").value=document.getElementById("structured_html[template]").value})}
