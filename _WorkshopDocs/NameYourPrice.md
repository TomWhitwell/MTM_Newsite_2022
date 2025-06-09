o---
layout: documentation
output: false
page-name: "Workshop System: Name your price" 
permalink: "/NYP/"
order: 2
title: "Music Thing Workshop: Name Your Price"
---

<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap" rel="stylesheet">
<style>
.nyp-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3em auto;
  max-width: 500px;
  text-align: center;
}
.nyp-wrapper #price {
  font-size: 84px;
  font-weight: 700;
  font-family: 'Fredoka', sans-serif;
  margin-bottom: 24px;
}
.nyp-wrapper input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  background: linear-gradient(to bottom, #ffcc00, #ffaa00);
  border-radius: 20px;
  outline: none;
  box-shadow: inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.3);
  margin-bottom: 20px;
}
.nyp-wrapper input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle at 30% 30%, #ffd700, #ffa500);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: -2px -2px 4px rgba(255,255,255,0.8), 4px 4px 10px rgba(0,0,0,0.3);
  margin-top: -4px;
}
.nyp-wrapper #status {
  font-size: 42px;color: #000;
  font-family: inherit;
    font-weight: 300;
  text-transform: uppercase;
}
.nyp-wrapper #buyButton {
  display: inline-block;
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
}
.nyp-wrapper #buyButton:hover {
  text-decoration: underline;
  color: #000;
}
</style>
  <div id="status"><a href="https://www.thonk.co.uk/shop/workshop-system/">Buy the Workshop System at Thonk</a></div>  
{% raw %}
<script>
  const fader = document.getElementById('fader');
  const price = document.getElementById('price');
  const status = document.getElementById('status');
  const buyButton = document.getElementById('buyButton');

  let animationFrame;

  function updateBuyLink(val, label) {
    if (val === 450 && label === 'Full DIY Kit') {
      buyButton.href = "https://www.thonk.co.uk/shop/workshop-system/";
    } else {
      const subject = encodeURIComponent("Naming my price");
      const body = encodeURIComponent(`Hello, 
      
I'd like to buy 1 x ${label} for £${val}. 

I understand that assembled systems are built to order.

Thanks!`);
      buyButton.href = `mailto:support@thonk.co.uk?subject=${subject}&body=${body}`;
    }
  }

  function animateBounce(current, target) {
    const springFactor = 0.2;
    const friction = 0.5;
    let velocity = 0;

    function animate() {
      let displacement = target - current;
      let springForce = displacement * springFactor;
      velocity += springForce;
      velocity *= friction;

      current += velocity;

      if (Math.abs(velocity) > 0.1) {
        fader.value = current;
        price.textContent = `£${Math.round(current)}`;
        animationFrame = requestAnimationFrame(animate);
      } else {
        fader.value = target;
        price.textContent = `£${target}`;
      }
    }

    animate();
  }

  fader.addEventListener('input', () => {
    const val = parseInt(fader.value);
    price.textContent = `£${val}`;

    const label = val >= 750 ? 'Assembled System' : 'Full DIY Kit';
    status.textContent = label;
    updateBuyLink(val, label);
  });

  fader.addEventListener('change', () => {
    const val = parseInt(fader.value);
    if (val < 450) {
      cancelAnimationFrame(animationFrame);
      animateBounce(val, 450);
      status.textContent = 'Full DIY Kit';
      updateBuyLink(450, 'Full DIY Kit');
    }
  });

  updateBuyLink(650, 'Full DIY Kit');
</script>
{% endraw %}
