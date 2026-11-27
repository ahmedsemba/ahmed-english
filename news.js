(() => {
  'use strict';
  const dataUrl = 'news-data.json';
  const labels = { egypt: '🇪🇬 مصر والعالم', tech: '💻 التكنولوجيا', football: '⚽ كرة القدم' };
  const state = { category: 'egypt', items: [] };
  const root = document.getElementById('dailyNews');
  if (!root) return;

  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  function render() {
    const current = state.items.filter((item) => item.category === state.category);
    const tabs = Object.entries(labels).map(([key, label]) =>
      '<button type="button" class="news-tab' + (key === state.category ? ' active' : '') +
      '" data-news-category="' + key + '" aria-pressed="' + (key === state.category) + '">' + label + '</button>'
    ).join('');
    const cards = current.map((item, index) => {
      const title = escapeHtml(item.title_en);
      const summary = escapeHtml(item.summary_en);
      const titleAr = escapeHtml(item.title_ar);
      const summaryAr = escapeHtml(item.summary_ar);
      const source = escapeHtml(item.source || 'مصدر الخبر');
      const date = escapeHtml(item.date_label || '');
      const url = /^https?:\/\//i.test(item.url || '') ? item.url : '#';
      return '<article class="news-card">' +
        '<div class="news-card-top"><span class="news-source">' + source + '</span><time>' + date + '</time></div>' +
        '<h3 lang="en" dir="ltr">' + title + '</h3>' +
        '<p class="news-summary-en" lang="en" dir="ltr">' + summary + '</p>' +
        '<div class="news-arabic" dir="rtl"><strong>الترجمة العربية</strong><h4>' + titleAr + '</h4><p>' + summaryAr + '</p></div>' +
        '<div class="news-card-actions"><button type="button" class="news-listen" data-news-speak="' + index + '">🔊 استمع بالإنجليزية</button>' +
        '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">المصدر الأصلي ↗</a></div>' +
        '</article>';
    }).join('');
    root.innerHTML = '<div class="news-heading"><div><span class="news-eyebrow">LEARN ENGLISH WITH THE WORLD</span>' +
      '<h2>📰 خبر اليوم | Today’s News</h2><p>أخبار مختارة لتتعلم الإنجليزية وتتابع ما يحدث حولك</p></div>' +
      '<span class="news-updated">' + (state.items[0]?.updated_label ? 'آخر تحديث: ' + escapeHtml(state.items[0].updated_label) : '') + '</span></div>' +
      '<div class="news-tabs" role="group" aria-label="تصنيفات الأخبار">' + tabs + '</div>' +
      (cards || '<p class="news-empty">لا توجد أخبار متاحة في هذا القسم حاليًا. حاول مرة أخرى لاحقًا.</p>');
    root.querySelectorAll('[data-news-category]').forEach((button) => button.addEventListener('click', () => {
      state.category = button.dataset.newsCategory; render();
    }));
    root.querySelectorAll('[data-news-speak]').forEach((button) => button.addEventListener('click', () => {
      const item = current[Number(button.dataset.newsSpeak)];
      if (!item || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.title_en + '. ' + item.summary_en);
      utterance.lang = 'en-US'; utterance.rate = 0.88;
      const voice = speechSynthesis.getVoices().find((v) => /^en/i.test(v.lang));
      if (voice) utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }));
  }

  fetch(dataUrl + '?v=' + new Date().toISOString().slice(0, 10))
    .then((response) => { if (!response.ok) throw new Error('News unavailable'); return response.json(); })
    .then((data) => {
      state.items = Array.isArray(data.items) ? data.items : [];
      render();
    })
    .catch(() => {
      root.innerHTML = '<section class="news-heading"><div><span class="news-eyebrow">LEARN ENGLISH WITH THE WORLD</span><h2>📰 خبر اليوم | Today’s News</h2><p>سيتم عرض الأخبار اليومية هنا عند اكتمال أول تحديث تلقائي.</p></div></section><p class="news-empty">الأخبار غير متاحة مؤقتًا. أعد المحاولة لاحقًا.</p>';
    });
})();