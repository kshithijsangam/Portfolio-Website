/* Shared script for smooth scroll, mobile nav, chatbot and contact form stub */
document.addEventListener('DOMContentLoaded', function(){

  // Mobile nav toggle (very small)
  const toggle = document.querySelector('.mobile-toggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      const ul = document.querySelector('.nav ul');
      if(!ul) return;
      const visible = getComputedStyle(ul).display !== 'none';
      ul.style.display = visible ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!visible));
    });
  }

  // Smooth scrolling for internal anchors (if used)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#') && href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Chatbot toggle
  const chatBtn = document.getElementById('chatbot-btn');
  const chatBox = document.getElementById('chatbot-box');
  if(chatBtn){
    chatBtn.addEventListener('click', ()=>{
      if(chatBox){
        chatBox.style.display = (chatBox.style.display === 'block') ? 'none' : 'block';
      } else {
        // simple inline notification on pages without chatbox
        alert('Hi 👋 — drop a message at kshithijsangam200217@gmail.com');
      }
    });
  }

  // Minimal chat interactions (contact page)
  const chatSend = document.getElementById('chat-send');
  if(chatSend){
    const msgs = document.querySelector('#chatbot-box .msgs');
    const input = document.getElementById('chat-input');
    chatSend.addEventListener('click', ()=>{
      const val = input.value && input.value.trim();
      if(!val) return;
      const you = document.createElement('div'); you.innerHTML = '<strong>You:</strong> '+val;
      const bot = document.createElement('div'); bot.style.marginTop='8px';
      msgs.appendChild(you);
      input.value = '';
      setTimeout(()=> {
        bot.innerHTML = '<strong>Bot:</strong> Thanks! I will get back to you via email.';
        msgs.appendChild(bot);
        msgs.scrollTop = msgs.scrollHeight;
      }, 700);
    });
  }

});

// Mobile nav toggle (dropdown menu)
const toggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav ul');

if(toggle && navMenu){
  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
  });
}

// Contact form instant feedback (Netlify backend still works)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent instant reload

    const formData = new FormData(contactForm);

    fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(() => {
        contactForm.reset();
        const success = document.createElement("div");
        success.className = "form-success";
        success.innerText = "✅ Thanks! Your message has been sent.";
        contactForm.appendChild(success);

        setTimeout(() => {
          success.remove();
        }, 4000);
      })
      .catch(() => {
        alert("❌ Something went wrong. Please try again later.");
      });
  });
}
