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


  const vocabularyBanks = {
    "Life in a Digital World":[["application","تطبيق"],["device","جهاز"],["digital","رقمي"],["online games","ألعاب عبر الإنترنت"],["smartboard","سبورة ذكية"],["night mode","الوضع الليلي"],["search","يبحث"],["habit","عادة"],["protect","يحمي"],["technology","تكنولوجيا"]],
    "Learning to Learn":[["visual learner","متعلم بصري"],["learning style","أسلوب التعلم"],["organize","ينظم"],["notes","ملاحظات"],["distraction","مشتت"],["study plan","خطة مذاكرة"],["learning together","التعلم معًا"],["quiet","هادئ"],["practice","يتدرب"],["improve","يحسن"]],
    "Role Models":[["role model","قدوة"],["hero","بطل"],["community","مجتمع"],["science","علم"],["research","بحث"],["achievement","إنجاز"],["responsible","مسؤول"],["inspire","يلهم"],["helpful","متعاون"],["success","نجاح"]],
    "Smart Choices":[["choice","اختيار"],["consequence","نتيجة"],["advice","نصيحة"],["positive","إيجابي"],["decision","قرار"],["careful","حريص"],["responsible","مسؤول"],["effect","تأثير"],["should","ينبغي"],["result","نتيجة"]],
    "Future Dreams":[["ambition","طموح"],["career","مهنة"],["profession","وظيفة"],["talent","موهبة"],["ability","قدرة"],["future","مستقبل"],["achieve","يحقق"],["university","جامعة"],["training","تدريب"],["plan","خطة"]],
    "Global Citizens":[["global citizen","مواطن عالمي"],["environment","بيئة"],["pollution","تلوث"],["ocean","محيط"],["volunteer","متطوع"],["protect","يحمي"],["recycle","يعيد التدوير"],["responsibility","مسؤولية"],["clean energy","طاقة نظيفة"],["community","مجتمع"]],
    "Gen Alpha":[["generation","جيل"],["digital native","مولود رقميًا"],["balance","توازن"],["creator","صانع محتوى"],["viewer","مشاهد"],["advice","نصيحة"],["screen time","وقت الشاشة"],["online","متصل بالإنترنت"],["habit","عادة"],["communicate","يتواصل"]],
    "My Digital Footprint":[["footprint","أثر"],["private","خاص"],["password","كلمة مرور"],["data","بيانات"],["secure","آمن"],["website","موقع إلكتروني"],["trusted","موثوق"],["share","يشارك"],["protect","يحمي"],["message","رسالة"]],
    "Facing Challenges":[["challenge","تحدٍ"],["determination","إصرار"],["obstacle","عقبة"],["proud","فخور"],["brave","شجاع"],["courage","شجاعة"],["solve","يحل"],["progress","تقدم"],["effort","مجهود"],["succeed","ينجح"]],
    "Art and Expressions":[["sculpture","تمثال"],["imagination","خيال"],["valuable","قيّم"],["innovative","مبتكر"],["performance","عرض"],["audience","جمهور"],["create","يبدع"],["artist","فنان"],["expression","تعبير"],["design","تصميم"]],
    "Around the World":[["continent","قارة"],["landmark","معلم"],["souvenir","تذكار"],["tradition","تقليد"],["capital","عاصمة"],["community","مجتمع"],["ancient","قديم"],["culture","ثقافة"],["impressive","مبهر"],["visit","يزور"]],
    "Young Innovators":[["innovator","مبتكر"],["patience","صبر"],["achievement","إنجاز"],["inspire","يلهم"],["invent","يخترع"],["idea","فكرة"],["competition","مسابقة"],["scientist","عالم"],["create","ينشئ"],["improve","يطور"]],
    "Amazing Places in Egypt":[["souvenir","هدية تذكارية"],["furniture","أثاث"],["bracelet","سوار"],["necklace","قلادة"],["design","تصميم"],["coin","عملة معدنية"],["culture","ثقافة"],["museum","متحف"],["ancient site","موقع أثري"],["wooden gate","بوابة خشبية"]],
    "The Nile":[["river","نهر"],["flood","فيضان"],["soil","تربة"],["farmer","مزارع"],["wheat","قمح"],["vegetable","خضروات"],["provide","يوفر"],["animal","حيوان"],["boat","قارب"],["travel","يسافر"]],
    "The Rose and the Cactus":[["rose","وردة"],["cactus","صبار"],["bird","طائر"],["peck","ينقر"],["gently","برفق"],["water","ماء"],["inside","بالداخل"],["fly","يطير"],["refreshed","منتعش"],["thirsty","عطشان"]],
    "Oil and Minerals":[["oil","بترول"],["mineral","معدن"],["rock","صخر"],["metal","فلز"],["ground","أرض"],["resource","مورد"],["deep","عميق"],["black liquid","سائل أسود"],["Western Desert","الصحراء الغربية"],["Sinai","سيناء"]],
    "Clean Energy":[["solar energy","طاقة شمسية"],["sunny","مشمس"],["solar station","محطة طاقة شمسية"],["electricity","كهرباء"],["clean energy","طاقة نظيفة"],["pollution","تلوث"],["environment","بيئة"],["protect","يحمي"],["Benban Solar Park","مجمع بنبان للطاقة الشمسية"],["Aswan","أسوان"]]
  };
  const primary6Units = [
    {title:"Amazing Places in Egypt",groups:[
      {label:"الدرس 1",qs:[["مفردات","People buy souvenirs to … a visit.","remember",["remember","forget","cancel","damage"]],["مفردات","Khan El Khalili is a famous … in Cairo.","market",["market","planet","factory","river"]],["قواعد","Maged … photos yesterday.","took",["take","takes","took","taking"]]]},
      {label:"الدرس 2",qs:[["مفردات","A museum shows things from …","the past",["the past","the future only","the sea","space"]],["قواعد","His sister … a colorful necklace.","chose",["choose","chooses","chose","choosing"]],["فهم","The passage describes a day in …","Old Cairo",["Old Cairo","London","Aswan","Alexandria"]]]},
      {label:"الدرس 3",qs:[["مفردات","A wooden gate is made of …","wood",["glass","wood","paper","cloth"]],["قواعد","They … through the old streets.","walked",["walk","walks","walked","walking"]],["فهم","The family enjoyed learning about Egyptian …","culture",["culture","weather","sports","computers"]]]}
    ]},
    {title:"The Nile",groups:[
      {label:"الدرس 1",qs:[["مفردات","The Nile is an important …","river",["river","mountain","desert","island"]],["قواعد","Farmers … wheat in the past.","grew",["grow","grows","grew","growing"]],["فهم","The Nile brought good soil for …","farming",["farming","driving","painting","flying"]]]},
      {label:"الدرس 2",qs:[["مفردات","The word 'flooded' means …","covered with water",["covered with water","became dry","became cold","stopped moving"]],["قواعد","People … boats on the river.","used",["use","uses","used","using"]],["فهم","People and animals need the Nile for …","water",["water","clothes","books","phones"]]]},
      {label:"الدرس 3",qs:[["مفردات","Vegetables are a kind of …","food",["food","tool","building","transport"]],["قواعد","The river … people in many ways.","helps",["help","helps","helped yesterday","helping"]],["فهم","The Nile has been important to Egyptians for …","a long time",["a long time","one day","one week","one hour"]]]}
    ]},
    {title:"The Rose and the Cactus",groups:[
      {label:"الدرس 1",qs:[["مفردات","A cactus can store …","water",["water","sand","wood","oil"]],["قواعد","The bird … some water.","drank",["drink","drinks","drank","drinking"]],["فهم","The bird felt … after drinking.","refreshed",["tired","refreshed","angry","afraid"]]]},
      {label:"الدرس 2",qs:[["مفردات","Gently means …","softly",["loudly","softly","quickly","angrily"]],["قواعد","The bird … away.","flew",["fly","flies","flew","flying"]],["فهم","The cactus helped the bird by giving it …","water",["water","food","a nest","a toy"]]]},
      {label:"الدرس 3",qs:[["مفردات","A rose is a kind of …","flower",["tree","flower","bird","river"]],["قواعد","The bird … happy.","was",["were","was","are","be"]],["فهم","The passage teaches us about kindness and …","help",["help","noise","speed","money"]]]}
    ]},
    {title:"Oil and Minerals",groups:[
      {label:"الدرس 1",qs:[["مفردات","Oil is found deep … the ground.","under",["over","under","beside","between"]],["قواعد","Egypt … oil to other countries.","sells",["sell","sells","selling","sold tomorrow"]],["فهم","Oil is described as a … liquid.","black",["blue","black","white","green"]]]},
      {label:"الدرس 2",qs:[["مفردات","Minerals are found in …","rocks",["clouds","rocks","rivers only","trees"]],["قواعد","Workers … minerals from the ground.","take",["takes","take","taking","took tomorrow"]],["فهم","The passage mentions the Western Desert and …","Sinai",["Sinai","Cairo","Alexandria","Luxor"]]]},
      {label:"الدرس 3",qs:[["مفردات","A natural resource comes from …","nature",["nature","a computer","a classroom","a shop"]],["قواعد","Egypt … many natural resources.","has",["have","has","having","had tomorrow"]],["فهم","Oil is important because it is a natural …","resource",["resource","holiday","sport","language"]]]}
    ]},
    {title:"Clean Energy",groups:[
      {label:"الدرس 1",qs:[["مفردات","Solar energy comes from the …","sun",["moon","sun","wind only","sea"]],["قواعد","The sun … energy.","provides",["provide","provides","providing","provided tomorrow"]],["فهم","Benban Solar Park is near …","Aswan",["Aswan","Cairo","Giza","Tanta"]]]},
      {label:"الدرس 2",qs:[["مفردات","A solar station makes …","electricity",["electricity","plastic","paper","clothes"]],["قواعد","Egypt … a sunny country.","is",["am","is","are","be"]],["فهم","Solar energy is a kind of … energy.","clean",["dirty","clean","dangerous","old"]]]},
      {label:"الدرس 3",qs:[["مفردات","We should save energy to protect the …","environment",["environment","screen","uniform","keyboard"]],["قواعد","People … use clean energy.","should",["should","shouldn't","was","did"]],["فهم","Clean energy can help reduce …","pollution",["pollution","homework","traffic lights","noise only"]]]}
    ]}
  ];

  let activeUnits = units;
  let activeStory = story;
  let activeGrade = "الصف الثاني الإعدادي";
  let activePrimary6 = false;
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
    const unit=$("iqUnit").value, sel=$("iqGroup");
    if (unit==="story1"||unit==="story2"||unit==="term") {
      sel.innerHTML=unit==="term"?'<option value="term">امتحان شامل للترم</option>':'<option value="'+unit+'">تدريب '+(unit==="story1"?"القصة الأولى":"القصة الثانية")+'</option>';
      sel.disabled=true;
    } else {
      sel.disabled=false;
      sel.innerHTML=activeUnits[Number(unit)].groups.map((g,i)=>'<option value="'+i+'">'+g.label+'</option>').join('')+'<option value="exam">امتحان الوحدة</option>';
    }
    $("iqPanel").innerHTML='<p class="iq-hint">اختر الجزء المطلوب ثم اضغط «ابدأ التدريب».</p>';
    $("iqStart").disabled=false;
  }

  function hintFor(answer) {
    const s=String(answer||"").trim();
    const irregular={"are making":"make","is doing":"do","are visiting":"visit","are studying":"study","is making":"make","was studying":"study","were playing":"play","will get":"get","will join":"join","might create":"create","took":"take","chose":"choose","grew":"grow","drank":"drink","flew":"fly","was":"be","were":"be","sold":"sell","bought":"buy","made":"make","went":"go","did":"do","had":"have","saw":"see"};
    if(irregular[s.toLowerCase()])return irregular[s.toLowerCase()];
    if(/ies$/i.test(s))return s.replace(/ies$/i,"y");
    if(/(ches|shes|xes|zes|sses)$/i.test(s))return s.replace(/es$/i,"");
    if(/s$/i.test(s)&&!/ss$/i.test(s))return s.slice(0,-1);
    return s;
  }
  function paragraphTopicFor(unit) {
    const topics = {
      "Gen Alpha":"How young people can use technology in a balanced way",
      "My Digital Footprint":"How to stay safe and responsible online",
      "Facing Challenges":"The importance of determination when facing challenges",
      "Art and Expressions":"How art helps people express their ideas",
      "Around the World":"A famous place you would like to visit and why",
      "Young Innovators":"How young people can use new ideas to solve problems",
      "Life in a Digital World":"How digital devices help us in everyday life",
      "Learning to Learn":"The best way to organize your study time",
      "Role Models":"A person you admire and what you learn from them",
      "Smart Choices":"Why we should think carefully before making choices",
      "Future Dreams":"Your future ambition and how you plan to achieve it",
      "Global Citizens":"How students can help protect the environment",
      "Amazing Places in Egypt":"A famous place in Egypt that you would like to visit",
      "The Nile":"Why the Nile is important to life in Egypt",
      "The Rose and the Cactus":"The importance of kindness and helping others",
      "Oil and Minerals":"Why natural resources are important",
      "Clean Energy":"How clean energy can help protect the environment"
    };
    return topics[unit.title] || ("An important idea from "+unit.title);
  }
  function lessonQuestions(unit, group) {
    const source=group.qs||[], out=[];
    source.slice(0,3).forEach(q=>out.push({type:"mcq",category:q[0],text:q[1],answer:q[2],options:q[3]||[]}));
    const vocab=(unit.vocab||vocabularyBanks[unit.title]||[]).slice(0,10);
    vocab.forEach(v=>{
      const distractors=[...new Set(vocab.map(item=>item[1]).filter(value=>value!==v[1]))];
      const fallback=["معلومة","نشاط","مكان","شخص","طريقة"];
      while(distractors.length<3) distractors.push(fallback[distractors.length%fallback.length]);
      const options=[v[1],...distractors.slice(0,3)];
      for(let j=options.length-1;j>0;j--){const k=Math.floor(Math.random()*(j+1));[options[j],options[k]]=[options[k],options[j]];}
      out.push({type:"mcq",category:"معاني الكلمات",text:"Choose the correct Arabic meaning of: "+v[0],answer:v[1],options,maxMarks:1});
    });
    const topic=unit.paragraphTopic || paragraphTopicFor(unit);
    out.push({type:"paragraph",category:"Paragraph",topic,text:'Write a paragraph of 40–60 words about: "'+topic+'".',answer:"",minWords:40,maxWords:60,maxMarks:5});
    return out;
  }
  function unitExamQuestions(unit) {
    const source=unit.groups.flatMap(g=>g.qs||[]), out=[];
    source.slice(0,5).forEach(q=>out.push({type:"mcq",category:q[0],text:q[1],answer:q[2],options:q[3]||[]}));
    const grammar=source.filter(q=>q[0]==="قواعد");
    (grammar.length?grammar:source).slice(0,3).forEach(q=>{
      const wrong=(q[3]||[]).find(x=>x!==q[2])||"wrong";
      const incorrectSentence=String(q[1]).replace(/…|\.\.\./g,wrong);
      const correctSentence=String(q[1]).replace(/…|\.\.\./g,q[2]);
      out.push({type:"correct",category:"Correct the mistake",text:"Correct the mistake: "+incorrectSentence,answer:correctSentence});
    });
    const topic=unit.paragraphTopic || paragraphTopicFor(unit);
    out.push({type:"paragraph",category:"Paragraph",topic,text:'Write a paragraph of 60–80 words about: "'+topic+'".',answer:"",minWords:60,maxWords:80,maxMarks:5});
    return out;
  }
  function storyChapterQuestions(items, chapterTitle) {
    const out=[],pool=items.length?items:[activeStory[0]];
    for(let i=0;i<3;i++){
      const q=pool[i%pool.length], statementAnswer=i===1?((q[3]||[]).find(x=>x!==q[2])||q[2]):q[2];
      out.push({type:"truefalse",category:chapterTitle,text:'True or False: According to the story, the answer to "'+q[1]+'" is "'+statementAnswer+'".',answer:statementAnswer===q[2]});
    }
    for(let i=0;i<2;i++){
      const q=pool[i%pool.length];
      out.push({type:"essay",category:chapterTitle,text:"Answer in a short sentence: "+q[1],answer:[q[2]],keywords:String(q[2]).toLowerCase().split(/\s+/),maxMarks:2});
    }
    return out;
  }
  function startQuiz() {
    const u=$("iqUnit").value,g=$("iqGroup").value;
    let title="",questions=[];
    if(u==="story1"||u==="story2"){
      const storyItems=u==="story2"?activeStory.slice(5,10):(activeGrade==="الصف الثاني الإعدادي"?activeStory.slice(0,5):activeStory);
      title=u==="story2"?"القصة الثانية":"القصة الأولى";
      const chunks=activeGrade==="الصف الثاني الإعدادي"?[storyItems.slice(0,2),storyItems.slice(2,4),storyItems.slice(4)]:[storyItems.slice(0,3),storyItems.slice(3,6),storyItems.slice(6)];
      chunks.forEach((items,i)=>questions.push(...storyChapterQuestions(items,"الفصل "+(i+1))));
    }else if(u==="term"){
      title="امتحان شامل للترم";
      const all=activeUnits.flatMap(x=>x.groups.flatMap(y=>y.qs||[]));
      const paragraphTopic=paragraphTopicFor(activeUnits[Math.floor(Math.random()*activeUnits.length)]);
      questions=unitExamQuestions({title:"امتحان الترم",groups:[{qs:all}],paragraphTopic});
    }else{
      const unit=activeUnits[Number(u)];
      if(!unit)return;
      title=unit.title+" - "+(g==="exam"?"امتحان الوحدة":unit.groups[Number(g)].label);
      questions=g==="exam"?unitExamQuestions(unit):lessonQuestions(unit,unit.groups[Number(g)]);
    }
    current={title,qs:questions};submitted=false;
    $("iqPanel").innerHTML='<h4>'+esc(title)+'</h4><p class="iq-hint">عدد الأسئلة: '+current.qs.length+' — أجب ثم اضغط «صحّح إجاباتي».</p>'+
      current.qs.map((q,i)=>{
        let body="";
        if(q.passage)body+='<div class="iq-passage" style="white-space:pre-line;padding:12px;margin:10px 0;border-radius:10px;background:#172554;color:#fff">'+esc(q.passage)+'</div>';
        if(q.type==="mcq"||q.type==="passage-mcq")body+='<div class="iq-options">'+(q.options||[]).map((op,j)=>'<label><input type="radio" name="iq_'+i+'" value="'+j+'"><span>'+esc(op)+'</span></label>').join('')+'</div>';
        else if(q.type==="truefalse")body+='<div class="iq-options"><label><input type="radio" name="iq_'+i+'" value="true"><span>True</span></label><label><input type="radio" name="iq_'+i+'" value="false"><span>False</span></label></div>';
        else if(q.type==="paragraph")body+='<textarea class="iq-free-answer" id="iq_answer_'+i+'" rows="6" maxlength="1200" placeholder="Write your paragraph here..."></textarea><small>التصحيح آلي تقديري، وليس بديلًا عن مراجعة المدرس.</small>';
        else body+='<input class="iq-free-answer" id="iq_answer_'+i+'" type="text" placeholder="اكتب إجابتك هنا">';
        const labels={mcq:"Choose","passage-mcq":"Reading – Choose","passage-short":"Reading – Answer",fill:"Complete",correct:"Correct the mistake",truefalse:"True or False",short:"Short answer",essay:"Written answer",paragraph:"Writing"};
        return '<article class="iq-question"><div class="iq-question-title"><span>'+(i+1)+'.</span> '+esc(q.text)+'</div><small class="iq-type">'+esc(q.category||"سؤال")+' — '+(labels[q.type]||"")+'</small>'+body+'</article>';
      }).join('');
    $("iqSubmit").hidden=false;$("iqRetry").hidden=true;$("iqResult").innerHTML="";
  }

  function normalizeAnswer(value) {
    return String(value||"").toLowerCase().trim().normalize("NFD").replace(/[\u064B-\u065F\u0670ـ]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/[.,!?;:'"()]/g,"").replace(/\s+/g," ");
  }

  function gradeParagraph(value, topic, minWords, maxWords) {
    const text = String(value || "").trim();
    const words = text.split(/\s+/).filter(Boolean);
    if (!words.length) return {score:0, feedback:"لم تكتب فقرة."};
    const lower = text.toLowerCase();
    const sentences = text.split(/[.!?]+/).filter(x=>x.trim()).length;
    const topicWords = String(topic || "").toLowerCase().split(/\s+/).filter(x=>x.length > 3);
    const topicHits = topicWords.filter(x=>lower.includes(x)).length;
    const min = Number.isFinite(minWords) ? minWords : 40;
    const max = Number.isFinite(maxWords) ? maxWords : 60;
    let score = 0;
    if (words.length >= min && words.length <= max) score++;
    if (topicHits > 0 || /\b(technology|students|people|learning|school|world|digital|generation|environment|energy|river|friends|art)\b/i.test(lower)) score++;
    if (sentences >= 3) score++;
    if (/\b(and|but|because|also|so|first|finally|however)\b/i.test(lower)) score++;
    if (/\b(is|are|was|were|have|has|can|should|use|uses|helps|help|do|does|make|makes)\b/i.test(lower) && /[.!?]/.test(text)) score++;
    const lengthNote = words.length < min ? "أقل من العدد المطلوب" : words.length > max ? "أكثر من العدد المطلوب" : "داخل العدد المطلوب";
    const notes = ["عدد الكلمات: "+words.length+" ("+lengthNote+")","عدد الجمل: "+sentences,"كلمات مرتبطة بالموضوع: "+(topicHits ? "موجودة" : "لم تظهر بوضوح")];
    return {score:Math.min(5,score), feedback:"التصحيح الآلي التقديري من 5: "+notes.join(" — ")+". التقييم يفحص مؤشرات عامة فقط، ولا يحكم بدقة على صحة المعنى أو القواعد والإملاء؛ يلزم مراجعة المدرس للتصحيح الكامل."};
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
          const result = gradeParagraph(response, q.topic || current.title, q.minWords, q.maxWords);
          score += result.score;
          feedback.push((i+1)+". "+result.feedback+" ("+result.score+"/5)");
          ok = result.score >= 3;
        } else if (q.type === "essay") {
          const normalized=normalizeAnswer(response);
          const hits=(q.keywords||[]).filter(k=>k.length>2&&normalized.includes(normalizeAnswer(k))).length;
          const threshold=Math.max(1,Math.ceil((q.keywords||[]).length*0.45));
          const earned=hits>=threshold?q.maxMarks:(hits>0?1:0);
          score+=earned; ok=earned===q.maxMarks;
          feedback.push((i+1)+". تقييم إجابة مقالي: "+earned+"/"+q.maxMarks+" — راجع الإجابة مع المدرس.");
        } else if (q.type === "correct") {
          const normalized=normalizeAnswer(response);
          ok=accepted.some(a=>normalizeAnswer(a)===normalized);
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
      if (ok && q.type !== "paragraph" && q.type !== "essay") score += marks;
      if (q.type !== "paragraph" && q.type !== "essay") feedback.push((i+1)+". "+(ok ? "صحيح" : "الإجابة المقبولة: "+(Array.isArray(q.answer) ? q.answer.join(" / ") : q.answer)));
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
    if (student && ["الصف الأول الإعدادي","الصف الثاني الإعدادي","الصف السادس الابتدائي"].includes(student.grade)) {
      activeGrade = student.grade;
      activePrimary6 = student.grade === "الصف السادس الابتدائي";
      activeUnits = activePrimary6 ? primary6Units : (student.grade === "الصف الأول الإعدادي" ? prep1Units : units);
      activeStory = student.grade === "الصف الأول الإعدادي" ? prep1Story : story;
      $("iqUnavailable").hidden = true; $("iqControls").hidden = false;
      $("iqUnit").innerHTML = activeUnits.map((u,i)=>'<option value="'+i+'">الوحدة '+["الأولى","الثانية","الثالثة","الرابعة","الخامسة","السادسة"][i]+" — "+esc(u.title)+'</option>').join('') + (activePrimary6 ? "" : (activeGrade==="الصف الثاني الإعدادي" ? '<option value="story1">القصة الأولى</option><option value="story2">القصة الثانية</option>' : '<option value="story1">القصة</option>')) + '<option value="term">امتحان شامل للترم</option>';
      renderGroups();
    } else {
      $("iqControls").hidden = true; $("iqUnavailable").hidden = false;
      $("iqUnavailable").textContent = "الأسئلة التفاعلية ستظهر عند تجهيز بنك الأسئلة الخاص بصفك الدراسي.";
    }
  };
})();
