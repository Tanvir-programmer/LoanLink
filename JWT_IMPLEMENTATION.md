# JWT Implementation Guide for LoanLink

## Overview

JWT (JSON Web Tokens) provide stateless authentication for your API. Instead of storing sessions on the server, the client receives a token from Firebase that proves the user's identity and can be sent with every API request.

---

## What Was Implemented

### 1. **Token Manager** (`utils/tokenManager.js`)

Handles all token storage/retrieval operations:

- `saveToken(token)` - Store JWT in localStorage
- `getToken()` - Retrieve JWT
- `removeToken()` - Clear JWT on logout
- `hasToken()` - Check if token exists

### 2. **Axios Interceptor** (`utils/axiosInstance.js`)

Automatically attaches the JWT to all API requests:

- **Request Interceptor**: Adds `Authorization: Bearer {token}` header
- **Response Interceptor**: Handles 401 errors (token expired/invalid)

### 3. **API Utilities** (`utils/api.js`)

Centralized API calls that automatically use the JWT:

- `saveOrUpdateUser(userData)` - Save user to DB
- `getUserProfile()` - Fetch user data
- `getAllLoans()` - Get loans list
- `getLoanDetails(id)` - Get loan details
- `applyForLoan(data)` - Submit loan application
- `getUserApplications()` - Get user's applications

### 4. **Updated Auth Provider** (`src/context/AuthProvider.jsx`)

- Fetches Firebase ID token on login using `getIdToken()`
- Stores token automatically via `saveToken()`
- Clears token on logout via `removeToken()`
- Refreshes token on auth state changes

### 5. **Updated Login/Register Pages**

- Explicitly get ID token after Google sign-in
- Store token immediately after authentication

---

## How JWT Flow Works

```
1. User logs in (Email/Password/Google)
2. Firebase authenticates user
3. Client calls: const idToken = await user.getIdToken()
4. Client stores token: saveToken(idToken)
5. All API requests include: Authorization: Bearer {idToken}
6. Backend validates token and processes request
7. On logout: removeToken() clears localStorage
```

---

## Backend Implementation (Node.js/Express Example)

If you're building a backend, implement this middleware:

```javascript
// middleware/verifyToken.js
const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.substring(7); // Remove "Bearer "

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
```

Then use on protected routes:

```javascript
app.post("/user", verifyToken, (req, res) => {
  // Only authenticated users can reach here
  const userId = req.user.uid;
  // ... save user data ...
});
```

---

## Usage Examples

### Save User After Registration

```javascript
import { saveOrUpdateUser } from "../../utils/api";

await saveOrUpdateUser({
  name: "John Doe",
  email: "john@example.com",
  photoURL: "...",
  role: "borrower",
});
// JWT automatically included in request
```

### Get User Profile

```javascript
import { getUserProfile } from "../../utils/api";

try {
  const profile = await getUserProfile();
  console.log(profile); // User data from backend
} catch (error) {
  if (error.response?.status === 401) {
    // User not authenticated
    navigate("/login");
  }
}
```

### Apply for Loan

```javascript
import { applyForLoan } from "../../utils/api";

await applyForLoan({
  loanId: 1,
  amount: 50000,
  duration: "24 months",
});
// JWT automatically sent with request
```

---

## Token Refresh (Optional Advanced)

Firebase ID tokens expire after ~1 hour. For long-running sessions:

```javascript
// In AuthProvider useEffect:
useEffect(() => {
  // Refresh token every 55 minutes
  const interval = setInterval(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true).then((token) => saveToken(token));
    }
  }, 55 * 60 * 1000);

  return () => clearInterval(interval);
}, []);
```

---

## Files Created/Modified

✅ **Created:**

- `utils/tokenManager.js` - Token storage
- `utils/axiosInstance.js` - Axios with JWT interceptor
- `utils/api.js` - API utilities (uses axiosInstance)

✅ **Modified:**

- `src/context/AuthProvider.jsx` - Get/store tokens on auth changes
- `src/pages/Register.jsx` - Get token after registration
- `src/pages/login/Login.jsx` - Get token after Google sign-in

---

## Security Best Practices

1. ✅ **Never store tokens in localStorage alongside sensitive data**

   - JWT is readable (not encrypted), only verified

2. ✅ **Always use HTTPS in production**

   - Prevents man-in-the-middle attacks

3. ✅ **Validate token on backend** (required)

   - Frontend JWT validation is for UX, backend validation is for security

4. ✅ **Set appropriate expiration times**

   - Firebase: ~1 hour by default (good)

5. ✅ **Use httpOnly cookies for extra security** (advanced)
   - More secure than localStorage but requires backend coordination

---

## Testing JWT Implementation

### 1. Check Token in Browser

```javascript
// Run in browser console:
console.log(localStorage.getItem("loanlink_auth_token"));
```

### 2. Verify Token Sent with Requests

```javascript
// In browser DevTools > Network tab:
// Click any API request > Headers
// Should see: Authorization: Bearer eyJ...
```

### 3. Test Logout Clears Token

```javascript
// Logout, then check:
console.log(localStorage.getItem("loanlink_auth_token")); // Should be null
```

### 4. Test Protected Endpoints

```javascript
// Call an endpoint without token:
fetch("https://yourapi.com/user/profile"); // Should get 401

// Call with token:
const token = localStorage.getItem("loanlink_auth_token");
fetch("https://yourapi.com/user/profile", {
  headers: { Authorization: `Bearer ${token}` },
}); // Should work
```

---

## Quick Start Summary

1. ✅ Token is **automatically fetched** after Firebase login
2. ✅ Token is **automatically stored** in localStorage
3. ✅ Token is **automatically sent** with every API request
4. ✅ Token is **automatically cleared** on logout
5. Just use `api.js` functions everywhere!

---

## Next Steps

1. **Backend**: Implement token verification middleware
2. **Protected Routes**: Add middleware to backend routes
3. **Error Handling**: Redirect to login on 401 errors
4. **Refresh Logic**: Implement token refresh if needed
5. **Logout**: Ensure all tokens cleared on logout
