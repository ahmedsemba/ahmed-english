/* Interactive English practice - original questions based on the Prep 2 First Term syllabus. */
(function () {
  "use strict";
  const units = [
    { title:"Gen Alpha", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","People who grow up using computers and the internet are called …","digital natives",["digital visitors","digital natives","offline users","inventors"]],
        ["مفردات","The word “balance” is closest in meaning to …","keeping things in the right amount",["losing control","keeping things in the right amount","stopping all activities","being famous"]],
        ["قواعد","Look! The children … a short video now.","are making",["make","makes","are making","is making"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","If two people live far apart, they live …","in distant places",["in the same room","in distant places","next door","together"]],
        ["مفردات","A person who creates online videos is an online …","creator",["visitor","driver","creator","viewer"]],
        ["قواعد","Mona … her homework at the moment.","is doing",["does","do","is doing","doing"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A useful tip is a piece of …","advice",["advice","noise","permission","equipment"]],
        ["مفردات","The opposite of “agree” is …","disagree",["accept","support","disagree","connect"]],
        ["قواعد","We … our grandparents tomorrow; the visit is arranged.","are visiting",["visit","visited","are visiting","visits"]]
      ]}
    ]},
    { title:"My Digital Footprint", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A digital footprint is the information you … online.","leave",["hide","leave","repair","borrow"]],
        ["مفردات","You should keep your password …","private",["public","private","simple for everyone","on a public post"]],
        ["قواعد","The photos … every evening.","are checked",["check","checked","are checked","is checking"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","A trusted adult is someone you can …","rely on",["ignore","rely on","compete with","hide from"]],
        ["قواعد","Personal information … shared with strangers.","mustn't be",["mustn't be","mustn't","mustn't being","mustn't is"]],
        ["قواعد","The classroom rules … by all students.","are followed",["follow","are followed","is following","follows"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A secure website helps protect your …","data",["weather","data","uniform","luggage"]],
        ["قواعد","Messages … before they are sent.","should be checked",["should check","should be checked","should checked","are checking"]],
        ["فهم","If a strange person asks for your details online, you should …","tell a trusted adult",["send the details","share your password","tell a trusted adult","meet the person alone"]]
      ]}
    ]},
    { title:"Facing Challenges", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","Determination means continuing to try and not …","giving up",["giving up","celebrating","travelling","agreeing"]],
        ["مفردات","If you feel proud, you feel … about what you did.","pleased",["angry","pleased","afraid","bored"]],
        ["قواعد","Yesterday, we … a difficult problem together.","solved",["solve","solves","solved","are solving"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","An obstacle is something that … your progress.","makes difficult",["makes difficult","explains","celebrates","copies"]],
        ["قواعد","While I …, the phone rang.","was studying",["studied","am studying","was studying","study"]],
        ["قواعد","I was tired, … I finished my work.","but",["because","but","although of","so that"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A brave person faces problems with …","courage",["fear only","courage","carelessness","silence"]],
        ["قواعد","They … football when it started to rain.","were playing",["play","played","were playing","are playing"]],
        ["قواعد","I stayed at home … I was ill.","because",["because","although","but","so"]]
      ]}
    ]},
    { title:"Art and Expressions", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A sculpture is a work of art made by …","shaping materials",["writing a report","shaping materials","singing a song","taking a test"]],
        ["مفردات","Imagination helps artists … new ideas.","create",["forget","create","damage","hide"]],
        ["قواعد","I like this painting … it uses bright colours.","because",["because","but","although","so"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","Something valuable is …","important or worth a lot",["useless","important or worth a lot","broken","ordinary"]],
        ["مفردات","An innovative idea is …","new and creative",["old and repeated","new and creative","unclear","impossible"]],
        ["قواعد","The artist was tired, … he continued working.","but",["because","so","but","although of"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A performance is something people …","present to an audience",["present to an audience","keep in a box","use for travelling","wear in winter"]],
        ["فهم","A good team project needs people to …","listen to different ideas",["ignore everyone","listen to different ideas","work without a plan","compete all the time"]],
        ["قواعد","… the task was difficult, the students finished it.","Although",["Because","So","Although","But"]]
      ]}
    ]},
    { title:"Around the World", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A continent is …","a large area of land",["a small village","a large area of land","a kind of food","a city street"]],
        ["مفردات","A landmark is a famous …","place",["place","person's password","school subject","piece of clothing"]],
        ["قواعد","The Nile is … than a small river.","longer",["long","longest","longer","more long"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","A souvenir is something you buy to … a visit.","remember",["forget","remember","cancel","describe"]],
        ["مفردات","A tradition is a custom followed by a …","community",["community","machine","map","competition"]],
        ["قواعد","This is the … building in our town.","tallest",["tall","taller","tallest","more tall"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","The capital is usually the main … of a country.","city",["mountain","city","desert","island"]],
        ["قواعد","Petra is … than many modern buildings.","older",["old","oldest","older","more old"]],
        ["قواعد","This is one of the … places I have visited.","most impressive",["more impressive","most impressive","impressive","impressiver"]]
      ]}
    ]},
    { title:"Young Innovators", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","An innovator is someone who … new ideas or things.","creates",["forgets","creates","copies only","avoids"]],
        ["مفردات","Patience means being able to … calmly.","wait",["wait","shout","rush","complain"]],
        ["قواعد","If you heat ice, it …","melts",["melt","melts","will melting","melted"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","An achievement is something …","successfully done",["successfully done","left unfinished","forgotten","borrowed"]],
        ["فهم","A biography mainly tells us about …","a person's life",["a person's life","a cooking recipe","a sports rule","a fictional planet"]],
        ["قواعد","If I had more time, I … a useful robot.","would build",["build","will build","would build","am building"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","To inspire someone is to … them to do something good.","encourage",["discourage","encourage","confuse","stop"]],
        ["قواعد","If she studies hard, she … the competition.","will join",["would joined","will join","joined","joining"]],
        ["قواعد","If I were a scientist, I … inventions to help people.","might create",["might create","creates","will created","am create"]]
      ]}
    ]}
  ];

  const story = [
    ["قصة","What did Amal enjoy doing in the first chapter?","Building things",["Building things","Collecting stamps","Painting walls","Playing football"]],
    ["قصة","What did Amal decide to make for the Creative Fair?","A talking robot",["A paper boat","A talking robot","A new phone","A wooden chair"]],
    ["قصة","Who encouraged Amal when she felt worried?","Yara",["Her neighbour","Yara","The head teacher","A shopkeeper"]],
    ["قصة","What did Amal remember when using the internet?","Digital responsibility",["To share her password","Digital responsibility","To download everything","To post private details"]],
    ["قصة","What happened when Amal's robot had a problem?","She kept trying",["She gave up immediately","She kept trying","She left the fair","She blamed Yara"]],
    ["قصة","What helped the friends in the Hidden Island adventure?","Teamwork and respect",["Working alone","Teamwork and respect","Keeping secrets","Ignoring ideas"]],
    ["قصة","What did the friends discover during their island adventure?","The value of friendship",["The value of friendship","A new school","A lost phone","A city bus"]],
    ["قصة","How did the friends explore the island?","They worked in pairs",["They worked in pairs","They stayed on the boat","They separated forever","They returned at once"]],
    ["قصة","What did the robot's message encourage people to do?","Be yourself and never give up",["Stop learning","Be yourself and never give up","Avoid new ideas","Work without friends"]],
    ["قصة","At the end of the adventure, the friends returned home feeling …","closer as friends",["angry with each other","closer as friends","afraid of teamwork","uninterested"]]
  ];

  let current = null;
  let selected = {};
  let submitted = false;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function ensureUI() {
    const root = $("interactiveQuestions");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";
    $("iqUnit").addEventListener("change", renderGroups);
    $("iqGroup").addEventListener("change", () => { $("iqStart").disabled = false; });
    $("iqStart").addEventListener("click", startQuiz);
    $("iqSubmit").addEventListener("click", gradeQuiz);
    $("iqRetry").addEventListener("click", startQuiz);
    renderGroups();
  }
  function renderGroups() {
    const unit = $("iqUnit").value;
    const sel = $("iqGroup");
    if (unit === "story" || unit === "term") {
      sel.innerHTML = unit === "story" ? '<option value="story">تدريب القصة</option>' : '<option value="term">امتحان شامل للترم</option>';
      sel.disabled = true;
    } else {
      sel.disabled = false;
      sel.innerHTML = units[Number(unit)].groups.map((g,i)=>'<option value="'+i+'">'+g.label+'</option>').join('') + '<option value="exam">امتحان الوحدة</option>';
    }
    $("iqPanel").innerHTML = '<p class="iq-hint">اختر الجزء المطلوب ثم اضغط «ابدأ التدريب».</p>';
    $("iqStart").disabled = false;
  }
  function startQuiz() {
    const u = $("iqUnit").value, g = $("iqGroup").value;
    let qs = [], title = "";
    if (u === "story") { qs = story; title = "تدريب القصة"; }
    else if (u === "term") { qs = units.flatMap(x=>x.groups.flatMap(y=>y.qs)).filter((q,i)=>i%3===0 || i%3===1).slice(0,18); title = "الامتحان الشامل للترم"; }
    else {
      const unit = units[Number(u)];
      title = unit.title + " - " + (g === "exam" ? "امتحان الوحدة" : unit.groups[Number(g)].label);
      qs = g === "exam" ? unit.groups.flatMap(x=>x.qs) : unit.groups[Number(g)].qs;
    }
    current = {title,qs:qs.map(q=>({type:q[0],text:q[1],answer:q[2],options:q[3]}))};
    selected = {}; submitted = false;
    $("iqPanel").innerHTML = '<h4>'+esc(title)+'</h4><p class="iq-hint">عدد الأسئلة: '+qs.length+' — اختر إجابة واحدة لكل سؤال ثم اضغط «صحّح إجاباتي».</p>' +
      current.qs.map((q,i)=>'<article class="iq-question"><div class="iq-question-title"><span>'+(i+1)+'.</span> '+esc(q.text)+'</div><small class="iq-type">'+esc(q.type)+'</small><div class="iq-options">'+q.options.map((op,j)=>'<label><input type="radio" name="iq_'+i+'" value="'+j+'"><span>'+esc(op)+'</span></label>').join('')+'</div></article>').join('');
    $("iqSubmit").hidden = false; $("iqRetry").hidden = true; $("iqResult").innerHTML = "";
  }
  function gradeQuiz() {
    if (!current || submitted) return;
    let score = 0, answered = 0;
    current.qs.forEach((q,i)=>{
      const chosen = document.querySelector('input[name="iq_'+i+'"]:checked');
      if (chosen) { answered++; if (q.options[Number(chosen.value)] === q.answer) score++; }
    });
    const total = current.qs.length, pct = Math.round(score/total*100);
    const message = pct <= 50 ? "معلش حاول تاني" : pct <= 80 ? "حلو اتشطر وذاكر أكتر" : "برافو عليك ممتاز";
    submitted = true;
    current.qs.forEach((q,i)=>{
      const chosen = document.querySelector('input[name="iq_'+i+'"]:checked');
      const rightIndex = q.options.indexOf(q.answer);
      document.querySelectorAll('input[name="iq_'+i+'"]').forEach((el,j)=>{
        el.disabled = true;
        const label = el.closest("label");
        if (j === rightIndex) label.classList.add("iq-correct");
        else if (chosen && Number(chosen.value) === j) label.classList.add("iq-wrong");
      });
    });
    $("iqResult").innerHTML = '<div class="iq-score"><strong>نتيجتك: '+score+' من '+total+'</strong><span>'+pct+'%</span><p>'+message+'</p><small>أجبت عن '+answered+' من '+total+' سؤالًا.</small></div><details class="iq-answers"><summary>مراجعة الإجابات الصحيحة</summary>'+current.qs.map((q,i)=>'<p>'+(i+1)+'. '+esc(q.answer)+'</p>').join('')+'</details>';
    $("iqSubmit").hidden = true; $("iqRetry").hidden = false;
  }
  window.initInteractiveQuestions = function(student) {
    ensureUI();
    const root = $("interactiveQuestions");
    if (!root) return;
    root.style.display = "block";
    if (student && student.grade === "الصف الثاني الإعدادي") {
      $("iqUnavailable").hidden = true; $("iqControls").hidden = false;
    } else {
      $("iqControls").hidden = true; $("iqUnavailable").hidden = false;
      $("iqUnavailable").textContent = "الأسئلة التفاعلية ستظهر عند تجهيز بنك الأسئلة الخاص بصفك الدراسي.";
    }
  };
})();
