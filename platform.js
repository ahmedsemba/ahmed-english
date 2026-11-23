/**
 * منصة مستر أحمد السيد انجليزي - النواة البرمجية الموحدة (Platform Core)
 * تشمل: Firebase Auth, Firestore, Firebase Storage, إدارة الطلاب والواجبات والحصص.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, deleteDoc, 
  query, where, Timestamp, writeBatch 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getStorage, ref as sRef, uploadString, getDownloadURL, deleteObject 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3EUyPGWQXi3yEV50QYYCtCASKV-MEE5I",
  authDomain: "ahmed-elsayed-bf13d.firebaseapp.com",
  projectId: "ahmed-elsayed-bf13d",
  storageBucket: "ahmed-elsayed-bf13d.firebasestorage.app",
  messagingSenderId: "66067955169",
  appId: "1:66067955169:web:28330bd439b6fd4c73e6a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentStudent = null;
let currentGradeFilter = 'الكل';
let editingRecordedId = null;
let editingMaterialId = null;
let allLoadedStudents = [];
let studentPageSize = 25;
let currentStudentDisplayLimit = 25;

const GRADES = [
  "الصف الأول الابتدائي", "الصف الثاني الابتدائي", "الصف الثالث الابتدائي",
  "الصف الرابع الابتدائي", "الصف الخامس الابتدائي", "الصف السادس الابتدائي",
  "الصف الأول الإعدادي", "الصف الثاني الإعدادي", "الصف الثالث الإعدادي"
];

/* ------------------- دوال مساعدة عامة ------------------- */
window.escHtml = function(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// يدعم الصور المخزنة كـ Base64 القديمة أو روابط Firebase Storage الحديثة
window.safeImg = function(u) {
  u = String(u || '').trim();
  if (/^https?:\/\//i.test(u)) return u;
  return /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+\/=]+$/.test(u) ? u : '';
};

// إشعار Toast لطيف في أسفل الشاشة
window.showToast = function(msg) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
};

// نسخ رقم التحويل بنقرة واحدة
window.copyPaymentNumber = function() {
  const num = '01116811324';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(() => {
      window.showToast('✅ تم نسخ رقم التحويل: ' + num);
    }).catch(() => {
      prompt('انسخ رقم التحويل:', num);
    });
  } else {
    prompt('انسخ رقم التحويل:', num);
  }
};

// تبديل الوضع الداكن والفاتح
window.toggleTheme = function() {
  const isLight = document.documentElement.classList.toggle('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(b => {
    b.textContent = isLight ? '🌙 وضع داكن' : '☀️ وضع فاتح';
  });
};

// استخراج معرّف فيديو يوتيوب
function getYouTubeVideoId(url) {
  try {
    const u = new URL(String(url || '').trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'youtu.be') return u.pathname.split('/').filter(Boolean)[0] || '';
    if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      if (u.pathname === '/watch') return u.searchParams.get('v') || '';
      const parts = u.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(parts[0])) return parts[1] || '';
    }
  } catch (e) {}
  return '';
}

/* ------------------- إدارة الدرجات والحضور ------------------- */
function score10(student, type) {
  const current = student[type + '10'];
  if (current !== undefined && current !== null && current !== '') {
    const n = Number(current);
    return Number.isFinite(n) ? Math.max(0, Math.min(10, n)) : 0;
  }
  const old = Number(student[type] || 0);
  return Number.isFinite(old) ? Math.max(0, Math.min(10, old * 2)) : 0;
}

function editableScore(id, type, val) {
  let options = '';
  for (let i = 0; i <= 10; i++) {
    options += '<option value="' + i + '"' + (i === Number(val) ? ' selected' : '') + '>' + i + '</option>';
  }
  return '<span class="score-control"><select id="score_' + id + '_' + type + '" aria-label="الدرجة من 10">' + options + '</select><small>/10</small><button class="btn-small" style="background:#10b981" onclick="setEvalFromInput(\'' + id + '\',\'' + type + '\')">حفظ</button></span>';
}

window.setEvalFromInput = async function(id, type) {
  const input = document.getElementById('score_' + id + '_' + type);
  const val = Number(input && input.value);
  if (!Number.isInteger(val) || val < 0 || val > 10) { alert('اختر درجة من 0 إلى 10'); return; }
  try {
    await updateDoc(doc(db, 'students', id), { [type + '10']: val });
    window.showToast('✅ تم حفظ الدرجة بنجاح');
    loadAdminFiltered();
  } catch (e) { alert('تعذر حفظ الدرجة: ' + (e.message || e)); }
};

function todayAttendanceKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function attendanceHistoryHtml(attendanceByDate) {
  const records = attendanceByDate && typeof attendanceByDate === 'object' ? attendanceByDate : {};
  const keys = Object.keys(records).filter(k => records[k] === 'present' || records[k] === 'absent').sort().reverse();
  const presentCount = keys.filter(k => records[k] === 'present').length;
  const absentCount = keys.length - presentCount;
  const summary = '<div style="margin:8px 0;color:var(--text-muted);font-size:12px">الحصص المسجلة: <b>' + keys.length + '</b> — حضور: <b style="color:#10b981">' + presentCount + '</b> — غياب: <b style="color:#ef4444">' + absentCount + '</b></div>';
  const note = '<small style="display:block;color:#93c5fd;margin-top:7px;line-height:1.6">يُسجَّل الحضور في أيام الحصص فقط.</small>';
  if (!keys.length) return '<div class="attendance-history"><b>📅 سجل الحصص</b><div style="margin-top:6px;color:var(--text-muted)">لا توجد حصص مسجلة حتى الآن.</div>' + note + '</div>';
  return '<div class="attendance-history"><b>📅 سجل الحصص (آخر 10 حصص)</b>' + summary + keys.slice(0, 10).map(k =>
    '<div style="margin-top:6px;padding-top:5px;border-top:1px solid var(--border-color)"><small>' + window.escHtml(k) + '</small> — ' +
    (records[k] === 'present' ? '<b style="color:#10b981">✅ حاضر</b>' : '<b style="color:#ef4444">❌ غائب</b>') + '</div>'
  ).join('') + note + '</div>';
}

function attendanceEditor(id, attendanceByDate) {
  const key = todayAttendanceKey();
  const records = attendanceByDate && typeof attendanceByDate === 'object' ? attendanceByDate : {};
  const current = records[key] || '';
  return '<div class="attendance-control"><b>حضور اليوم (' + key + '):</b><select id="attendance_' + id + '"><option value=""' + (!current ? ' selected' : '') + '>لم يحدد</option><option value="present"' + (current === 'present' ? ' selected' : '') + '>نعم - حاضر</option><option value="absent"' + (current === 'absent' ? ' selected' : '') + '>لا - غائب</option></select><button class="btn-small" style="background:#0891b2" onclick="saveStudentAttendance(\'' + id + '\')">حفظ الحضور</button></div>';
}

window.saveStudentAttendance = async function(id) {
  const input = document.getElementById('attendance_' + id);
  const status = input ? input.value : '';
  if (!['present', 'absent'].includes(status)) { alert('اختر حاضر أو غائب أولاً'); return; }
  const key = todayAttendanceKey();
  try {
    await updateDoc(doc(db, 'students', id), {
      ['attendanceByDate.' + key]: status,
      ['attendanceUpdatedAt.' + key]: Date.now()
    });
    window.showToast('✅ تم حفظ الحضور بتاريخ ' + key);
    loadAdminFiltered();
  } catch (e) { alert('تعذر حفظ الحضور: ' + (e.message || e)); }
};

// مشاركة تقرير الطالب عبر واتساب بضغطة زر واحدة لولي الأمر
window.shareStudentWhatsAppReport = function(name, grade, parentPhone, inter, hw, month, attSummary) {
  if (!parentPhone) {
    alert('رقم ولي الأمر غير متوفر لهذا الطالب.');
    return;
  }
  let cleanPhone = parentPhone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '2' + cleanPhone;
  else if (!cleanPhone.startsWith('20') && cleanPhone.length === 10) cleanPhone = '20' + cleanPhone;

  const msg = `السلام عليكم ورحمة الله وبركاته،\nمتابعة الطالب: *${name}*\nالصف: *${grade}*\nمنصة مستر أحمد السيد (لغة إنجليزية) ⭐\n\n📊 *درجات التقييم (من 10):*\n• التفاعل في الحصة: ${inter}/10\n• الواجبات: ${hw}/10\n• امتحان الشهر: ${month}/10\n\n📅 *سجل الحضور:* ${attSummary || 'منتظم'}\n\nنشكركم على حسن المتابعة والاهتمام.`;
  const url = 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
};

/* ------------------- تسجيل الطلاب ------------------- */
window.registerStudent = async function() {
  try {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const parentPhone = document.getElementById('parentPhone').value.trim();
    const grade = document.getElementById('grade').value;
    if (!name || !phone) { alert('من فضلك أكمل الاسم ورقم الواتساب.'); return; }
    await addDoc(collection(db, 'students'), {
      name, phone, parentPhone, grade, status: 'pending', created: Date.now(),
      eval_interaction10: 0, eval_homework10: 0, eval_month10: 0
    });
    document.getElementById('regMsg').innerHTML = '✅ تم التسجيل بنجاح! في انتظار موافقة المستر.';
    window.showToast('تم إرسال طلب التسجيل بنجاح');
  } catch (e) { alert('خطأ أثناء التسجيل: ' + e.message); }
};

/* ------------------- المواعيد والحصص ------------------- */
window.saveSchedule = async function() {
  const grade = document.getElementById('schedGrade').value;
  const time = document.getElementById('schedTime').value.trim();
  if (!time) { alert('اكتب موعد الحصة'); return; }
  await setDoc(doc(db, 'schedules', grade), { grade, time, updated: Date.now() });
  window.showToast('✅ تم حفظ موعد ' + grade);
  loadSchedulesAdmin();
};

window.loadSchedulesAdmin = async function() {
  try {
    const snap = await getDocs(collection(db, 'schedules'));
    let html = '';
    snap.forEach(function(d) {
      html += '<div class="student-row">📅 <b>' + d.data().grade + ':</b> ' + d.data().time + ' <button class="btn-small" style="background:#ef4444" onclick="deleteSchedule(\'' + d.id + '\')">حذف</button></div>';
    });
    const box = document.getElementById('schedulesList');
    if (box) box.innerHTML = html || '<p style="color:var(--text-muted)">لا توجد مواعيد مسجلة.</p>';
  } catch (e) { console.log(e); }
};

window.deleteSchedule = async function(id) {
  if (!confirm('حذف هذا الموعد؟')) return;
  await deleteDoc(doc(db, 'schedules', id));
  loadSchedulesAdmin();
};

async function getScheduleForGrade(grade) {
  try {
    const snap = await getDocs(collection(db, 'schedules'));
    let txt = 'لم يحدد بعد';
    snap.forEach(function(d) { if (d.data().grade === grade) txt = d.data().time; });
    return txt;
  } catch (e) { return 'لم يحدد بعد'; }
}

/* ------------------- دخول ولي الأمر ------------------- */
window.loginParent = async function() {
  try {
    const pPhone = document.getElementById('parentLoginPhone').value.trim();
    if (!pPhone) { alert('اكتب رقم ولي الأمر'); return; }
    const q = query(collection(db, 'students'), where('parentPhone', '==', pPhone));
    const snap = await getDocs(q);
    const box = document.getElementById('parentArea');
    if (snap.empty) {
      box.innerHTML = '<p style="color:#ef4444;text-align:center">❌ لا يوجد طالب مسجل بهذا الرقم. تأكد من الرقم المسجل مع المستر.</p>';
      box.style.display = 'block';
      return;
    }
    let html = '';
    for (const d of snap.docs) {
      const s = d.data();
      const sched = await getScheduleForGrade(s.grade);
      const attendanceHtml = attendanceHistoryHtml(s.attendanceByDate);
      const monthScore = score10(s, 'eval_month');
      html += '<div class="card" style="border:2px solid var(--accent-gold);margin-top:12px">' +
        '<h3>👦 ' + window.escHtml(s.name || '') + ' - ' + window.escHtml(s.grade || '') + '</h3>' +
        '<div class="scheduleBox">⏰ موعد الحصة: ' + sched + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0">' +
        '<div style="background:var(--bg-surface-alt);padding:10px;border-radius:10px;text-align:center">التفاعل<br><b style="color:var(--accent-teal-light);font-size:18px">' + score10(s, 'eval_interaction') + '/10</b></div>' +
        '<div style="background:var(--bg-surface-alt);padding:10px;border-radius:10px;text-align:center">الواجب<br><b style="color:var(--accent-teal-light);font-size:18px">' + score10(s, 'eval_homework') + '/10</b></div>' +
        '<div style="background:var(--bg-surface-alt);padding:10px;border-radius:10px;text-align:center">امتحان الشهر<br><b style="color:var(--accent-teal-light);font-size:18px">' + monthScore + '/10</b></div>' +
        '</div>' +
        (monthScore >= 9 ? '<div style="color:#fbbf24;font-weight:900;margin-top:7px">🏆 درع التفوق والتميز</div>' : '') +
        attendanceHtml +
        '</div>';
    }
    box.innerHTML = html;
    box.style.display = 'block';
  } catch (e) { alert('خطأ: ' + e.message); }
};

/* ------------------- دخول الطالب ولوحة الطالب ------------------- */
window.loginStudent = async function() {
  try {
    const phone = document.getElementById('loginPhone').value.trim();
    if (!phone) { alert('اكتب رقم الواتساب الخاص بك'); return; }
    const q = query(collection(db, 'students'), where('phone', '==', phone));
    const snap = await getDocs(q);
    const msg = document.getElementById('loginMsg');
    if (snap.empty) { msg.innerText = '❌ الرقم غير مسجل. يرجى التسجيل أولاً.'; return; }
    const d = snap.docs[0];
    const data = d.data();
    if (data.status === 'pending') { msg.innerText = '⏳ حسابك قيد المراجعة والموافقة من المستر.'; return; }
    if (data.status === 'blocked') { msg.innerText = '🚫 الحساب غير مفعل حالياً. تواصل مع المستر.'; return; }

    currentStudent = { id: d.id, ...data };
    window.currentStudent = currentStudent;

    if (window.initInteractiveQuestions) window.initInteractiveQuestions(currentStudent);

    document.getElementById('studentArea').style.display = 'block';
    document.getElementById('welcome').innerText = 'أهلاً بك يا ' + data.name + ' ⭐';
    msg.innerText = '';

    const sched = await getScheduleForGrade(data.grade);
    document.getElementById('studentSchedule').innerHTML = '<div class="scheduleBox">⏰ موعد حصتك: ' + sched + '</div>';

    const monthScore = score10(data, 'eval_month');
    document.getElementById('evalDisplay').innerHTML = '<h4>📊 تقييمك الدراسي</h4>' +
      '<div>التفاعل في الحصة: <b>' + score10(data, 'eval_interaction') + '/10</b></div>' +
      '<div>الواجبات: <b>' + score10(data, 'eval_homework') + '/10</b></div>' +
      '<div>امتحان الشهر: <b>' + monthScore + '/10</b></div>';

    const certArea = document.getElementById('certArea');
    if (certArea) {
      if (monthScore >= 9) {
        const today = new Date().toLocaleDateString('ar-EG');
        certArea.innerHTML = '<div class="certCard"><h2>🏆 درع التفوق</h2><h2>' + data.name + '</h2><p>تاريخ المنح: ' + today + '</p></div>';
      } else {
        certArea.innerHTML = '';
      }
    }

    loadStudentLesson();
    loadStudentRecordedLessons();
    loadStudentMaterials();
    loadPaperHomeworkStudent();
  } catch (e) { document.getElementById('loginMsg').innerText = 'خطأ: ' + e.message; }
};

async function loadStudentLesson() {
  try {
    const snapL = await getDocs(collection(db, 'lessons'));
    let html = '';
    snapL.forEach(function(docD) {
      const l = docD.data();
      if (l.grade && l.grade !== 'للكل' && l.grade !== currentStudent.grade) return;
      const TWO_HOURS = 2 * 60 * 60 * 1000;
      if (Date.now() - (l.created || 0) > TWO_HOURS) {
        html = '<div class="card" style="text-align:center;color:var(--text-muted)">⏰ انتهت الحصة المباشرة الأخيرة.</div>';
        return;
      }
      html = '<div class="card"><h3>' + l.title + '</h3>' +
        (l.meetLink ? '<a target="_blank" href="' + l.meetLink + '" style="background:#10b981;display:block;padding:12px;border-radius:10px;color:#fff;text-decoration:none;margin-top:10px;text-align:center;font-weight:800">🎥 دخول Google Meet</a>' : '') +
        (l.ytLink ? '<a target="_blank" rel="noopener" href="' + l.ytLink + '" style="background:#ef4444;display:block;padding:10px;border-radius:10px;color:#fff;text-decoration:none;margin-top:8px;text-align:center;font-weight:800">▶️ مشاهدة على YouTube</a>' : '') +
        (l.teachmintLink ? '<a target="_blank" rel="noopener" href="' + l.teachmintLink + '" style="background:#2563eb;display:block;padding:10px;border-radius:10px;color:#fff;text-decoration:none;margin-top:8px;text-align:center;font-weight:800">🎓 الدخول عبر Teachmint</a>' : '') + '</div>';
    });
    document.getElementById('lessonsList').innerHTML = html || '<p style="color:var(--text-muted);text-align:center">لا توجد حصة مباشرة نشطة حالياً.</p>';
  } catch (e) { console.log(e); }
}

/* ------------------- الحصص المسجلة للطلاب ------------------- */
window.studentRecordedLessonItems = [];
window.changeStudentRecordedUnit = function() {
  const lessonSelect = document.getElementById('studentRecordedLessonFilter');
  if (lessonSelect) lessonSelect.value = '';
  window.filterStudentRecordedLessons();
};

window.filterStudentRecordedLessons = function() {
  const box = document.getElementById('studentRecordedLessonsList');
  const unitSelect = document.getElementById('studentRecordedUnitFilter');
  const lessonSelect = document.getElementById('studentRecordedLessonFilter');
  if (!box || !unitSelect || !lessonSelect) return;
  const selectedUnit = unitSelect.value;
  const previousLesson = lessonSelect.value;
  lessonSelect.replaceChildren();

  const firstOption = document.createElement('option');
  firstOption.value = '';
  firstOption.textContent = selectedUnit ? 'اختر الدرس' : 'اختر الوحدة أو القصة أولاً';
  lessonSelect.appendChild(firstOption);
  lessonSelect.disabled = !selectedUnit;

  if (!selectedUnit) {
    box.innerHTML = '<div class="student-recorded-empty">اختر الوحدة أو القصة ثم رقم الدرس لمشاهدة الفيديو.</div>';
    return;
  }

  const matchesUnit = item => {
    if (selectedUnit === 'القصة 1') return item.unit === 'القصة' || item.unit === 'القصة 1';
    if (selectedUnit === 'القصة 2') return item.unit === 'القصة 2';
    return item.unit === selectedUnit;
  };

  const available = window.studentRecordedLessonItems.filter(matchesUnit);
  const lessons = [...new Set(available.map(item => item.lessonNumber).filter(Boolean))].sort((a,b) => Number(a) - Number(b));

  lessons.forEach(number => {
    const option = document.createElement('option');
    option.value = number;
    option.textContent = 'الدرس ' + number;
    lessonSelect.appendChild(option);
  });

  if (lessons.includes(previousLesson)) lessonSelect.value = previousLesson;
  box.innerHTML = available.length
    ? '<div class="student-recorded-empty">اختر رقم الدرس لعرض الحصة المطلوبة.</div>'
    : '<div class="student-recorded-empty">لا توجد فيديوهات مضافة لهذا الاختيار حتى الآن.</div>';

  if (!lessons.length) lessonSelect.disabled = true;
  if (!lessonSelect.value) return;

  const chosen = available.filter(item => item.lessonNumber === lessonSelect.value).sort((a,b) => b.created - a.created)[0];
  if (!chosen) return;

  const card = document.createElement('article');
  card.className = 'student-recorded-item';
  const info = document.createElement('div');
  info.className = 'student-recorded-info';
  const title = document.createElement('h4');
  title.textContent = chosen.title;
  const meta = document.createElement('p');
  meta.textContent = chosen.unit + ' • الدرس ' + chosen.lessonNumber;
  const watch = document.createElement('button');
  watch.type = 'button';
  watch.className = 'student-recorded-watch';
  watch.textContent = '▶ مشاهدة الحصة';

  const playerWrap = document.createElement('div');
  playerWrap.className = 'student-recorded-player';
  playerWrap.hidden = true;

  watch.addEventListener('click', function() {
    if (!playerWrap.firstChild) {
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(chosen.videoId);
      frame.title = chosen.title;
      frame.loading = 'lazy';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      playerWrap.appendChild(frame);
    }
    playerWrap.hidden = !playerWrap.hidden;
    watch.textContent = playerWrap.hidden ? '▶ مشاهدة الحصة' : 'إخفاء الفيديو';
  });

  info.append(title, meta);
  card.append(info, watch, playerWrap);
  box.replaceChildren(card);
};

window.loadStudentRecordedLessons = async function() {
  const box = document.getElementById('studentRecordedLessonsList');
  if (!box || !currentStudent || !currentStudent.grade) return;
  box.innerHTML = '<div class="student-recorded-empty">⏳ جاري تحميل فيديوهات صفك...</div>';
  try {
    const snap = await getDocs(collection(db, 'materials'));
    const items = [];
    snap.forEach(function(d) {
      const item = d.data();
      if (item.type !== 'recorded_lesson' || item.grade !== currentStudent.grade) return;
      const videoId = getYouTubeVideoId(item.link);
      if (!videoId) return;
      items.push({
        id: d.id,
        videoId,
        title: String(item.title || 'حصة مسجلة'),
        unit: String(item.unit || 'وحدة غير محددة'),
        lessonNumber: String(item.lessonNumber || ''),
        created: Number(item.created || item.updated || 0)
      });
    });
    window.studentRecordedLessonItems = items;
    if (!items.length) {
      box.innerHTML = '<div class="student-recorded-empty">لا توجد فيديوهات مضافة لصفك حتى الآن.</div>';
      return;
    }
    box.innerHTML = '<div class="student-recorded-empty">اختر الوحدة أو القصة ثم رقم الدرس لعرض الحصة.</div>';
  } catch (e) {
    box.innerHTML = '<div class="student-recorded-empty">تعذر تحميل الفيديوهات حالياً.</div>';
  }
};

/* ------------------- الواجبات الورقية مع الرفع إلى Firebase Storage ------------------- */
async function compressQuizPhoto(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة الصورة'));
    reader.onload = function() {
      const img = new Image();
      img.onerror = () => reject(new Error('صيغة الصورة غير مدعومة'));
      img.onload = function() {
        const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg', 0.65);
        resolve(data);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

window.publishPaperHomework = async function() {
  try {
    const title = document.getElementById('paperTitle').value.trim();
    const grade = document.getElementById('paperGrade').value;
    if (!title) { alert('اكتب عنوان الواجب الورقي'); return; }
    await addDoc(collection(db, 'paper_homeworks'), { title, grade, created: Date.now(), active: true });
    document.getElementById('paperTitle').value = '';
    window.showToast('✅ تم نشر الواجب الورقي بنجاح');
    loadPaperHomeworkAdmin();
  } catch (e) { alert('تعذر نشر الواجب: ' + (e.message || e)); }
};

window.loadPaperHomeworkStudent = async function() {
  const box = document.getElementById('paperHomeworkStudent');
  if (!box || !currentStudent) return;
  try {
    const [hwSnap, subSnap] = await Promise.all([
      getDocs(collection(db, 'paper_homeworks')),
      getDocs(query(collection(db, 'paper_submissions'), where('studentId', '==', currentStudent.id)))
    ]);
    const submitted = {};
    subSnap.forEach(d => { const v = { id: d.id, ...d.data() }; submitted[v.homeworkId] = v; });
    const now = Date.now(), WEEK = 7 * 24 * 60 * 60 * 1000;
    let html = '<h4 style="color:var(--accent-teal-light)">الواجبات الورقية ونتائج التصحيح</h4>', shown = 0;

    hwSnap.forEach(d => {
      const h = d.data(), sub = submitted[d.id];
      if (h.grade !== 'للكل' && h.grade !== currentStudent.grade) return;
      if (sub && sub.reviewed) {
        if (sub.acknowledged) return;
        const reviewedAt = Number(sub.reviewedAt || 0);
        if (!reviewedAt || now - reviewedAt > WEEK) return;
        shown++;
        html += '<div class="student-row"><b>📷 ' + window.escHtml(h.title || sub.title || 'واجب ورقي') + '</b><br><small>تم التصحيح بواسطة المستر</small>' +
          '<div style="color:#10b981;margin-top:8px;font-size:18px;font-weight:900">الدرجة: ' + Number(sub.score || 0) + '/10</div>' +
          '<div style="white-space:pre-wrap;margin-top:5px">ملاحظات المستر: ' + window.escHtml(sub.feedback || 'أحسنت!') + '</div>' +
          '<button class="btn-small" style="background:#10b981;width:100%;margin-top:8px" onclick="acknowledgePaperCorrection(\'' + sub.id + '\')">تم ومسح الإشعار</button></div>';
        return;
      }
      if (h.active === false) return;
      shown++;
      html += '<div class="student-row"><b>📷 ' + window.escHtml(h.title || 'واجب ورقي') + '</b><br><small>' + window.escHtml(h.grade || '') + '</small>';
      if (sub) {
        html += '<div style="color:#fbbf24;margin-top:7px">✅ تم إرسال صور الواجب للمستر</div><div style="color:var(--text-muted);margin-top:4px">⏳ في انتظار التصحيح...</div>';
      } else {
        html += '<p style="font-size:12px;color:var(--text-muted)">صوّر صفحات الواجب بوضوح (مسموح حتى 3 صور).</p>' +
          '<input type="file" id="paperFiles_' + d.id + '" accept="image/*" capture="environment" multiple>' +
          '<button class="btn-small" style="background:#0891b2;width:100%;margin-top:8px" onclick="submitPaperHomework(\'' + d.id + '\',\'' + window.escHtml(h.title || 'واجب ورقي').replace(/'/g, '&#39;') + '\')">📤 إرسال صور الواجب</button>';
      }
      html += '</div>';
    });
    box.innerHTML = html + (shown ? '' : '<p style="color:var(--text-muted)">لا توجد واجبات ورقية مطلوبة حالياً.</p>');
  } catch (e) {
    box.innerHTML = '<p style="color:#ef4444">تعذر تحميل الواجب الورقي: ' + window.escHtml(e.message || e) + '</p>';
  }
};

window.acknowledgePaperCorrection = async function(id) {
  try {
    await updateDoc(doc(db, 'paper_submissions', id), { acknowledged: true, acknowledgedAt: Date.now() });
    await loadPaperHomeworkStudent();
  } catch (e) { alert('تعذر حفظ الحالة: ' + (e.message || e)); }
};

// رفع الواجب الورقي: يحاول الرفع إلى Firebase Storage أولاً، مع fallback سلس للـ Base64
window.submitPaperHomework = async function(homeworkId, title) {
  try {
    if (!currentStudent) { alert('سجّل دخولك أولاً'); return; }
    const input = document.getElementById('paperFiles_' + homeworkId);
    const files = input && input.files ? Array.from(input.files) : [];
    if (!files.length) { alert('صوّر الواجب أو اختر الصور أولاً'); return; }
    if (files.length > 3) { alert('مسموح بحد أقصى 3 صور'); return; }

    window.showToast('جاري ضغط ورفع الصور...');
    const compressedPhotos = await Promise.all(files.map(file => compressQuizPhoto(file)));
    const submissionRef = doc(collection(db, 'paper_submissions'));

    const uploadedPhotoEntries = [];
    for (let i = 0; i < compressedPhotos.length; i++) {
      const dataUrl = compressedPhotos[i];
      const storagePath = `paper_homeworks/${currentStudent.id}/${submissionRef.id}_${i + 1}_${Date.now()}.jpg`;
      let finalUrl = dataUrl;
      let finalStoragePath = '';

      try {
        const photoRef = sRef(storage, storagePath);
        await uploadString(photoRef, dataUrl, 'data_url');
        finalUrl = await getDownloadURL(photoRef);
        finalStoragePath = storagePath;
      } catch (storageErr) {
        console.warn('Firebase Storage fallback:', storageErr);
        // في حال لم يتم تفعيل Storage بعد على لوحة Firebase، نستخدم Base64 حتى لا يتعطل الطالب
        finalUrl = dataUrl;
        finalStoragePath = '';
      }

      uploadedPhotoEntries.push({
        url: finalUrl,
        storagePath: finalStoragePath
      });
    }

    const batch = writeBatch(db);
    batch.set(submissionRef, {
      homeworkId, title, studentId: currentStudent.id, studentName: currentStudent.name,
      grade: currentStudent.grade, photoCount: uploadedPhotoEntries.length, created: Date.now(),
      reviewed: false, acknowledged: false, score: 0, feedback: ''
    });

    uploadedPhotoEntries.forEach((entry, i) => {
      const photoDocRef = doc(collection(db, 'paper_submission_photos'));
      batch.set(photoDocRef, {
        submissionId: submissionRef.id,
        studentId: currentStudent.id,
        index: i + 1,
        dataUrl: entry.url,
        storagePath: entry.storagePath,
        created: Date.now()
      });
    });

    await batch.commit();
    alert('✅ تم إرسال صور الواجب للمستر بنجاح.');
    loadPaperHomeworkStudent();
  } catch (e) { alert('تعذر إرسال صور الواجب: ' + (e.message || e)); }
};

window.loadPaperHomeworkAdmin = async function() {
  const box = document.getElementById('paperHomeworkAdminList');
  if (!box) return;
  try {
    const [subSnap, photoSnap] = await Promise.all([
      getDocs(collection(db, 'paper_submissions')),
      getDocs(collection(db, 'paper_submission_photos'))
    ]);
    const photos = {};
    photoSnap.forEach(d => { const p = d.data(); (photos[p.submissionId] || (photos[p.submissionId] = [])).push(p); });
    const term = (document.getElementById('paperSubmissionSearch')?.value || '').trim().toLowerCase();
    let rows = [];
    subSnap.forEach(d => {
      const x = { id: d.id, ...d.data() };
      if (!x.archivedAt && (!term || (x.studentName || '').toLowerCase().includes(term))) rows.push(x);
    });
    rows.sort((a, b) => (b.created || 0) - (a.created || 0));
    if (!rows.length) { box.innerHTML = '<p style="color:var(--text-muted)">لا توجد تسليمات جديدة حالياً.</p>'; return; }

    box.innerHTML = rows.map(x => {
      const imgs = (photos[x.id] || []).sort((a, b) => (a.index || 0) - (b.index || 0));
      const imageHtml = imgs.map(p => '<a href="' + window.safeImg(p.dataUrl) + '" target="_blank" rel="noopener"><img src="' + window.safeImg(p.dataUrl) + '" alt="صورة الواجب" style="width:100px;height:130px;object-fit:contain;background:#fff;border-radius:8px;margin:4px;border:1px solid var(--border-color)"></a>').join('');
      const correction = x.reviewed ? '<small style="color:#10b981;display:block;margin-top:6px">✅ تم التصحيح — الدرجة ' + Number(x.score || 0) + '/10</small><button class="btn-small" style="background:#64748b;width:100%;margin-top:7px" onclick="archivePaperSubmission(\'' + x.id + '\')">إخفاء من قائمتي</button>' : '<small style="color:#fbbf24;display:block;margin-top:6px">⏳ في انتظار التصحيح</small>';
      const editor = x.reviewed ? '' : '<textarea id="paperFeedback_' + x.id + '" placeholder="ملاحظات وتصحيح الواجب" style="min-height:75px">' + window.escHtml(x.feedback || '') + '</textarea><input id="paperScore_' + x.id + '" type="number" min="0" max="10" step="0.5" placeholder="الدرجة من 10"><button class="btn-small" style="background:#10b981;width:100%;margin-top:7px" onclick="savePaperCorrection(\'' + x.id + '\')">💾 حفظ التصحيح وإظهاره للطالب</button>';
      return '<div class="student-row"><b>👦 ' + window.escHtml(x.studentName || 'طالب') + '</b> — ' + window.escHtml(x.grade || '') + '<br><b>📝 ' + window.escHtml(x.title || 'واجب ورقي') + '</b><br><small>' + new Date(x.created || Date.now()).toLocaleString('ar-EG') + '</small><div style="display:flex;flex-wrap:wrap;margin-top:8px">' + imageHtml + '</div>' + editor + correction + '</div>';
    }).join('');
  } catch (e) { box.innerHTML = '<p style="color:#ef4444">تعذر تحميل الواجبات: ' + window.escHtml(e.message || e) + '</p>'; }
};

window.archivePaperSubmission = async function(id) {
  if (!confirm('إخفاء هذا التسليم المصحح من قائمتك؟')) return;
  await updateDoc(doc(db, 'paper_submissions', id), { archivedAt: Date.now() });
  loadPaperHomeworkAdmin();
};

// حفظ تصحيح الواجب وحذف الصور من Storage و Firestore لتوفير المساحة
window.savePaperCorrection = async function(id) {
  const scoreInput = document.getElementById('paperScore_' + id);
  const score = Number(scoreInput ? scoreInput.value : 0);
  const feedback = document.getElementById('paperFeedback_' + id).value.trim();
  if (!Number.isFinite(score) || score < 0 || score > 10) { alert('اكتب الدرجة من 0 إلى 10'); return; }

  try {
    const photoSnap = await getDocs(query(collection(db, 'paper_submission_photos'), where('submissionId', '==', id)));
    await Promise.all(photoSnap.docs.map(async p => {
      const pData = p.data();
      if (pData.storagePath) {
        try { await deleteObject(sRef(storage, pData.storagePath)); } catch (e) {}
      }
      await deleteDoc(doc(db, 'paper_submission_photos', p.id));
    }));

    const correctedAt = Date.now();
    await updateDoc(doc(db, 'paper_submissions', id), { score, feedback, reviewed: true, reviewedAt: correctedAt, archivedAt: correctedAt });
    window.showToast('✅ تم حفظ التصحيح بنجاح وتوفير مساحة التخزين');
    loadPaperHomeworkAdmin();
  } catch (e) { alert('تعذر حفظ التصحيح: ' + (e.message || e)); }
};

/* ------------------- إدارة الطلاب في لوحة المستر (Pagination & Filter) ------------------- */
window.loadAdmin = async function() { loadAdminFiltered(); };

window.filterGrade = function(g) {
  currentGradeFilter = g;
  currentStudentDisplayLimit = studentPageSize;
  loadAdminFiltered();
};

window.loadMoreStudents = function() {
  currentStudentDisplayLimit += studentPageSize;
  renderStudentsList();
};

window.loadAdminFiltered = async function() {
  try {
    const allStudentsSnap = await getDocs(collection(db, 'students'));
    allLoadedStudents = [];
    allStudentsSnap.forEach(d => allLoadedStudents.push({ id: d.id, data: d.data() }));

    const studentCountMap = {};
    GRADES.forEach(g => { studentCountMap[g] = 0; });
    allLoadedStudents.forEach(item => {
      const g = item.data.grade;
      if (studentCountMap[g] !== undefined) studentCountMap[g]++;
    });

    const gf = document.getElementById('gradeFilter');
    if (gf) {
      gf.innerHTML = '<span class="gradeTab ' + (currentGradeFilter === 'الكل' ? 'active' : '') + '" onclick="filterGrade(\'الكل\')">الكل (' + allLoadedStudents.length + ')</span>' +
        GRADES.map(function(g) {
          return '<span class="gradeTab ' + (currentGradeFilter === g ? 'active' : '') + '" onclick="filterGrade(\'' + g + '\')">' + g.replace('الصف ', '') + ' (' + studentCountMap[g] + ')</span>';
        }).join('');
    }

    renderStudentsList();
  } catch (e) { console.log(e); }
};

function renderStudentsList() {
  const searchTerm = document.getElementById('studentSearch') ? document.getElementById('studentSearch').value.trim().toLowerCase() : '';
  let filtered = allLoadedStudents;

  if (currentGradeFilter !== 'الكل') {
    filtered = filtered.filter(s => s.data.grade === currentGradeFilter);
  }
  if (searchTerm) {
    filtered = filtered.filter(s => (s.data.name || '').toLowerCase().includes(searchTerm) || (s.data.phone || '').includes(searchTerm));
  }

  const pending = document.getElementById('pendingList');
  const approved = document.getElementById('approvedList');
  const blocked = document.getElementById('blockedList');
  if (pending) pending.innerHTML = '';
  if (approved) approved.innerHTML = '';
  if (blocked) blocked.innerHTML = '';

  const pendingList = filtered.filter(s => s.data.status === 'pending');
  const blockedList = filtered.filter(s => s.data.status === 'blocked');
  const approvedList = filtered.filter(s => s.data.status !== 'pending' && s.data.status !== 'blocked');

  // عرض الطلاب قيد الانتظار
  if (pending && pendingList.length) {
    pending.innerHTML = '<h4 style="color:#fbbf24">⏳ طلبات تسجيل جديدة (' + pendingList.length + ')</h4>' +
      pendingList.map(item => {
        const s = item.data, id = item.id;
        return '<div class="student-row"><div><b>' + window.escHtml(s.name) + '</b> - ' + window.escHtml(s.grade) + '<br><small>هاتف: ' + window.escHtml(s.phone) + ' | ولي أمر: ' + window.escHtml(s.parentPhone || '—') + '</small></div><div style="display:flex;gap:6px;margin-top:8px"><button class="btn-small" onclick="approve(\'' + id + '\')" style="background:#10b981;flex:1">موافقة وتفعيل</button><button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444;flex:1">حذف</button></div></div>';
      }).join('');
  }

  // عرض الطلاب المحظورين
  if (blocked && blockedList.length) {
    blocked.innerHTML = '<h4 style="color:#ef4444">🚫 الطلاب المحظورون (' + blockedList.length + ')</h4>' +
      blockedList.map(item => {
        const s = item.data, id = item.id;
        return '<div class="student-row" style="border:1px solid #ef4444"><div><b>' + window.escHtml(s.name) + '</b> - ' + window.escHtml(s.phone) + '</div><div style="display:flex;gap:6px;margin-top:8px"><button class="btn-small" onclick="approve(\'' + id + '\')" style="background:#10b981;flex:1">فك الحظر</button><button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444;flex:1">حذف نهائي</button></div></div>';
      }).join('');
  }

  // عرض الطلاب المفعلين مع دعم التصفح والتقسيم Pagination
  if (approved) {
    const totalApproved = approvedList.length;
    const visible = approvedList.slice(0, currentStudentDisplayLimit);

    const counter = document.getElementById('studentsCounter');
    if (counter) counter.innerText = 'الطلاب المفعلون: المعروض ' + visible.length + ' من إجمالي ' + totalApproved;

    approved.innerHTML = visible.map(item => {
      const s = item.data, id = item.id;
      const inter = score10(s, 'eval_interaction');
      const hw = score10(s, 'eval_homework');
      const month = score10(s, 'eval_month');

      const attRecords = s.attendanceByDate && typeof s.attendanceByDate === 'object' ? s.attendanceByDate : {};
      const attKeys = Object.keys(attRecords).filter(k => attRecords[k] === 'present' || attRecords[k] === 'absent');
      const pCount = attKeys.filter(k => attRecords[k] === 'present').length;
      const aCount = attKeys.length - pCount;
      const attSummary = 'حاضر ' + pCount + ' حصة - غائب ' + aCount + ' حصة';

      return '<div class="student-row" style="border:1px solid var(--accent-gold);margin-top:10px">' +
        '<b>✅ ' + window.escHtml(s.name) + '</b> - ' + window.escHtml(s.phone) + '<br>' +
        '<small>' + window.escHtml(s.grade) + ' | ولي أمر: ' + window.escHtml(s.parentPhone || 'غير مسجل') + '</small>' +
        '<div style="margin-top:8px">تفاعل: ' + editableScore(id, 'eval_interaction', inter) + '</div>' +
        '<div>واجب: ' + editableScore(id, 'eval_homework', hw) + '</div>' +
        '<div>امتحان شهر: ' + editableScore(id, 'eval_month', month) + '</div>' +
        attendanceEditor(id, s.attendanceByDate) +
        '<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">' +
        '<button class="btn-whatsapp-share" onclick="shareStudentWhatsAppReport(\'' + window.escHtml(s.name).replace(/'/g, '&#39;') + '\',\'' + window.escHtml(s.grade).replace(/'/g, '&#39;') + '\',\'' + window.escHtml(s.parentPhone || '') + '\',' + inter + ',' + hw + ',' + month + ',\'' + attSummary + '\')">📲 إرسال التقرير لولي الأمر</button>' +
        '<button class="btn-small" onclick="blockStudent(\'' + id + '\')" style="background:#f97316">حظر</button>' +
        '<button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444">حذف</button>' +
        '</div>' +
        '</div>';
    }).join('');

    if (totalApproved > currentStudentDisplayLimit) {
      approved.innerHTML += '<div style="text-align:center;margin-top:14px"><button class="btn-small" style="background:var(--accent-blue);padding:10px 24px;font-size:14px" onclick="loadMoreStudents()">⬇️ عرض المزيد من الطلاب (' + (totalApproved - currentStudentDisplayLimit) + ' متبقي)</button></div>';
    }
  }
}

window.approve = async function(id) {
  await updateDoc(doc(db, 'students', id), { status: 'approved' });
  window.showToast('✅ تم قبول وتفعيل الطالب');
  loadAdminFiltered();
};

window.blockStudent = async function(id) {
  if (!confirm('هل تريد حظر هذا الطالب؟')) return;
  await updateDoc(doc(db, 'students', id), { status: 'blocked' });
  loadAdminFiltered();
};

window.deleteStudent = async function(id) {
  if (!confirm('حذف هذا الطالب نهائياً من قاعدة البيانات؟')) return;
  await deleteDoc(doc(db, 'students', id));
  loadAdminFiltered();
};

/* ------------------- إدارة الحصص المباشرة والمسجلة من لوحة المستر ------------------- */
window.addLesson = async function() {
  const title = document.getElementById('lessonTitle').value.trim();
  const meetLink = document.getElementById('meetLink').value.trim();
  const ytLink = document.getElementById('ytLink')?.value.trim() || '';
  const teachmintLink = document.getElementById('teachmintLink')?.value.trim() || '';
  const grade = document.getElementById('lessonGrade').value;
  if (!title) { alert('اكتب عنوان الحصة'); return; }
  await setDoc(doc(db, 'lessons', 'current'), { title, meetLink, ytLink, teachmintLink, grade, created: Date.now() });
  window.showToast('✅ تم نشر روابط الحصة بنجاح');
  alert('تم نشر الحصة والروابط بنجاح.');
};

window.clearLesson = async function() {
  if (!confirm('إنهاء الحصة الحالية وإخفاء الروابط؟')) return;
  await deleteDoc(doc(db, 'lessons', 'current'));
  window.showToast('تم إنهاء الحصة المباشرة');
  alert('تم إنهاء الحصة.');
};

window.addRecordedLesson = async function() {
  try {
    const title = document.getElementById('recordedTitle').value.trim();
    const unit = document.getElementById('recordedUnit').value;
    const lessonNumber = document.getElementById('recordedLessonNumber').value;
    const grade = document.getElementById('recordedGrade').value;
    const link = document.getElementById('recordedYoutubeLink').value.trim();
    if (!title || !unit || !lessonNumber || !grade || !link) {
      alert('اكتب اسم الدرس، واختر الوحدة ورقم الدرس والصف، وضع رابط يوتيوب.');
      return;
    }
    if (!getYouTubeVideoId(link)) { alert('ضع رابط فيديو صحيح من يوتيوب.'); return; }
    if (editingRecordedId) {
      await updateDoc(doc(db, 'materials', editingRecordedId), { type: 'recorded_lesson', title, unit, lessonNumber, grade, link, updated: Date.now() });
      window.cancelRecordedLessonEdit();
      window.showToast('✅ تم حفظ تعديل الحصة المسجلة.');
    } else {
      await addDoc(collection(db, 'materials'), { type: 'recorded_lesson', title, unit, lessonNumber, grade, link, created: Date.now() });
      window.cancelRecordedLessonEdit();
      window.showToast('✅ تم إضافة الحصة المسجلة.');
    }
    await window.loadRecordedLessonsAdmin();
  } catch (e) { alert('تعذرت إضافة الحصة: ' + (e.message || e)); }
};

window.cancelRecordedLessonEdit = function() {
  editingRecordedId = null;
  const t = document.getElementById('recordedTitle'); if (t) t.value = '';
  const u = document.getElementById('recordedUnit'); if (u) u.value = '';
  const l = document.getElementById('recordedLessonNumber'); if (l) l.value = '';
  const y = document.getElementById('recordedYoutubeLink'); if (y) y.value = '';
  const saveBtn = document.getElementById('recordedSaveButton'); if (saveBtn) saveBtn.textContent = '➕ إضافة الحصة المسجلة';
  const cancelBtn = document.getElementById('recordedCancelEditButton'); if (cancelBtn) cancelBtn.style.display = 'none';
};

window.loadRecordedLessonsAdmin = async function() {
  const list = document.getElementById('recordedLessonsAdminList');
  if (!list) return;
  list.textContent = '⏳ جاري تحميل الحصص المسجلة...';
  try {
    const snap = await getDocs(collection(db, 'materials'));
    const items = [];
    snap.forEach(function(d) {
      const item = d.data();
      if (item.type === 'recorded_lesson') items.push({ id: d.id, ...item });
    });
    items.sort((a,b) => (b.created || 0) - (a.created || 0));
    list.replaceChildren();
    if (!items.length) { list.innerHTML = '<p style="color:var(--text-muted)">لا توجد حصص مسجلة مضافة حتى الآن.</p>'; return; }
    items.forEach(function(item) {
      const card = document.createElement('div');
      card.className = 'student-row';
      const title = document.createElement('b');
      title.textContent = '🎬 ' + (item.title || 'درس مسجل');
      const grade = document.createElement('div');
      grade.textContent = (item.grade || '') + ' • ' + (item.unit || 'وحدة غير محددة') + ' • الدرس ' + (item.lessonNumber || '—');
      const actions = document.createElement('div');
      actions.style.cssText = 'display:flex;gap:6px;margin-top:8px';

      const editBtn = document.createElement('button');
      editBtn.className = 'btn-small';
      editBtn.style.background = '#2563eb';
      editBtn.textContent = 'تعديل';
      editBtn.onclick = function() {
        editingRecordedId = item.id;
        document.getElementById('recordedTitle').value = item.title || '';
        document.getElementById('recordedUnit').value = item.unit || '';
        document.getElementById('recordedLessonNumber').value = item.lessonNumber || '';
        document.getElementById('recordedGrade').value = item.grade || '';
        document.getElementById('recordedYoutubeLink').value = item.link || '';
        document.getElementById('recordedSaveButton').textContent = '💾 حفظ تعديل الفيديو';
        document.getElementById('recordedCancelEditButton').style.display = 'block';
        document.getElementById('recordedTitle').scrollIntoView({ behavior: 'smooth', block: 'center' });
      };

      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-small';
      removeBtn.style.background = '#ef4444';
      removeBtn.textContent = 'حذف';
      removeBtn.onclick = async function() {
        if (!confirm('هل تريد حذف هذه الحصة المسجلة؟')) return;
        await deleteDoc(doc(db, 'materials', item.id));
        window.loadRecordedLessonsAdmin();
      };

      actions.append(editBtn, removeBtn);
      card.append(title, grade, actions);
      list.appendChild(card);
    });
  } catch (e) { list.textContent = 'تعذر تحميل القائمة: ' + (e.message || e); }
};

/* ------------------- الملازم المجانية والملفات ------------------- */
window.addMaterial = async function() {
  try {
    const title = document.getElementById('matTitle').value.trim();
    const link = document.getElementById('matLink').value.trim();
    const grade = document.getElementById('matGrade').value;
    if (!title || !link) { alert('اكتب العنوان واللينك'); return; }
    if (link.indexOf('http') !== 0) { alert('اللينك لازم يبدأ بـ http'); return; }
    await addDoc(collection(db, 'materials'), { title, link, grade, created: Date.now() });
    document.getElementById('matTitle').value = '';
    document.getElementById('matLink').value = '';
    window.showToast('✅ تم إضافة الملزمة بنجاح');
    loadMaterialsAdmin();
  } catch (e) { alert('خطأ: ' + e.message); }
};

window.loadMaterialsAdmin = async function() {
  try {
    const list = document.getElementById('materialsAdminList');
    if (!list) return;
    const snap = await getDocs(collection(db, 'materials'));
    let items = [];
    snap.forEach(function(d) {
      const item = d.data();
      if (item.type !== 'recorded_lesson') items.push({ id: d.id, ...item });
    });
    items.sort((a, b) => (b.created || 0) - (a.created || 0));
    if (items.length === 0) { list.innerHTML = '<p style="color:var(--text-muted)">لا توجد ملازم حالياً.</p>'; return; }
    list.innerHTML = items.map(function(m) {
      return '<div class="student-row"><b>📚 ' + window.escHtml(m.title) + '</b><br><small>' + window.escHtml(m.grade) + '</small><br><a href="' + m.link + '" target="_blank" style="color:var(--accent-teal-light);font-size:13px">فتح الرابط ↗</a><br><button class="btn-small" style="background:#ef4444;margin-top:6px" onclick="deleteMaterial(\'' + m.id + '\')">🗑️ حذف</button></div>';
    }).join('');
  } catch (e) { console.log(e); }
};

window.deleteMaterial = async function(id) {
  if (!confirm('هل تريد حذف هذه الملزمة؟')) return;
  await deleteDoc(doc(db, 'materials', id));
  loadMaterialsAdmin();
  window.showToast('تم حذف الملزمة');
};

window.loadPublicMaterials = async function() {
  const gradeSelect = document.getElementById('publicMaterialsGrade');
  const container = document.getElementById('publicMaterialsList');
  if (!gradeSelect || !container) return;
  const grade = gradeSelect.value;
  if (!grade) {
    container.innerHTML = '<div class="student-row" style="text-align:center;color:var(--text-muted)">من فضلك اختر الصف الدراسي أولاً.</div>';
    return;
  }
  container.innerHTML = '<div class="student-row" style="text-align:center">⏳ جاري تحميل الملازم...</div>';
  try {
    const snap = await getDocs(collection(db, 'materials'));
    const items = [];
    snap.forEach(function(d) {
      const m = d.data();
      if (m.type === 'recorded_lesson') return;
      if (m.grade !== grade && m.grade !== 'للكل') return;
      if (typeof m.link !== 'string' || !/^https?:\/\//i.test(m.link)) return;
      items.push({ id: d.id, title: String(m.title || 'ملزمة تعليمية'), link: m.link, grade: m.grade || grade, created: m.created || 0 });
    });
    items.sort((a, b) => (b.created || 0) - (a.created || 0));
    container.replaceChildren();
    if (!items.length) {
      container.innerHTML = '<div class="student-row" style="text-align:center;color:var(--text-muted)">لا توجد ملازم مرفوعة لهذا الصف حالياً.</div>';
      return;
    }
    items.forEach(function(m) {
      const card = document.createElement('article');
      card.className = 'student-row';
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'space-between';
      card.style.gap = '12px';
      const info = document.createElement('div');
      const title = document.createElement('h4');
      title.style.margin = '0 0 4px';
      title.textContent = '📘 ' + m.title;
      const meta = document.createElement('small');
      meta.style.color = 'var(--text-muted)';
      meta.textContent = m.grade === 'للكل' ? 'متاحة لجميع الصفوف' : m.grade;
      info.append(title, meta);
      const link = document.createElement('a');
      link.className = 'btn-small';
      link.style.background = 'var(--accent-teal)';
      link.style.color = '#042f2e';
      link.style.textDecoration = 'none';
      link.href = m.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'فتح / تحميل ↗';
      card.append(info, link);
      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = '<div class="student-row" style="color:#ef4444;text-align:center">تعذر تحميل الملازم حالياً.</div>';
  }
};

window.loadStudentMaterials = async function() {
  try {
    const cont = document.getElementById('materialsList');
    if (!cont || !currentStudent) return;
    const snap = await getDocs(collection(db, 'materials'));
    let items = [];
    snap.forEach(function(d) {
      const m = d.data();
      if (m.grade !== 'للكل' && m.grade !== currentStudent.grade) return;
      if (m.type === 'recorded_lesson') return;
      items.push({ id: d.id, ...m });
    });
    items.sort((a, b) => (b.created || 0) - (a.created || 0));
    if (items.length === 0) { cont.innerHTML = '<p style="color:var(--text-muted)">لا توجد ملازم لصفك حالياً.</p>'; return; }
    cont.innerHTML = items.map(function(m) {
      return '<div class="student-row" style="border:1px solid #8b5cf6"><b>📚 ' + window.escHtml(m.title) + '</b><br><a href="' + m.link + '" target="_blank" style="display:inline-block;margin-top:8px;background:#8b5cf6;color:#fff;padding:8px 14px;border-radius:8px;text-decoration:none;font-weight:700">📂 فتح / تحميل الملزمة ↗</a></div>';
    }).join('');
  } catch (e) { console.log(e); }
};

/* ------------------- إدارة المدفوعات في لوحة المستر ------------------- */
window.loadPaymentsAdmin = async function() {
  try {
    const box = document.getElementById('paymentsAdminList');
    if (!box) return;
    const snap = await getDocs(collection(db, 'payments'));
    let items = [];
    snap.forEach(function(d) { items.push({ id: d.id, ...d.data() }); });
    items.sort((a, b) => (b.created || 0) - (a.created || 0));
    if (!items.length) { box.innerHTML = '<p style="color:var(--text-muted)">لا توجد طلبات دفع مسجلة.</p>'; return; }
    const labels = { pending: '⏳ قيد المراجعة', approved: '✅ مؤكد', rejected: '❌ مرفوض' };
    box.innerHTML = items.map(function(p) {
      const date = p.created ? new Date(p.created).toLocaleString('ar-EG') : '';
      return '<div class="student-row"><b>' + window.escHtml(p.studentName || 'طالب') + '</b> - ' + window.escHtml(p.grade || '') + '<br>المبلغ: <b>' + window.escHtml(String(p.amount || 0)) + ' جنيه</b><br>الطريقة: ' + (p.method === 'InstaPay' ? 'إنستاباي' : 'اتصالات كاش') + '<br><small>' + window.escHtml(p.note || '') + ' | ' + window.escHtml(date) + '</small><br><b>' + (labels[p.status] || 'قيد المراجعة') + '</b>' + (p.status === 'pending' ? '<div style="display:flex;gap:6px;margin-top:8px"><button class="btn-small" style="background:#10b981;flex:1" onclick="reviewPayment(\'' + p.id + '\',\'approved\')">تأكيد الدفع</button><button class="btn-small" style="background:#ef4444;flex:1" onclick="reviewPayment(\'' + p.id + '\',\'rejected\')">رفض</button></div>' : '') + '</div>';
    }).join('');
  } catch (e) { console.log(e); }
};

window.reviewPayment = async function(id, status) {
  if (!['approved', 'rejected'].includes(status)) return;
  if (!confirm('هل تريد ' + (status === 'approved' ? 'تأكيد الدفع' : 'رفض الإيصال') + '؟')) return;
  await updateDoc(doc(db, 'payments', id), { status, reviewed: Date.now() });
  loadPaymentsAdmin();
};

/* ------------------- تسجيل دخول المعلم واللوحة ------------------- */
window.loginAdmin = async function() {
  const email = document.getElementById('adminEmail').value.trim();
  const pass = document.getElementById('adminPass').value;
  if (!email || !pass) { alert('اكتب الإيميل والباسورد'); return; }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    showAdminArea();
  } catch (e) {
    alert('خطأ في الدخول: تأكد من الإيميل والباسورد (' + e.message + ')');
  }
};

function showAdminArea() {
  const area = document.getElementById('adminArea');
  if (area) {
    area.style.display = 'block';
    const passInput = document.getElementById('adminPass');
    if (passInput) passInput.value = '';
    loadAdmin();
    loadSchedulesAdmin();
    loadRecordedLessonsAdmin();
  }
}

window.logoutAdmin = async function() {
  await signOut(auth);
  const area = document.getElementById('adminArea');
  if (area) area.style.display = 'none';
};

window.showAdminTab = function(t) {
  ['lessons', 'recorded', 'schedules', 'students', 'homeworks', 'materials', 'payments', 'backup'].forEach(function(x) {
    const el = document.getElementById('admin-' + x);
    if (el) el.style.display = (x === t) ? 'block' : 'none';
    const tab = document.getElementById('atab-' + x);
    if (tab) tab.classList.toggle('active', x === t);
  });
  if (t === 'students' && window.loadAdmin) window.loadAdmin();
  if (t === 'recorded' && window.loadRecordedLessonsAdmin) window.loadRecordedLessonsAdmin();
  if (t === 'homeworks' && window.loadPaperHomeworkAdmin) window.loadPaperHomeworkAdmin();
  if (t === 'schedules' && window.loadSchedulesAdmin) window.loadSchedulesAdmin();
  if (t === 'materials' && window.loadMaterialsAdmin) window.loadMaterialsAdmin();
  if (t === 'payments' && window.loadPaymentsAdmin) window.loadPaymentsAdmin();
};

/* ------------------- النسخ الاحتياطي والاستعادة ------------------- */
const BACKUP_COLLECTIONS = [
  'students', 'schedules', 'payments', 'lessons', 'materials',
  'paper_homeworks', 'paper_submissions', 'paper_submission_photos',
  'quiz_submissions', 'live_classes', 'paragraph_homeworks', 'paragraph_submissions'
];

window.exportPlatformBackup = async function() {
  const status = document.getElementById('backupStatus');
  try {
    if (!auth.currentUser) { alert('سجّل دخولك بحساب المدرس أولاً.'); return; }
    if (status) status.textContent = 'جاري تجهيز النسخة الاحتياطية...';
    const collectionsData = {};
    for (const name of BACKUP_COLLECTIONS) {
      const snap = await getDocs(collection(db, name));
      collectionsData[name] = snap.docs.map(d => ({
        id: d.id,
        data: JSON.parse(JSON.stringify(d.data(), (key, value) =>
          value instanceof Timestamp || (value && value.type === 'firestore/timestamp/1.0')
            ? { __platformBackupType: 'Timestamp', seconds: value.seconds, nanoseconds: value.nanoseconds }
            : value
        ))
      }));
    }
    const backup = {
      format: 'ahmed-english-platform-backup',
      version: 1,
      projectId: firebaseConfig.projectId,
      createdAt: new Date().toISOString(),
      collections: collectionsData
    };
    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ahmed-english-backup-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    const total = Object.values(collectionsData).reduce((n, arr) => n + arr.length, 0);
    if (status) status.textContent = '✅ تم تنزيل النسخة: ' + total + ' مستنداً بنجاح.';
  } catch (e) {
    if (status) status.textContent = 'تعذر إنشاء النسخة: ' + (e.message || e);
    alert('تعذر إنشاء النسخة الاحتياطية: ' + (e.message || e));
  }
};

window.restorePlatformBackup = async function() {
  const status = document.getElementById('backupStatus');
  const input = document.getElementById('backupRestoreFile');
  try {
    if (!auth.currentUser) { alert('سجّل دخولك بحساب المدرس أولاً.'); return; }
    const file = input && input.files && input.files[0];
    if (!file) { alert('اختر ملف النسخة الاحتياطية أولاً.'); return; }
    const raw = await file.text();
    const backup = JSON.parse(raw, (key, value) => {
      if (value && value.__platformBackupType === 'Timestamp') {
        return new Timestamp(value.seconds, value.nanoseconds);
      }
      return value;
    });
    if (!backup || !backup.collections) throw new Error('الملف غير متوافق.');
    const entries = [];
    for (const name of BACKUP_COLLECTIONS) {
      const docs = backup.collections[name];
      if (!Array.isArray(docs)) continue;
      for (const item of docs) {
        if (item && item.id && item.data) entries.push({ name, id: item.id, data: item.data });
      }
    }
    if (!entries.length) { alert('لا توجد مستندات للاستعادة.'); return; }
    if (!confirm('سيتم استعادة ' + entries.length + ' مستنداً. متابعة؟')) return;

    if (status) status.textContent = 'جاري الاستعادة...';
    for (let i = 0; i < entries.length; i += 400) {
      const batch = writeBatch(db);
      entries.slice(i, i + 400).forEach(item => {
        batch.set(doc(db, item.name, item.id), item.data);
      });
      await batch.commit();
    }
    if (status) status.textContent = '✅ تمت الاستعادة بنجاح.';
    alert('تمت استعادة البيانات بنجاح.');
  } catch (e) {
    if (status) status.textContent = 'تعذرت الاستعادة: ' + (e.message || e);
    alert('تعذرت الاستعادة: ' + (e.message || e));
  }
};

/* ------------------- تثبيت تطبيق الويب PWA ------------------- */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  const b = document.getElementById('installBtn');
  if (b) { b.style.display = 'inline-flex'; b.innerText = '📲 ثبّت التطبيق'; }
});

window.addEventListener('appinstalled', function() {
  deferredPrompt = null;
  const b = document.getElementById('installBtn');
  if (b) { b.innerText = '✅ تم التثبيت'; b.disabled = true; }
});

window.installApp = async function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (e) {}
    deferredPrompt = null;
    return;
  }
  alert('لتثبيت المنصة على هاتفك: افتحها بمتصفح Chrome واضغط على النقاط الثلاث ⋮ بالأعلى ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».');
};

// مراقبة تسجيل دخول الأدمن
onAuthStateChanged(auth, function(u) {
  if (u) showAdminArea();
});
