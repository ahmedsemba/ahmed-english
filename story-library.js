(() => {
  'use strict';

  const kids = [
    { title: 'The Little Lost Rabbit', ar: 'الأرنب الصغير التائه', icon: '🐰', level: 'Easy English', text: `One sunny morning, a little rabbit named Ben went into the forest. He wanted to find fresh carrots. He followed a butterfly and soon lost his way. Ben felt worried, but he remembered his mother's advice: "Stay calm and ask for help." He met a kind squirrel and told him about his home. The squirrel knew the way and walked with Ben. At last, Ben saw his little house. His mother was happy to see him. Ben thanked the squirrel and promised to be more careful.` },
    { title: 'Mia and the Magic Seeds', ar: 'ميا والبذور السحرية', icon: '🌱', level: 'Easy English', text: `Mia found three tiny seeds in her garden. Her grandfather told her to plant them and give them water every day. Mia made three small holes and put the seeds inside. She watered the soil and waited. After a few days, green leaves appeared. Mia was excited. She looked after the plants every morning. Soon, beautiful flowers opened in the garden. Bees and butterflies came to visit. Mia learned that small things can grow into wonderful things when we care for them.` },
    { title: 'The Helpful Elephant', ar: 'الفيل المساعد', icon: '🐘', level: 'Easy English', text: `Ellie was a young elephant who lived near a river. One afternoon, she heard a small bird crying. The bird had dropped its nest from a tree. Ellie wanted to help. She used her long trunk to lift the nest carefully. Then she placed it on a strong, low branch. The bird was very happy and thanked Ellie. The next day, the bird sang a beautiful song for her. Ellie learned that helping others can make everyone happy.` },
    { title: 'A Day at the Beach', ar: 'يوم على الشاطئ', icon: '🏖️', level: 'Easy English', text: `Sam and his sister Lily went to the beach with their parents. They built a big sandcastle and found pretty shells. Sam wanted to swim, but he listened to his father and stayed near the family. After lunch, they played with a ball. Lily saw some rubbish on the sand, so they put it in a bin. Before going home, they watched the sunset. It was a lovely day, and they promised to visit the beach again.` },
    { title: 'The Honest Woodcutter', ar: 'الحطاب الأمين', icon: '🪓', level: 'Easy English', text: `A poor woodcutter worked beside a river. One day, his axe fell into the water. He sat down and felt sad because he needed it for work. A kind spirit appeared and showed him a golden axe. The woodcutter said, "That is not mine." The spirit showed him a silver axe, but he said no again. At last, the spirit brought his old axe. The woodcutter smiled. The spirit was pleased with his honesty and gave him all three axes.` },
    { title: 'The Brave Little Turtle', ar: 'السلحفاة الصغيرة الشجاعة', icon: '🐢', level: 'Easy English', text: `Tina was a small turtle who wanted to cross a wide garden. Some birds flew over the garden, but Tina had to walk slowly. She did not give up. She took one small step after another. On the way, she helped an ant move a leaf. At last, she reached the other side. Her friends cheered for her. Tina was proud because she finished what she started. She learned that being slow is not a problem when you keep trying.` },
    { title: 'The Red Balloon', ar: 'المنطاد الأحمر', icon: '🎈', level: 'Easy English', text: `Omar received a red balloon on his birthday. He carried it to the park and played with his friends. A little girl nearby was sad because her balloon had burst. Omar looked at his red balloon and decided to share it. He gave it to the girl and smiled. Her face became bright and happy. Omar's friends clapped. Later, his father bought him another balloon. Omar learned that sharing can bring twice as much happiness.` },
    { title: 'Nora Saves the Bees', ar: 'نورا تنقذ النحل', icon: '🐝', level: 'Easy English', text: `Nora loved flowers and small animals. One day, she noticed that there were fewer bees in her garden. Her teacher explained that bees help flowers grow. Nora planted more colorful flowers and put a small bowl of clean water outside. She never hurt the bees. Soon, many bees came back to the garden. Nora told her classmates what she had done. They decided to plant flowers at school too. Nora was happy to help nature.` },
    { title: 'The Clever Fox', ar: 'الثعلب الذكي', icon: '🦊', level: 'Easy English', text: `A fox was walking through the forest when he saw a jar of water. The water was too low for him to reach. He looked around and found some small stones. He dropped the stones into the jar one by one. The water slowly rose. Soon, the fox could drink. He felt proud of his idea. A little rabbit watched him and learned an important lesson: think carefully before you give up.` },
    { title: 'The Star in the Window', ar: 'نجمة في النافذة', icon: '⭐', level: 'Easy English', text: `Every night, Sara looked at a bright star from her bedroom window. She called it her little friend. One evening, the sky was cloudy and she could not see it. Sara felt disappointed. Her grandmother told her that the star was still there, even behind the clouds. Sara smiled and went to bed. The next night, the sky was clear again. Sara saw her star and remembered her grandmother's words: some good things are there even when we cannot see them.` }
  ];

  const older = [
    { title: 'The Library That Changed a Life', ar: 'المكتبة التي غيّرت حياة', icon: '📚', level: 'Intermediate English', text: `When Daniel moved to a new town, he knew nobody and felt out of place. His school was large, and every student seemed to have a group of friends. One rainy afternoon, he entered the public library to escape the weather. A librarian noticed him looking at a book about space and recommended a weekly science club. Daniel decided to attend, although he was nervous.

At the first meeting, he listened more than he spoke. The other members welcomed him and asked about his interests. Over the next few weeks, Daniel began sharing ideas and helping with small projects. He discovered that friendship often begins with a shared interest and a simple conversation.

By the end of the term, Daniel was no longer the quiet newcomer. He had friends, a stronger interest in science, and a place where he felt welcome. The library had offered more than books; it had opened a door to a new beginning.` },
    { title: 'A Journey Beyond the Map', ar: 'رحلة خارج حدود الخريطة', icon: '🧭', level: 'Intermediate English', text: `Maya had always planned every detail of her life. She kept lists, followed schedules, and avoided surprises. During a school project, however, her team had to visit a village and interview local people about traditional crafts. Their bus broke down several kilometres from the village.

At first, Maya was frustrated. The team had no clear plan, and the weather was getting warmer. Then a shop owner offered them directions and invited them to wait in the shade. While they waited, Maya began talking to him about the village. He introduced them to a family of skilled basket makers.

The unexpected delay became the most valuable part of the trip. Maya learned that careful planning is useful, but flexibility matters too. Sometimes an unfamiliar road leads to an experience that no map could have promised.` },
    { title: 'The Power of a Small Promise', ar: 'قوة الوعد الصغير', icon: '🤝', level: 'Intermediate English', text: `Every Monday, Mr Harris promised his students that he would read with them for fifteen minutes. It was a small promise, but he kept it even on busy days. At first, only a few students seemed interested. Some preferred games, while others believed reading was difficult.

Mr Harris chose short, exciting texts and allowed students to take turns reading aloud. He never laughed at mistakes. Instead, he helped them pronounce difficult words and explained new expressions. After several weeks, more students began bringing books from home.

One student, Adam, had struggled with reading for years. Slowly, he became more confident and started borrowing books from the school library. At the end of the term, he thanked his teacher. Mr Harris realised that progress does not always come from big changes. Often, it grows from small actions repeated with patience.` },
    { title: 'The City Garden', ar: 'حديقة وسط المدينة', icon: '🌿', level: 'Intermediate English', text: `A crowded neighbourhood had an empty piece of land between two buildings. For years, people used it to leave unwanted objects. One spring, a group of neighbours suggested turning it into a community garden.

The first meeting was difficult. Some residents wanted a playground, while others preferred a quiet place to sit. Instead of arguing, they made a list of everyone's needs. They agreed to create flower beds, a small vegetable area, and a bench under a tree.

The work took several weekends. Children painted signs, older residents shared gardening advice, and local shops donated tools. By summer, the empty land had become a green space full of life.

The garden did more than improve the neighbourhood. It helped people who had lived side by side for years finally get to know one another.` },
    { title: 'An Unexpected Teacher', ar: 'معلم غير متوقع', icon: '🎨', level: 'Intermediate English', text: `Lena wanted to learn how to draw, but she believed she had no talent. She watched online lessons and copied pictures, yet she became disappointed whenever her work looked different from the examples.

One afternoon, she visited her uncle, who repaired old furniture. He showed her how he studied a damaged chair before fixing it. He did not rush. He observed the shape, noticed the weak parts, and tried one solution at a time.

Lena realised that drawing also required observation and practice. She began carrying a small notebook and sketching ordinary objects: a cup, a tree, or a street lamp. Her drawings were not perfect, but they improved.

Her uncle had never taught an art class, yet he gave her an important lesson: skill is often built through attention, patience, and the courage to begin again.` },
    { title: 'The Last Train Home', ar: 'القطار الأخير إلى المنزل', icon: '🚆', level: 'Intermediate English', text: `After a long day at work, Karim reached the station just as the last train was preparing to leave. He hurried towards the platform, but the doors closed before he arrived. At first, he felt angry with himself. He had spent too much time answering messages and had forgotten to check the clock.

While waiting for a family member to collect him, Karim noticed an elderly man looking confused near the ticket machine. He offered to help. The man was visiting the city and did not understand the machine's instructions. Karim explained the options and helped him find the correct platform for the morning.

The experience changed Karim's mood. He still had to wait, but the evening no longer felt wasted. He decided to manage his time better and pay more attention to the people around him. A missed train had reminded him of two valuable things: responsibility and kindness.` },
    { title: 'A Note from the Future', ar: 'رسالة من المستقبل', icon: '✉️', level: 'Intermediate English', text: `While cleaning her desk, Salma found a note she had written to herself five years earlier. She had listed her hopes: to become more confident, learn another language, and help her community. She smiled at the simple handwriting and wondered how much had changed.

Not every dream had come true. She had changed her plans more than once, and some goals no longer seemed important. Yet she had learned a language, made new friends, and volunteered at a local learning centre.

Salma understood that growth was not a straight line. The person who wrote the note could not have predicted every difficulty or opportunity. She wrote a new message, not as a strict list of demands, but as a reminder to remain curious, work steadily, and treat herself and others with patience.` },
    { title: 'The Value of Listening', ar: 'قيمة الاستماع', icon: '👂', level: 'Intermediate English', text: `During a group assignment, two classmates disagreed about how to present their research. Each believed that the other was ignoring important details. Their discussion became louder, and the rest of the group stopped working.

Nadia suggested that they take turns explaining their ideas without interruption. At first, both students found this difficult. However, when they listened carefully, they discovered that their suggestions were not completely different. One had focused on clear information, while the other had thought about how to make the presentation interesting.

They combined the strongest parts of both plans and completed the assignment successfully. Nadia learned that listening is not simply waiting for a chance to speak. It means trying to understand another person's point of view. That skill can solve problems in classrooms, workplaces, and everyday life.` },
    { title: 'The Mountain Path', ar: 'طريق الجبل', icon: '⛰️', level: 'Intermediate English', text: `A group of friends decided to walk along a mountain path during their holiday. They had prepared water, food, and a map, but they had different levels of experience. At the beginning, everyone walked quickly. After an hour, one member of the group became tired.

The others wanted to continue, but their guide reminded them that a successful journey was not about being the fastest. They stopped in a safe place, shared water, and checked the route. The group then continued at a comfortable pace.

When they reached the viewpoint, the valley below looked beautiful. The friends took photographs and enjoyed the quiet. They understood that preparation matters, but cooperation matters just as much. Reaching a goal together can be more rewarding than reaching it first.` },
    { title: 'A Better Way to Learn', ar: 'طريقة أفضل للتعلم', icon: '💡', level: 'Intermediate English', text: `For months, Youssef studied English by reading long lists of words the night before a test. He could remember some meanings for a short time, but he often forgot them later. His teacher suggested a different approach.

Youssef began learning a few words each day. He wrote a simple sentence for every new word, listened to its pronunciation, and reviewed older words at the end of the week. He also started reading short stories and guessing the meanings of unfamiliar words from context.

The new routine felt easier to maintain. After several weeks, Youssef noticed that he could understand more of what he read and use new expressions in conversation. His progress came from regular practice rather than last-minute effort.

He learned that effective learning is not always about studying longer. It is often about choosing useful methods and following them consistently.` }
  ];

  const listEl = document.getElementById('storyList');
  const listSection = document.getElementById('storyListSection');
  const reader = document.getElementById('storyReader');
  const tabs = [...document.querySelectorAll('.story-tab')];
  let category = window.location.hash === '#older' ? 'older' : 'kids';
  let currentStory = null;
  let activeUtterance = null;

  tabs.forEach(tab => {
    const active = tab.dataset.category === category;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });

  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function renderList() {
    const data = category === 'kids' ? kids : older;
    document.getElementById('storyCategoryTitle').textContent = category === 'kids' ? 'قصص قصيرة للصغار' : 'قصص باللغة الإنجليزية للكبار';
    document.getElementById('storyCategoryDescription').textContent = category === 'kids'
      ? 'حكايات قصيرة بكلمات سهلة ورسومات توضيحية.'
      : 'قصص أطول بمفردات وتعبيرات أكثر تنوعًا لتطوير القراءة.';
    document.getElementById('storyCount').textContent = data.length + ' قصص';
    listEl.innerHTML = data.map((story, index) => `
      <button type="button" class="story-card" data-story-index="${index}">
        <span class="story-card-art" aria-hidden="true">${story.icon}</span>
        <span class="story-card-copy">
          <strong>${escapeHtml(story.title)}</strong>
          <small>${escapeHtml(story.ar)}</small>
          <em>${escapeHtml(story.level)} · ${category === 'kids' ? 'قصة قصيرة' : 'قصة مطوّلة'}</em>
        </span>
        <span class="story-card-arrow" aria-hidden="true">←</span>
      </button>`).join('');
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    activeUtterance = null;
    setAudioButtons();
  }

  function setAudioButtons() {
    const speaking = 'speechSynthesis' in window && window.speechSynthesis.speaking;
    const paused = 'speechSynthesis' in window && window.speechSynthesis.paused;
    document.getElementById('pauseStoryBtn').disabled = !speaking || paused;
    document.getElementById('resumeStoryBtn').disabled = !paused;
    document.getElementById('stopStoryBtn').disabled = !speaking && !paused;
  }

  function openStory(index) {
    stopSpeech();
    const data = category === 'kids' ? kids : older;
    currentStory = data[index];
    document.getElementById('readerCover').textContent = currentStory.icon;
    document.getElementById('readerMeta').textContent = currentStory.level;
    document.getElementById('readerTitle').textContent = currentStory.title;
    document.getElementById('readerArabicTitle').textContent = currentStory.ar;
    document.getElementById('readerText').textContent = currentStory.text;
    document.getElementById('readerAudioStatus').textContent = 'اضغط «استمع للقصة» لسماع النص باللغة الإنجليزية.';
    listSection.hidden = true;
    reader.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAudioButtons();
  }

  function speakStory() {
    if (!currentStory) return;
    if (!('speechSynthesis' in window)) {
      document.getElementById('readerAudioStatus').textContent = 'عذرًا، المتصفح لا يدعم القراءة الصوتية. جرّب فتح المنصة من Chrome.';
      return;
    }
    stopSpeech();
    activeUtterance = new SpeechSynthesisUtterance(currentStory.text.replace(/\n+/g, ' '));
    activeUtterance.lang = 'en-US';
    activeUtterance.rate = 0.88;
    activeUtterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => /^en(-|_)/i.test(voice.lang) && /Google|Microsoft|English/i.test(voice.name))
      || voices.find(voice => /^en(-|_)/i.test(voice.lang));
    if (englishVoice) activeUtterance.voice = englishVoice;
    activeUtterance.onstart = () => {
      document.getElementById('readerAudioStatus').textContent = '🔊 القصة تُقرأ الآن باللغة الإنجليزية.';
      setAudioButtons();
    };
    activeUtterance.onend = () => {
      document.getElementById('readerAudioStatus').textContent = '👏 انتهت قراءة القصة. يمكنك الاستماع إليها مرة أخرى.';
      activeUtterance = null;
      setAudioButtons();
    };
    activeUtterance.onerror = () => {
      document.getElementById('readerAudioStatus').textContent = 'تعذر تشغيل الصوت. تأكد من تفعيل الصوت في جهازك وحاول مرة أخرى.';
      activeUtterance = null;
      setAudioButtons();
    };
    window.speechSynthesis.speak(activeUtterance);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => {
    stopSpeech();
    category = tab.dataset.category;
    history.replaceState(null, '', '#' + category);
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    reader.hidden = true;
    listSection.hidden = false;
    renderList();
  }));

  listEl.addEventListener('click', event => {
    const card = event.target.closest('[data-story-index]');
    if (card) openStory(Number(card.dataset.storyIndex));
  });

  document.getElementById('storyBackBtn').addEventListener('click', () => {
    stopSpeech();
    reader.hidden = true;
    listSection.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('speakStoryBtn').addEventListener('click', speakStory);
  document.getElementById('pauseStoryBtn').addEventListener('click', () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      document.getElementById('readerAudioStatus').textContent = '⏸ القراءة متوقفة مؤقتًا.';
      document.getElementById('pauseStoryBtn').disabled = true;
      document.getElementById('resumeStoryBtn').disabled = false;
    }
  });
  document.getElementById('resumeStoryBtn').addEventListener('click', () => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      document.getElementById('readerAudioStatus').textContent = '🔊 تم استكمال القراءة.';
      document.getElementById('pauseStoryBtn').disabled = false;
      document.getElementById('resumeStoryBtn').disabled = true;
    } else if (currentStory) {
      speakStory();
    }
  });
  document.getElementById('stopStoryBtn').addEventListener('click', () => {
    stopSpeech();
    document.getElementById('readerAudioStatus').textContent = 'تم إيقاف القراءة.';
  });

  window.addEventListener('beforeunload', stopSpeech);
  renderList();
})();