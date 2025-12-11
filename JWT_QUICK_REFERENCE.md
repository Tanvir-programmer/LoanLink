## JWT Implementation - Quick Reference

### File Structure

```
utils/
  ├── tokenManager.js       ← Token storage/retrieval
  ├── axiosInstance.js      ← Axios with JWT interceptor
  └── api.js                ← All API calls (use these!)

src/context/
  └── AuthProvider.jsx      ← Updated to handle JWT

src/pages/
  ├── Register.jsx          ← Gets token after registration
  └── login/Login.jsx       ← Gets token after Google sign-in
```

---

### What Token to Send?

**Frontend automatically sends:**

```
Authorization: Bearer {firebaseIdToken}
```

**No manual setup needed!** Just use `api.js` functions.

---

### API Functions to Use

Replace direct axios calls with these:

```javascript
// BEFORE (no JWT sent)
import axios from "axios";
axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);

// AFTER (JWT automatically sent)
import { saveOrUpdateUser } from "../../utils/api";
await saveOrUpdateUser(userData);
```

---

### Common Tasks

**1. Save User Data**

```javascript
import { saveOrUpdateUser } from "../../utils/api";
await saveOrUpdateUser({ name, email, photoURL, role });
```

**2. Get User Profile**

```javascript
import { getUserProfile } from "../../utils/api";
const profile = await getUserProfile(); // Requires auth
```

**3. Get All Loans**

```javascript
import { getAllLoans } from "../../utils/api";
const loans = await getAllLoans(); // Public endpoint
```

**4. Apply for Loan**

```javascript
import { applyForLoan } from "../../utils/api";
await applyForLoan({ loanId, amount, duration });
```

---

### Where JWT Flows

```
Login/Register
     ↓
Firebase authenticates
     ↓
Client: getIdToken()
     ↓
Client: saveToken(token)  ← Stored in localStorage
     ↓
API Call: Authorization header added by interceptor
     ↓
Backend: Verify token
     ↓
Return user data
     ↓
Logout: removeToken()  ← Cleared from localStorage
```

---

### Backend Validation (Node.js/Express)

```javascript
// middleware/verifyToken.js
const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Usage on routes
app.post("/user", verifyToken, (req, res) => {
  // Only authenticated users
});
```

---

### Test in Browser Console

```javascript
// Check token exists
localStorage.getItem("loanlink_auth_token");

// Check it's being sent (DevTools > Network > any request > Headers)
// Should see: Authorization: Bearer eyJ...

// Test API call
import { getUserProfile } from "../../utils/api";
await getUserProfile().then(console.log);
```

---

### Common Issues

| Issue                | Solution                                       |
| -------------------- | ---------------------------------------------- |
| 401 on API calls     | Check if `getToken()` returns value in console |
| Token not persisting | Verify `saveToken()` called after login        |
| CORS errors          | Check `VITE_API_URL` is correct in `.env`      |
| 401 after refresh    | Token expired; auto-refresh in 55 min interval |

---

### Environment Variables Needed

```
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_API_URL=https://your-backend-api.com/api
```

The `VITE_API_URL` is used by axiosInstance to make requests.
