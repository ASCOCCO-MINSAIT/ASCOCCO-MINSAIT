(function () {
  // Aggiungi il bottone di avvio con parentesi vettoriali corrette
  const button = document.createElement('button');
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#4c0b2d',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    zIndex: 1000,
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  });
  // SVG delle parentesi: superiore (∩) e inferiore (∪), più distanziate
  button.innerHTML = `
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
   width="22.500000pt" height="15.000000pt" viewBox="0 0 89.000000 59.000000"
   preserveAspectRatio="xMidYMid meet">
    <metadata>
      Created by potrace 1.16, written by Peter Selinger 2001-2019
    </metadata>
    <g transform="translate(0.000000,59.000000) scale(0.100000,-0.100000)"
    fill="#ffffff" stroke="none">
      <path d="M20 462 c0 -12 143 -96 233 -137 142 -65 198 -68 337 -16 100 37 302
      161 263 161 -6 0 -67 -16 -134 -35 -276 -80 -279 -80 -524 -10 -173 48 -175
      49 -175 37z"/>
      <path d="M330 176 c-137 -48 -355 -176 -301 -176 5 0 79 20 165 45 244 70 249
      70 525 -10 138 -39 149 -41 132 -21 -31 37 -219 135 -315 165 -87 27 -125 26
      -206 -3z"/>
    </g>
  </svg>
`;



  button.addEventListener('mouseover', () => button.style.backgroundColor = '#3b0a1e');
  button.addEventListener('mouseout', () => button.style.backgroundColor = '#4c0b2d');
  document.body.appendChild(button);

  // Aggiungi la finestra della chat
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chatContainer';
  Object.assign(chatContainer.style, {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '400px',
    height: '500px',
    border: '1px solid #ddd',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    zIndex: 1000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transform: 'scale(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease'
  });
  chatContainer.innerHTML = `
    <div id="header">
      <img src="1aca8cc9-ca5c-4822-9e8f-8570b25aabf2.png" alt="Minsait Logo">
    </div>
    <div id="chatBox"></div>
    <div id="inputArea">
      <input id="userInput" type="text" placeholder="Scrivi un messaggio…">
      <button id="sendBtn" title="Invia">
        <svg viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(chatContainer);

  // Inietta il CSS
  const style = document.createElement('style');
  style.innerHTML = `
    body { font-family: 'Segoe UI', sans-serif; margin:0; background:#f4f6f8; }
    #chatContainer { display:flex; flex-direction:column; }

    /* Header ristretto a ~40px */
    #header {
      background-color: #4c0b2d;
      padding: 4px 0;
      text-align: center;
    }
    #header img {
      height: 32px;
      object-fit: contain;
    }

    /* ChatBox flessibile */
    #chatBox {
      flex: 1;
      background: #f9f9f9;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    /* Bubbles compatti */
    .msg {
      max-width: 75%;
      padding: 8px 12px;
      margin: 4px 0;
      border-radius: 18px;
      font-size: 0.9em;
      line-height: 1.3em;
      box-shadow: 0 1px 2px rgba(0,0,0,0.08);
      animation: fadeIn 0.3s ease;
      word-wrap: break-word;
    }
    @keyframes fadeIn {
      from { opacity:0; transform: translateY(10px); }
      to   { opacity:1; transform: translateY(0); }
    }
    .customer {
      background: #e0d2dc;
      color: #4c0b2d;
      align-self: flex-start;
      border-radius: 18px 18px 18px 4px;
    }
    .agent {
      background: #f1f8e9;
      color: #2e4e1c;
      align-self: flex-end;
      border-radius: 18px 18px 4px 18px;
    }
    .date {
      text-align: center;
      font-size: 0.65em;
      color: #888;
      margin: 4px 0 1px;
    }
    .time {
      font-size: 0.7em;
      color: #555;
      margin-top: 4px;
      text-align: right;
    }

    /* Input area sempre in basso */
    #inputArea {
      display: flex;
      align-items: center;
      border-top: 1px solid #ddd;
      padding: 10px;
      background: #fff;
    }
    #userInput {
      flex: 1;
      padding: 8px 12px;
      font-size: 0.95em;
      border: 1px solid #ccc;
      border-radius: 20px;
      outline: none;
    }
    #sendBtn {
      background: none;
      border: none;
      margin-left: 10px;
      cursor: pointer;
      padding: 6px;
    }
    #sendBtn svg {
      width: 24px;
      height: 24px;
      fill: #4c0b2d;
      transition: fill 0.2s ease;
    }
    #sendBtn:hover svg {
      fill: #000;
    }
  `;
  document.head.appendChild(style);

  // Toggle chat
  button.addEventListener('click', () => {
    const open = chatContainer.style.transform === 'scale(1)';
    chatContainer.style.transform = open ? 'scale(0)' : 'scale(1)';
  });

  // Carica GenesysJS
  (function (g, e, n, es, ys) {
    g['_genesysJs'] = e; g[e] = g[e] || function () { (g[e].q = g[e].q || []).push(arguments); };
    g[e].t = +new Date(); g[e].c = es;
    ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8';
    document.head.appendChild(ys);
  })(window, 'Genesys', 'https://apps.mypurecloud.de/genesys-bootstrap/genesys.min.js', {
    environment: 'prod-euc1', deploymentId: 'd34b3171-ba30-4401-9451-ff6b7300a4b5'
  });

  let lastMessageDate = null;

  // Ricezione messaggi
  Genesys('subscribe', 'MessagingService.messagesReceived', ({ data: { messages } }) => {
    messages.forEach(msg => {
      if (msg.type === 'Text') {
        const d = new Date(msg.channel.time);
        const date = d.toLocaleDateString();
        const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage(msg.text, msg.direction === 'Inbound' ? 'customer' : 'agent', date, time);
      }
    });
  });

  // Invio messaggi
  function sendMessage(text) {
    if (!text.trim()) return;
    Genesys('command', 'MessagingService.sendMessage', { message: text });
  }
  document.getElementById('sendBtn').addEventListener('click', () => {
    const inp = document.getElementById('userInput');
    sendMessage(inp.value); inp.value = '';
  });
  document.getElementById('userInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') { e.preventDefault(); sendMessage(e.target.value); e.target.value = ''; }
  });

  // Aggiunge messaggio e data
  function addMessage(text, sender, date, hour) {
    const box = document.getElementById('chatBox');
    if (lastMessageDate !== date) {
      const dv = document.createElement('div');
      dv.className = 'date'; dv.textContent = date;
      box.appendChild(dv);
      lastMessageDate = date;
    }
    const m = document.createElement('div');
    m.className = `msg ${sender}`;
    m.innerHTML = `<div>${text}</div><div class="time">${hour}</div>`;
    box.appendChild(m);
    box.scrollTop = box.scrollHeight;
  }
})();
