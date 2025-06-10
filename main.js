// Pie chart for tokenomics
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
  // Add legend
  ctx.font = "13px Inter, Arial, sans-serif";
  ctx.fillStyle = "#fff";
  ctx.fillText("98% LP", 18, 90);
  ctx.fillText("2% Rewards", 95, 150);
};
drawPie();

// Copy contract address on click
const addrDiv = document.getElementById('tokenAddress');
const copyStatus = document.getElementById('copyStatus');
addrDiv.addEventListener('click', function() {
  const addr = 'TokenContractAddressHere';
  navigator.clipboard.writeText(addr).then(() => {
    copyStatus.style.display = 'inline';
    setTimeout(()=>copyStatus.style.display='none',1200);
  });
});

// Simple parallax mouse effect on logo
const logo = document.querySelector('.logo');
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  logo.style.transform = `translate(${x}px,${y}px) scale(1.07)`;
});
document.addEventListener('mouseleave', () => {
  logo.style.transform = 'translate(0,0) scale(1)';
});

