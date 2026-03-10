javascript:(function(){
  try{
    // If there's no body yet, bail gracefully
    var root = document.body || document.documentElement;
    if(!root){ alert('Body not ready yet. Try after the page finishes loading.'); return; }

    // Toggle off if already open
    var existing = document.getElementById('clicktest-container');
    var panelExisting = document.getElementById('clicktest-sidepanel');
    if (existing){ existing.remove(); }
    if (panelExisting){ panelExisting.remove(); }
    if (existing || panelExisting){ return; }

    // -------- Main box --------
    var box = document.createElement('div');
    box.id = 'clicktest-container';
    Object.assign(box.style, {
      position:'fixed', top:'20px', right:'20px',
      width:'200px', minHeight:'200px',
      background:'#f7f7f7', border:'2px solid #333',
      borderRadius:'8px', padding:'10px 10px 12px 10px',
      zIndex:'2147483647', fontFamily:'Arial, sans-serif',
      boxShadow:'0 6px 18px rgba(0,0,0,0.2)'
    });

    // Header
    var header = document.createElement('div');
    Object.assign(header.style, {
      display:'flex', alignItems:'center', justifyContent:'space-between',
      marginBottom:'10px', userSelect:'none', fontWeight:'bold', fontSize:'16px'
    });
    header.textContent = 'Clicktest';

    var closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    Object.assign(closeBtn.style, {
      marginLeft:'8px', cursor:'pointer', fontWeight:'bold', padding:'0 6px',
      lineHeight:'18px', borderRadius:'4px'
    });
    closeBtn.title = 'Close';
    closeBtn.onmouseenter = function(){ closeBtn.style.background = '#e6e6e6'; };
    closeBtn.onmouseleave = function(){ closeBtn.style.background = 'transparent'; };
    closeBtn.onclick = function(){
      if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
      if (box && box.parentNode) box.parentNode.removeChild(box);
    };
    header.appendChild(closeBtn);
    box.appendChild(header);

    // Buttons container
    var btnWrap = document.createElement('div');
    btnWrap.id = 'clicktest-buttons';
    box.appendChild(btnWrap);

    function makeBtn(label){
      var b = document.createElement('button');
      b.textContent = label;
      Object.assign(b.style, {
        width:'100%', margin:'5px 0', padding:'8px',
        cursor:'pointer', border:'1px solid #444',
        background:'#fff', borderRadius:'6px'
      });
      b.onmouseenter = function(){ b.style.background = '#f2f2f2'; };
      b.onmouseleave = function(){ b.style.background = '#fff'; };
      return b;
    }

    var b1 = makeBtn('Test 1');
    var b2 = makeBtn('Test 2');
    var b3 = makeBtn('Test 3');
    var b4 = makeBtn('Test 4');
    btnWrap.appendChild(b1);
    btnWrap.appendChild(b2);
    btnWrap.appendChild(b3);
    btnWrap.appendChild(b4);

    root.appendChild(box);

    // -------- Side panel --------
    var panel = document.createElement('div');
    panel.id = 'clicktest-sidepanel';
    Object.assign(panel.style, {
      position:'fixed', top:'20px', right:(20+200+20)+'px', // box right + width + gap
      width:'240px', minHeight:'120px', background:'#ffffff',
      border:'2px solid #444', borderRadius:'8px',
      padding:'10px 10px 14px 10px', zIndex:'2147483647',
      display:'none', boxShadow:'0 6px 18px rgba(0,0,0,0.2)', fontFamily:'Arial, sans-serif'
    });

    // Panel header
    var pHeader = document.createElement('div');
    Object.assign(pHeader.style, {
      display:'flex', alignItems:'center', justifyContent:'space-between',
      marginBottom:'8px', fontWeight:'bold'
    });
    pHeader.textContent = 'Side Window';

    var pClose = document.createElement('span');
    pClose.textContent = '×';
    Object.assign(pClose.style, { cursor:'pointer', padding:'0 6px', borderRadius:'4px' });
    pClose.onmouseenter = function(){ pClose.style.background = '#f0f0f0'; };
    pClose.onmouseleave = function(){ pClose.style.background = 'transparent'; };
    pClose.onclick = function(){ panel.style.display = 'none'; };
    pHeader.appendChild(pClose);
    panel.appendChild(pHeader);

    var pText = document.createElement('div');
    pText.id = 'clicktest-text';
    Object.assign(pText.style, { whiteSpace:'pre-wrap', lineHeight:'1.35' });
    pText.textContent = 'Random text will appear here.';
    panel.appendChild(pText);

    root.appendChild(panel);

    // -------- Random text bank --------
    var randomTexts = [
      "Hello world!",
      "Random message number one.",
      "This is a test text.",
      "You clicked a button!",
      "Surprise! More random text.",
      "JavaScript bookmarklets are awesome.",
      "Today is a great day to test buttons.",
      "Here’s a fun random string: " + Math.random().toString(36).slice(2)
    ];

    function showRandom(){
      var txt = randomTexts[Math.floor(Math.random()*randomTexts.length)];
      pText.textContent = txt;
      panel.style.display = 'block';
    }

    b1.onclick = showRandom;
    b2.onclick = showRandom;
    b3.onclick = showRandom;
    b4.onclick = showRandom;

  }catch(err){
    console.error('Clicktest error:', err);
    alert('Clicktest failed: ' + (err&&err.message?err.message:err));
  }
})();
