// --- Helper: Parse Query Params to Object ---
function parseQueryParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach(pair => {
      const [k, v] = pair.split("=");
      if (k) params[k] = decodeURIComponent(v || "");
    });
  return params;
}

const params = parseQueryParams();

window.addEventListener('DOMContentLoaded', () => {
  // --- Set Document Title ---
  document.title = params.title || "TokenNameHere | $TokenTickerHere - The Ultimate Meme Token";

  // --- Logo Image ---
  const logo = document.querySelector('.logo');
  if (logo && params.logo_image) logo.src = params.logo_image;

  // --- Main Token Title/Subtitles ---
  const tokenTitle = document.querySelector('.token-title');
  if (tokenTitle)
    tokenTitle.innerHTML = `${params.token_name || 'TokenNameHere'} <span style="font-size:1.2rem; font-weight:600;">($${params.token_ticker || 'TokenTickerHere'})</span>`;

  const tokenSubtitle = document.querySelector('.token-subtitle');
  if (tokenSubtitle && params.title) tokenSubtitle.textContent = params.title;

  // --- Contract Address Top ---
  const addrDiv = document.getElementById('tokenAddress');
  if (addrDiv && params.contract_address) {
    addrDiv.childNodes[0].nodeValue = params.contract_address;
    addrDiv.dataset.contract = params.contract_address;
  }

  // --- Tokenomics Table ---
  if (params.contract_address) {
    document.querySelectorAll('.tokenomics-table td').forEach(td => {
      if (td.textContent.includes('TokenContractAddressHere'))
        td.textContent = params.contract_address;
    });
  }
  if (params.token_ticker) {
    document.querySelectorAll('.tokenomics-table td').forEach(td => {
      if (td.textContent.includes('$TokenTickerHere'))
        td.textContent = `1,000,000,000 $${params.token_ticker}`;
    });
  }

  // --- Features ---
  for (let i = 1; i <= 4; ++i) {
    const featureCard = document.querySelectorAll('.feature-card')[i - 1];
    if (!featureCard) continue;
    const img = featureCard.querySelector('img');
    const title = featureCard.querySelector('.feature-title');
    const desc = featureCard.querySelector('.feature-desc');
    if (img && params[`feature_image_${i}`]) img.src = params[`feature_image_${i}`];
    if (title && params[`feature_title_${i}`]) title.textContent = params[`feature_title_${i}`];
    if (desc && params[`feature_desc_${i}`]) desc.textContent = params[`feature_desc_${i}`];
  }

  // --- Roadmap ---
  for (let i = 1; i <= 3; ++i) {
    const phase = document.querySelectorAll('.phase')[i - 1];
    if (!phase) continue;
    const h4 = phase.querySelector('h4');
    const ul = phase.querySelector('ul');
    if (h4 && params[`roadmap_phase_${i}_title`])
      h4.textContent = params[`roadmap_phase_${i}_title`];
    if (ul && params[`roadmap_phase_${i}_items`]) {
      ul.innerHTML = '';
      params[`roadmap_phase_${i}_items`].split(',').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    }
  }

  // --- Socials ---
  if (params.social_twitter_link) {
    document.querySelectorAll('.social-link')[0].href = params.social_twitter_link;
  }
  if (params.social_telegram_link) {
    document.querySelectorAll('.social-link')[1].href = params.social_telegram_link;
  }

  // --- Footer Contract Address ---
  const footerAddr = document.querySelector('footer .token-address');
  if (footerAddr && params.contract_address) {
    footerAddr.textContent = params.contract_address;
  }

  // --- Dynamic "Why TokenNameHere?" heading using ID ---
  const whyHeading = document.getElementById('why-heading');
  if (whyHeading && params.why_heading) whyHeading.textContent = params.why_heading;

  // --- Dynamic pump.fun Buttons (all with class 'pumpfun-btn') ---
  document.querySelectorAll('.pumpfun-btn').forEach(pumpfunBtn => {
    if (params.pumpfun_url) pumpfunBtn.onclick = () => window.open(params.pumpfun_url, '_blank');
    if (params.pumpfun_label) pumpfunBtn.textContent = params.pumpfun_label;
  });
});

// --- Pie Chart for Tokenomics ---
const ctx = document.getElementById('tokenomics-pie').getContext('2d');
const drawPie = () => {
  const data = [
    {color: "#1abc9c", value: 98, label: "Liquidity Pool"},
    {color: "#e67e22", value: 2, label: "Community Rewards"}
  ];
  let total = data.reduce((a,b)=>a+b.value,0);
  let start = -0.5 * Math.PI;
  data.forEach(slice => {
    ctx.beginPath();
    ctx.moveTo(80,80);
    ctx.arc(80,80,78, start, start + 2*Math.PI*(slice.value/total));
    ctx.fillStyle = slice.color;
    ctx.fill();
    start += 2*Math.PI*(slice.value/total);
  });
  ctx.font = "13px Inter, Arial, sans-serif";
  ctx.fillStyle = "#fff";
  ctx.fillText("98% LP", 18, 90);
  ctx.fillText("2% Rewards", 95, 150);
};
drawPie();

// --- Copy Contract Address on Click ---
const addrDiv = document.getElementById('tokenAddress');
const copyStatus = document.getElementById('copyStatus');
if (addrDiv) {
  addrDiv.addEventListener('click', function() {
    const addr = addrDiv.dataset.contract || 'TokenContractAddressHere';
    navigator.clipboard.writeText(addr).then(() => {
      if (copyStatus) {
        copyStatus.style.display = 'inline';
        setTimeout(()=>copyStatus.style.display='none',1200);
      }
    });
  });
}

// --- Parallax Effect on Logo ---
const logo = document.querySelector('.logo');
if (logo) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    logo.style.transform = `translate(${x}px,${y}px) scale(1.07)`;
  });
  document.addEventListener('mouseleave', () => {
    logo.style.transform = 'translate(0,0) scale(1)';
  });
}
