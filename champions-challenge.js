/* تحدي الأبطال — بنك تجريبي أصلي للصفين الأول الابتدائي والثالث الإعدادي */
window.CHAMPIONS_BANK = {
  "الصف الأول الابتدائي": [
    {name:"المبتدئ",desc:"الحروف والألوان والكلمات الأولى",qs:[
      {t:"mcq",q:"Which letter comes first in the alphabet?",o:["A","B","C"],a:0},
      {t:"mcq",q:"What colour is a banana?",o:["Blue","Yellow","Black"],a:1},
      {t:"fill",q:"Complete the word: C _ T",a:["A"]},
      {t:"order",q:"Put the words in order.",w:["am","I","Ali"],a:["I","am","Ali"]},
      {t:"tf",q:"A cat is an animal.",a:true}
    ]},
    {name:"المستكشف",desc:"أفراد الأسرة والأشياء والجمل القصيرة",qs:[
      {t:"mcq",q:"This is my mother. She is a …",o:["woman","boy","man"],a:0},
      {t:"fill",q:"Complete: B O O _",a:["K"]},
      {t:"order",q:"Make a sentence.",w:["is","This","book","my"],a:["This","is","my","book"]},
      {t:"mcq",q:"What do we use to write?",o:["A pencil","A plate","A shoe"],a:0},
      {t:"tf",q:"We see with our eyes.",a:true}
    ]},
    {name:"المتميز",desc:"الأفعال البسيطة والضمائر",qs:[
      {t:"mcq",q:"I … a student.",o:["am","is","are"],a:0},
      {t:"fill",q:"Complete: S H E  _ S  H A P P Y",a:["I"]},
      {t:"order",q:"Make a sentence.",w:["like","I","milk"],a:["I","like","milk"]},
      {t:"mcq",q:"Choose the plural: one book, two …",o:["book","books","a book"],a:1},
      {t:"tf",q:"He is used with a girl.",a:false}
    ]},
    {name:"المحترف",desc:"فهم الجمل واستخدام الكلمات",qs:[
      {t:"mcq",q:"Mona has two …",o:["brother","brothers","brotheres"],a:1},
      {t:"fill",q:"Complete: The sun is h _ t.",a:["O"]},
      {t:"order",q:"Make a sentence.",w:["every","I","day","read"],a:["I","read","every","day"]},
      {t:"mcq",q:"Choose the correct sentence.",o:["She are happy.","She is happy.","She am happy."],a:1},
      {t:"tf",q:"We use our ears to hear.",a:true}
    ]},
    {name:"بطل الإنجليزية",desc:"تحديات شاملة في الكلمات والجمل",qs:[
      {t:"mcq",q:"The opposite of big is …",o:["small","long","tall"],a:0},
      {t:"fill",q:"Complete: I can r _ n.",a:["U"]},
      {t:"order",q:"Make a sentence.",w:["playing","They","are"],a:["They","are","playing"]},
      {t:"mcq",q:"Choose the correct question.",o:["What is your name?","What your name?","What are name?"],a:0},
      {t:"tf",q:"A fish can swim.",a:true}
    ]}
  ],
  "الصف الثالث الإعدادي": [
    {name:"المبتدئ",desc:"مراجعة المفردات والتراكيب الأساسية",qs:[
      {t:"mcq",q:"Choose the correct form: She … to school every day.",o:["go","goes","going","gone"],a:1},
      {t:"fill",q:"Complete: If you study hard, you will … (success).",a:["succeed"]},
      {t:"order",q:"Arrange the words.",w:["English","been","I","studying","have"],a:["I","have","been","studying","English"]},
      {t:"tf",q:"The past simple of 'buy' is 'bought'.",a:true},
      {t:"mcq",q:"The opposite of 'generous' is …",o:["kind","selfish","helpful","polite"],a:1}
    ]},
    {name:"المستكشف",desc:"الأزمنة والروابط والمفردات",qs:[
      {t:"mcq",q:"While I … TV, the phone rang.",o:["watch","watched","was watching","am watching"],a:2},
      {t:"fill",q:"Use the correct form: They have lived here … 2020.",a:["since"]},
      {t:"order",q:"Arrange the words.",w:["because","stayed","ill","was","I","home"],a:["I","stayed","home","because","I","was","ill"]},
      {t:"tf",q:"'Although' can introduce a contrast.",a:true},
      {t:"mcq",q:"A person who designs buildings is an …",o:["architect","artist","accountant","engineer"],a:0}
    ]},
    {name:"المتميز",desc:"تطبيق القواعد والتحويل والترجمة",qs:[
      {t:"mcq",q:"The report … yesterday.",o:["writes","wrote","was written","is writing"],a:2},
      {t:"fill",q:"Change to a noun: The adjective 'happy' → …",a:["happiness"]},
      {t:"order",q:"Arrange the words.",w:["if","would","I","travel","could","I"],a:["If","I","could","travel","I","would"]},
      {t:"tf",q:"We use 'for' with a period of time.",a:true},
      {t:"mcq",q:"Choose the correct indirect question.",o:["Do you know where does he live?","Do you know where he lives?","Do you know where lives he?","Do you know where is he live?"],a:1}
    ]},
    {name:"المحترف",desc:"فهم المقروء والتراكيب المتقدمة",qs:[
      {t:"mcq",q:"Despite … tired, she finished the project.",o:["be","being","was","to be"],a:1},
      {t:"fill",q:"Complete with a suitable relative pronoun: The man … helped me was kind.",a:["who","that"]},
      {t:"order",q:"Arrange the words.",w:["had","the","left","train","before","we","arrived"],a:["The","train","had","left","before","we","arrived"]},
      {t:"tf",q:"'Unless' means 'if ... not'.",a:true},
      {t:"mcq",q:"The word 'essential' is closest in meaning to …",o:["unnecessary","important","ordinary","dangerous"],a:1}
    ]},
    {name:"بطل الإنجليزية",desc:"تحدي نهائي يجمع المهارات",qs:[
      {t:"mcq",q:"If I had known about the meeting, I … earlier.",o:["would come","would have come","will come","came"],a:1},
      {t:"fill",q:"Rewrite using 'too': The box is so heavy that I can't lift it. → The box is … heavy for me to lift.",a:["too"]},
      {t:"order",q:"Arrange the words.",w:["the","although","continued","difficult","task","was","they"],a:["Although","the","task","was","difficult","they","continued"]},
      {t:"tf",q:"A conclusion should summarize the main point of a piece of writing.",a:true},
      {t:"mcq",q:"Choose the sentence with correct punctuation.",o:["However I was late, I joined the lesson.","However, I was late; I joined the lesson.","However I was late; I joined the lesson.","However; I was late, I joined the lesson."],a:1}
    ]}
  ]
};

(function(){
'use strict';
const cfg={apiKey:"AIzaSyA3EUyPGWQXi3yEV50QYYCtCASKV-MEE5I",authDomain:"ahmed-elsayed-bf13d.firebaseapp.com",projectId:"ahmed-elsayed-bf13d",storageBucket:"ahmed-elsayed-bf13d.firebasestorage.app",messagingSenderId:"66067955169",appId:"1:66067955169:web:28330bd439b6fd4c73e6a0"};
const names=["المبتدئ","المستكشف","المتميز","المحترف","بطل الإنجليزية"];
let student=null,stage=0,index=0,answers=[],correct=0,selected=null;
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function key(){return 'champions-progress-v1-'+student.id}
function progress(){try{return JSON.parse(localStorage.getItem(key()))||{completed:[],points:0}}catch{return {completed:[],points:0}}}
function save(p){localStorage.setItem(key(),JSON.stringify(p))}
function normalize(s){return String(s||'').trim().toLowerCase().replace(/[أإآ]/g,'ا').replace(/[ًٌٍَُِّْ]/g,'').replace(/\s+/g,' ')}
async function login(){
 const phone=$('champPhone').value.trim();$('champMsg').textContent='';
 if(!phone){$('champMsg').textContent='اكتب رقم الموبايل أولاً.';return}
 $('champLogin').disabled=true;$('champMsg').textContent='جارٍ التحقق من بياناتك...';
 try{
  const {initializeApp}=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
  const {getFirestore,collection,getDocs,query,where}=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
  const app=initializeApp(cfg,'championsChallenge');const db=getFirestore(app);
  const snap=await getDocs(query(collection(db,'students'),where('phone','==',phone)));
  if(snap.empty)throw new Error('هذا الرقم غير مسجل في المنصة.');
  const d=snap.docs[0],data=d.data();
  if(data.status==='pending')throw new Error('حسابك في انتظار موافقة المدرس.');
  if(data.status==='blocked')throw new Error('حسابك غير مفعل حاليًا. تواصل مع المدرس.');
  if(!window.CHAMPIONS_BANK[data.grade])throw new Error('التحدي التجريبي غير مجهز بعد لصفك الدراسي. سنضيفه قريبًا.');
  student={id:d.id,name:data.name||'بطلنا',grade:data.grade};
  $('loginBox').classList.add('champ-hidden');$('challengeArea').classList.remove('champ-hidden');
  $('champWelcome').textContent='أهلاً يا '+student.name+' ⭐';$('champGrade').textContent=student.grade;
  renderLevels();
 }catch(e){$('champMsg').textContent=e.message||'تعذر التحقق. حاول مرة أخرى.'}
 finally{$('champLogin').disabled=false}
}
function renderLevels(){
 const p=progress(),bank=window.CHAMPIONS_BANK[student.grade];
 $('champRank').textContent='نقاطك: '+p.points;
 $('champProgressText').textContent=p.completed.length+' من 5 مستويات';
 $('champProgressBar').style.width=(p.completed.length*20)+'%';
 $('levelsList').innerHTML=bank.map((lv,i)=>{
 const done=p.completed.includes(i),open=i===0||p.completed.includes(i-1);
 return '<div class="champ-card champ-level"><div class="champ-num">'+(done?'✓':i+1)+'</div><div style="flex:1"><b>'+esc(lv.name)+'</b><div class="champ-muted">'+esc(lv.desc)+'</div></div><button class="champ-btn" style="width:auto;padding:10px 14px" '+(!open||done?'disabled':'')+' data-stage="'+i+'">'+(done?'مكتمل ⭐⭐⭐':open?'ابدأ':'مغلق 🔒')+'</button></div>'
 }).join('');
 $('levelsList').querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>startStage(Number(b.dataset.stage))));
}
function startStage(n){stage=n;index=0;answers=[];correct=0;$('finishBox').classList.add('champ-hidden');$('quizBox').classList.remove('champ-hidden');$('levelsList').classList.add('champ-hidden');showQuestion()}
function showQuestion(){
 const q=window.CHAMPIONS_BANK[student.grade][stage].qs[index];selected=null;
 $('quizLevel').textContent=names[stage];$('quizCount').textContent='السؤال '+(index+1)+' من '+window.CHAMPIONS_BANK[student.grade][stage].qs.length;
 $('quizProgress').style.width=(index/window.CHAMPIONS_BANK[student.grade][stage].qs.length*100)+'%';
 $('questionText').textContent=q.q;$('answerFeedback').textContent='';$('nextQuestion').classList.add('champ-hidden');$('checkAnswer').classList.remove('champ-hidden');
 const box=$('questionInput');
 if(q.t==='mcq'){box.innerHTML=q.o.map((o,i)=>'<button type="button" class="champ-opt" data-choice="'+i+'">'+esc(o)+'</button>').join('');box.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{box.querySelectorAll('.champ-opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selected=Number(b.dataset.choice)}))}
 else if(q.t==='fill'){box.innerHTML='<input class="champ-input" id="writtenAnswer" autocomplete="off" placeholder="اكتب إجابتك هنا">';}
 else if(q.t==='order'){box.innerHTML='<p class="champ-muted">اكتب الكلمات بالترتيب الصحيح، وافصل بينها بمسافة:</p><div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">'+q.w.map(w=>'<span class="champ-opt" style="width:auto;display:inline-block;cursor:default">'+esc(w)+'</span>').join('')+'</div><input class="champ-input" id="writtenAnswer" placeholder="اكتب الجملة كاملة">'}
 else if(q.t==='tf'){box.innerHTML='<button class="champ-opt" data-bool="true">صح</button><button class="champ-opt" data-bool="false">خطأ</button>';box.querySelectorAll('[data-bool]').forEach(b=>b.addEventListener('click',()=>{box.querySelectorAll('.champ-opt').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selected=b.dataset.bool==='true'}))}
}
function check(){
 const q=window.CHAMPIONS_BANK[student.grade][stage].qs[index];let ok=false;
 if(q.t==='mcq')ok=selected===q.a;
 else if(q.t==='tf')ok=selected===q.a;
 else {const v=normalize($('writtenAnswer')?.value);ok=q.t==='order'?v===normalize(q.a.join(' ')):q.a.some(a=>normalize(a)===v)}
 answers.push(ok);if(ok)correct++;
 $('answerFeedback').textContent=ok?'⭐ إجابة صحيحة! أحسنت.':'ليست صحيحة هذه المرة. الإجابة الصحيحة: '+(q.t==='mcq'?q.o[q.a]:q.t==='tf'?(q.a?'صح':'خطأ'):q.t==='order'?q.a.join(' '):q.a[0]);
 $('answerFeedback').style.color=ok?'#16a34a':'#dc2626';
 $('checkAnswer').classList.add('champ-hidden');$('nextQuestion').classList.remove('champ-hidden');
}
function next(){
 index++;const total=window.CHAMPIONS_BANK[student.grade][stage].qs.length;
 if(index<total){showQuestion();return}
 $('quizBox').classList.add('champ-hidden');$('finishBox').classList.remove('champ-hidden');
 const passed=correct>=Math.ceil(total*.8),p=progress();
 if(passed&&!p.completed.includes(stage)){p.completed.push(stage);p.completed.sort();p.points+=stage===4?100:50;save(p)}
 $('finishTitle').textContent=passed?(stage===4?'أصبحت بطل الإنجليزية! 🏆':'أحسنت يا بطل! ⭐⭐⭐'):'محاولة جيدة! يمكنك المحاولة مرة أخرى.';
 $('finishMessage').textContent='إجابات صحيحة: '+correct+' من '+total+'. '+(passed?'تم اجتياز المستوى وفتح المستوى التالي.':'تحتاج إلى 80% على الأقل لاجتياز المستوى.');
 if(passed)speak(stage===4?'You are an English Champion!':'Excellent! Well done, Champion!');
}
function speak(text){if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.85;window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}}
$('champLogin').addEventListener('click',login);$('champPhone').addEventListener('keydown',e=>{if(e.key==='Enter')login()});
$('checkAnswer').addEventListener('click',check);$('nextQuestion').addEventListener('click',next);
$('finishContinue').addEventListener('click',()=>{$('finishBox').classList.add('champ-hidden');$('levelsList').classList.remove('champ-hidden');renderLevels()});
})();
