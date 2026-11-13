(() => {
  'use strict';

  // بنك كلمات عام متدرج من A1 إلى B1، متاح لكل زوار المنصة.
  // تتغير الكلمة حسب تاريخ اليوم المحلي دون اتصال بقاعدة البيانات.
  const WORDS = [
    // A1
    { word: "Brave", meaning: "شجاع", level: "A1", example: "The brave boy helped his friend.", exampleAr: "ساعد الولد الشجاع صديقه." },
    { word: "Happy", meaning: "سعيد", level: "A1", example: "I feel happy today.", exampleAr: "أشعر بالسعادة اليوم." },
    { word: "Family", meaning: "عائلة", level: "A1", example: "My family is very kind.", exampleAr: "عائلتي لطيفة جداً." },
    { word: "Friend", meaning: "صديق", level: "A1", example: "Ali is my best friend.", exampleAr: "علي هو أفضل أصدقائي." },
    { word: "School", meaning: "مدرسة", level: "A1", example: "We go to school every day.", exampleAr: "نذهب إلى المدرسة كل يوم." },
    { word: "Water", meaning: "ماء", level: "A1", example: "Please drink some water.", exampleAr: "من فضلك اشرب بعض الماء." },
    { word: "Beautiful", meaning: "جميل", level: "A1", example: "The garden is beautiful.", exampleAr: "الحديقة جميلة." },
    { word: "Clever", meaning: "ذكي", level: "A1", example: "Mona is a clever student.", exampleAr: "منى طالبة ذكية." },
    { word: "Morning", meaning: "الصباح", level: "A1", example: "I get up early in the morning.", exampleAr: "أستيقظ مبكراً في الصباح." },
    { word: "Animal", meaning: "حيوان", level: "A1", example: "The cat is a friendly animal.", exampleAr: "القطة حيوان أليف." },
    { word: "Window", meaning: "نافذة", level: "A1", example: "Open the window, please.", exampleAr: "افتح النافذة من فضلك." },
    { word: "Garden", meaning: "حديقة", level: "A1", example: "There are flowers in the garden.", exampleAr: "توجد زهور في الحديقة." },
    { word: "Teacher", meaning: "معلّم", level: "A1", example: "Our teacher explains the lesson.", exampleAr: "يشرح معلمنا الدرس." },
    { word: "Hungry", meaning: "جائع", level: "A1", example: "The children are hungry.", exampleAr: "الأطفال جائعون." },
    { word: "Thirsty", meaning: "عطشان", level: "A1", example: "I am thirsty after the game.", exampleAr: "أنا عطشان بعد المباراة." },
    { word: "Funny", meaning: "مضحك", level: "A1", example: "The film was very funny.", exampleAr: "كان الفيلم مضحكاً جداً." },
    { word: "Market", meaning: "سوق", level: "A1", example: "My mother goes to the market.", exampleAr: "تذهب أمي إلى السوق." },
    { word: "Quiet", meaning: "هادئ", level: "A1", example: "The library is quiet.", exampleAr: "المكتبة هادئة." },
    { word: "Clean", meaning: "نظيف", level: "A1", example: "Keep your room clean.", exampleAr: "حافظ على نظافة غرفتك." },
    { word: "Quick", meaning: "سريع", level: "A1", example: "He is a quick runner.", exampleAr: "هو عدّاء سريع." },
    { word: "Strong", meaning: "قوي", level: "A1", example: "My brother is strong.", exampleAr: "أخي قوي." },
    { word: "Small", meaning: "صغير", level: "A1", example: "The little bird is small.", exampleAr: "العصفور الصغير حجمه صغير." },
    { word: "Different", meaning: "مختلف", level: "A1", example: "The two bags are different.", exampleAr: "الحقيبتان مختلفتان." },
    { word: "Listen", meaning: "يستمع", level: "A1", example: "Listen to your teacher carefully.", exampleAr: "استمع إلى معلمك باهتمام." },
    { word: "Answer", meaning: "إجابة / يجيب", level: "A1", example: "Can you answer this question?", exampleAr: "هل تستطيع الإجابة عن هذا السؤال؟" },
    { word: "Always", meaning: "دائماً", level: "A1", example: "I always do my homework.", exampleAr: "أؤدي واجبي دائماً." },
    { word: "Sometimes", meaning: "أحياناً", level: "A1", example: "We sometimes play football.", exampleAr: "نلعب كرة القدم أحياناً." },
    { word: "Before", meaning: "قبل", level: "A1", example: "Wash your hands before lunch.", exampleAr: "اغسل يديك قبل الغداء." },
    { word: "Behind", meaning: "خلف", level: "A1", example: "The ball is behind the door.", exampleAr: "الكرة خلف الباب." },
    { word: "Because", meaning: "لأن", level: "A1", example: "I am smiling because I am happy.", exampleAr: "أنا أبتسم لأنني سعيد." },

    // A2
    { word: "Adventure", meaning: "مغامرة", level: "A2", example: "Our trip was a great adventure.", exampleAr: "كانت رحلتنا مغامرة رائعة." },
    { word: "Improve", meaning: "يطوّر / يحسّن", level: "A2", example: "Reading can improve your English.", exampleAr: "يمكن للقراءة أن تحسّن لغتك الإنجليزية." },
    { word: "Healthy", meaning: "صحي", level: "A2", example: "Eating fruit is a healthy habit.", exampleAr: "تناول الفاكهة عادة صحية." },
    { word: "Environment", meaning: "البيئة", level: "A2", example: "We should protect the environment.", exampleAr: "يجب أن نحافظ على البيئة." },
    { word: "Journey", meaning: "رحلة", level: "A2", example: "The journey took two hours.", exampleAr: "استغرقت الرحلة ساعتين." },
    { word: "Polite", meaning: "مهذب", level: "A2", example: "It is polite to say thank you.", exampleAr: "من الأدب أن تقول شكراً." },
    { word: "Careful", meaning: "حذر", level: "A2", example: "Be careful when you cross the road.", exampleAr: "كن حذراً عندما تعبر الطريق." },
    { word: "Popular", meaning: "مشهور / محبوب", level: "A2", example: "Football is popular in many countries.", exampleAr: "كرة القدم محبوبة في دول كثيرة." },
    { word: "Prepare", meaning: "يستعد / يجهّز", level: "A2", example: "I prepare my school bag at night.", exampleAr: "أجهز حقيبتي المدرسية ليلاً." },
    { word: "Practice", meaning: "يتدرّب / ممارسة", level: "A2", example: "You need to practice every day.", exampleAr: "تحتاج إلى التدريب كل يوم." },
    { word: "Discover", meaning: "يكتشف", level: "A2", example: "Scientists discover new things.", exampleAr: "يكتشف العلماء أشياء جديدة." },
    { word: "Invite", meaning: "يدعو", level: "A2", example: "I will invite my friends to the party.", exampleAr: "سأدعو أصدقائي إلى الحفل." },
    { word: "Useful", meaning: "مفيد", level: "A2", example: "This dictionary is very useful.", exampleAr: "هذا القاموس مفيد جداً." },
    { word: "Dangerous", meaning: "خطير", level: "A2", example: "It is dangerous to play in the street.", exampleAr: "اللعب في الشارع أمر خطير." },
    { word: "Celebrate", meaning: "يحتفل", level: "A2", example: "We celebrate special days together.", exampleAr: "نحتفل بالمناسبات الخاصة معاً." },
    { word: "Borrow", meaning: "يستعير", level: "A2", example: "Can I borrow your pencil?", exampleAr: "هل يمكنني استعارة قلمك؟" },
    { word: "Return", meaning: "يعيد / يعود", level: "A2", example: "Please return the book tomorrow.", exampleAr: "من فضلك أعد الكتاب غداً." },
    { word: "Arrive", meaning: "يصل", level: "A2", example: "We arrive at school early.", exampleAr: "نصل إلى المدرسة مبكراً." },
    { word: "Advice", meaning: "نصيحة", level: "A2", example: "My father gave me good advice.", exampleAr: "أعطاني أبي نصيحة جيدة." },
    { word: "Choose", meaning: "يختار", level: "A2", example: "Choose the correct answer.", exampleAr: "اختر الإجابة الصحيحة." },
    { word: "Explain", meaning: "يشرح", level: "A2", example: "Can you explain this word?", exampleAr: "هل يمكنك شرح هذه الكلمة؟" },
    { word: "Remember", meaning: "يتذكر", level: "A2", example: "Remember to bring your notebook.", exampleAr: "تذكر أن تحضر كراستك." },
    { word: "Forget", meaning: "ينسى", level: "A2", example: "Do not forget your keys.", exampleAr: "لا تنس مفاتيحك." },
    { word: "Friendly", meaning: "ودود", level: "A2", example: "Our new neighbour is friendly.", exampleAr: "جارنا الجديد ودود." },
    { word: "Famous", meaning: "مشهور", level: "A2", example: "The city is famous for its history.", exampleAr: "تشتهر المدينة بتاريخها." },
    { word: "Share", meaning: "يشارك", level: "A2", example: "Good friends share their ideas.", exampleAr: "يتشارك الأصدقاء الجيدون أفكارهم." },
    { word: "Collect", meaning: "يجمع", level: "A2", example: "She likes to collect stamps.", exampleAr: "تحب جمع الطوابع." },
    { word: "Comfortable", meaning: "مريح", level: "A2", example: "These shoes are comfortable.", exampleAr: "هذه الأحذية مريحة." },
    { word: "Excellent", meaning: "ممتاز", level: "A2", example: "You did an excellent job.", exampleAr: "لقد أديت عملاً ممتازاً." },
    { word: "Suddenly", meaning: "فجأة", level: "A2", example: "Suddenly, it started to rain.", exampleAr: "بدأ المطر فجأة." },

    // B1
    { word: "Achieve", meaning: "يحقق / ينجز", level: "B1", example: "You can achieve your goals with hard work.", exampleAr: "يمكنك تحقيق أهدافك بالعمل الجاد." },
    { word: "Confident", meaning: "واثق", level: "B1", example: "She feels confident before the exam.", exampleAr: "تشعر بالثقة قبل الامتحان." },
    { word: "Opportunity", meaning: "فرصة", level: "B1", example: "This course is a good opportunity to learn.", exampleAr: "هذه الدورة فرصة جيدة للتعلم." },
    { word: "Responsible", meaning: "مسؤول", level: "B1", example: "Everyone is responsible for keeping the place clean.", exampleAr: "كل شخص مسؤول عن الحفاظ على نظافة المكان." },
    { word: "Challenge", meaning: "تحدٍّ", level: "B1", example: "Learning a new language is a challenge.", exampleAr: "تعلم لغة جديدة تحدٍّ." },
    { word: "Decision", meaning: "قرار", level: "B1", example: "It was a difficult decision to make.", exampleAr: "كان اتخاذ القرار صعباً." },
    { word: "Develop", meaning: "يطوّر", level: "B1", example: "Reading helps develop your imagination.", exampleAr: "تساعد القراءة على تنمية خيالك." },
    { word: "Experience", meaning: "خبرة / تجربة", level: "B1", example: "Travelling can be a wonderful experience.", exampleAr: "يمكن أن يكون السفر تجربة رائعة." },
    { word: "Independent", meaning: "مستقل", level: "B1", example: "She is becoming more independent.", exampleAr: "أصبحت أكثر اعتماداً على نفسها." },
    { word: "Encourage", meaning: "يشجّع", level: "B1", example: "Good teachers encourage their students.", exampleAr: "يشجع المعلمون الجيدون طلابهم." },
    { word: "Advantage", meaning: "ميزة", level: "B1", example: "One advantage of reading is learning new words.", exampleAr: "من مزايا القراءة تعلم كلمات جديدة." },
    { word: "Community", meaning: "مجتمع", level: "B1", example: "We should help our local community.", exampleAr: "يجب أن نساعد مجتمعنا المحلي." },
    { word: "Reduce", meaning: "يقلل", level: "B1", example: "We should reduce the amount of plastic we use.", exampleAr: "يجب أن نقلل كمية البلاستيك التي نستخدمها." },
    { word: "Protect", meaning: "يحمي", level: "B1", example: "Trees protect the soil and provide shade.", exampleAr: "تحمي الأشجار التربة وتوفر الظل." },
    { word: "Benefit", meaning: "فائدة / يستفيد", level: "B1", example: "Exercise has many benefits.", exampleAr: "للرياضة فوائد كثيرة." },
    { word: "Suggest", meaning: "يقترح", level: "B1", example: "I suggest taking a short break.", exampleAr: "أقترح أخذ استراحة قصيرة." },
    { word: "Although", meaning: "على الرغم من", level: "B1", example: "Although it was cold, we went outside.", exampleAr: "على الرغم من أن الجو كان بارداً، خرجنا." },
    { word: "However", meaning: "ومع ذلك", level: "B1", example: "The task was difficult; however, we finished it.", exampleAr: "كانت المهمة صعبة، ومع ذلك أنهيناها." },
    { word: "Avoid", meaning: "يتجنب", level: "B1", example: "Try to avoid wasting your time.", exampleAr: "حاول تجنب إضاعة وقتك." },
    { word: "Achievable", meaning: "قابل للتحقيق", level: "B1", example: "Set small and achievable goals.", exampleAr: "ضع أهدافاً صغيرة قابلة للتحقيق." },
    { word: "Volunteer", meaning: "متطوع / يتطوع", level: "B1", example: "Many students volunteer to help others.", exampleAr: "يتطوع كثير من الطلاب لمساعدة الآخرين." },
    { word: "Compare", meaning: "يقارن", level: "B1", example: "Do not compare yourself with others.", exampleAr: "لا تقارن نفسك بالآخرين." },
    { word: "Tradition", meaning: "تقليد / عادة", level: "B1", example: "Every family has its own traditions.", exampleAr: "لكل عائلة تقاليدها الخاصة." },
    { word: "Solution", meaning: "حل", level: "B1", example: "We need to find a solution to this problem.", exampleAr: "نحتاج إلى إيجاد حل لهذه المشكلة." },
    { word: "Imagine", meaning: "يتخيل", level: "B1", example: "Imagine living in a world without cars.", exampleAr: "تخيل العيش في عالم بلا سيارات." },
    { word: "Respect", meaning: "يحترم / احترام", level: "B1", example: "We should respect different opinions.", exampleAr: "يجب أن نحترم الآراء المختلفة." },
    { word: "Require", meaning: "يتطلب", level: "B1", example: "This job requires patience.", exampleAr: "تتطلب هذه الوظيفة الصبر." },
    { word: "Successful", meaning: "ناجح", level: "B1", example: "A successful student keeps learning.", exampleAr: "الطالب الناجح يواصل التعلم." },
    { word: "Communicate", meaning: "يتواصل", level: "B1", example: "We use language to communicate with others.", exampleAr: "نستخدم اللغة للتواصل مع الآخرين." },
    { word: "Protective", meaning: "واقٍ / حامٍ", level: "B1", example: "Wearing a helmet is protective.", exampleAr: "ارتداء الخوذة وسيلة للوقاية." }
  ];

  const anchor = Date.UTC(2026, 0, 1);
  const now = new Date();
  const todayKey = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const dayNumber = Math.floor((todayUTC - anchor) / 86400000);
  const word = WORDS[((dayNumber % WORDS.length) + WORDS.length) % WORDS.length];

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function renderWord() {
    setText('wordDayWord', word.word);
    setText('wordDayMeaning', word.meaning);
    setText('wordDayLevel', word.level);
    setText('wordDayExample', word.example);
    setText('wordDayExampleAr', word.exampleAr);
    setText('wordDayDate', new Date(now.getFullYear(), now.getMonth(), now.getDate()).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }));
    window.currentWordOfDay = word;
  }

  window.speakWordOfDay = function () {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      alert('عذراً، متصفحك لا يدعم تشغيل النطق الصوتي. جرّب فتح المنصة من Google Chrome.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => /^en(-|_)/i.test(v.lang));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.speak(utterance);
  };

  window.speakWordExample = function () {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      alert('عذراً، متصفحك لا يدعم تشغيل النطق الصوتي. جرّب فتح المنصة من Google Chrome.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.example);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => /^en(-|_)/i.test(v.lang));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.speak(utterance);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWord, { once: true });
  } else {
    renderWord();
  }
})();