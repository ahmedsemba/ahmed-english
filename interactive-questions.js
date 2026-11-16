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


  const prep1Units = [
    { title:"Life in a Digital World", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A tablet is a digital …","device",["device","continent","tradition","sculpture"]],
        ["قواعد","Mariam usually … her homework after school.","does",["do","does","is doing","did"]],
        ["قواعد","Omar … forgets his school bag. He remembers it every day.","never",["never","always","usually","often"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","We use a keyboard to …","type words",["type words","wash clothes","cook food","open a door"]],
        ["قواعد","My brother … the internet every evening.","uses",["use","uses","using","is use"]],
        ["فهم","A digital routine is about the way we … technology every day.","use",["use","repair","paint","avoid"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","An email is a message sent …","electronically",["by post only","electronically","by train","on paper only"]],
        ["قواعد","Sara … checks her messages before school.","often",["often","yesterday","now","tomorrow"]],
        ["فهم","A successful team project needs …","cooperation",["cooperation","silence","one person's ideas only","no plan"]]
      ]}
    ]},
    { title:"Learning to Learn", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A visual learner learns well by …","seeing pictures and diagrams",["seeing pictures and diagrams","running fast","listening to music only","sleeping"]],
        ["قواعد","I … speak English, but I can't speak French.","can",["can","am","was","did"]],
        ["قواعد","Look! The students … together now.","are studying",["study","studies","are studying","studied"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","Learning together means studying …","with other people",["with other people","without books","only at night","without asking questions"]],
        ["قواعد","Can Zain solve the puzzle? Yes, he …","can",["can","does","is","was"]],
        ["قواعد","Sara … a study plan at the moment.","is making",["makes","make","is making","made"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A study plan helps you organize your …","learning",["learning","holidays","clothes","meals"]],
        ["قواعد","They … playing a learning game now.","are",["is","am","are","be"]],
        ["فهم","A good study space should be …","quiet and organized",["noisy and messy","quiet and organized","dark and crowded","full of distractions"]]
      ]}
    ]},
    { title:"Role Models", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A role model is a person we …","admire and learn from",["admire and learn from","try to avoid","never listen to","do not know"]],
        ["قواعد","Dr Samira Moussa … important work in science.","did",["do","does","did","doing"]],
        ["قواعد","The scientist … born in Egypt.","was",["were","was","is","are"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","A hero often helps …","other people",["other people","only himself","no one","machines only"]],
        ["قواعد","They … proud of their teacher yesterday.","were",["was","were","are","be"]],
        ["قواعد","Ahmed … a useful book last week.","read",["reads","reading","read","is reading"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","Community service means helping …","the people around us",["the people around us","only famous people","nobody","machines"]],
        ["قواعد","My friends … the school garden last Friday.","visited",["visit","visits","visited","visiting"]],
        ["فهم","A good role model teaches us to be …","helpful and responsible",["careless","helpful and responsible","unkind","lazy"]]
      ]}
    ]},
    { title:"Smart Choices", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A consequence is a … of an action.","result",["result","question","hobby","device"]],
        ["قواعد","If you study hard, you … better results.","will get",["got","get yesterday","will get","getting"]],
        ["قواعد","You … think carefully before making an important choice.","should",["should","shouldn't","can't","was"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","A smart choice can have a … effect.","positive",["careless","positive","dangerous","weak"]],
        ["قواعد","If it rains, we … the match indoors.","will play",["played","plays","will play","playing"]],
        ["قواعد","You … ignore a friend's good advice.","shouldn't",["should","shouldn't","are","were"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","Giving advice means telling someone what they … do.","should",["should","did","are","has"]],
        ["فهم","Before making a choice, it is wise to think about …","the consequences",["the consequences","the colour","the weather only","the price only"]],
        ["قواعد","If you don't hurry, you … miss the bus.","will",["would","will","were","did"]]
      ]}
    ]},
    { title:"Future Dreams", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","An ambition is something you hope to …","achieve",["achieve","forget","break","avoid"]],
        ["قواعد","I am … to be a scientist when I grow up.","going",["go","goes","going","went"]],
        ["قواعد","She … going to study medicine.","is",["am","is","are","be"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","A career is a job or profession you do for a …","long time",["short game","long time","single day","holiday"]],
        ["قواعد","They are going … visit the science museum.","to",["for","to","at","in"]],
        ["فهم","A good future plan should match your …","interests and abilities",["interests and abilities","friends' choices only","favourite colour","lunch time"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","A talent is a natural …","ability",["ability","problem","mistake","rule"]],
        ["قواعد","We … going to take part in the school project.","are",["is","am","are","be"]],
        ["قواعد","He is going to … an engineer.","be",["is","being","be","was"]]
      ]}
    ]},
    { title:"Global Citizens", groups:[
      { label:"الدروس 1 و2", qs:[
        ["مفردات","A global citizen cares about people and the …","environment",["environment","screen","keyboard","uniform"]],
        ["قواعد","We … keep our streets clean.","must",["must","mustn't","was","did"]],
        ["قواعد","People … throw rubbish into the sea.","mustn't",["must","mustn't","are","were"]]
      ]},
      { label:"الدروس 3 و4", qs:[
        ["مفردات","Ocean pollution is harmful to …","sea life",["sea life","school bags","mountains only","computers"]],
        ["قواعد","My friends … the beach every month.","clean",["cleans","clean","cleaning","is clean"]],
        ["قواعد","Look! Volunteers … the beach now.","are cleaning",["clean","cleans","are cleaning","cleaned"]]
      ]},
      { label:"الدروس 5 و6", qs:[
        ["مفردات","To make a difference means to …","help create a positive change",["help create a positive change","make a problem worse","stop helping","forget a promise"]],
        ["قواعد","Yesterday, we … trees near our school.","planted",["plant","plants","planted","planting"]],
        ["فهم","A global citizen should …","respect others and protect nature",["waste water","respect others and protect nature","ignore the community","pollute the sea"]]
      ]}
    ]}
  ];
  const prep1Story = [
    ["قصة","Where did the children enter in the first challenge?","The Magic Classroom",["The library","The Magic Classroom","A sports club","A museum"]],
    ["قصة","What did the children face in the Magic Classroom?","Floating puzzles",["A cooking lesson","Floating puzzles","A football match","A long journey"]],
    ["قصة","Which quality helped the children solve the challenge?","Teamwork",["Selfishness","Teamwork","Anger","Carelessness"]],
    ["قصة","What did the invisible bridge teach the children?","The power of unity",["The value of money","The power of unity","How to drive","How to paint"]],
    ["قصة","What helped the children open the golden door?","Working together",["Arguing","Working together","Leaving the room","Breaking the door"]],
    ["قصة","What did the glowing book show the children?","Important values",["A shopping list","Important values","A bus timetable","A weather report"]],
    ["قصة","Which value is important in the children's adventure?","Responsibility",["Carelessness","Responsibility","Dishonesty","Disrespect"]],
    ["قصة","What were the children preparing for the village fair?","A water-saving machine",["A new computer game","A water-saving machine","A school bus","A sports trophy"]],
    ["قصة","What helped the team continue when they faced problems?","Friendship and determination",["Giving up","Friendship and determination","Blaming each other","Working separately"]],
    ["قصة","What was more important than winning a trophy?","Showing good values as a team",["Showing good values as a team","Being famous","Working alone","Finishing first at any cost"]]
  ];

  let activeUnits = units;
  let activeStory = story;
  let activeGrade = "الصف الثاني الإعدادي";
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
      sel.innerHTML = activeUnits[Number(unit)].groups.map((g,i)=>'<option value="'+i+'">'+g.label+'</option>').join('') + '<option value="exam">امتحان الوحدة</option>';
    }
    $("iqPanel").innerHTML = '<p class="iq-hint">اختر الجزء المطلوب ثم اضغط «ابدأ التدريب».</p>';
    $("iqStart").disabled = false;
  }
  function buildMixedQuestions(source, title, addParagraph) {
    const out = [];
    source.forEach((q, index) => {
      const [category, prompt, answer, options] = q;
      out.push({ type:"mcq", category, text:prompt, answer, options:options || [] });
      if (category === "مفردات" || category === "قصة") {
        out.push({ type:"fill", category, text:"Complete the sentence: " + prompt.replace(/…|\.\.\./g, "________"), answer });
      } else if (category === "قواعد") {
        const wrong = (options || []).find(x => x !== answer);
        if (wrong) {
          const useTrue = index % 2 === 0;
          out.push({ type:"truefalse", category, text:prompt.replace(/…|\.\.\./g, useTrue ? answer : wrong), answer:useTrue });
        }
      }
      if (index % 3 === 2) {
        out.push({ type:"short", category, text:"Write the correct answer: " + prompt.replace(/…|\.\.\./g, "________"), answer });
      }
    });

    if (source.length) {
      const firstAnswer = String(source[0][2] || "").trim();
      const words = firstAnswer.split(/\s+/).filter(Boolean);
      if (words.length >= 2 && words.length <= 7) {
        out.push({ type:"reorder", category:"ترتيب كلمات", text:"Rearrange the words to make the correct answer:", words:words.slice().reverse(), answer:firstAnswer });
      }
    }

    if (addParagraph) {
      const isGenAlpha = /gen alpha|meet gen alpha/i.test(title);
      const passage = isGenAlpha
        ? "Generation Z and Generation Alpha are two young generations. They both grow up in a digital world. They use smartphones and computers every day. They watch videos, play online games and communicate with friends. Technology helps them learn new things and share ideas. However, they should balance screen time with real-life activities."
        : "People learn about " + title.replace(/\s*[-–].*$/, "") + " in different ways. They can read, ask questions and share ideas with others. Technology can help students find information and practise new skills. Good learners use their time wisely, check information and work together. They should also think carefully and use what they learn in real life.";
      out.push({ type:"passage-mcq", category:"قطعة وفهم", passage, text:"The passage is mainly about …", answer:isGenAlpha ? "two young generations and technology" : "learning about the unit topic", options:isGenAlpha ? ["two young generations and technology","sports competitions","famous places","healthy food"] : ["learning about the unit topic","a school trip","a football match","a shopping list"] });
      out.push({ type:"passage-short", category:"قطعة وفهم", passage, text:isGenAlpha ? "What do the two generations use every day?" : "How can students learn about the topic?", answer:isGenAlpha ? ["smartphones and computers","smartphones","computers"] : ["read and ask questions","read","ask questions"] });
      out.push({ type:"passage-short", category:"قطعة وفهم", passage, text:isGenAlpha ? "What should they balance?" : "What should good learners do with their time?", answer:isGenAlpha ? ["screen time with real life activities","screen time","real life activities"] : ["use their time wisely","use time wisely"] });

      const storyQuestions = activeStory.slice(0, 2);
      storyQuestions.forEach(q => out.push({ type:"mcq", category:"قصة", text:q[1], answer:q[2], options:q[3] || [] }));

      out.push({ type:"short", category:"حوار", text:"Complete the dialogue. A: What's your favourite digital device? B: My favourite device is a ______.", answer:["tablet","smartphone","computer","laptop","mobile phone"] });
      out.push({ type:"short", category:"حوار", text:"A: What do you use it for? B: I use it for ______.", answer:["learning","studying","watching videos","communication","doing homework","learning and communication"] });
      out.push({ type:"short", category:"حوار", text:"A: Do you use it at school? B: ______.", answer:["yes i do","no i dont","sometimes"] });

      const topic = title.replace(/\s*[-–].*$/, "").trim() || "Technology";
      out.push({ type:"paragraph", category:"Writing", text:'Write a paragraph of 60–80 words about: "' + topic + ' and its importance in our lives".', answer:"", maxMarks:5 });
    }
    return out;
  }

  function startQuiz() {
    const u = $("iqUnit").value, g = $("iqGroup").value;
    let source = [], title = "", isExam = false;
    if (u === "story") { source = activeStory; title = "تدريب القصة"; }
    else if (u === "term") {
      source = activeUnits.flatMap(x=>x.groups.map((y,yi)=>y.qs[Math.min(yi,y.qs.length-1)])).concat(activeStory.slice(0,3));
      title = "الامتحان الشامل للترم"; isExam = true;
    } else {
      const unit = activeUnits[Number(u)];
      title = unit.title + " - " + (g === "exam" ? "امتحان الوحدة" : unit.groups[Number(g)].label);
      source = g === "exam" ? unit.groups.flatMap(x=>x.qs) : unit.groups[Number(g)].qs;
      isExam = g === "exam";
    }
    current = { title, qs:buildMixedQuestions(source, title, isExam) };
    submitted = false;
    $("iqPanel").innerHTML = '<h4>'+esc(title)+'</h4><p class="iq-hint">عدد الأسئلة: '+current.qs.length+' — أجب عن الأسئلة ثم اضغط «صحّح إجاباتي».</p>' +
      current.qs.map((q,i)=>{
        let body = "";
        if (q.passage) body += '<div class="iq-passage" style="white-space:pre-line;padding:12px;margin:10px 0;border-radius:10px;background:#172554;color:#fff">'+esc(q.passage)+'</div>';
        if (q.type === "mcq" || q.type === "passage-mcq") {
          body += '<div class="iq-options">'+(q.options || []).map((op,j)=>'<label><input type="radio" name="iq_'+i+'" value="'+j+'"><span>'+esc(op)+'</span></label>').join('')+'</div>';
        } else if (q.type === "truefalse") {
          body += '<div class="iq-options"><label><input type="radio" name="iq_'+i+'" value="true"><span>True</span></label><label><input type="radio" name="iq_'+i+'" value="false"><span>False</span></label></div>';
        } else if (q.type === "paragraph") {
          body += '<textarea class="iq-free-answer" id="iq_answer_'+i+'" rows="6" maxlength="1200" placeholder="Write your paragraph here..."></textarea><small>التصحيح آلي تقديري، وليس بديلًا عن مراجعة المدرس للمعنى والقواعد.</small>';
        } else if (q.type === "reorder") {
          body += '<div class="iq-word-bank">'+q.words.map(w=>'<span>'+esc(w)+'</span>').join(' / ')+'</div><input class="iq-free-answer" id="iq_answer_'+i+'" type="text" placeholder="Write the correct sentence">';
        } else {
          body += '<input class="iq-free-answer" id="iq_answer_'+i+'" type="text" placeholder="اكتب إجابتك هنا">';
        }
        const typeLabel = ({mcq:"Choose", "passage-mcq":"Reading – Choose", "passage-short":"Reading – Answer", fill:"Complete", truefalse:"True or False", short:"Short answer", reorder:"Rearrange", paragraph:"Writing"}[q.type] || "");
        return '<article class="iq-question"><div class="iq-question-title"><span>'+(i+1)+'.</span> '+esc(q.text)+'</div><small class="iq-type">'+esc(q.category || "سؤال")+' — '+typeLabel+'</small>'+body+'</article>';
      }).join('');
    $("iqSubmit").hidden = false; $("iqRetry").hidden = true; $("iqResult").innerHTML = "";
  }

  function normalizeAnswer(value) {
    return String(value || "").toLowerCase().trim().replace(/[.,!?;:'"()]/g,"").replace(/\s+/g," ");
  }

  function gradeParagraph(value, topic) {
    const text = String(value || "").trim();
    const words = text.split(/\s+/).filter(Boolean);
    if (!words.length) return {score:0, feedback:"لم تكتب فقرة."};
    const lower = text.toLowerCase();
    const sentences = text.split(/[.!?]+/).filter(x=>x.trim()).length;
    const topicWords = String(topic || "").toLowerCase().split(/\s+/).filter(x=>x.length > 3);
    const topicHits = topicWords.filter(x=>lower.includes(x)).length;
    let score = 0;
    if (words.length >= 45 && words.length <= 90) score++;
    if (topicHits > 0 || /technology|students|people|learning|school|world|digital|generation/i.test(lower)) score++;
    if (sentences >= 3) score++;
    if (/\b(and|but|because|also|so|first|finally|however)\b/i.test(lower)) score++;
    if (/\b(is|are|was|were|have|has|can|should|use|uses|helps|help|do|does|make|makes)\b/i.test(lower) && /[.!?]/.test(text)) score++;
    const notes = ["الطول: "+words.length+" كلمة","الجمل: "+sentences,"مؤشرات ارتباط بالموضوع: "+(topicHits ? "موجودة" : "محدودة")];
    return {score:Math.min(5,score), feedback:"الدرجة تقديرية من 5. "+notes.join(" — ")+". التصحيح الآلي لا يستطيع ضمان صحة المعنى أو كل الأخطاء النحوية؛ راجع الفقرة مع المدرس."};
  }

  function gradeQuiz() {
    if (!current || submitted) return;
    let score = 0, total = 0, answered = 0;
    const feedback = [];
    current.qs.forEach((q,i)=>{
      const marks = q.maxMarks || 1;
      total += marks;
      let ok = false, response = "";
      if (q.type === "mcq" || q.type === "passage-mcq" || q.type === "truefalse") {
        const chosen = document.querySelector('input[name="iq_'+i+'"]:checked');
        if (chosen) {
          answered++;
          response = chosen.value;
          ok = q.type === "truefalse"
            ? (chosen.value === "true") === q.answer
            : q.options[Number(chosen.value)] === q.answer;
        }
      } else {
        const field = $("iq_answer_"+i);
        response = field ? field.value.trim() : "";
        if (response) answered++;
        const accepted = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (q.type === "paragraph") {
          const result = gradeParagraph(response, current.title);
          score += result.score;
          feedback.push((i+1)+". "+result.feedback+" ("+result.score+"/5)");
          ok = result.score >= 3;
        } else {
          const normalized = normalizeAnswer(response);
          ok = accepted.some(a => normalizeAnswer(a) === normalized);
          if (!ok && q.type === "passage-short") {
            ok = accepted.some(a => {
              const target = normalizeAnswer(a);
              return target.length > 5 && normalized.length > 5 && (normalized.includes(target) || target.includes(normalized));
            });
          }
        }
      }
      if (ok && q.type !== "paragraph") score += marks;
      if (q.type !== "paragraph") feedback.push((i+1)+". "+(ok ? "صحيح" : "الإجابة المقبولة: "+(Array.isArray(q.answer) ? q.answer.join(" / ") : q.answer)));
      const fields = document.querySelectorAll('input[name="iq_'+i+'"]');
      fields.forEach(el => { el.disabled = true; const label = el.closest("label"); if (label) label.classList.toggle(ok ? "iq-correct" : "iq-wrong", el.checked); });
      const free = $("iq_answer_"+i);
      if (free) free.disabled = true;
    });
    const pct = total ? Math.round(score/total*100) : 0;
    const message = pct <= 50 ? "معلش حاول تاني" : pct <= 80 ? "حلو اتشطر وذاكر أكتر" : "برافو عليك ممتاز";
    submitted = true;
    $("iqResult").innerHTML = '<div class="iq-score"><strong>نتيجتك التقديرية: '+score+' من '+total+'</strong><span>'+pct+'%</span><p>'+message+'</p><small>أجبت عن '+answered+' من '+current.qs.length+' سؤالًا.</small></div><details class="iq-answers"><summary>مراجعة الإجابات والملاحظات</summary>'+feedback.map(x=>'<p>'+esc(x)+'</p>').join('')+'</details>';
    $("iqSubmit").hidden = true; $("iqRetry").hidden = false;
    if (window.saveInteractiveAttempt) {
      window.saveInteractiveAttempt({ activity:current.title, score, total, percentage:pct, answered })
        .then(() => { $("iqResult").insertAdjacentHTML("beforeend", '<p class="iq-hint">تم حفظ نتيجتك عند المدرس.</p>'); })
        .catch((e) => { $("iqResult").insertAdjacentHTML("beforeend", '<p class="iq-hint">تعذر حفظ النتيجة: '+esc(e && (e.code || e.message) || "خطأ غير معروف")+'</p>'); });
    }
  }
  window.initInteractiveQuestions = function(student) {
    ensureUI();
    const root = $("interactiveQuestions");
    if (!root) return;
    root.style.display = "block";
    if (student && ["الصف الأول الإعدادي","الصف الثاني الإعدادي"].includes(student.grade)) {
      activeGrade = student.grade;
      activeUnits = student.grade === "الصف الأول الإعدادي" ? prep1Units : units;
      activeStory = student.grade === "الصف الأول الإعدادي" ? prep1Story : story;
      $("iqUnavailable").hidden = true; $("iqControls").hidden = false;
      $("iqUnit").innerHTML = activeUnits.map((u,i)=>'<option value="'+i+'">الوحدة '+["الأولى","الثانية","الثالثة","الرابعة","الخامسة","السادسة"][i]+" — "+esc(u.title)+'</option>').join('') + '<option value="story">القصة</option><option value="term">امتحان شامل للترم</option>';
      renderGroups();
    } else {
      $("iqControls").hidden = true; $("iqUnavailable").hidden = false;
      $("iqUnavailable").textContent = "الأسئلة التفاعلية ستظهر عند تجهيز بنك الأسئلة الخاص بصفك الدراسي.";
    }
  };
})();
