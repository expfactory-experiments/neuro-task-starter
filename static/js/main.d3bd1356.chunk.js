(this["webpackJsonptask-starter"]=this["webpackJsonptask-starter"]||[]).push([[0],[,,,,,function(t,e){t.exports={eventCodes:{fixation:1,evidence:5,show_earnings:7,test_connect:32,open_task:18}}},,,,,,,,function(t,e,n){t.exports=n(30)},,,,,function(t,e,n){},,,,function(t){t.exports=JSON.parse('{"task":{"name":"Neuro Task","end":"This experiment has ended."},"prompt":{"continue":{"press":"Press any key to continue.","button":"Continue"},"focus":"Make sure the photodiode is aligned and the EEG recording has begun before continuing.","fullscreen":"Press \'cmd + ctrl + F\' to toggle Fullscreen.","zoom":"Zoom in to enlarge the screen.","setting_up":"Setting up task..."},"welcome":{"large_window":"Please make this window as large as possible.","message":"Instructions"},"userid":{"set":"Please enter patient ID."},"eventMarker":{"found":"Hold the USB event marker in front of the camera.","not_found":"Note: no USB event marker found."},"countdown":{"message1":"Countdown for the first block","message2":"Countdown for the second block"}}')},function(t){t.exports=JSON.parse('{"welcome":{"message":"Welcome to the NEURO experiment."},"userid":{"set":"Setting up user ID."}}')},function(t,e,n){var o={"./blue_payout_correct_10.png":25,"./blue_payout_correct_100.png":26};function r(t){var e=i(t);return n(e)}function i(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=i,t.exports=r,r.id=24},function(t,e,n){t.exports=n.p+"static/media/blue_payout_correct_10.f515a81e.png"},function(t,e,n){t.exports=n.p+"static/media/blue_payout_correct_100.ae2416c7.png"},function(t,e,n){},,,function(t,e,n){"use strict";n.r(e);var o=n(3),r=n.n(o),i=n(8),s=n.n(i),a=(n(18),n(2)),u=n.n(a),c=n(4),d=n(9),p=n(10),l=n(11),f=n(12),m=n(0),h=n(1),v=n.n(h),k=function(t,e){var n=h.range(e,0,-1).map((function(t){return{prompt:"<h1>".concat(t,"</h1>")}}));return{type:"html_keyboard_response",stimulus:"<h3>".concat(t,"</h3"),trial_duration:1e3,response_ends_trial:!1,timeline:n}},b=n(5),g=!m.jsPsych.turk.turkInfo().outsideTurk,y="true"===Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_AT_HOME,O=!0;try{window.require("electron")}catch(ut){O=!1}var w=n(22);if(g){var T=n(23);v.a.merge(w,T)}var E={conditions:["a","b","c"],repeats_per_condition:1,is_practice:!1,is_tutorial:!1,photodiode_active:!1},S=n(6),P=n.n(S),C=!1;if(O){var x=window.require("electron");C=x.ipcRenderer}var D,N=function(){return'<div class="photodiode-box '.concat(y||!O?"invisible":"visible",'" id="photodiode-box">\n\t\t\t\t\t\t\t\t\t<span id="photodiode-spot" class="photodiode-spot"></span>\n  \t\t\t\t\t\t\t\t</div>')},I=function(t){if(!y&&O){var e=t;t<b.eventCodes.open_task&&(e=1),function t(e,n){n>0&&function(t,e){P()(".photodiode-spot").css({"background-color":"black"}),setTimeout((function(){P()(".photodiode-spot").css({"background-color":"white"}),e()}),t)}(e,(function(){setTimeout((function(){t(e,n-1)}),e)}))}(40,e),C&&C.send("trigger",t)}},j=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e?"main-prompt":"main";return"<div class=".concat(n,">").concat(t,"</div>")},A=function(){return{type:"html_button_response",stimulus:j("<h1>".concat(w.task.name,"</h1>"),!0)+N(),choices:[w.prompt.continue.button]}},R=function(){return{type:"html_keyboard_response",stimulus:j("<h1>".concat(w.prompt.setting_up,"</h1>"),!0)+N(),trial_duration:2e3,on_load:function(){I(b.eventCodes.open_task)}}},M=function(t){return new Promise((function(e){return setTimeout(e,t)}))},U=function(t){return function(t,e){return t+Math.floor(Math.random()*Math.floor(e))}(t,50)},H=function(t){return JSON.parse(JSON.stringify(t))},K=((D=n(24)).keys().map(D),function(){var t=m.jsPsych.turk.turkInfo();return"".concat(t.workerId,":").concat(t.assignmentId)}),W=function(){return g?{type:"html_keyboard_response",stimulus:j("<h1>".concat(w.userid.set,"</h1>"),!0),response_ends_trial:!1,trial_duration:800,on_finish:function(t){var e=K();console.log(e)}}:{type:"survey_text",questions:[{prompt:j("<h1>".concat(w.userid.set,"</h1>"),!0),value:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_PATIENT_ID}],on_finish:function(t){!function(t){var e=JSON.parse(t.responses).Q0;m.jsPsych.data.addProperties({patient_id:e,timestamp:Date.now()}),console.log("ID",e)}(t)}}},L=function(){var t=Object(c.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",'<span style="color: green;">'.concat(w.eventMarker.found,"</span>"));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),J=function(){return{type:"html_button_response",stimulus:j("<div><h2 id='usb-alert'></h2></div>",!0)+N(),prompt:["<br><h3>".concat(w.prompt.focus,"</h3>")],choices:[w.prompt.continue.button],on_load:function(){return L().then((function(t){return document.getElementById("usb-alert").innerHTML=t}))}}};console.log("at_home",y),console.log("env at home",Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_AT_HOME);var B={type:"html_keyboard_response",stimulus:"",timeline:y||!O?[A(),W()]:[A(),W(),J(),R()]},q=function(t){return{type:"html_keyboard_response",stimulus:j("<h1>".concat(w.task.end,"</h1>"),!0)+N(),trial_duration:t}},F=function(t){var e='<div class="beads_container"><div id="fixation-dot"> </div></div>'+N(),n=b.eventCodes.fixation;return{type:"html_keyboard_response",choices:m.jsPsych.NO_KEYS,stimulus:e,response_ends_trial:!1,trial_duration:U(t),on_load:function(){return I(n)},on_finish:function(t){return t.code=n}}},V=function(t,e,n){var o=b.eventCodes.evidence;return{type:"html_keyboard_response",stimulus:"",response_ends_trial:!1,trial_duration:e,on_start:function(e){e.stimulus=j(t)+N()},on_load:function(){return I(o)},on_finish:function(t){return t.code=o}}},z=function(t){return"<div class='beads_container'>\n    <h1 class='text-".concat(t>=0?"success":"danger","'>").concat("$"+parseFloat(t).toFixed(2),"</h1>\n    </div>")},G=function(t,e){var n=b.eventCodes.show_earnings;return{type:"html_keyboard_response",stimulus:"",response_ends_trial:!1,trial_duration:e,on_load:function(){return I(n)},on_start:function(t){var e=Math.random();t.stimulus=z(e),O&&!y&&(t.stimulus+=N())},on_finish:function(t){return t.code=n}}},Q=function(t,e,n){var o={condition:n,trial_earnings:0,start_time:Date.now()};return{type:"html_keyboard_response",timeline:[V(n,1e3,500),F(650),G(o,500)]}},Y=function(t){var e=function(t){var e=t.conditions.map((function(e){return v.a.range(t.repeats_per_condition).map((function(){return e}))}));return v.a.shuffle(v.a.flatten(e))}(t),n={block_earnings:0,optimal_earnings:0,continue_block:!0},o=e.map((function(e){return Q(t,n,e)})),r={type:"html_keyboard_response",stimulus:"",trial_duration:1,on_finish:function(e){return e.block_settings=t}};return o.unshift(r),{type:"html_keyboard_response",timeline:o}},Z=H(E);Z.conditions=["m","n"],Z.repeats_per_condition=1,Z.is_practice=!0;var $=H(E);$.is_tutorial=!0,$.photodiode_active=!1;var X=H(E);X.repeats_per_condition=2;var tt=H(E);tt.conditions=["e","f"],tt.repeats_per_condition=2;var et=[B,k(w.countdown.message1,3),Y(Z),k(w.countdown.message2,3),Y(X),q(5e3)],nt=[B,k(w.countdown.message1,3),Y($),k(w.countdown.message2,3),Y(tt),q(3e3)],ot=g?nt:et,rt=(n(27),n(28),n(29),!1),it=!1;if(O){var st=window.require("electron");rt=st.ipcRenderer}else window.lodash=_.noConflict(),it=new PsiTurk(K(),"/finish");var at=function(t){Object(f.a)(n,t);var e=Object(l.a)(n);function n(){return Object(d.a)(this,n),e.apply(this,arguments)}return Object(p.a)(n,[{key:"render",value:function(){return console.log("Outside Turk:",m.jsPsych.turk.turkInfo().outsideTurk),console.log("Expfactory:",!0),r.a.createElement("div",{className:"App"},r.a.createElement(m.Experiment,{settings:{timeline:ot,on_data_update:function(t){rt?rt.send("data",t):it&&it.recordTrialData(t)},on_finish:function(t){rt?rt.send("end","true"):function(){var e=Object(c.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return it.saveData(),e.next=3,M(5e3);case 3:console.log(it.taskdata),t={data:it.taskdata},fetch("/save",{method:"POST",body:JSON.stringify(t)}).then((function(t){console.log("Request complete! response:",t),it.teardownTask(),window.location=it.taskdata.adServerLoc+"/next"}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}}}))}}]),n}(r.a.Component);s.a.render(r.a.createElement(at,null),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.d3bd1356.chunk.js.map