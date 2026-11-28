(() => {
  const dateNode = document.getElementById('homeTodayDate');
  const tempNode = document.getElementById('homeWeatherTemp');
  const textNode = document.getElementById('homeWeatherText');
  const detailsNode = document.getElementById('homeWeatherDetails');
  const iconNode = document.getElementById('homeWeatherIcon');
  const updatedNode = document.getElementById('homeWeatherUpdated');

  if (!dateNode || !tempNode || !textNode) return;

  const cairoTime = { timeZone: 'Africa/Cairo' };
  const updateDate = () => {
    const now = new Date();
    dateNode.textContent = new Intl.DateTimeFormat('ar-EG', {
      ...cairoTime, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(now);
    dateNode.dateTime = new Intl.DateTimeFormat('en-CA', {
      ...cairoTime, year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);
  };

  const conditions = {
    0: ['سماء صافية', '☀️'],
    1: ['غائم جزئيًا', '🌤️'],
    2: ['غائم جزئيًا', '⛅'],
    3: ['غائم', '☁️'],
    45: ['شبورة', '🌫️'],
    48: ['شبورة كثيفة', '🌫️'],
    51: ['رذاذ خفيف', '🌦️'],
    53: ['رذاذ متوسط', '🌦️'],
    55: ['رذاذ كثيف', '🌧️'],
    61: ['أمطار خفيفة', '🌦️'],
    63: ['أمطار متوسطة', '🌧️'],
    65: ['أمطار غزيرة', '🌧️'],
    71: ['ثلوج خفيفة', '🌨️'],
    73: ['ثلوج متوسطة', '🌨️'],
    75: ['ثلوج كثيفة', '❄️'],
    80: ['زخات مطر خفيفة', '🌦️'],
    81: ['زخات مطر متوسطة', '🌧️'],
    82: ['زخات مطر قوية', '⛈️'],
    95: ['عواصف رعدية', '⛈️'],
    96: ['عواصف رعدية وبَرَد', '⛈️'],
    99: ['عواصف رعدية قوية', '⛈️']
  };

  async function updateWeather() {
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Africa%2FCairo';
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Weather service unavailable');
      const data = await response.json();
      const current = data.current;
      const [condition, icon] = conditions[current.weather_code] || ['حالة الطقس الحالية', '🌤️'];
      tempNode.textContent = Math.round(current.temperature_2m) + '°';
      textNode.textContent = condition;
      iconNode.textContent = current.is_day ? icon : (current.weather_code === 0 ? '🌙' : icon);
      detailsNode.textContent = 'المحسوسة ' + Math.round(current.apparent_temperature) +
        '° · الرطوبة ' + Math.round(current.relative_humidity_2m) +
        '% · الرياح ' + Math.round(current.wind_speed_10m) + ' كم/س';
      updatedNode.textContent = 'آخر تحديث للطقس: ' + new Intl.DateTimeFormat('ar-EG', {
        ...cairoTime, hour: 'numeric', minute: '2-digit'
      }).format(new Date());
    } catch (error) {
      textNode.textContent = 'تعذر تحميل الطقس حاليًا';
      detailsNode.textContent = 'تحقق من اتصال الإنترنت وحاول لاحقًا';
      updatedNode.textContent = 'سيتم إعادة المحاولة تلقائيًا';
    }
  }

  updateDate();
  updateWeather();
  setInterval(updateDate, 60 * 1000);
  setInterval(updateWeather, 30 * 60 * 1000);
})();