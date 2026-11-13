(() => {
  'use strict';

  const passages = [
    {level:'A1', lines:['Mona has a small garden.','She waters the flowers every morning.','A yellow butterfly visits the garden.','Mona takes a photo of it.','She feels happy when she sees it.'], questions:[
      {q:'What does Mona have?',o:['A garden','A shop','A bicycle'],a:0},
      {q:'When does she water the flowers?',o:['At night','Every morning','On Friday only'],a:1},
      {q:'What visits the garden?',o:['A bird','A cat','A yellow butterfly'],a:2}]},
    {level:'A1', lines:['Omar gets up early on school days.','He eats eggs and bread for breakfast.','Then he walks to the bus stop.','His friend Ali waits there.','They go to school together.'], questions:[
      {q:'When does Omar get up?',o:['Early','Late','At midnight'],a:0},
      {q:'What does he eat?',o:['Rice and fish','Eggs and bread','Cake and ice cream'],a:1},
      {q:'Who waits at the bus stop?',o:['His teacher','His brother','His friend Ali'],a:2}]},
    {level:'A1', lines:['Sara loves reading stories.','She visits the library every Saturday.','She chooses a book about animals.','At home, she reads it to her little brother.','He asks many questions.'], questions:[
      {q:'Where does Sara go on Saturday?',o:['The library','The cinema','The market'],a:0},
      {q:'What is her book about?',o:['Space','Animals','Cooking'],a:1},
      {q:'Who listens to the story?',o:['Her father','Her friend','Her little brother'],a:2}]},
    {level:'A2', lines:['Last weekend, Karim visited his grandparents.','They live in a quiet village near the river.','His grandmother prepared his favourite meal.','After lunch, he helped his grandfather in the garden.','He returned home with lovely memories.'], questions:[
      {q:'Where do Karim’s grandparents live?',o:['In a quiet village','In a large city','Near the airport'],a:0},
      {q:'Who prepared the meal?',o:['His grandfather','His grandmother','Karim'],a:1},
      {q:'What did Karim do after lunch?',o:['Watched a film','Went shopping','Helped in the garden'],a:2}]},
    {level:'A2', lines:['Nour wanted to save money for a new bicycle.','She stopped buying snacks every day.','She also helped her aunt at the weekend.','After two months, she had enough money.','She bought the bicycle and felt proud.'], questions:[
      {q:'What did Nour want to buy?',o:['A bicycle','A computer','A camera'],a:0},
      {q:'How long did she save money?',o:['Two weeks','Two months','One year'],a:1},
      {q:'How did she feel after buying it?',o:['Angry','Worried','Proud'],a:2}]},
    {level:'A2', lines:['The school science club planned a clean-up day.','Students brought gloves and large bags.','They collected plastic bottles from the playground.','Their teacher explained why recycling matters.','Everyone agreed to keep the school clean.'], questions:[
      {q:'What did the club plan?',o:['A clean-up day','A sports match','A school trip'],a:0},
      {q:'What did students collect?',o:['Old books','Plastic bottles','Food'],a:1},
      {q:'What did everyone agree to do?',o:['Plant a forest','Paint the classrooms','Keep the school clean'],a:2}]},
    {level:'B1', lines:['When the town library extended its opening hours, more teenagers began visiting.','Some came to study, while others joined the weekly reading group.','The librarian noticed that students were sharing useful book recommendations.','She created a quiet study area and a small space for group discussions.','The library gradually became an important meeting place for young people.'], questions:[
      {q:'What happened after the library extended its hours?',o:['More teenagers visited','It moved to another town','It stopped lending books'],a:0},
      {q:'What did the librarian notice?',o:['Students disliked reading','Students shared book recommendations','Nobody used the study area'],a:1},
      {q:'What did the library become?',o:['A sports centre','A shopping area','An important meeting place'],a:2}]},
    {level:'B1', lines:['Mariam used to feel nervous whenever she had to speak in front of her class.','Her teacher suggested that she practise with a small group first.','She prepared short notes and recorded herself speaking at home.','Although she still felt a little anxious, her confidence improved.','By the end of the term, she was able to give a clear presentation.'], questions:[
      {q:'What made Mariam nervous?',o:['Speaking in front of the class','Reading silently','Doing sports'],a:0},
      {q:'How did she practise at home?',o:['She watched cartoons','She recorded herself','She avoided speaking'],a:1},
      {q:'What improved by the end of the term?',o:['Her handwriting','Her running speed','Her confidence'],a:2}]},
    {level:'B1', lines:['A local shop decided to reduce the amount of plastic it used.','Customers were encouraged to bring reusable bags.','The shop also replaced some plastic packaging with paper alternatives.','At first, a few shoppers forgot to bring their bags.','After several weeks, the new habit became more common.'], questions:[
      {q:'What did the shop want to reduce?',o:['Plastic use','Its opening hours','The number of customers'],a:0},
      {q:'What were customers encouraged to bring?',o:['Glass bottles','Reusable bags','Paper books'],a:1},
      {q:'What happened after several weeks?',o:['The shop closed','Customers stopped shopping','The new habit became common'],a:2}]},
    {level:'B2', lines:['Although online learning offers flexibility, it requires students to manage their time carefully.','Without a clear routine, assignments can easily be postponed.','Successful learners often divide large tasks into smaller, manageable steps.','They also limit distractions and review their progress regularly.','These habits make independent learning more effective and less stressful.'], questions:[
      {q:'What does online learning require?',o:['Careful time management','No planning at all','Fewer learning materials'],a:0},
      {q:'How do successful learners handle large tasks?',o:['They ignore them','They divide them into smaller steps','They finish them without breaks'],a:1},
      {q:'What is the main idea of the passage?',o:['Online learning is always easy','Technology replaces teachers','Good habits improve independent learning'],a:2}]},
    {level:'B2', lines:['Community gardens can improve more than the appearance of a neighbourhood.','They provide residents with opportunities to grow fresh food and exchange knowledge.','Working together can also strengthen relationships between people of different ages.','However, these projects need regular care and fair organisation to succeed.','When residents share responsibility, the benefits can last for years.'], questions:[
      {q:'What can community gardens provide?',o:['Fresh food and shared knowledge','Free transport','New office buildings'],a:0},
      {q:'What can working together strengthen?',o:['Traffic systems','Relationships between residents','Internet connections'],a:1},
      {q:'What helps these projects succeed?',o:['Keeping them private','Avoiding organisation','Shared responsibility'],a:2}]},
    {level:'B2', lines:['Many people assume that creativity appears only during moments of inspiration.','In reality, creative work often develops through repeated practice and careful observation.','Keeping a notebook of questions and ideas can help people notice unexpected connections.','Feedback from others may reveal weaknesses that are difficult to recognise alone.','Creativity, therefore, is not simply a talent but also a skill that can be developed.'], questions:[
      {q:'What does the passage say about creative work?',o:['It often grows through practice','It never needs effort','It depends only on luck'],a:0},
      {q:'How can a notebook help?',o:['It replaces feedback','It records questions and ideas','It prevents new ideas'],a:1},
      {q:'What is the writer’s conclusion?',o:['Creativity cannot be learned','Only artists are creative','Creativity can be developed'],a:2}]},
    {level:'A1', lines:['Hana has a red school bag.','She puts her books inside it.','Her pencil case is blue.','She takes the bus to school.','Her first lesson is English.'], questions:[
      {q:'What colour is Hana’s bag?',o:['Red','Blue','Green'],a:0},
      {q:'Where does she put her books?',o:['On the bus','Inside her bag','Under the desk'],a:1},
      {q:'What is her first lesson?',o:['Maths','Science','English'],a:2}]},
    {level:'A2', lines:['The weather was sunny, so we decided to have a picnic.','My sister prepared sandwiches and fresh juice.','We found a quiet place under a large tree.','After eating, we played a word game.','We went home before sunset.'], questions:[
      {q:'Why did they decide to have a picnic?',o:['The weather was sunny','It was snowing','They had an exam'],a:0},
      {q:'What did the sister prepare?',o:['Pizza and tea','Sandwiches and juice','Rice and soup'],a:1},
      {q:'When did they go home?',o:['At midnight','After sunrise','Before sunset'],a:2}]},
    {level:'B1', lines:['A student exchange programme gave Youssef the chance to study abroad for a month.','He expected the language difference to be his greatest challenge.','Surprisingly, learning how people communicated through everyday gestures was just as interesting.','He returned with stronger language skills and a better understanding of another culture.','The experience encouraged him to keep learning.'], questions:[
      {q:'How long was the programme?',o:['A month','A year','A week'],a:0},
      {q:'What surprised Youssef?',o:['The size of the school','Everyday gestures were interesting too','The food was unavailable'],a:1},
      {q:'What did the experience encourage him to do?',o:['Stop studying','Change schools','Keep learning'],a:2}]},
    {level:'B2', lines:['Public transport is sometimes judged only by how quickly it moves passengers.','Yet reliability, accessibility and affordability are equally important to daily users.','A well-planned network can reduce traffic while giving more people access to jobs and education.','To achieve this, decision-makers need to listen to the needs of different communities.','Transport planning is most effective when it serves people fairly.'], questions:[
      {q:'What factors matter besides speed?',o:['Reliability, accessibility and affordability','The colour of vehicles','The number of advertisements'],a:0},
      {q:'What can a well-planned network reduce?',o:['School attendance','Traffic','Employment'],a:1},
      {q:'When is transport planning most effective?',o:['When it serves only city centres','When it ignores residents','When it serves people fairly'],a:2}]},
    {level:'A1', lines:['Tarek likes football.','He plays with his cousins after school.','They play in a small park.','Tarek is usually the goalkeeper.','His team is happy when they win.'], questions:[
      {q:'What sport does Tarek like?',o:['Football','Tennis','Swimming'],a:0},
      {q:'Who does he play with?',o:['His teachers','His cousins','His neighbours'],a:1},
      {q:'What position does Tarek play?',o:['Striker','Coach','Goalkeeper'],a:2}]},
    {level:'A2', lines:['Laila missed the morning train because she left home late.','Instead of getting upset, she checked the next departure time.','She called her manager and explained the situation.','Fortunately, another train arrived twenty minutes later.','She decided to prepare her bag the night before next time.'], questions:[
      {q:'Why did Laila miss the train?',o:['She left home late','The station was closed','She forgot the address'],a:0},
      {q:'What did she do after checking the time?',o:['Went back to sleep','Called her manager','Bought a bicycle'],a:1},
      {q:'What will she do next time?',o:['Leave her job','Ignore the timetable','Prepare her bag the night before'],a:2}]},
    {level:'B1', lines:['The school introduced a peer-support programme to help new students settle in.','Older students volunteered to answer questions and show newcomers around.','The programme reduced confusion during the first few weeks.','It also helped volunteers develop communication and leadership skills.','Both groups benefited from the experience.'], questions:[
      {q:'Who helped the new students?',o:['Older student volunteers','Visitors','Shop owners'],a:0},
      {q:'What did the programme reduce?',o:['Homework','Confusion','School hours'],a:1},
      {q:'Who benefited?',o:['Only teachers','Only parents','Both groups'],a:2}]},
    {level:'B2', lines:['The rapid spread of information makes critical thinking increasingly valuable.','A headline may attract attention without presenting the full context of a story.','Readers should compare reliable sources and distinguish evidence from personal opinion.','They should also consider who produced the information and why.','Such habits help people make more informed decisions.'], questions:[
      {q:'Why is critical thinking valuable?',o:['Information spreads rapidly','It makes reading unnecessary','It removes all disagreement'],a:0},
      {q:'What should readers distinguish?',o:['Short words from long words','Evidence from personal opinion','News from entertainment only'],a:1},
      {q:'What do these habits help people do?',o:['Avoid all information','Memorise every headline','Make informed decisions'],a:2}]}
  ];

  const grammar = [
    {title:'Present Simple',explain:'نستخدم المضارع البسيط للتعبير عن العادات والحقائق والأشياء التي تتكرر. مع he / she / it نضيف غالبًا s للفعل.',examples:[['She goes to school every day.','هي تذهب إلى المدرسة كل يوم.'],['Water boils at 100°C.','يغلي الماء عند 100 درجة مئوية.']],note:'لا نضيف s بعد does في السؤال أو النفي: Does he play? وليس Does he plays.'},
    {title:'Present Continuous',explain:'نستخدم المضارع المستمر لحدث يحدث الآن أو في فترة مؤقتة. التكوين: am / is / are + verb-ing.',examples:[['I am studying now.','أنا أذاكر الآن.'],['They are playing football.','هم يلعبون كرة القدم.']],note:'لا تنسَ فعل am / is / are قبل الفعل المنتهي بـ ing.'},
    {title:'Past Simple',explain:'نستخدم الماضي البسيط لحدث انتهى في وقت ماضٍ. الأفعال المنتظمة نضيف لها ed، وغير المنتظمة لها تصريف ثانٍ.',examples:[['We visited Luxor last year.','زرنا الأقصر العام الماضي.'],['He bought a new bag yesterday.','اشترى حقيبة جديدة أمس.']],note:'بعد did نستخدم المصدر: Did you go? وليس Did you went?'},
    {title:'Past Continuous',explain:'نستخدم الماضي المستمر لحدث كان مستمرًا في وقت معين في الماضي. التكوين: was / were + verb-ing.',examples:[['I was reading at eight.','كنت أقرأ في الثامنة.'],['They were sleeping.','كانوا نائمين.']],note:'استخدم was مع I / he / she / it، وwere مع you / we / they.'},
    {title:'Present Perfect',explain:'نستخدم المضارع التام لحدث له صلة بالحاضر أو تجربة دون تحديد وقت ماضٍ منتهٍ. التكوين: have / has + التصريف الثالث.',examples:[['I have finished my homework.','لقد أنهيت واجبي.'],['She has visited Cairo twice.','زارت القاهرة مرتين.']],note:'لا نستخدمه عادةً مع وقت ماضٍ منتهٍ مثل yesterday؛ نقول I saw him yesterday.'},
    {title:'Future with will',explain:'نستخدم will للتوقعات والقرارات السريعة والوعود. بعدها يأتي الفعل في المصدر.',examples:[['I think it will rain.','أعتقد أنها ستمطر.'],['I will help you.','سأساعدك.']],note:'لا نضيف s أو ed للفعل بعد will.'},
    {title:'Be going to',explain:'نستخدم am / is / are going to للخطط والنيات، أو للتوقع المبني على دليل واضح.',examples:[['We are going to travel next week.','سنسافر الأسبوع القادم.'],['Look at the clouds! It is going to rain.','انظر إلى السحب! يبدو أنها ستمطر.']],note:'يجب استخدام فعل be قبل going to.'},
    {title:'There is / There are',explain:'نستخدم There is مع المفرد وغير المعدود، ونستخدم There are مع الجمع.',examples:[['There is a book on the desk.','يوجد كتاب على المكتب.'],['There are three windows.','توجد ثلاث نوافذ.']],note:'مع الجمع نقول There are وليس There is.'},
    {title:'Countable and Uncountable Nouns',explain:'الأسماء المعدودة يمكن عدّها مثل books وapples. غير المعدودة لا نعدّها مباشرة مثل water وinformation.',examples:[['I have two apples.','لدي تفاحتان.'],['We need some water.','نحتاج بعض الماء.']],note:'لا نقول an information؛ يمكن أن نقول a piece of information.'},
    {title:'Some and Any',explain:'نستخدم some غالبًا في الجمل المثبتة والعروض والطلبات، وany غالبًا في النفي والأسئلة.',examples:[['There is some milk.','يوجد بعض اللبن.'],['Do you have any questions?','هل لديك أي أسئلة؟']],note:'يمكن استخدام some في الطلب المهذب: Can I have some water?'},
    {title:'Much and Many',explain:'نستخدم many مع الأسماء المعدودة الجمع، وmuch مع الأسماء غير المعدودة.',examples:[['How many books do you have?','كم كتابًا لديك؟'],['How much sugar do we need?','كم نحتاج من السكر؟']],note:'Books معدود، أما sugar فغير معدود.'},
    {title:'Comparatives',explain:'نستخدم صيغة المقارنة للمقارنة بين شيئين. غالبًا نضيف er للصفات القصيرة، ونستخدم more مع الصفات الطويلة.',examples:[['Ali is taller than Omar.','علي أطول من عمر.'],['This book is more interesting than that one.','هذا الكتاب أكثر تشويقًا من ذاك.']],note:'بعد صيغة المقارنة نستخدم than.'},
    {title:'Superlatives',explain:'نستخدم صيغة التفضيل للمقارنة بين ثلاثة أشياء أو أكثر. غالبًا نستخدم the مع est أو most.',examples:[['Mona is the tallest girl in the class.','منى أطول فتاة في الفصل.'],['It is the most useful lesson.','إنه الدرس الأكثر فائدة.']],note:'لا تنسَ the قبل صيغة التفضيل في الاستخدام المعتاد.'},
    {title:'Adverbs of Frequency',explain:'توضح ظروف التكرار عدد مرات حدوث الفعل، مثل always وusually وoften وsometimes وnever.',examples:[['I usually walk to school.','عادةً أذهب إلى المدرسة مشيًا.'],['She is always polite.','هي مهذبة دائمًا.']],note:'تأتي ظروف التكرار غالبًا قبل الفعل الأساسي، لكنها تأتي بعد verb to be.'},
    {title:'Modal: must and mustn’t',explain:'نستخدم must للتعبير عن الضرورة أو الإلزام، وmustn’t للتعبير عن المنع.',examples:[['You must wear a seat belt.','يجب أن ترتدي حزام الأمان.'],['You mustn’t use your phone here.','ممنوع استخدام هاتفك هنا.']],note:'بعد must وmustn’t يأتي الفعل في المصدر دون to.'},
    {title:'Should and Shouldn’t',explain:'نستخدم should للنصيحة، وshouldn’t للنصيحة بعدم فعل شيء.',examples:[['You should drink enough water.','ينبغي أن تشرب كمية كافية من الماء.'],['You shouldn’t stay up late.','لا ينبغي أن تسهر.']],note:'Should لا تتغير مع he أو she ولا يأتي بعدها to.'},
    {title:'First Conditional',explain:'نستخدم الشرط الأول لشيء محتمل في المستقبل. التكوين: If + present simple, will + infinitive.',examples:[['If it rains, we will stay at home.','إذا أمطرت، سنبقى في المنزل.'],['If you study, you will improve.','إذا ذاكرت، فسوف تتحسن.']],note:'لا نضع will عادةً في جملة If: If you study وليس If you will study.'},
    {title:'Zero Conditional',explain:'نستخدم الشرط الصفري للحقائق العامة والنتائج الثابتة. التكوين: If + present simple, present simple.',examples:[['If you heat ice, it melts.','إذا سخنت الثلج فإنه يذوب.'],['If plants don’t get water, they die.','إذا لم تحصل النباتات على الماء فإنها تموت.']],note:'النتيجة هنا حقيقة عامة، لذلك نستخدم المضارع البسيط في الجزأين.'},
    {title:'Passive Voice',explain:'نستخدم المبني للمجهول عندما نهتم بالفعل أو بالمفعول أكثر من الفاعل. التكوين الأساسي: be + past participle.',examples:[['The room is cleaned every day.','تُنظف الغرفة كل يوم.'],['The bridge was built in 1990.','بُني الجسر عام 1990.']],note:'يجب اختيار be حسب الزمن والفاعل، ثم نستخدم التصريف الثالث.'},
    {title:'Relative Pronouns',explain:'نستخدم who للأشخاص، وwhich للأشياء والحيوانات، وwhere للأماكن، وthat في كثير من الجمل الوصفية.',examples:[['The boy who won is my friend.','الولد الذي فاز صديقي.'],['This is the school where I study.','هذه هي المدرسة التي أدرس فيها.']],note:'لا نستخدم where لوصف شخص؛ نستخدم who.'}
  ];

  // Additional daily content; the existing 20 items remain unchanged.
  const passageSeeds = [
    ['Nadia','organise a book exchange','the school library','a list of titles','help classmates discover stories'],
    ['Omar','learn basic first aid','the youth club','a practice kit','respond calmly in emergencies'],
    ['Salma','prepare a healthy lunch','her home kitchen','fresh vegetables','make better food choices'],
    ['Youssef','build a model bridge','the science room','wooden sticks and glue','understand how structures work'],
    ['Mariam','start a reading challenge','the public library','a weekly chart','develop a regular reading habit'],
    ['Hassan','plant herbs in pots','the sunny balcony','soil and mint seeds','use fresh herbs in meals'],
    ['Lina','improve her handwriting','her study desk','a practice notebook','write more clearly'],
    ['Adam','prepare a class presentation','the computer room','pictures and short notes','explain an idea confidently'],
    ['Farah','organise a charity event','the community hall','posters and a timetable','bring neighbours together'],
    ['Ziad','learn to repair a bicycle','the local workshop','a small tool set','solve a common problem'],
    ['Hana','create a family photo album','the living room','old photographs','preserve special memories'],
    ['Kareem','study the night sky','the school garden','a star map','recognise bright constellations'],
    ['Mona','practise speaking English','an online study group','useful questions','communicate more confidently'],
    ['Tamer','make a water-saving plan','his family home','a daily checklist','reduce unnecessary water use'],
    ['Aya','design a recycling poster','the art classroom','coloured paper and markers','encourage responsible habits'],
    ['Rami','learn to cook rice','his grandmother kitchen','a measuring cup','prepare a simple meal'],
    ['Nada','train for a school race','the sports field','a weekly schedule','build stamina gradually'],
    ['Bilal','write a school newspaper article','the school library','interview notes','share useful local news'],
    ['Reem','organise school materials','her bedroom desk','labelled folders','find papers quickly'],
    ['Mostafa','make a bird feeder','the garden','a clean recycled container','support birds nearby'],
    ['Dina','learn basic computer skills','the training centre','a practice computer','complete digital tasks independently'],
    ['Amir','prepare for a history quiz','the study room','a timeline','remember important dates'],
    ['Jana','plan a walking tour','the old town','a printed map','discover local landmarks'],
    ['Fady','clean a public beach','the seaside','reusable collection bags','protect the environment'],
    ['Rana','make a simple budget','her desk','a notebook and calculator','manage pocket money wisely'],
    ['Samir','take clear photographs','the city park','a digital camera','capture important details'],
    ['Nour','prepare a science experiment','the school laboratory','measuring tools','observe results carefully'],
    ['Ehab','practise touch typing','the computer lab','a typing programme','write more efficiently'],
    ['Laila','make a revision timetable','her study corner','a wall calendar','balance school subjects'],
    ['Yara','start a small book club','the neighbourhood centre','three novels','share opinions respectfully'],
    ['Mahmoud','learn road safety rules','the school playground','road signs','cross streets safely'],
    ['Rita','create a vocabulary notebook','her English class','index cards','review new words regularly'],
    ['Khaled','help an elderly neighbour','the nearby building','a shopping list','make daily tasks easier'],
    ['Amira','grow tomatoes from seeds','the family garden','small pots and water','understand how plants develop'],
    ['Tarek','prepare a travel checklist','his bedroom','a travel notebook','remember important items'],
    ['Noha','learn a musical tune','the music room','a keyboard','practise patience and rhythm'],
    ['Seif','make a weather chart','the classroom','a thermometer','compare daily temperatures'],
    ['Malak','write a thank-you letter','her home desk','a sheet of paper','show appreciation politely'],
    ['Ibrahim','sort household waste','the kitchen','recycling boxes','make recycling easier'],
    ['Huda','prepare interview questions','the school hall','a question card','collect clear information'],
    ['Zein','learn to swim safely','the sports centre','a lesson plan','gain confidence in the water'],
    ['Mazen','build a reading corner','the classroom','a mat and shelves','make reading comfortable'],
    ['Esraa','make a family recipe book','the kitchen table','recipe cards','keep family recipes'],
    ['Bassem','practise map reading','the geography room','a street map','understand directions'],
    ['Dalia','organise an art display','the main corridor','student paintings','celebrate creative work'],
    ['Ayman','learn gardening skills','a community garden','a hand trowel','care for living plants'],
    ['Rasha','prepare a healthy breakfast','the dining room','fruit and whole-grain bread','start the day with energy'],
    ['Nabil','create a study group','the school library','revision notes','learn from classmates'],
    ['Mira','make a safety guide','the science classroom','clear drawings','remember safety rules'],
    ['Wael','collect family stories','his grandparents home','a voice recorder','preserve family history'],
    ['Samar','solve logic puzzles','the study room','a puzzle book','improve problem-solving skills'],
    ['Hany','prepare a class garden','the school yard','young plants','make the school greener'],
    ['Rim','learn to write a formal email','the computer room','a sample email','communicate politely online'],
    ['Fares','compare prices before shopping','the local market','a shopping list','make careful spending choices'],
    ['Maha','prepare a short drama','the school stage','a simple script','work creatively with classmates'],
    ['Anas','organise information','the computer lab','a simple table','present facts clearly'],
    ['Doaa','make reusable gift wrapping','her craft table','old newspapers and string','reduce paper waste'],
    ['Hatem','study the water cycle','the science room','a labelled diagram','understand changes in nature'],
    ['Shahd','plan a museum visit','the city museum','an opening-hours guide','learn about local history'],
    ['Ragab','practise giving directions','the school corridor','a floor plan','help visitors find rooms'],
    ['Yasmin','prepare a class podcast','the media room','a microphone','share student ideas'],
    ['Essam','read food labels','the supermarket','a product label','make informed choices'],
    ['Lamis','plan a daily activity routine','the sports club','an activity chart','build a healthy routine'],
    ['Adel','make a model solar system','the science club','coloured balls','remember the planets'],
    ['Basma','organise a clothes donation','the community centre','clean labelled bags','help families in need'],
    ['Nasser','practise listening carefully','the language classroom','audio recordings','understand spoken English'],
    ['Hala','prepare a school trip plan','the classroom','a route and checklist','keep the group organised'],
    ['Sami','learn about local birds','the park','a bird guide','recognise different species'],
    ['Mariam','make a savings chart','her desk','a weekly record','follow a savings goal'],
    ['Kamal','prepare a group science project','the laboratory','shared research notes','work effectively as a team'],
    ['Rola','write a book review','the library','a reading journal','explain an interesting story'],
    ['Younis','learn to use a dictionary','the English classroom','a bilingual dictionary','check meanings and spelling'],
    ['Nermin','create a kindness wall','the school corridor','small paper notes','encourage positive behaviour'],
    ['Ashraf','plan a litter-free picnic','the public garden','reusable containers','keep the place clean'],
    ['Ghada','practise polite requests','the language club','role-play cards','speak respectfully'],
    ['Sherif','back up important files','the computer room','a storage device','protect schoolwork'],
    ['Tala','make a family tree','her home','names and photographs','learn family history'],
    ['Ramy','compare building materials','the technology room','sample materials','understand their properties'],
    ['Eman','prepare a mini book fair','the school hall','price labels and book lists','encourage reading'],
    ['Kareem','check reliable information','the library','two reference books','check facts before sharing'],
    ['Nahla','organise a classroom timetable','the classroom','a weekly chart','make lessons easier to follow']
  ];
  const activityOptions = ['read a short story','play a team game','visit a museum','make a paper model','learn a new song','solve a word puzzle'];
  const placeOptions = ['the school library','the community centre','the science room','the city park','the language classroom','the sports club'];
  const toolOptions = ['a notebook','a simple map','a set of cards','a measuring cup','a picture guide','a weekly chart'];
  const extraPassages = passageSeeds.map((s, i) => {
    const name=s[0], action=s[1], place=s[2], tool=s[3], benefit=s[4];
    const patterns = [
      [name+' wanted to '+action+'.','The plan began at '+place+'.',name+' used '+tool+' to complete the task.','This helped '+name+' '+benefit+'.','The experience showed that preparation makes learning easier.'],
      [name+' decided to '+action+' during the week.','First, '+name+' went to '+place+'.','A useful part of the plan was '+tool+'.','As a result, '+name+' could '+benefit+'.','Small steps helped turn the idea into a successful activity.'],
      ['A new goal encouraged '+name+' to '+action+'.','The activity took place at '+place+'.','To stay organised, '+name+' prepared '+tool+'.','The work made it possible to '+benefit+'.','Afterwards, '+name+' wanted to keep learning.'],
      [name+' had an interesting idea: to '+action+'.','The best place for the activity was '+place+'.','During the task, '+name+' worked with '+tool+'.','By the end, it was easier to '+benefit+'.','The result proved that practice is useful.']
    ];
    const rotate = (arr, shift) => arr.map((v,j) => arr[(j+shift)%arr.length]);
    const ai=i%3, pi=(i+1)%3, ti=(i+2)%3;
    const actions=rotate([action,activityOptions[(i+1)%6],activityOptions[(i+3)%6]],ai);
    const places=rotate([place,placeOptions[(i+2)%6],placeOptions[(i+4)%6]],pi);
    const tools=rotate([tool,toolOptions[(i+1)%6],toolOptions[(i+4)%6]],ti);
    return {level:['A1','A2','B1','B2'][i%4],lines:patterns[i%4],questions:[
      {q:'What did '+name+' want to do?',o:actions,a:actions.indexOf(action)},
      {q:'Where did the activity take place?',o:places,a:places.indexOf(place)},
      {q:'What did the person use?',o:tools,a:tools.indexOf(tool)}
    ]};
  });
  passages.push(...extraPassages);
  const extraGrammar = [
    ['Articles: a / an','نستخدم a قبل الصوت الساكن وan قبل الصوت المتحرك.',['She has a university bag.','لديها حقيبة جامعية.'],['He ate an apple.','أكل تفاحة.'],'العبرة بالصوت لا بالحرف المكتوب.'],
    ['The','نستخدم the عندما يكون الاسم محددًا أو معروفًا.',['Please close the door.','أغلق الباب من فضلك.'],['The sun is bright.','الشمس ساطعة.'],'لا نستخدم the عادة مع الأسماء العامة.'],
    ['Subject Pronouns','ضمائر الفاعل هي I, you, he, she, it, we, they.',['Mona is kind. She helps us.','منى طيبة، وهي تساعدنا.'],['The boys are here. They are ready.','الأولاد هنا، وهم مستعدون.'],'ضمير الفاعل يأتي غالبًا قبل الفعل.'],
    ['Object Pronouns','ضمائر المفعول تأتي بعد الفعل أو حرف الجر.',['The teacher called me.','ناداني المعلم.'],['I spoke to them.','تحدثت إليهم.'],'مثل me وhim وher وus وthem.'],
    ['Possessive Adjectives','صفات الملكية تأتي قبل الاسم: my, your, his, her, its, our, their.',['This is my book.','هذا كتابي.'],['Their house is large.','منزلهم كبير.'],'يجب أن يأتي بعدها اسم.'],
    ['Possessive Pronouns','ضمائر الملكية تحل محل الاسم ولا يأتي بعدها اسم.',['This pen is mine.','هذا القلم لي.'],['The blue bag is hers.','الحقيبة الزرقاء لها.'],'قل This is mine وليس mine book.'],
    ['This / That / These / Those','نستخدم this وthese للقريب، وthat وthose للبعيد.',['This apple is fresh.','هذه التفاحة طازجة.'],['Those houses are old.','تلك المنازل قديمة.'],'this/that للمفرد وthese/those للجمع.'],
    ['At for Time','نستخدم at مع الساعة والوقت المحدد.',['The lesson starts at nine.','يبدأ الدرس في التاسعة.'],['I sleep at midnight.','أنام عند منتصف الليل.'],'نقول at 7 o’clock.'],
    ['On for Time','نستخدم on مع أيام الأسبوع والتواريخ.',['We meet on Monday.','نلتقي يوم الاثنين.'],['Her birthday is on 5 May.','عيد ميلادها في 5 مايو.'],'استخدم on مع اليوم أو التاريخ.'],
    ['In for Time','نستخدم in مع الشهور والسنوات والفصول وأجزاء اليوم.',['School begins in September.','تبدأ الدراسة في سبتمبر.'],['I study in the evening.','أذاكر في المساء.'],'مثل in 2026 وin winter.'],
    ['In for Place','نستخدم in عندما يكون الشيء داخل مكان أو مساحة.',['The keys are in the drawer.','المفاتيح داخل الدرج.'],['She lives in Cairo.','هي تعيش في القاهرة.'],'in تعني داخل أو ضمن مساحة.'],
    ['On for Place','نستخدم on عندما يكون الشيء على سطح.',['The phone is on the table.','الهاتف على الطاولة.'],['A picture is on the wall.','صورة على الحائط.'],'on تصف وجود الشيء على سطح.'],
    ['At for Place','نستخدم at للإشارة إلى نقطة أو موقع محدد.',['We are at the bus stop.','نحن عند موقف الحافلات.'],['He is at the door.','هو عند الباب.'],'at تركز على الموقع كنقطة.'],
    ['And','نستخدم and لربط كلمات أو أفكار متشابهة وإضافة معلومة.',['I bought apples and oranges.','اشتريت تفاحًا وبرتقالًا.'],['She sings and dances.','هي تغني وترقص.'],'and تضيف معلومة.'],
    ['But','نستخدم but لربط فكرتين بينهما تضاد.',['It was cold, but we went out.','كان الجو باردًا، لكننا خرجنا.'],['He is young but wise.','هو صغير السن لكنه حكيم.'],'تأكد من وجود اختلاف بين الفكرتين.'],
    ['Because','نستخدم because لتوضيح السبب والإجابة عن why.',['I stayed home because I was ill.','بقيت في المنزل لأنني كنت مريضًا.'],['She smiled because she was happy.','ابتسمت لأنها كانت سعيدة.'],'بعد because تأتي جملة.'],
    ['So','نستخدم so لعرض النتيجة المترتبة على سبب.',['It rained, so we stayed inside.','أمطرت، لذلك بقينا بالداخل.'],['He studied, so he passed.','ذاكر، لذلك نجح.'],'so تقدم النتيجة.'],
    ['Although','نستخدم although بمعنى بالرغم من لربط فكرتين متعارضتين.',['Although it was late, we continued.','بالرغم من تأخر الوقت، واصلنا.'],['Although tired, she smiled.','بالرغم من تعبها، ابتسمت.'],'لا تجمع although وbut عادة في الجملة نفسها.'],
    ['Infinitive with to','يأتي المصدر مع to بعد أفعال مثل want وdecide وhope.',['I want to learn English.','أريد أن أتعلم الإنجليزية.'],['They decided to travel.','قرروا السفر.'],'بعد want نستخدم to + المصدر.'],
    ['Gerund after enjoy','يأتي الفعل مع ing بعد enjoy.',['I enjoy reading stories.','أستمتع بقراءة القصص.'],['She enjoys cooking.','هي تستمتع بالطهي.'],'قل enjoy doing وليس enjoy to do.'],
    ['Gerund after finish','يأتي الفعل مع ing بعد finish.',['He finished writing.','أنهى الكتابة.'],['We finished cleaning the room.','أنهينا تنظيف الغرفة.'],'finish يتبعها اسم أو فعل ing.'],
    ['Gerund after Prepositions','يأتي الفعل مع ing بعد حروف الجر.',['She is good at drawing.','هي جيدة في الرسم.'],['Thank you for helping me.','شكرًا لمساعدتي.'],'بعد at وfor إذا جاء فعل نستخدم ing.'],
    ['Can','نستخدم can للقدرة أو الإمكانية، وبعدها المصدر دون to.',['I can swim.','أستطيع السباحة.'],['Can you help me?','هل يمكنك مساعدتي؟'],'لا نضيف s بعد can.'],
    ['Could','نستخدم could للقدرة في الماضي أو للطلب المهذب.',['I could read at five.','كنت أستطيع القراءة في الخامسة.'],['Could you open the window?','هل يمكنك فتح النافذة؟'],'بعد could يأتي المصدر.'],
    ['May','نستخدم may لطلب الإذن أو التعبير عن احتمال.',['May I come in?','هل يمكنني الدخول؟'],['It may rain later.','قد تمطر لاحقًا.'],'may لا تتغير مع he أو she.'],
    ['Might','نستخدم might للتعبير عن احتمال.',['We might visit tomorrow.','قد نزوركم غدًا.'],['She might be busy.','قد تكون مشغولة.'],'بعد might يأتي المصدر دون to.'],
    ['Have to','نستخدم have to للتعبير عن الضرورة أو الالتزام.',['I have to finish my work.','يجب أن أنهي عملي.'],['She has to wear a uniform.','يجب أن ترتدي زيًا موحدًا.'],'مع he/she/it نستخدم has to.'],
    ['Need to','نستخدم need to للتعبير عن شيء ضروري.',['You need to practise daily.','تحتاج إلى التدريب يوميًا.'],['He needs to rest.','يحتاج إلى الراحة.'],'نضيف s مع he/she/it في المضارع المثبت.'],
    ['Had better','نستخدم had better للنصيحة القوية ويتبعها المصدر.',['You had better leave now.','من الأفضل أن تغادر الآن.'],['We had better hurry.','من الأفضل أن نسرع.'],'لا تقل had better to leave.'],
    ['Used to','نستخدم used to لعادة أو حالة كانت موجودة في الماضي.',['I used to play here.','اعتدت اللعب هنا.'],['She used to live in Cairo.','كانت تعيش في القاهرة.'],'بعد used to يأتي المصدر.'],
    ['Too + Adjective','نستخدم too قبل الصفة بمعنى أكثر من اللازم.',['The bag is too heavy.','الحقيبة ثقيلة أكثر من اللازم.'],['It is too cold to swim.','الجو بارد جدًا للسباحة.'],'too قد تشير إلى زيادة غير مناسبة.'],
    ['Adjective + Enough','نستخدم enough بعد الصفة.',['The room is big enough.','الغرفة كبيرة بما يكفي.'],['He is old enough.','هو كبير بما يكفي.'],'مكان enough بعد الصفة.'],
    ['Enough + Noun','نستخدم enough قبل الاسم للدلالة على الكمية الكافية.',['We have enough time.','لدينا وقت كافٍ.'],['There are enough chairs.','توجد كراسٍ كافية.'],'قل enough money.'],
    ['So + Adjective','نستخدم so قبل الصفة أو الظرف للتأكيد.',['The film was so funny.','كان الفيلم مضحكًا جدًا.'],['She runs so quickly.','هي تجري بسرعة كبيرة.'],'بعد so تأتي صفة أو ظرف.'],
    ['Such + Noun','نستخدم such قبل عبارة اسمية للتأكيد.',['It was such a lovely day.','كان يومًا جميلًا جدًا.'],['They are such kind people.','إنهم أناس لطفاء جدًا.'],'مع المفرد المعدود نستخدم such a/an.'],
    ['As ... as','نستخدم as + adjective + as للمقارنة عند التساوي.',['Mona is as tall as Sara.','منى بطول سارة.'],['This task is as easy as that one.','هذه المهمة سهلة مثل تلك.'],'لا نستخدم taller في هذا التركيب.'],
    ['Less','نستخدم less مع غير المعدود أو الصفات بمعنى أقل.',['This bag is less expensive.','هذه الحقيبة أقل ثمنًا.'],['Use less sugar.','استخدم سكرًا أقل.'],'مع المعدود الجمع نستخدم fewer غالبًا.'],
    ['Fewer','نستخدم fewer مع الأسماء المعدودة الجمع.',['There are fewer cars today.','توجد سيارات أقل اليوم.'],['We made fewer mistakes.','ارتكبنا أخطاء أقل.'],'fewer مع الأشياء التي يمكن عدها.'],
    ['Each','نستخدم each للتركيز على كل فرد بصورة منفصلة.',['Each student has a book.','لكل طالب كتاب.'],['Each answer is important.','كل إجابة مهمة.'],'each يتبعها غالبًا اسم مفرد وفعل مفرد.'],
    ['Every','نستخدم every للحديث عن جميع أفراد المجموعة.',['I study every day.','أذاكر كل يوم.'],['Every child needs care.','كل طفل يحتاج إلى رعاية.'],'every يتبعها اسم مفرد.'],
    ['Both','نستخدم both للحديث عن اثنين معًا.',['Both answers are correct.','الإجابتان صحيحتان.'],['Both boys are ready.','الولدان مستعدان.'],'both تشير إلى اثنين ويأتي بعدها غالبًا فعل جمع.'],
    ['Either','نستخدم either بمعنى أي واحد من اثنين.',['Choose either colour.','اختر أيًا من اللونين.'],['Either answer is possible.','أي من الإجابتين ممكن.'],'either ترتبط غالبًا بالاختيار بين اثنين.'],
    ['Neither','نستخدم neither بمعنى لا هذا ولا ذاك من اثنين.',['Neither answer is correct.','لا الإجابة الأولى ولا الثانية صحيحة.'],['Neither of them came.','لم يأتِ أي منهما.'],'neither تحمل معنى النفي.'],
    ['Another','نستخدم another مع اسم مفرد معدود بمعنى آخر أو إضافي.',['Can I have another cup?','هل يمكنني كوب آخر؟'],['She wants another chance.','تريد فرصة أخرى.'],'another يتبعها مفرد معدود.'],
    ['Other','نستخدم other قبل اسم جمع أو غير معدود.',['Do you have other ideas?','هل لديك أفكار أخرى؟'],['Other students were late.','طلاب آخرون تأخروا.'],'لا تخلط بين other وanother.'],
    ['The Other','نستخدم the other للإشارة إلى الشيء المتبقي أو المحدد.',['One shoe is here; the other is missing.','حذاء هنا والآخر مفقود.'],['One pen is blue; the other is black.','قلم أزرق والآخر أسود.'],'the other تعني الآخر المحدد.'],
    ['One / Ones','نستخدم one بدل اسم مفرد وones بدل اسم جمع لتجنب التكرار.',['I like the red one.','يعجبني الأحمر.'],['These shoes are nicer than those ones.','هذه الأحذية أجمل من تلك.'],'تحل محل اسم مفهوم من السياق.'],
    ['Question Word Order','في أسئلة المضارع نستخدم do/does قبل الفاعل ثم المصدر.',['Where do you live?','أين تعيش؟'],['When does he study?','متى يذاكر؟'],'بعد does نستخدم المصدر دون s.'],
    ['Past Questions','في أسئلة الماضي نستخدم did قبل الفاعل ثم المصدر.',['Did you see the match?','هل شاهدت المباراة؟'],['Where did she go?','إلى أين ذهبت؟'],'بعد did نستخدم المصدر.'],
    ['Negative with Don’t','نستخدم don’t لنفي المضارع مع I/you/we/they.',['I do not like coffee.','أنا لا أحب القهوة.'],['They don’t play here.','هم لا يلعبون هنا.'],'بعد don’t يأتي المصدر.'],
    ['Negative with Doesn’t','نستخدم doesn’t مع he/she/it في المضارع.',['He does not watch TV.','هو لا يشاهد التلفاز.'],['She doesn’t speak French.','هي لا تتحدث الفرنسية.'],'لا نضيف s للفعل بعد doesn’t.'],
    ['Negative with Didn’t','نستخدم didn’t لنفي الماضي مع جميع الضمائر.',['We did not visit them.','لم نزرهم.'],['He didn’t finish the task.','لم ينهِ المهمة.'],'بعد didn’t يأتي المصدر.'],
    ['Imperatives','نستخدم المصدر في بداية الجملة للأوامر والتعليمات.',['Open your book, please.','افتح كتابك من فضلك.'],['Turn left here.','انعطف يسارًا هنا.'],'للنهي نستخدم don’t قبل المصدر.'],
    ['Negative Imperatives','نستخدم Don’t + المصدر لطلب عدم القيام بشيء.',['Don’t touch the pan.','لا تلمس المقلاة.'],['Don’t be late.','لا تتأخر.'],'بعد don’t يأتي المصدر.'],
    ['Short Answers','تبدأ الإجابة القصيرة بـYes أوNo ثم الضمير والفعل المساعد.',['Yes, I do.','نعم، أفعل.'],['No, she isn’t.','لا، ليست كذلك.'],'لا نكرر الفعل الأساسي.'],
    ['Question Tags','السؤال القصير في النهاية للتأكد؛ المثبت يتبعه منفي والعكس.',['You are ready, aren’t you?','أنت مستعد، أليس كذلك؟'],['She can swim, can’t she?','هي تستطيع السباحة، أليس كذلك؟'],'استخدم الفعل المساعد والضمير المناسبين.'],
    ['Indirect Questions','في السؤال غير المباشر نستخدم ترتيب الجملة العادية.',['Where does he live? becomes Could you tell me where he lives?','هل تخبرني أين يعيش؟'],['Do you know what time it is?','هل تعرف كم الساعة؟'],'لا تستخدم ترتيب السؤال المباشر داخل الجزء غير المباشر.'],
    ['Reported Statements','في الكلام المنقول قد يتغير الزمن والضمير حسب الموقف.',['He said that he was tired.','قال إنه كان متعبًا.'],['Mona said she liked the book.','قالت منى إنها أحبت الكتاب.'],'راجع تغيّر الضمائر والزمن.'],
    ['Reported Commands','ننقل الأمر باستخدام told + object + to + infinitive.',['The teacher told us to sit down.','طلب منا المعلم أن نجلس.'],['Mum told me to call her.','طلبت مني أمي الاتصال بها.'],'في النهي نستخدم not to.'],
    ['Say and Tell','say يركز على الكلام، وtell يأتي غالبًا بعده الشخص.',['She said hello.','قالت مرحبًا.'],['He told me the truth.','أخبرني الحقيقة.'],'نقول tell me وsay to me.'],
    ['There Was / Were','نستخدم there was للمفرد وthere were للجمع في الماضي.',['There was a book here.','كان هناك كتاب هنا.'],['There were two shops.','كان هناك متجران.'],'طابق was/were مع الاسم.'],
    ['There Will Be','نستخدم there will be للتعبير عن وجود شيء في المستقبل.',['There will be a meeting tomorrow.','سيكون هناك اجتماع غدًا.'],['There will be more lessons.','ستكون هناك دروس أكثر.'],'بعد will نستخدم be.'],
    ['Past of Be','نستخدم was مع I/he/she/it وwere مع you/we/they.',['I was at home.','كنت في المنزل.'],['They were happy.','كانوا سعداء.'],'لا تستخدم did مع was أو were.'],
    ['Present of Be','نستخدم am مع I وis مع he/she/it وare مع you/we/they.',['I am ready.','أنا مستعد.'],['The children are outside.','الأطفال بالخارج.'],'طابق الفعل مع الفاعل.'],
    ['Plural -s','نضيف s غالبًا لتكوين جمع الاسم.',['One book, two books.','كتاب واحد وكتابان.'],['One chair, four chairs.','كرسي واحد وأربعة كراسٍ.'],'توجد جموع شاذة وقواعد إملائية أخرى.'],
    ['Plural -es','نضيف es غالبًا للأسماء المنتهية بأصوات s/sh/ch/x/z.',['One box, two boxes.','صندوق واحد وصندوقان.'],['One watch, three watches.','ساعة وثلاث ساعات.'],'تساعد es على سهولة النطق.'],
    ['Irregular Plurals','بعض الأسماء لها جمع غير منتظم يجب حفظه.',['One child, two children.','طفل وطفلان.'],['One person, many people.','شخص وأشخاص كثيرون.'],'لا نضيف s إلى child لتكوين children.'],
    ['Uncountable Nouns','الأسماء غير المعدودة لا تأخذ عادة a/an ولا تجمع بإضافة s.',['I need some information.','أحتاج بعض المعلومات.'],['There is a little milk.','يوجد قليل من اللبن.'],'يمكن استخدام a piece of معها.'],
    ['Possessive Apostrophe','نستخدم ’s للدلالة على الملكية مع الاسم المفرد غالبًا.',['This is Ali’s bag.','هذه حقيبة علي.'],['The girl’s book is new.','كتاب الفتاة جديد.'],'مع الجمع المنتهي بـs نضع الفاصلة بعد s.'],
    ['Subject-Verb Agreement','يجب أن يتوافق الفعل مع الفاعل في العدد والشخص.',['The boy plays football.','الولد يلعب كرة القدم.'],['The boys play football.','الأولاد يلعبون كرة القدم.'],'حدد الفاعل أولًا قبل اختيار الفعل.'],
    ['Adverbs of Manner','تصف ظروف الطريقة كيف يحدث الفعل، وكثير منها ينتهي بـly.',['She speaks clearly.','هي تتحدث بوضوح.'],['He drives carefully.','هو يقود بحذر.'],'الظرف يصف الفعل.'],
    ['Adjective or Adverb','الصفة تصف الاسم، والظرف يصف الفعل أو الصفة.',['It is a quiet room.','إنها غرفة هادئة.'],['Please speak quietly.','تحدث بهدوء من فضلك.'],'بعد أفعال الربط قد نستخدم صفة.'],
    ['Irregular Adverbs','بعض الظروف لا تتكون بإضافة ly مثل well وfast وhard.',['She sings well.','هي تغني جيدًا.'],['The train moves fast.','يتحرك القطار بسرعة.'],'good صفة وwell ظرف غالبًا.'],
    ['Comparative Adverbs','نقارن بين طريقة حدوث فعلين باستخدام faster أو more.',['He runs faster than me.','هو يجري أسرع مني.'],['She speaks more clearly now.','هي تتحدث بوضوح أكبر الآن.'],'الظروف الطويلة غالبًا تستخدم more.'],
    ['Adjective Order','غالبًا يأتي الرأي قبل الحجم ثم العمر واللون والأصل والمادة.',['She has a beautiful small bag.','لديها حقيبة صغيرة جميلة.'],['He bought an old wooden chair.','اشترى كرسيًا خشبيًا قديمًا.'],'رتب الصفات قبل الاسم.'],
    ['Compound Adjectives','قد تتكون الصفة المركبة من كلمتين وتأتي قبل الاسم.',['It is a well-known story.','إنها قصة معروفة.'],['He is a ten-year-old boy.','هو ولد عمره عشر سنوات.'],'لا نجمع year داخل الصفة المركبة.'],
    ['Good at','نستخدم good at قبل اسم أو فعل ing للتعبير عن المهارة.',['She is good at maths.','هي جيدة في الرياضيات.'],['I am good at drawing.','أنا جيد في الرسم.'],'بعد at يأتي اسم أو ing.'],
    ['Interested in','نستخدم interested in للتعبير عن الاهتمام بشيء.',['He is interested in science.','هو مهتم بالعلوم.'],['They are interested in learning.','هم مهتمون بالتعلم.'],'بعد in يأتي اسم أو ing.'],
    ['Afraid of','نستخدم afraid of للتعبير عن الخوف من شيء.',['The child is afraid of dogs.','الطفل يخاف من الكلاب.'],['She is afraid of flying.','هي تخاف من الطيران.'],'بعد of يأتي اسم أو ing.'],
    ['Proud of','نستخدم proud of للتعبير عن الفخر بشخص أو إنجاز.',['We are proud of our team.','نحن فخورون بفريقنا.'],['He is proud of winning.','هو فخور بالفوز.'],'احفظ الصفة مع حرف الجر.'],
    ['Since and For','نستخدم since مع نقطة بداية وfor مع مدة زمنية.',['I have lived here since 2020.','أعيش هنا منذ 2020.'],['She has studied for two hours.','ذاكرت لمدة ساعتين.'],'since بداية وfor مدة.'],
    ['Already','نستخدم already غالبًا في الجمل المثبتة لحدث وقع بالفعل.',['I have already eaten.','لقد أكلت بالفعل.'],['She has already arrived.','لقد وصلت بالفعل.'],'تأتي غالبًا بين have/has والتصريف الثالث.'],
    ['Yet','نستخدم yet غالبًا في نهاية السؤال أو النفي بمعنى حتى الآن.',['Have you finished yet?','هل انتهيت حتى الآن؟'],['I haven’t called him yet.','لم أتصل به حتى الآن.'],'yet شائعة في الأسئلة والنفي.'],
    ['Just','نستخدم just مع المضارع التام لحدث وقع منذ قليل.',['The bus has just arrived.','وصلت الحافلة للتو.'],['I have just finished.','انتهيت للتو.'],'تأتي غالبًا قبل التصريف الثالث.'],
    ['Ever and Never','نستخدم ever غالبًا للسؤال عن التجارب وnever للنفي.',['Have you ever visited Aswan?','هل زرت أسوان من قبل؟'],['I have never flown.','لم أسافر بالطائرة أبدًا.'],'never تحمل معنى النفي.'],
    ['Ago','نستخدم ago بعد مدة زمنية مع الماضي البسيط.',['I met him two days ago.','قابلته منذ يومين.'],['She left an hour ago.','غادرت منذ ساعة.'],'تأتي ago بعد المدة.'],
    ['During','نستخدم during قبل اسم فترة أو حدث.',['I slept during the film.','نمت أثناء الفيلم.'],['We met during the holiday.','التقينا أثناء العطلة.'],'بعد during يأتي اسم.'],
    ['While','نستخدم while قبل جملة توضح حدثًا مستمرًا أو متزامنًا.',['I listened while I was cooking.','استمعت بينما كنت أطبخ.'],['She called while we were studying.','اتصلت بينما كنا نذاكر.'],'بعد while يأتي فاعل وفعل.'],
    ['By and Until','by تعني في موعد أقصاه، وuntil تعني استمرارًا حتى وقت معين.',['Finish the work by Friday.','أنه العمل في موعد أقصاه الجمعة.'],['We waited until noon.','انتظرنا حتى الظهر.'],'by للموعد النهائي وuntil للاستمرار.'],
    ['From ... To','نستخدم from مع to لتحديد بداية ونهاية وقت أو مكان.',['The shop is open from nine to five.','المتجر مفتوح من التاسعة إلى الخامسة.'],['We travelled from Cairo to Luxor.','سافرنا من القاهرة إلى الأقصر.'],'استخدم الكلمتين لتحديد النطاق.'],
    ['Between','نستخدم between غالبًا عند الحديث عن شيئين أو طرفين محددين.',['The bank is between the school and park.','البنك بين المدرسة والحديقة.'],['Choose between tea and coffee.','اختر بين الشاي والقهوة.'],'between شائعة مع طرفين واضحين.'],
    ['Among','نستخدم among عند الحديث عن شيء داخل مجموعة.',['She was among her friends.','كانت بين أصدقائها.'],['The prize was shared among winners.','وُزعت الجائزة بين الفائزين.'],'among تناسب مجموعة.'],
    ['Into','نستخدم into للحركة من الخارج إلى الداخل.',['He walked into the room.','دخل الغرفة سيرًا.'],['Put the books into the bag.','ضع الكتب داخل الحقيبة.'],'into تدل على حركة.'],
    ['Onto','نستخدم onto للحركة إلى سطح شيء.',['The cat jumped onto the chair.','قفزت القطة على الكرسي.'],['She put the bag onto the desk.','وضعت الحقيبة على المكتب.'],'onto تشير إلى انتقال نحو سطح.'],
    ['Above and Below','above تعني أعلى وbelow تعني أسفل.',['The clock is above the door.','الساعة أعلى الباب.'],['The temperature fell below zero.','انخفضت الحرارة إلى أقل من الصفر.'],'اختر الكلمة حسب الموقع أو المستوى.'],
    ['Across and Through','across تعني من جانب لآخر، وthrough تعني عبر داخل شيء.',['We walked across the bridge.','مشينا عبر الجسر.'],['The train went through the tunnel.','مر القطار عبر النفق.'],'across على مساحة وthrough من الداخل.'],
    ['Beside and Next to','نستخدم beside وnext to بمعنى بجوار.',['Sit beside your brother.','اجلس بجوار أخيك.'],['The bank is next to the post office.','البنك بجوار مكتب البريد.'],'الكلمتان متقاربتان في المعنى.'],
    ['In Front of and Behind','in front of تعني أمام وbehind تعني خلف.',['The car is in front of the house.','السيارة أمام المنزل.'],['The garden is behind the school.','الحديقة خلف المدرسة.'],'لاحظ ترتيب المكانين.'],
    ['Unless','نستخدم unless بمعنى if not للتعبير عن شرط سلبي.',['You will miss the bus unless you hurry.','ستفوتك الحافلة ما لم تسرع.'],['Unless it rains, we will play.','ما لم تمطر، سنلعب.'],'لا نضع not عادة بعد unless.'],
    ['When in Time Clauses','نستخدم المضارع بعد when للحديث عن المستقبل في جملة الزمن.',['I will call when I arrive.','سأتصل عندما أصل.'],['When she finishes, we will leave.','عندما تنتهي، سنغادر.'],'لا نستخدم will عادة بعد when هنا.'],
    ['As Soon As','نستخدم as soon as بمعنى بمجرد أن، ويأتي بعدها المضارع للمستقبل.',['I will text as soon as I arrive.','سأرسل رسالة بمجرد وصولي.'],['We will eat as soon as Dad comes.','سنأكل بمجرد أن يأتي أبي.'],'استخدم المضارع بعد as soon as.'],
    ['Before and After','نستخدم before وafter لتوضيح ترتيب الأحداث.',['Wash your hands before you eat.','اغسل يديك قبل أن تأكل.'],['We went home after the match ended.','ذهبنا بعد انتهاء المباراة.'],'يمكن أن يأتي بعدهما اسم أو جملة.'],
    ['Second Conditional','نستخدم الشرط الثاني لافتراض غير واقعي أو بعيد الاحتمال.',['If I had wings, I would fly.','لو كانت لدي أجنحة، لطرت.'],['If he studied more, he would improve.','لو ذاكر أكثر، لتحسن.'],'If + past simple, would + مصدر.'],
    ['Passive: Present Simple','يتكون المبني للمجهول في المضارع من am/is/are + التصريف الثالث.',['English is spoken here.','يتم التحدث بالإنجليزية هنا.'],['The rooms are cleaned daily.','تُنظف الغرف يوميًا.'],'اختر am/is/are حسب الفاعل.'],
    ['Passive: Past Simple','يتكون المبني للمجهول في الماضي من was/were + التصريف الثالث.',['The window was broken.','كُسرت النافذة.'],['The letters were sent yesterday.','أُرسلت الرسائل أمس.'],'استخدم was للمفرد وwere للجمع.'],
    ['Who','نستخدم who للحديث عن الأشخاص في الجملة الوصفية.',['The girl who called is my cousin.','الفتاة التي اتصلت ابنة عمي.'],['I know a man who speaks Spanish.','أعرف رجلًا يتحدث الإسبانية.'],'who تحل محل الشخص.'],
    ['Which','نستخدم which للحديث عن الأشياء والحيوانات في الجملة الوصفية.',['The book which I bought is useful.','الكتاب الذي اشتريته مفيد.'],['The dog which barked is small.','الكلب الذي نبح صغير.'],'which لا تصف الأشخاص عادة.'],
    ['Where','نستخدم where للإشارة إلى المكان في الجملة الوصفية.',['This is the café where we met.','هذا هو المقهى الذي التقينا فيه.'],['I visited the town where she lives.','زرت البلدة التي تعيش فيها.'],'where تعني في المكان الذي.'],
    ['Whose','نستخدم whose للتعبير عن الملكية في الجملة الوصفية.',['I know a boy whose father is a doctor.','أعرف ولدًا والده طبيب.'],['That is the student whose bag was lost.','ذلك الطالب الذي فُقدت حقيبته.'],'whose يأتي بعدها الاسم المملوك.'],
    ['That','نستخدم that في جمل وصفية محددة للأشخاص أو الأشياء.',['The film that we watched was funny.','الفيلم الذي شاهدناه كان مضحكًا.'],['The man that helped us was kind.','الرجل الذي ساعدنا كان لطيفًا.'],'قد تحل محل who أو which في بعض الجمل.'],
    ['Full Stop','نضع النقطة في نهاية الجملة الخبرية المكتملة.',['The lesson starts now.','يبدأ الدرس الآن.'],['My brother is at home.','أخي في المنزل.'],'لا تستخدم النقطة بدل علامة الاستفهام.'],
    ['Question Mark','نضع علامة الاستفهام في نهاية السؤال المباشر.',['Where are you going?','إلى أين أنت ذاهب؟'],['Did she call you?','هل اتصلت بك؟'],'السؤال غير المباشر قد ينتهي بنقطة.'],
    ['Capital Letters','نستخدم الحرف الكبير في بداية الجملة وأسماء الأشخاص والأماكن والأيام.',['Ahmed lives in Egypt.','أحمد يعيش في مصر.'],['We study English on Sunday.','ندرس الإنجليزية يوم الأحد.'],'ضمير I يكتب دائمًا حرفًا كبيرًا.'],
    ['Exclamations','نستخدم علامة التعجب للتعبير عن شعور قوي أو دهشة.',['What a beautiful day!','يا له من يوم جميل!'],['How clever you are!','ما أشد ذكاءك!'],'لا تكثر منها في الكتابة الرسمية.']
  ].map(x=>({title:x[0],explain:x[1],examples:[x[2],x[3]],note:x[4]}));
  grammar.push(...extraGrammar);
  const motivationMessages = [
    'كل يوم خطوة للأمام','أنت قادر على التقدم','تعلم اليوم، تميز غدًا','استمر، النجاح يقترب','ثقتك تصنع الفرق',
    'ابدأ الآن، لا تؤجل','كل محاولة تعلم جديد','أنت أقوى بالمعرفة','خطوة صغيرة تصنع إنجازًا','اجعل التعلم عادة يومية',
    'لا تتوقف عن المحاولة','أحسنت، واصل التقدم','تعلم بثقة وابتسم','كل كلمة تقربك للهدف','بالصبر يتحقق التميز',
    'اليوم فرصة جديدة للتعلم','ثق بقدرتك على التحسن','أنت تتطور كل يوم','المعرفة تفتح أبوابًا','ابدأ صغيرًا، حقق الكثير',
    'اجتهد، وسترى الفرق','تعلمك استثمار في نفسك','لا تخف من الخطأ','الخطأ بداية الفهم','حاول مرة أخرى بثقة',
    'كل إنجاز يبدأ بمحاولة','أنت أقرب مما تظن','استمرارك سر تقدمك','خصص وقتًا لحلمك','تعلم شيئًا جديدًا اليوم',
    'النجاح يحب المثابرة','كن فخورًا بتقدمك','خطواتك تصنع مستقبلك','بالتركيز تتجاوز الصعوبات','أنت تستطيع أن تتعلم',
    'كل درس يضيف لك','واصل، فأنت تتحسن','المثابرة تصنع النجاح','اجعل هدفك واضحًا','تعلم، جرّب، ثم أتقن',
    'وقتك اليوم يصنع غدك','لا تقارن، تطور','ابدأ بما تعرفه','زد معرفتك كل يوم','العزيمة تصنع الإنجاز',
    'كن شغوفًا بالمعرفة','الفرصة تبدأ بخطوة','تقدمك يستحق التقدير','كل يوم بداية جديدة','لا تستسلم للتحدي',
    'أنت تصنع نجاحك','الاجتهاد طريق التميز','كن أفضل من الأمس','المستقبل يبدأ الآن','أحلامك تحتاج خطوات',
    'ثابر حتى تتقن','أنت قادر على الإنجاز','كل دقيقة تعلم مهمة','المعرفة تمنحك الثقة','واصل طريقك بثبات',
    'التميز يبدأ بالاهتمام','اجعل لكل يوم هدفًا','تعلم وشارك ما تعرف','كل سؤال يقربك للفهم','كن صبورًا مع نفسك',
    'تدرب حتى تتقن','النجاح نتيجة الاستمرار','ابدأ، والباقي يأتي','اجعل اليوم مثمرًا','كل خطوة لها قيمة',
    'واصل اكتشاف قدراتك','التعلم رحلة ممتعة','اجعل طموحك أكبر','أنت تستحق فرصة النجاح','المعرفة تصنع فرصًا',
    'تعلم بثبات كل يوم','لا تتوقف عن التطور','النجاح يبدأ بالقرار','أفكارك تصنع مستقبلك','خطوة اليوم تصنع فرقًا',
    'استمر مهما كان التحدي','كل يوم فرصة للتميز','كن شجاعًا في التعلم','ثق في رحلتك','أنت قادر على الأفضل'
  ];
  function renderMotivation() {
    const output=document.getElementById('dailyMotivationText');
    if(output) output.textContent=motivationMessages[dayIndex(motivationMessages.length)];
  }

  function dayIndex(length) {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor(today / 86400000) % length;
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderLearning() {
    const root = document.getElementById('dailyPassage');
    if (!root) return;
    const item = passages[dayIndex(passages.length)];
    root.replaceChildren();
    const meta = make('div','daily-meta','مستوى الفقرة: ' + item.level + ' • تتغير يوميًا');
    root.appendChild(meta);
    const passage = make('div','daily-passage-text');
    item.lines.forEach(line => passage.appendChild(make('p','',line)));
    root.appendChild(passage);
    const questions = make('div','daily-questions');
    let answered = 0, correct = 0;
    const status = make('div','daily-result');
    item.questions.forEach((q, qi) => {
      const card = make('div','daily-question');
      card.appendChild(make('h4','', (qi + 1) + ') ' + q.q));
      const options = make('div','daily-options');
      q.o.forEach((option, oi) => {
        const btn = make('button','daily-option',option);
        btn.type = 'button';
        btn.addEventListener('click', () => {
          if (card.dataset.answered) return;
          card.dataset.answered = '1';
          answered++;
          const isCorrect = oi === q.a;
          if (isCorrect) correct++;
          Array.from(options.children).forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.a) b.classList.add('is-correct');
            else if (bi === oi && !isCorrect) b.classList.add('is-wrong');
          });
          if (answered === item.questions.length) {
            status.className = 'daily-result ' + (correct === 3 ? 'is-perfect' : 'is-complete');
            status.textContent = correct === 3
              ? '🏆 ممتاز! أجبت عن الأسئلة الثلاثة بشكل صحيح. استمر، أنت تتقدم كل يوم!'
              : 'أحسنت المحاولة! حصلت على ' + correct + ' من 3. راجع الفقرة وحاول مرة أخرى غدًا.';
          } else {
            status.textContent = isCorrect ? 'إجابة صحيحة! أكمل باقي الأسئلة.' : 'ليست الإجابة الصحيحة. أكمل وحاول الاستفادة من التصحيح.';
          }
        });
        options.appendChild(btn);
      });
      card.appendChild(options);
      questions.appendChild(card);
    });
    root.appendChild(questions);
    root.appendChild(status);
  }

  function renderGrammar() {
    const root = document.getElementById('dailyGrammar');
    if (!root) return;
    const item = grammar[dayIndex(grammar.length)];
    root.replaceChildren();
    root.appendChild(make('div','daily-meta','قاعدة اليوم • تتغير تلقائيًا كل يوم'));
    root.appendChild(make('h3','daily-grammar-title',item.title));
    root.appendChild(make('p','daily-grammar-explain',item.explain));
    const examples = make('div','daily-examples');
    item.examples.forEach(pair => {
      const example = make('div','daily-example');
      example.appendChild(make('p','daily-example-en',pair[0]));
      example.appendChild(make('p','daily-example-ar',pair[1]));
      examples.appendChild(example);
    });
    root.appendChild(examples);
    const note = make('div','daily-grammar-note');
    note.appendChild(make('strong','', 'خلي بالك: '));
    note.appendChild(document.createTextNode(item.note));
    root.appendChild(note);
  }

  function init() {
    renderLearning();
    renderGrammar();
    renderMotivation();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
