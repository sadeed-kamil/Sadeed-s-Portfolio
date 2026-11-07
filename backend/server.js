/**
 * ==============================================================================
 * Sadeed Kamil - Portfolio Backend Email Dispatch Service
 * ==============================================================================
 * Node.js / Express server that receives client "Hire Me" inquiries and sends
 * email notifications to Sadeed Kamil (sadeedkamil143@gmail.com) via Nodemailer.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'sadeedkamil143@gmail.com';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Mail Transporter
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Check if real SMTP credentials are provided
  const isConfigured = user && pass && pass !== 'your_app_password_here' && pass !== 'your_gmail_app_password_here';

  if (isConfigured) {
    console.log(`[Email Service] Configured with live SMTP (${host || 'Gmail'}) for ${user}`);
    return nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: user,
        pass: pass
      }
    });
  } else {
    // Development fallback: Logs email to console and returns simulated success
    console.log('[Email Service] SMTP credentials not set. Running in development simulation mode.');
    return null;
  }
}

let transporter = createTransporter();

// ------------------------------------------------------------------------------
// Health Check Endpoint
// ------------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sadeed Kamil Portfolio Email Backend',
    recipient: RECIPIENT_EMAIL,
    smtpConfigured: !!transporter,
    timestamp: new Date().toISOString()
  });
});

// ------------------------------------------------------------------------------
// Instant "Hire Me" Click Ping Endpoint
// ------------------------------------------------------------------------------
app.post('/api/hire-ping', (req, res) => {
  const { timestamp, trigger } = req.body || {};
  console.log(`[Hire Ping] Client clicked '${trigger || 'Hire Me'}' at ${timestamp || new Date().toISOString()}`);
  res.json({ success: true, message: 'Hire ping logged' });
});

// ------------------------------------------------------------------------------
// "Hire Me" & Project Inquiry Email Dispatch Endpoint
// ------------------------------------------------------------------------------
app.post('/api/hire', async (req, res) => {
  try {
    const { name, email, service, budget, message, source, timestamp } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are mandatory.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address provided.'
      });
    }

    const inquiryDate = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

    // HTML Email Template styled in modern Yellow & White luxury aesthetics
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0c0d11;
            color: #ffffff;
            margin: 0;
            padding: 30px 15px;
          }
          .email-card {
            max-width: 600px;
            margin: 0 auto;
            background-color: #141720;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 214, 0, 0.35);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          }
          .email-header {
            background: linear-gradient(135deg, #ffd600 0%, #f59e0b 100%);
            color: #0c0d11;
            padding: 28px 32px;
            text-align: left;
          }
          .badge {
            display: inline-block;
            background-color: rgba(12, 13, 17, 0.18);
            color: #0c0d11;
            font-weight: 800;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 4px 10px;
            border-radius: 20px;
            margin-bottom: 8px;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            line-height: 1.2;
          }
          .email-body {
            padding: 32px;
            color: #e2e8f0;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .info-table td {
            padding: 12px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 14px;
          }
          .info-label {
            color: #94a3b8;
            font-weight: 600;
            width: 35%;
          }
          .info-val {
            color: #ffffff;
            font-weight: 700;
          }
          .highlight-val {
            color: #ffd600;
          }
          .message-box {
            background-color: #0c0d11;
            border: 1px solid rgba(255, 214, 0, 0.25);
            border-radius: 12px;
            padding: 20px;
            margin-top: 10px;
            margin-bottom: 28px;
          }
          .message-box h3 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #ffd600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }
          .message-box p {
            margin: 0;
            line-height: 1.7;
            font-size: 15px;
            color: #f8fafc;
            white-space: pre-wrap;
          }
          .reply-btn {
            display: inline-block;
            background: linear-gradient(135deg, #ffd600 0%, #f59e0b 100%);
            color: #0c0d11 !important;
            text-decoration: none;
            font-weight: 800;
            font-size: 15px;
            padding: 14px 28px;
            border-radius: 10px;
            text-align: center;
          }
          .email-footer {
            background-color: #0c0d11;
            padding: 20px 32px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-card">
          <div class="email-header">
            <div class="badge">🚀 Client Hire Request</div>
            <h1>New Project Inquiry for Sadeed Kamil</h1>
          </div>
          
          <div class="email-body">
            <p style="margin-top: 0; font-size: 15px; color: #cbd5e1;">
              A prospective client has submitted a <strong>Hire Me</strong> inquiry through your portfolio website (${source || 'Hire Modal'}).
            </p>

            <table class="info-table">
              <tr>
                <td class="info-label">Client Name</td>
                <td class="info-val">${name}</td>
              </tr>
              <tr>
                <td class="info-label">Client Email</td>
                <td class="info-val"><a href="mailto:${email}" style="color: #ffd600; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="info-label">Service Needed</td>
                <td class="info-val highlight-val">${service || 'Full Website Development'}</td>
              </tr>
              <tr>
                <td class="info-label">Estimated Budget</td>
                <td class="info-val highlight-val">${budget || 'Negotiable'}</td>
              </tr>
              <tr>
                <td class="info-label">Date & Time</td>
                <td class="info-val">${inquiryDate}</td>
              </tr>
            </table>

            <div class="message-box">
              <h3>Client Project Overview:</h3>
              <p>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + (service || 'Web Development') + ' Inquiry - Sadeed Kamil')}" class="reply-btn">
                Reply Directly to ${name} ✉️
              </a>
            </div>
          </div>

          <div class="email-footer">
            &copy; ${new Date().getFullYear()} Sadeed Kamil Developer Portfolio System &bull; Islamabad, Pakistan
          </div>
        </div>
      </body>
      </html>
    `;

    // Console logging
    console.log('---------------------------------------------------------');
    console.log(`[NEW HIRE REQUEST RECEIVED] from: ${name} (${email})`);
    console.log(`Service: ${service} | Budget: ${budget} | Source: ${source}`);
    console.log(`Message: ${message.substring(0, 100)}...`);
    console.log('---------------------------------------------------------');

    // Send email via transporter if configured
    if (transporter) {
      const mailOptions = {
        from: `"${name} via Sadeed.dev" <${process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `🚀 [Hire Inquiry] ${service || 'Web Project'} from ${name}`,
        text: `New Hire Request from ${name} (${email})\nService: ${service}\nBudget: ${budget}\n\nProject Details:\n${message}`,
        html: htmlEmail
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Email Service] Success: Email dispatched to ${RECIPIENT_EMAIL}`);
    } else {
      console.log(`[Email Service] (Dev Simulation Mode): Inquiry captured successfully for ${RECIPIENT_EMAIL}`);
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry received! Email notification processed for ${RECIPIENT_EMAIL}.`,
      client: { name, email, service, budget }
    });

  } catch (error) {
    console.error('[Email Service Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch email. Please verify SMTP credentials in .env.'
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log('=============================================================');
  console.log(`  🚀 Sadeed Kamil Portfolio Email Server Running on Port ${PORT}`);
  console.log(`  👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`  👉 Hire Endpoint: POST http://localhost:${PORT}/api/hire`);
  console.log(`  👉 Target Mailbox: ${RECIPIENT_EMAIL}`);
  console.log('=============================================================');
});
