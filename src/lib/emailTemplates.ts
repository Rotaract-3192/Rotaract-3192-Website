/**
 * Rotaract District 3192 — Premium Email Templates
 * All styles are inline (required for email client compatibility).
 */

type Priority = 'normal' | 'info' | 'alert' | 'success' | string;

interface AnnouncementEmailOptions {
  title: string;
  content: string;
  priority?: Priority;
  /** Optional call-to-action button */
  ctaLabel?: string;
  ctaUrl?: string;
}

// ── Colour tokens per priority ──────────────────────────────────────────────
function getPriorityTokens(priority: Priority) {
  switch (priority) {
    case 'alert':
      return {
        accent: '#ef4444',
        accentLight: '#fef2f2',
        accentBorder: '#fecaca',
        badge: 'CRITICAL ALERT',
        badgeIcon: '⚠',
      };
    case 'success':
      return {
        accent: '#22c55e',
        accentLight: '#f0fdf4',
        accentBorder: '#bbf7d0',
        badge: 'SUCCESS UPDATE',
        badgeIcon: '✓',
      };
    case 'info':
      return {
        accent: '#3b82f6',
        accentLight: '#eff6ff',
        accentBorder: '#bfdbfe',
        badge: 'INFORMATION',
        badgeIcon: 'ℹ',
      };
    default:
      return {
        accent: '#3b82f6',
        accentLight: '#eff6ff',
        accentBorder: '#bfdbfe',
        badge: 'ANNOUNCEMENT',
        badgeIcon: '📢',
      };
  }
}

// ── Main template ────────────────────────────────────────────────────────────
export function buildAnnouncementEmail({
  title,
  content,
  priority = 'normal',
  ctaLabel,
  ctaUrl,
}: AnnouncementEmailOptions): string {
  const { accent, accentLight, accentBorder, badge, badgeIcon } = getPriorityTokens(priority);
  const year = new Date().getFullYear();

  // Convert newlines → <br> for the content body
  const htmlContent = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');

  const ctaSection =
    ctaLabel && ctaUrl
      ? `
    <tr>
      <td align="center" style="padding: 0 40px 40px;">
        <a href="${ctaUrl}"
           style="display:inline-block;background:${accent};color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;
                  font-size:12px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;
                  text-decoration:none;padding:16px 40px;border-radius:10px;
                  box-shadow:0 4px 16px rgba(0,0,0,0.15);">
          ${ctaLabel} →
        </a>
      </td>
    </tr>`
      : '';

  return /* html */ `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- ═══ Email wrapper ═══════════════════════════════════════════════════════ -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eef2f7;">
  <tr>
    <td align="center" style="padding: 48px 16px;">

      <!-- ── Container ── -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;
                    overflow:hidden;box-shadow:0 8px 40px rgba(15,23,42,0.12);">

        <!-- ── HEADER / HERO ─────────────────────────────────────────────── -->
        <tr>
          <td style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0f2044 100%);padding:0;">

            <!-- Top accent bar -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="height:4px;background:linear-gradient(90deg,${accent},#60a5fa,${accent});"></td>
              </tr>
            </table>

            <!-- Logo row -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding:36px 40px 0;">
                  <!-- Rotary cogwheel SVG (inline) -->
                  <div style="display:inline-block;width:56px;height:56px;border-radius:50%;
                               background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
                               line-height:56px;font-size:28px;text-align:center;">
                    &#9881;
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:14px 40px 0;">
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:9px;font-weight:800;letter-spacing:0.35em;
                             text-transform:uppercase;color:${accent};">
                    ROTARACT DISTRICT 3192
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:10px 40px 0;">
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;
                             font-size:28px;font-weight:700;color:#ffffff;
                             letter-spacing:0.03em;line-height:1.2;">
                    ${title}
                  </p>
                </td>
              </tr>

              <!-- Priority badge -->
              <tr>
                <td align="center" style="padding:20px 40px 36px;">
                  <span style="display:inline-block;background:rgba(255,255,255,0.06);
                                border:1px solid rgba(255,255,255,0.12);border-radius:6px;
                                padding:5px 14px;
                                font-family:'Helvetica Neue',Arial,sans-serif;
                                font-size:9px;font-weight:800;letter-spacing:0.2em;
                                text-transform:uppercase;color:${accent};">
                    ${badgeIcon}&nbsp; ${badge}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── BODY CONTENT ──────────────────────────────────────────────── -->
        <tr>
          <td style="padding:40px 40px 32px;background:#ffffff;">
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Arial,sans-serif;
                       font-size:13px;font-weight:600;letter-spacing:0.05em;
                       text-transform:uppercase;color:#94a3b8;">
              Message from the District
            </p>

            <!-- Divider with accent -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="height:1px;background:linear-gradient(90deg,${accent},transparent);margin-bottom:28px;display:block;">
                  &nbsp;
                </td>
              </tr>
            </table>

            <!-- Content block -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="background:${accentLight};border-left:3px solid ${accent};
                            border-radius:0 12px 12px 0;padding:24px 28px;margin-top:24px;">
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:15px;line-height:1.8;color:#1e293b;">
                    ${htmlContent}
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ── CALL TO ACTION (optional) ─────────────────────────────────── -->
        ${ctaSection}

        <!-- ── INFO STRIP ────────────────────────────────────────────────── -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <!-- Left: metadata -->
                <td style="vertical-align:top;">
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:10px;font-weight:800;letter-spacing:0.15em;
                             text-transform:uppercase;color:#64748b;">
                    Transmission Date
                  </p>
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:12px;color:#334155;font-weight:600;">
                    ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </td>
                <!-- Right: district tag -->
                <td align="right" style="vertical-align:top;">
                  <span style="display:inline-block;background:#0f172a;border-radius:6px;
                                padding:6px 14px;
                                font-family:'Helvetica Neue',Arial,sans-serif;
                                font-size:9px;font-weight:800;letter-spacing:0.2em;
                                text-transform:uppercase;color:${accent};">
                    District 3192 · RY ${year}–${year + 1}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ────────────────────────────────────────────────────── -->
        <tr>
          <td style="background:#0f172a;padding:32px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td align="center">
                  <!-- Rotaract motto -->
                  <p style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;
                             font-size:13px;font-style:italic;color:#94a3b8;letter-spacing:0.05em;">
                    "Fellowship through service"
                  </p>
                  <!-- Divider dots -->
                  <p style="margin:0 0 16px;color:#3b82f6;font-size:8px;letter-spacing:0.5em;">
                    · · · · ·
                  </p>
                  <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:10px;color:#475569;line-height:1.6;">
                    You received this notification as a registered member of the<br />
                    <strong style="color:#94a3b8;">Rotaract District 3192 Network</strong>.
                  </p>
                  <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;
                             font-size:9px;color:#334155;">
                    © ${year} Rotaract District 3192. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Bottom accent bar -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,${accent},#60a5fa,${accent});"></td>
        </tr>

      </table>
      <!-- /container -->

    </td>
  </tr>
</table>

</body>
</html>`;
}
