# الفصل التفاعلي — إعداد خدمة الصوت والملزمة

هذا إعداد تجريبي معزول. لم يتم نشر Worker أو اختبار صوت حقيقي بين جهازين حتى الآن، ولم يتم دمج التغييرات في `main`.

## الخدمات المطلوبة
1. مشروع LiveKit Cloud للحصول على WebSocket URL وAPI Key وAPI Secret.
2. Cloudflare Worker مع KV namespace باسم `CLASSROOMS` مربوط بالـWorker بالاسم نفسه.
3. ضبط Secrets في إعدادات Worker:
   - `LIVEKIT_URL`
   - `LIVEKIT_API_KEY`
   - `LIVEKIT_API_SECRET`
   - `TEACHER_PIN` (رمز طويل وفريد يحتفظ به المدرس فقط)

## حماية مبدئية
- لا يتم إرسال LiveKit API Secret إلى المتصفح.
- رمز المدرس الخاص بكل غرفة يُنشأ عشوائيًا، ويُخزن Hash فقط.
- المدرس وحده يستطيع إرسال بيانات السبورة وإنهاء الغرفة.
- الطالب يستطيع إرسال الصوت والاستماع، لكنه لا يستطيع إرسال بيانات السبورة.
- الغرف تنتهي تلقائيًا بعد أربع ساعات.
- إنشاء الغرفة يرفض أي طلب لا يحتوي صفًا صحيحًا وملزمة محددة ومعرّف PDF صالحًا.
- `TEACHER_PIN` وسيلة بدء مؤقتة؛ يجب ربط إنشاء الغرفة بمصادقة حساب المدرس قبل الاستخدام الفعلي، مع إضافة حدود للطلبات ومراجعة الخصوصية والأمان.

## الملازم من Google Drive
- صفحة الاختبار تقرأ نفس مجموعة Firestore المسماة `materials` المستخدمة في قسم الملازم المجانية ولوحة المدرس.
- يختار المدرس الصف أولًا ثم إحدى الملازم المتاحة لهذا الصف أو الملازم المحددة `للكل`.
- قيم الصفوف مطابقة لقائمة `matGrade` في لوحة المدرس.
- عند إنشاء الحصة، تُحفظ بيانات الصف والملزمة في بيانات الغرفة المؤقتة.
- عند دخول الطالب، يستلم معرّف الملزمة المرتبطة بالحصة ويحمّل نفس PDF تلقائيًا قبل الاتصال.
- المسار `GET /pdf?fileId=...` يجلب PDF من Google Drive ويعيده مباشرة إلى PDF.js عبر Worker؛ لا ينقل الملف إلى تخزين آخر ولا يحتفظ بنسخة دائمة.
- يدعم المسار `resourcekey` في روابط Drive، ويقبل الملفات العامة فقط بصلاحية «أي شخص لديه الرابط - مشاهد».
- حد حجم PDF التجريبي 40 ميجابايت. تتم مراقبة الحجم أثناء قراءة الاستجابة، وتُرفض ملفات المعاينة أو صفحات التأكيد بدل PDF.
- هذا المسار لا يستخدم OAuth ولا يدعم الملفات الخاصة أو المقيدة. لم يتم اختبار تنزيل ملف حقيقي بعد.

## واجهة الاختبار
- `classroom-demo.html` تستخدم PDF.js وLiveKit JS SDK من CDN.
- المدرس ينشئ غرفة ويشارك رقمها ورمز دخول الطالب.
- المدرس يزامن الصفحة والكتابة؛ الطالب يشاهد فقط.
- يبقى اختيار PDF من الجهاز متاحًا كبديل اختبار.
- لا يوجد رابط Worker منشور حتى الآن، لذلك لن يعمل الاتصال المباشر قبل إعداد الخدمة ونشرها.

## النشر والاختبار
1. انشر Worker في Cloudflare واربط KV واضبط الأسرار من لوحة التحكم فقط.
2. تأكد أن `ALLOWED_ORIGIN` يطابق نطاق GitHub Pages الفعلي. القيمة الحالية هي `https://ahmedsemba.github.io`.
3. افتح `/health` وتأكد أن `configured: true`.
4. اختبر أولًا ملف PDF عام صغيرًا، ثم اختبر الصوت ومزامنة الصفحات والكتابة على جهازين.
5. لا تستخدمه مع طلاب فعليين قبل إكمال المصادقة وحدود الاستخدام واختبارات الأمان والخصوصية.

لا تضع أي Secret أو OAuth Client Secret أو Service Account key في ملفات GitHub أو داخل الصفحة أو المحادثات.


## Teacher microphone controls

The experimental classroom includes teacher-only server-side controls:
- `POST /participants`: validates the teacher secret and returns connected student identities and microphone track state.
- `POST /mute`: validates the teacher secret and mutes the selected student's published microphone track.
- `POST /mute-all`: validates the teacher secret and mutes all currently published student microphone tracks.

These routes use a short-lived, room-scoped LiveKit room-admin JWT signed inside the Worker. The LiveKit API secret is never sent to the browser. Remote unmute remains disabled; a student can turn their microphone back on from their own device. This behavior and the LiveKit project setting should be verified during the real two-device test.
