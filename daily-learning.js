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
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
