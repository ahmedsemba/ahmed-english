(function(){
  "use strict";
  if (window.__ahmedAssistantLoaded) return;
  window.__ahmedAssistantLoaded = true;
  const data = window.AHMED_ASSISTANT_DATA;
  if (!data || !document.body) return;
  const root = document.createElement("div");
  root.id = "ahmedAssistantRoot";
  root.innerHTML = '<section class="aa-panel" role="dialog" aria-label="مساعد Ahmed English" aria-modal="false"><header class="aa-head"><span aria-hidden="true" style="font-size:25px">🤖</span><div><strong>Ahmed English Assistant</strong><small>مساعد المنصة</small></div><button class="aa-close" type="button" aria-label="إغلاق">×</button></header><div class="aa-messages" aria-live="polite"></div><form class="aa-compose"><input class="aa-input" type="text" maxlength="300" placeholder="اكتب سؤالك هنا..." aria-label="اكتب سؤالك"><button class="aa-send" type="submit">إرسال</button></form><div class="aa-note">إجابات إرشادية محفوظة — لا تدخل بياناتك السرية هنا</div></section><button class="aa-launch" type="button" aria-label="افتح مساعد المنصة" aria-expanded="false">🤖</button>';
  document.body.appendChild(root);
  const panel=root.querySelector(".aa-panel"), launch=root.querySelector(".aa-launch"), close=root.querySelector(".aa-close"), messages=root.querySelector(".aa-messages"), form=root.querySelector("form"), input=root.querySelector("input");
  let role = "visitor";
  function addMessage(text, who, link, linkLabel){
    const item=document.createElement("div"); item.className="aa-msg "+(who==="user"?"aa-user":"aa-bot"); item.textContent=text;
    if(link){const a=document.createElement("a");a.className="aa-link";a.href=link;a.textContent=linkLabel||"افتح القسم";if(/^https:\/\//.test(link)){a.target="_blank";a.rel="noopener noreferrer";}item.appendChild(document.createElement("br"));item.appendChild(a);}
    messages.appendChild(item);messages.scrollTop=messages.scrollHeight;
  }
  function addChips(items){
    const wrap=document.createElement("div");wrap.className="aa-actions";
    items.forEach(entry=>{const b=document.createElement("button");b.type="button";b.className="aa-chip";b.textContent=entry.label;b.addEventListener("click",()=>{addMessage(entry.label,"user");if(entry.id){role=entry.id;showMenu();}else answerEntry(entry);});wrap.appendChild(b);});
    messages.appendChild(wrap);messages.scrollTop=messages.scrollHeight;
  }
  function answerEntry(entry){addMessage(entry.answer,"bot",entry.url,entry.link);if(!entry.url && role!=="teacher") addChips(data.menus[role]||data.menus.visitor);}
  function showMenu(){addMessage("اختار الموضوع اللي تحب أساعدك فيه:","bot");addChips(data.menus[role]||data.menus.visitor);}
  function normalize(s){return String(s||"").toLowerCase().replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/[ًٌٍَُِّْـ]/g,"").replace(/[^\u0600-\u06FFa-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
  function respond(q){
    const text=normalize(q);
    const found=data.keywords.find(rule=>(rule.role==="all"||rule.role===role)&&rule.terms.some(term=>text.includes(normalize(term))));
    if(found){answerEntry(found);return;}
    if(/^(اهلا|السلام عليكم|مرحبا|ازيك|hello|hi)$/.test(text)){addMessage("أهلاً بيك! يسعدني أساعدك. اختار من الأقسام دي:","bot");showMenu();return;}
    addMessage(data.fallback,"bot","https://wa.me/201116811324","تواصل مع المدرس عبر واتساب");
    addChips((data.menus[role]||data.menus.visitor).slice(0,4));
  }
  function open(){panel.classList.add("aa-open");launch.setAttribute("aria-expanded","true");if(!messages.dataset.started){messages.dataset.started="1";addMessage(data.welcome,"bot");addChips(data.roles.map(r=>({id:r.id,label:r.label})));}input.focus();}
  function shut(){panel.classList.remove("aa-open");launch.setAttribute("aria-expanded","false");launch.focus();}
  launch.addEventListener("click",()=>panel.classList.contains("aa-open")?shut():open());close.addEventListener("click",shut);
  form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();if(!q)return;addMessage(q,"user");input.value="";respond(q);});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&panel.classList.contains("aa-open"))shut();});
})();