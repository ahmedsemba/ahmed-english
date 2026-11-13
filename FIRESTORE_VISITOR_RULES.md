# Firestore Rules addition for the public visitor counter

Add the following match block INSIDE your existing `match /databases/{database}/documents {` block.
Do not replace your existing Firestore rules. Keep all existing rules for students, parents, lessons, payments, and materials unchanged.

```javascript
match /siteStats/{statId} {
  // The public site can read only this one aggregate counter.
  allow read: if statId == "visitors";

  // The first visit creates the counter at exactly 1.
  allow create: if statId == "visitors"
    && request.resource.data.keys().hasOnly(["count", "updatedAt"])
    && request.resource.data.count == 1
    && request.resource.data.updatedAt == request.time;

  // Every page load may increase the counter by exactly one.
  allow update: if statId == "visitors"
    && request.resource.data.keys().hasOnly(["count", "updatedAt"])
    && request.resource.data.count == resource.data.count + 1
    && request.resource.data.updatedAt == request.time;

  allow delete: if false;
}
```

This permits public reading of only `siteStats/visitors` and a one-step increment. It does not grant access to student or parent collections. Consider enabling Firebase App Check to reduce automated abuse of this public counter.
