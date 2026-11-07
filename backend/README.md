# 🚀 Sadeed Kamil Portfolio - Backend Email Service

A dedicated Node.js and Express backend service connected to Sadeed Kamil's portfolio website. Whenever a client clicks and submits **Hire Me**, this service sends a formatted email directly to `sadeedkamil143@gmail.com`.

---

## 🛠️ Quick Setup & Running

### 1. Install Dependencies
In the `backend` folder, run:
```bash
npm install
```

### 2. Configure SMTP (Gmail or any Email Provider)
Open `.env` and fill in your Gmail App Password:
```env
PORT=5000
RECIPIENT_EMAIL=sadeedkamil143@gmail.com

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sadeedkamil143@gmail.com
SMTP_PASS=your_gmail_app_password
```

#### How to get a Gmail App Password:
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned ON.
3. Search for **App passwords** (or go to `https://myaccount.google.com/apppasswords`).
4. Enter an app name (e.g. `Portfolio Backend`) and click **Create**.
5. Copy the 16-character password into `SMTP_PASS` in your `.env` file (without spaces).

### 3. Start the Backend Server
```bash
npm start
```
The server runs on `http://localhost:5000`.

---

## 📡 API Endpoints

- `POST /api/hire`: Receives `{ name, email, service, budget, message, source }`, validates fields, and sends an HTML notification email to `sadeedkamil143@gmail.com`.
- `POST /api/hire-ping`: Logs an instant click event whenever a user clicks "Hire Me" anywhere on the site.
- `GET /api/health`: Health status check.

---

## 🛡️ Dual-Mode Resilience
If the website is run locally or deployed statically to GitHub Pages / Netlify and the backend server is not running, the frontend automatically falls back to an immediate direct email draft to `sadeedkamil143@gmail.com`, ensuring **zero inquiries are ever lost**.
