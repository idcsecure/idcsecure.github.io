// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Fake form handler (replace with real endpoint or mailto link)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const btn = document.getElementById('send-btn');

form?.addEventListener('submit', async () => {
  statusEl.textContent = 'Encrypting request...';
  btn.disabled = true;

  // Simulate async send
  await new Promise(r => setTimeout(r, 900));
  statusEl.textContent = 'Sent. Expect a response within 24 hours.';
  btn.disabled = false;
});

// Small terminal scroll animation
const out = document.getElementById('terminal-output');
if (out) {
  let t = 0;
  setInterval(() => {
    t++;
    if (t % 6 === 0) out.textContent += '\n$ heartbeat ' + new Date().toLocaleTimeString();
    out.scrollTop = out.scrollHeight;
  }, 800);
}
