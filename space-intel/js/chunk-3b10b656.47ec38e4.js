(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b10b656"],{1466:function(t,e,i){t.exports=i.p+"img/wifi.522bbf3f.png"},"159d":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"by-wifi vh100 flex-col"},[i("van-nav-bar",{staticClass:"flex-none",staticStyle:{"border-bottom":"1px solid #EBEDFF"},attrs:{title:"快速添加","left-text":"返回","left-arrow":"",border:!1},on:{"click-left":function(e){return t.$router.back()}}}),i("div",{staticClass:"flex-auto blue-bg"},[i("div",{staticClass:"wifi-box flex-col jcc"},[t._m(0),i("div",[i("van-cell-group",{staticClass:"mb15",attrs:{border:!1}},[i("van-field",{attrs:{border:!1,label:"WiFi名称：",readonly:""},on:{click:function(e){t.popupVisible=!0}},model:{value:t.wifiName,callback:function(e){t.wifiName=e},expression:"wifiName"}}),i("van-field",{attrs:{border:!1,label:"WiFi密码："},model:{value:t.wifiPwd,callback:function(e){t.wifiPwd=e},expression:"wifiPwd"}})],1),i("van-checkbox",{staticClass:"f8",model:{value:t.remember,callback:function(e){t.remember=e},expression:"remember"}},[t._v("记住密码")])],1)]),i("div",{staticClass:"flex jcc"},[i("van-button",{staticClass:"next-btn",staticStyle:{"border-width":"1px"},on:{click:t.next}},[t._v("下一步")])],1)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex jcc"},[a("img",{staticClass:"logo",attrs:{src:i("1466")}})])}],r=(i("a6f9"),i("4cbc"),i("b3df")),c={data:function(){return{remember:!1,wifiName:"",wifiPwd:""}},mounted:function(){try{this.wifiName=androidInterface.getSSID()}catch(t){Object(r["a"])(t.message)}},watch:{wifiName:function(t,e){var i=JSON.parse(window.localStorage.getItem("rememberMap"))||{};this.wifiPwd=i[t]||"",i[t]&&(this.remember=!0)}},methods:{showWifis:function(){},onChange:function(t,e){this.wifiName=e},next:function(){if(this.wifiName.trim()){if(this.remember){var t=JSON.parse(window.localStorage.getItem("rememberMap"))||{};t[this.wifiName]=this.wifiPwd,window.localStorage.setItem("rememberMap",JSON.stringify(t))}try{androidInterface.connect(this.wifiPwd)}catch(e){Object(r["a"])(e.message)}this.$router.push("/wifi-link")}else Object(r["a"])("未获取到WIFI信息")}}},s=c,o=(i("cffa"),i("1803"),i("4e82")),f=Object(o["a"])(s,a,n,!1,null,"46533267",null);e["default"]=f.exports},1803:function(t,e,i){"use strict";var a=i("ac7b"),n=i.n(a);n.a},5839:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"7c45":function(t,e,i){var a=i("47de"),n=i("5839"),r="​᠎";t.exports=function(t){return a((function(){return!!n[t]()||r[t]()!=r||n[t].name!==t}))}},a6f9:function(t,e,i){"use strict";var a=i("37ab"),n=i("f8d2").trim,r=i("7c45");a({target:"String",proto:!0,forced:r("trim")},{trim:function(){return n(this)}})},ac7b:function(t,e,i){},cffa:function(t,e,i){"use strict";var a=i("eaf5"),n=i.n(a);n.a},eaf5:function(t,e,i){},f8d2:function(t,e,i){var a=i("660f"),n=i("5839"),r="["+n+"]",c=RegExp("^"+r+r+"*"),s=RegExp(r+r+"*$"),o=function(t){return function(e){var i=String(a(e));return 1&t&&(i=i.replace(c,"")),2&t&&(i=i.replace(s,"")),i}};t.exports={start:o(1),end:o(2),trim:o(3)}}}]);
//# sourceMappingURL=chunk-3b10b656.47ec38e4.js.map