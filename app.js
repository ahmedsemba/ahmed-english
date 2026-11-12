import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, deleteDoc, query, where, Timestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

let currentStudent = null;
let currentGradeFilter = 'الكل';
let liveUnsubscribe = null;
let liveClassData = null;

const GRADES = [
  "الصف الأول الابتدائي", "الصف الثاني الابتدائي", "الصف الثالث الابتدائي",
  "الصف الرابع الابتدائي", "الصف الخامس الابتدائي", "الصف السادس الابتدائي",
  "الصف الأول الإعدادي", "الصف الثاني الإعدادي", "الصف الثالث الإعدادي"
];

window.escHtml = function(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
window.safeImg = function(u) {
  u = String(u || '');
  return /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+\/=]+$/.test(u) ? u : '';
};

function starsHtml(v) {
  let h = '';
  for (let i = 1; i <= 5; i++) h += (i <= v ? '⭐' : '☆');
  return h;
}

function editableStars(id, type, val) {
  let h = '';
  for (let i = 1; i <= 5; i++) {
    h += '<span class="star ' + (i <= val ? 'active' : '') + '" onclick="setEval(\'' + id + '\',\'' + type + '\',' + i + ')">★</span>';
  }
  return h + ' <small>(' + val + '/5)</small>';
}

window.setEval = async function(id, type, val) {
  await updateDoc(doc(db, 'students', id), { [type]: val });
  loadAdminFiltered();
};

window.registerStudent = async function() {
  try {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const parentPhone = document.getElementById('parentPhone').value.trim();
    const grade = document.getElementById('grade').value;
    if (!name || !phone) { alert('اكمل البيانات'); return; }
    await addDoc(collection(db, 'students'), {
      name, phone, parentPhone, grade, status: 'pending', created: Date.now(),
      eval_interaction: 0, eval_homework: 0, eval_month: 0
    });
    document.getElementById('regMsg').innerHTML = '✅ تم التسجيل - انتظر الموافقة';
  } catch (e) {
    alert('خطأ: ' + e.message);
  }
};

window.saveSchedule = async function() {
  const grade = document.getElementById('schedGrade').value;
  const time = document.getElementById('schedTime').value.trim();
  if (!time) { alert('اكتب الموعد'); return; }
  await setDoc(doc(db, 'schedules', grade), { grade, time, updated: Date.now() });
  alert('✅ تم حفظ موعد ' + grade);
  loadSchedulesAdmin();
};

window.loadSchedulesAdmin = async function() {
  try {
    const snap = await getDocs(collection(db, 'schedules'));
    let html = '';
    snap.forEach(function(d) {
      html += '<div class="student-row">📅 <b>' + d.data().grade + ':</b> ' + d.data().time + ' <button class="btn-small" style="background:#ef4444" onclick="deleteSchedule(\'' + d.id + '\')">حذف</button></div>';
    });
    document.getElementById('schedulesList').innerHTML = html || 'لا يوجد مواعيد';
  } catch (e) { console.log(e); }
};

window.deleteSchedule = async function(id) {
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

window.loginParent = async function() {
  try {
    const pPhone = document.getElementById('parentLoginPhone').value.trim();
    if (!pPhone) { alert('اكتب رقم ولي الأمر'); return; }
    const q = query(collection(db, 'students'), where('parentPhone', '==', pPhone));
    const snap = await getDocs(q);
    if (snap.empty) {
      document.getElementById('parentArea').innerHTML = '<p>❌ لا يوجد طالب بهذا الرقم</p>';
      document.getElementById('parentArea').style.display = 'block';
      return;
    }
    let html = '';
    for (const d of snap.docs) {
      const s = d.data(), sid = d.id;
      const sched = await getScheduleForGrade(s.grade);
      const paySnap = await getDocs(query(collection(db, 'payments'), where('studentId', '==', sid)));
      let payments = [];
      paySnap.forEach(p => payments.push({ id: p.id, ...p.data() }));
      payments.sort((a, b) => (b.created || 0) - (a.created || 0));
      const labels = { pending: '⏳ قيد المراجعة', approved: '✅ تم تأكيد الدفع', rejected: '❌ لم يتم قبول الإيصال' };
      const history = payments.length ? payments.slice(0, 5).map(p =>
        '<div class="student-row"><b>' + window.escHtml(String(p.amount || 0)) + ' جنيه</b> — ' + (p.method === 'InstaPay' ? 'إنستاباي' : 'اتصالات كاش') + '<br><small>' + (labels[p.status] || 'قيد المراجعة') + '</small></div>'
      ).join('') : '<small style="color:#94a3b8">لا توجد مدفوعات مسجلة حتى الآن.</small>';

      html += '<div class="card" style="background:#0f172a;border:2px solid #f59e0b"><h3>👦 ' + window.escHtml(s.name || '') + ' - ' + window.escHtml(s.grade || '') + '</h3><div class="scheduleBox">⏰ ' + sched + '</div><div>تفاعل: ' + starsHtml(s.eval_interaction || 0) + ' واجب: ' + starsHtml(s.eval_homework || 0) + ' شهر: ' + starsHtml(s.eval_month || 0) + '</div><hr style="border-color:#334155;margin:12px 0"><h4>💳 مدفوعات الطالب</h4><p style="font-size:12px;color:#cbd5e1">سجّل المبلغ وطريقة التحويل، ثم أرسل صورة الإيصال عبر واتساب.</p><select id="parentPaymentMethod_' + sid + '"><option value="InstaPay">إنستاباي</option><option value="Etisalat Cash">اتصالات كاش</option></select><input id="parentPaymentAmount_' + sid + '" type="number" min="1" step="1" placeholder="المبلغ المحوّل بالجنيه"><input id="parentPaymentNote_' + sid + '" maxlength="120" placeholder="ملاحظة (اختياري)"><button onclick="submitParentPayment(\'' + sid + '\',\'' + window.escHtml(s.name || '').replace(/'/g, '&#39;') + '\',\'' + window.escHtml(s.grade || '').replace(/'/g, '&#39;') + '\')" style="background:#10b981">تسجيل الدفع وإرسال صورة الإيصال</button><div id="parentPaymentMsg_' + sid + '" style="font-size:12px;margin-top:8px"></div><h4 style="margin-top:14px">سجل المدفوعات</h4><div>' + history + '</div></div>';
    }
    document.getElementById('parentArea').innerHTML = html;
    document.getElementById('parentArea').style.display = 'block';
  } catch (e) { alert('خطأ: ' + e.message); }
};

window.submitParentPayment = async function(studentId, studentName, grade) {
  try {
    const method = document.getElementById('parentPaymentMethod_' + studentId).value;
    const amount = Number(document.getElementById('parentPaymentAmount_' + studentId).value);
    const note = document.getElementById('parentPaymentNote_' + studentId).value.trim();
    if (!Number.isFinite(amount) || amount <= 0) { alert('اكتب المبلغ بشكل صحيح'); return; }
    const ref = await addDoc(collection(db, 'payments'), {
      studentId, studentName, phone: '', grade, method, amount, note, status: 'pending', created: Date.now(), submittedBy: 'parent'
    });
    const message = 'طلب دفع جديد\nالطالب: ' + studentName + '\nالصف: ' + grade + '\nالمبلغ: ' + amount + ' جنيه\nالطريقة: ' + (method === 'InstaPay' ? 'إنستاباي' : 'اتصالات كاش') + '\nرقم الطلب: ' + ref.id + '\nسأرفق صورة الإيصال.';
    document.getElementById('parentPaymentMsg_' + studentId).innerHTML = '✅ تم تسجيل الدفع. <a target="_blank" rel="noopener" style="color:#25D366;font-weight:900" href="https://wa.me/201116811324?text=' + encodeURIComponent(message) + '">اضغط هنا لإرسال صورة الإيصال على واتساب</a>';
    document.getElementById('parentPaymentAmount_' + studentId).value = '';
    document.getElementById('parentPaymentNote_' + studentId).value = '';
  } catch (e) { alert('تعذر تسجيل الدفع: ' + (e.message || e)); }
};

async function loadStudentLesson() {
  try {
    const snapL = await getDocs(collection(db, 'lessons'));
    let html = '';
    snapL.forEach(function(docD) {
      const l = docD.data();
      if (l.grade && l.grade !== 'للكل' && l.grade !== currentStudent.grade) return;
      const TWO = 2 * 60 * 60 * 1000;
      if (Date.now() - (l.created || 0) > TWO) {
        html = '<div class="card">⏰ انتهت الحصة</div>';
        return;
      }
      html = '<div class="card"><h3>' + l.title + '</h3>' +
        (l.meetLink ? '<a target="_blank" href="' + l.meetLink + '" style="background:#10b981;display:block;padding:12px;border-radius:10px;color:#fff;text-decoration:none;margin-top:10px">🎥 ميت</a>' : '') +
        (l.ytLink ? '<a target="_blank" href="' + l.ytLink + '" style="background:#ef4444;display:block;padding:10px;border-radius:10px;color:#fff;text-decoration:none;margin-top:8px">▶️ يوتيوب</a>' : '') + '</div>';
    });
    document.getElementById('lessonsList').innerHTML = html || '<p>لا يوجد حصص حاليا</p>';
  } catch (e) { console.log(e); }
}

window.addMaterial = async function() {
  try {
    const title = document.getElementById('matTitle').value.trim();
    const link = document.getElementById('matLink').value.trim();
    const grade = document.getElementById('matGrade').value;
    if (!title || !link) { alert('اكتب العنوان واللينك'); return; }
    if (link.indexOf('http') !== 0) { alert('اللينك لازم يبدأ بـ http'); return; }
    await addDoc(collection(db, 'materials'), { title, link, grade, created: Date.now() });
    document.getElementById('matMsg').innerText = '✅ تم إضافة الملزمة';
    document.getElementById('matTitle').value = '';
    document.getElementById('matLink').value = '';
    loadMaterialsAdmin();
    alert('تم إضافة الملزمة');
  } catch (e) { alert('خطأ: ' + e.message); }
};

window.loadMaterialsAdmin = async function() {
  try {
    const list = document.getElementById('materialsAdminList');
    if (!list) return;
    const snap = await getDocs(collection(db, 'materials'));
    let items = [];
    snap.forEach(function(d) { items.push({ id: d.id, ...d.data() }); });
    items.sort(function(a, b) { return (b.created || 0) - (a.created || 0); });
    if (items.length === 0) { list.innerHTML = '<p style="color:#94a3b8">لا يوجد ملازم حالياً</p>'; return; }
    let html = '';
    items.forEach(function(m) {
      html += '<div class="student-row" style="border:1px solid #334155;margin-top:8px"><b>📚 ' + m.title + '</b><br><small>' + m.grade + '</small><br><a href="' + m.link + '" target="_blank" style="color:#60a5fa;font-size:12px">فتح اللينك</a><br><button class="btn-small" style="background:#ef4444;margin-top:6px" onclick="deleteMaterial(\'' + m.id + '\')">🗑️ حذف</button></div>';
    });
    list.innerHTML = html;
  } catch (e) { console.log(e); }
};

window.deleteMaterial = async function(id) {
  if (!confirm('هل تريد حذف هذه الملزمة؟')) return;
  await deleteDoc(doc(db, 'materials', id));
  loadMaterialsAdmin();
  alert('تم الحذف');
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
      items.push({ id: d.id, ...m });
    });
    items.sort(function(a, b) { return (b.created || 0) - (a.created || 0); });
    if (items.length === 0) { cont.innerHTML = '<p style="color:#94a3b8">مفيش ملازم لصفك حالياً</p>'; return; }
    let html = '';
    items.forEach(function(m) {
      html += '<div class="student-row" style="border:1px solid #8b5cf6;margin-top:8px"><b>📚 ' + m.title + '</b><br><a href="' + m.link + '" target="_blank" style="display:inline-block;margin-top:8px;background:#8b5cf6;color:#fff;padding:8px 14px;border-radius:8px;text-decoration:none;font-weight:700">📂 فتح / تحميل الملزمة</a></div>';
    });
    cont.innerHTML = html;
  } catch (e) { console.log(e); cont.innerHTML = '<p>خطأ في التحميل</p>'; }
};

async function compressQuizPhoto(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة الصورة'));
    reader.onload = function() {
      const img = new Image();
      img.onerror = () => reject(new Error('صيغة الصورة غير مدعومة'));
      img.onload = function() {
        const scale = Math.min(1, 1100 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg', 0.62);
        if (data.length > 850000) {
          const c2 = document.createElement('canvas');
          c2.width = Math.max(1, Math.round(canvas.width * 0.75));
          c2.height = Math.max(1, Math.round(canvas.height * 0.75));
          c2.getContext('2d').drawImage(canvas, 0, 0, c2.width, c2.height);
          data = c2.toDataURL('image/jpeg', 0.42);
        }
        if (data.length > 850000) {
          reject(new Error('حجم الصورة كبير بعد الضغط. اختَر صورة بحجم أصغر.'));
          return;
        }
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
    document.getElementById('paperHomeworkAdminMsg').innerText = '✅ تم نشر الواجب الورقي للصف المحدد.';
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
    let nextExpiry = Infinity;
    let html = '<h4 style="color:#67e8f9">الواجبات الورقية ونتائج التصحيح</h4>', shown = 0;

    hwSnap.forEach(d => {
      const h = d.data(), sub = submitted[d.id];
      if (h.grade !== 'للكل' && h.grade !== currentStudent.grade) return;
      if (sub && sub.reviewed) {
        const reviewedAt = Number(sub.reviewedAt || 0);
        if (!reviewedAt || now - reviewedAt > WEEK) return;
        nextExpiry = Math.min(nextExpiry, reviewedAt + WEEK);
        shown++;
        html += '<div class="student-row"><b>📷 ' + window.escHtml(h.title || sub.title || 'واجب ورقي') + '</b><br><small>تم التصحيح — النتيجة متاحة لمدة أسبوع من تاريخ التصحيح</small><div style="color:#10b981;margin-top:8px;font-size:18px;font-weight:900">الدرجة: ' + Number(sub.score || 0) + '/10</div><div style="white-space:pre-wrap;margin-top:5px">ملاحظات المستر: ' + window.escHtml(sub.feedback || 'لا توجد ملاحظات') + '</div></div>';
        return;
      }
      if (h.active === false) return;
      shown++;
      html += '<div class="student-row"><b>📷 ' + window.escHtml(h.title || 'واجب ورقي') + '</b><br><small>' + window.escHtml(h.grade || '') + '</small>';
      if (sub) {
        html += '<div style="color:#fbbf24;margin-top:7px">✅ تم إرسال الواجب</div><div style="color:#cbd5e1;margin-top:6px">⏳ في انتظار تصحيح المستر</div>';
      } else {
        html += '<p style="font-size:12px;color:#cbd5e1">صوّر صفحات الواجب بوضوح — مسموح حتى 3 صور.</p><input type="file" id="paperFiles_' + d.id + '" accept="image/*" capture="environment" multiple><button class="btn-small" style="background:#0891b2;width:100%;margin-top:8px" onclick="submitPaperHomework(\'' + d.id + '\',\'' + window.escHtml(h.title || 'واجب ورقي').replace(/'/g, '&#39;') + '\')">📤 إرسال صور الواجب</button>';
      }
      html += '</div>';
    });
    box.innerHTML = html + (shown ? '' : '<p style="color:#94a3b8">لا توجد واجبات ورقية مطلوبة حالياً أو نتائج حديثة.</p>');
  } catch (e) {
    box.innerHTML = '<p style="color:#ef4444">تعذر تحميل الواجب الورقي: ' + window.escHtml(e.message || e) + '</p>';
  }
};

window.submitPaperHomework = async function(homeworkId, title) {
  try {
    if (!currentStudent) { alert('سجّل دخولك أولاً'); return; }
    const input = document.getElementById('paperFiles_' + homeworkId);
    const files = input && input.files ? Array.from(input.files) : [];
    if (!files.length) { alert('صوّر الواجب أو اختر الصور أولاً'); return; }
    if (files.length > 3) { alert('مسموح بحد أقصى 3 صور'); return; }
    const ref = await addDoc(collection(db, 'paper_submissions'), {
      homeworkId, title, studentId: currentStudent.id, studentName: currentStudent.name,
      grade: currentStudent.grade, photoCount: files.length, created: Date.now(), reviewed: false, score: 0, feedback: ''
    });
    for (let i = 0; i < files.length; i++) {
      const dataUrl = await compressQuizPhoto(files[i]);
      await addDoc(collection(db, 'paper_submission_photos'), {
        submissionId: ref.id, studentId: currentStudent.id, index: i + 1, dataUrl, created: Date.now()
      });
    }
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
    if (!rows.length) { box.innerHTML = '<p style="color:#94a3b8">لا توجد تسليمات ظاهرة حالياً.</p>'; return; }
    box.innerHTML = rows.map(x => {
      const imgs = (photos[x.id] || []).sort((a, b) => (a.index || 0) - (b.index || 0));
      const imageHtml = imgs.map(p => '<a href="' + window.safeImg(p.dataUrl) + '" target="_blank" rel="noopener"><img src="' + window.safeImg(p.dataUrl) + '" alt="صورة الواجب" style="width:100px;height:130px;object-fit:contain;background:#fff;border-radius:8px;margin:4px"></a>').join('');
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

window.savePaperCorrection = async function(id) {
  const score = Number(document.getElementById('paperScore_' + id).value);
  const feedback = document.getElementById('paperFeedback_' + id).value.trim();
  if (!Number.isFinite(score) || score < 0 || score > 10) { alert('اكتب الدرجة من 0 إلى 10'); return; }
  await updateDoc(doc(db, 'paper_submissions', id), { score, feedback, reviewed: true, reviewedAt: Date.now() });
  alert('✅ تم حفظ التصحيح وسيظهر للطالب.');
  loadPaperHomeworkAdmin();
};

window.loadPaymentHistory = async function() {
  try {
    const box = document.getElementById('paymentHistory');
    if (!box || !currentStudent) return;
    const snap = await getDocs(query(collection(db, 'payments'), where('studentId', '==', currentStudent.id)));
    let items = [];
    snap.forEach(function(d) { items.push({ id: d.id, ...d.data() }); });
    items.sort(function(a, b) { return (b.created || 0) - (a.created || 0); });
    if (!items.length) { box.innerHTML = '<small style="color:#94a3b8">لا توجد حالة دفع مسجلة حاليًا.</small>'; return; }
    const labels = { pending: '⏳ قيد المراجعة', approved: '✅ تم تأكيد الدفع', rejected: '❌ لم يتم قبول الإيصال' };
    box.innerHTML = '<b>حالة الدفع</b>' + items.slice(0, 3).map(function(p) {
      return '<div class="student-row"><b>' + (labels[p.status] || 'قيد المراجعة') + '</b></div>';
    }).join('');
  } catch (e) { console.log('payment history', e); }
};

window.loadPaymentsAdmin = async function() {
  try {
    const box = document.getElementById('paymentsAdminList');
    if (!box) return;
    const snap = await getDocs(collection(db, 'payments'));
    let items = [];
    snap.forEach(function(d) { items.push({ id: d.id, ...d.data() }); });
    items.sort(function(a, b) { return (b.created || 0) - (a.created || 0); });
    if (!items.length) { box.innerHTML = '<p style="color:#94a3b8">لا توجد طلبات دفع حتى الآن.</p>'; return; }
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

window.loginStudent = async function() {
  try {
    const phone = document.getElementById('loginPhone').value.trim();
    if (!phone) { alert('اكتب رقمك'); return; }
    const q = query(collection(db, 'students'), where('phone', '==', phone));
    const snap = await getDocs(q);
    if (snap.empty) { document.getElementById('loginMsg').innerText = '❌ رقم مش متسجل'; return; }
    const d = snap.docs[0];
    const data = d.data();
    if (data.status === 'pending') { document.getElementById('loginMsg').innerText = '⏳ لسه موافقناش - تواصل 01116811324'; return; }
    if (data.status === 'blocked') { document.getElementById('loginMsg').innerText = '🚫 محظور'; return; }
    currentStudent = { id: d.id, ...data };
    window.currentStudent = currentStudent;
    watchLiveClassForStudent();
    document.getElementById('studentArea').style.display = 'block';
    document.getElementById('welcome').innerText = 'أهلا يا ' + data.name;
    const sched = await getScheduleForGrade(data.grade);
    document.getElementById('studentSchedule').innerHTML = '<div class="scheduleBox">⏰ ' + data.grade + ': ' + sched + '</div>';
    document.getElementById('evalDisplay').innerHTML = '<h4>📊 تقييمك</h4><div>تفاعل: ' + starsHtml(data.eval_interaction || 0) + '</div><div>واجب: ' + starsHtml(data.eval_homework || 0) + '</div><div>شهر: ' + starsHtml(data.eval_month || 0) + '</div>';
    if ((data.eval_month || 0) >= 5) {
      const today = new Date().toLocaleDateString('ar-EG');
      document.getElementById('certArea').innerHTML = '<div class="certCard"><h2>🏆 درع التفوق</h2><h2>' + data.name + '</h2><p>' + today + '</p></div>';
    }
    loadStudentLesson();
    loadStudentMaterials();
    loadPaperHomeworkStudent();
    loadPaymentHistory();
  } catch (e) { document.getElementById('loginMsg').innerText = 'خطأ: ' + e.message; }
};

window.loadAdmin = async function() { loadAdminFiltered(); };

window.loadAdminFiltered = async function() {
  try {
    const allStudentsSnap = await getDocs(collection(db, 'students'));
    const snap2 = await getDocs(collection(db, 'quiz_submissions'));
    let studentCountMap = {};
    let hwCountMap = {};
    GRADES.forEach(function(g) { studentCountMap[g] = 0; hwCountMap[g] = 0; });
    allStudentsSnap.forEach(function(d) { const g = d.data().grade; if (studentCountMap[g] !== undefined) studentCountMap[g]++; });
    snap2.forEach(function(d) { const g = d.data().grade; if (hwCountMap[g] !== undefined) hwCountMap[g]++; });

    var gf = document.getElementById('gradeFilter');
    if (gf) {
      gf.innerHTML = '<span class="gradeTab ' + (currentGradeFilter === 'الكل' ? 'active' : '') + '" onclick="filterGrade(\'الكل\')">الكل (' + allStudentsSnap.size + ')</span>' +
        GRADES.map(function(g) {
          return '<span class="gradeTab ' + (currentGradeFilter === g ? 'active' : '') + '" onclick="filterGrade(\'' + g + '\')">' + g.replace('الصف ', '') + ' (' + studentCountMap[g] + '👦|' + hwCountMap[g] + '📝)</span>';
        }).join('');
    }
    const searchTerm = document.getElementById('studentSearch') ? document.getElementById('studentSearch').value.trim().toLowerCase() : '';
    let students = [];
    allStudentsSnap.forEach(function(d) { students.push({ id: d.id, data: d.data() }); });
    if (currentGradeFilter !== 'الكل') students = students.filter(function(s) { return s.data.grade === currentGradeFilter; });
    if (searchTerm) students = students.filter(function(s) { return s.data.name.toLowerCase().includes(searchTerm); });

    const pending = document.getElementById('pendingList');
    const approved = document.getElementById('approvedList');
    const blocked = document.getElementById('blockedList');
    if (pending) pending.innerHTML = '';
    if (approved) approved.innerHTML = '';
    if (blocked) blocked.innerHTML = '';

    students.forEach(function(item) {
      const s = item.data;
      const id = item.id;
      if (s.status == 'pending') {
        if (pending) pending.innerHTML += '<div class="student-row"><div>⏳ ' + window.escHtml(s.name) + ' - ' + window.escHtml(s.phone) + '</div><div><button class="btn-small" onclick="approve(\'' + id + '\')" style="background:#10b981">موافقة</button><button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444">حذف</button></div></div>';
      } else if (s.status == 'blocked') {
        if (blocked) blocked.innerHTML += '<div class="student-row" style="border:2px solid #ef4444"><div><b>🚫 ' + window.escHtml(s.name) + '</b> - ' + window.escHtml(s.phone) + '</div><div><button class="btn-small" onclick="approve(\'' + id + '\')" style="background:#10b981">✅ فك الحظر</button><button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444">🗑️ حذف</button></div></div>';
      } else {
        if (approved) approved.innerHTML += '<div class="student-row" style="border:2px solid #f59e0b"><div style="width:100%"><b>✅ ' + window.escHtml(s.name) + '</b> - ' + window.escHtml(s.phone) + '<br><small>' + window.escHtml(s.grade) + '</small><div>تفاعل: ' + editableStars(id, 'eval_interaction', s.eval_interaction || 0) + '</div><div>واجب: ' + editableStars(id, 'eval_homework', s.eval_homework || 0) + '</div><div>شهر: ' + editableStars(id, 'eval_month', s.eval_month || 0) + '</div><div style="margin-top:10px;display:flex;gap:6px"><button class="btn-small" onclick="blockStudent(\'' + id + '\')" style="background:#f97316;flex:1">🚫 حظر</button><button class="btn-small" onclick="deleteStudent(\'' + id + '\')" style="background:#ef4444;flex:1">🗑️ حذف</button></div></div></div>';
      }
    });
  } catch (e) { console.log(e); }
};

window.filterGrade = function(g) { currentGradeFilter = g; loadAdminFiltered(); };
window.approve = async function(id) { await updateDoc(doc(db, 'students', id), { status: 'approved' }); loadAdminFiltered(); };
window.blockStudent = async function(id) { if (!confirm('حظر؟')) return; await updateDoc(doc(db, 'students', id), { status: 'blocked' }); loadAdminFiltered(); };
window.deleteStudent = async function(id) { if (!confirm('حذف نهائي؟')) return; await deleteDoc(doc(db, 'students', id)); loadAdminFiltered(); };

window.addLesson = async function() {
  const title = document.getElementById('lessonTitle').value.trim();
  const meetLink = document.getElementById('meetLink').value.trim();
  const ytLink = document.getElementById('ytLink').value.trim();
  const grade = document.getElementById('lessonGrade').value;
  if (!title) { alert('عنوان'); return; }
  await setDoc(doc(db, 'lessons', 'current'), { title, meetLink, ytLink, grade, created: Date.now() });
  alert('تم نشر الحصة');
};

window.clearLesson = async function() {
  await deleteDoc(doc(db, 'lessons', 'current'));
  alert('تم إنهاء الحصة');
};

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
  if (area.style.display === 'block') return;
  area.style.display = 'block';
  document.getElementById('adminPass').value = '';
  loadAdmin();
  loadSchedulesAdmin();
}

window.logoutAdmin = async function() {
  await signOut(auth);
  document.getElementById('adminArea').style.display = 'none';
};

onAuthStateChanged(auth, function(u) { if (u) showAdminArea(); });

function validMeetUrl(value) {
  return /^https:\/\/(meet\.google\.com)\/[a-z-]+(?:\?.*)?$/i.test(String(value || '').trim());
}

window.openTeacherMeet = function() {
  const url = document.getElementById('liveMeetUrl').value.trim();
  if (!validMeetUrl(url)) { alert('الصق رابط Google Meet صحيحاً يبدأ بـ https://meet.google.com/'); return; }
  window.open(url, '_blank', 'noopener');
};

window.startLiveClass = async function() {
  const title = document.getElementById('liveClassTitle').value.trim();
  const grade = document.getElementById('liveClassGrade').value;
  const meetUrl = document.getElementById('liveMeetUrl').value.trim();
  if (!title) { alert('اكتب عنوان الحصة أولاً'); return; }
  if (!validMeetUrl(meetUrl)) { alert('الصق رابط Google Meet صحيحاً أولاً.'); return; }
  const btn = document.getElementById('startLiveClassBtn');
  btn.disabled = true; btn.textContent = 'جاري إتاحة الرابط...';
  try {
    const startedAt = Date.now();
    const data = { active: true, title, grade, meetUrl, created: startedAt, expiresAt: startedAt + 4 * 60 * 60 * 1000 };
    await setDoc(doc(db, 'live_classes', 'current'), data);
    liveClassData = data;
    document.getElementById('teacherLiveInfo').textContent = 'رابط الحصة متاح للطلاب: ' + title + ' — ' + grade;
    document.getElementById('endLiveClassBtn').style.display = 'block';
    alert('تم إتاحة رابط Google Meet للطلاب المحددين.');
  } catch (e) {
    alert('تعذر إتاحة الرابط: ' + (e.message || e));
  } finally {
    btn.disabled = false; btn.textContent = '📢 إتاحة رابط الحصة للطلاب';
  }
};

window.endLiveClass = async function() {
  if (!confirm('هل تريد إنهاء الحصة الحالية وإخفاء الرابط عن الطلاب؟')) return;
  try {
    await deleteDoc(doc(db, 'live_classes', 'current'));
    liveClassData = null;
    document.getElementById('teacherLiveInfo').textContent = 'تم إنهاء الحصة وإخفاء الرابط.';
    document.getElementById('endLiveClassBtn').style.display = 'none';
  } catch (e) { alert('تعذر إنهاء الحصة: ' + (e.message || e)); }
};

function watchLiveClassForStudent() {
  const student = window.currentStudent;
  if (!student) return;
  if (liveUnsubscribe) liveUnsubscribe();
  const box = document.getElementById('studentLiveClass'), info = document.getElementById('studentLiveInfo'), join = document.getElementById('studentJoinLiveBtn');
  liveUnsubscribe = onSnapshot(doc(db, 'live_classes', 'current'), snap => {
    if (!snap.exists()) { box.style.display = 'none'; join.style.display = 'none'; return; }
    const d = snap.data(), now = Date.now(), fresh = Number(d.expiresAt) > now;
    const allowed = d.active === true && fresh && validMeetUrl(d.meetUrl) && (d.grade === 'للكل' || d.grade === student.grade);
    if (!allowed) { box.style.display = 'none'; join.style.display = 'none'; liveClassData = null; return; }
    liveClassData = d;
    box.style.display = 'block';
    info.textContent = '🔴 حصة متاحة الآن: ' + (d.title || 'حصة') + ' — ' + (d.grade || '');
    join.style.display = 'block';
  }, err => {
    box.style.display = 'none'; join.style.display = 'none'; liveClassData = null;
  });
}

window.joinStudentLiveClass = function() {
  const student = window.currentStudent;
  if (!student || !liveClassData || !liveClassData.active) { alert('لا توجد حصة متاحة حالياً'); return; }
  if (!validMeetUrl(liveClassData.meetUrl)) { alert('رابط Google Meet غير متاح. تواصل مع المستر.'); return; }
  window.open(liveClassData.meetUrl, '_blank', 'noopener');
};