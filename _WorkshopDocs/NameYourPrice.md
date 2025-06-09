---
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
  font-size: 32px;color: #000;
  font-family: inherit;
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



<div class="nyp-wrapper">
  <picture>
    <source srcset="/images/900_workshopsystem-side_full.webp" type="image/webp">
    <img src="/images/900_workshopsystem-side_full.jpg" 
         alt="Music Thing Workshop System Side View" 
         width="900" height="622" 
         loading="lazy" 
         style="width: 100%; height: auto;">
  </picture>

  <p style="font-size: 20px; margin-top: 2em;">The name your price experiment is now complete<sup>†</sup>.</p>

  <p style="font-size: 20px; margin-bottom: 1em;">
    You can learn more about the <a href="https://www.musicthing.co.uk/workshopsystem/">Workshop System here</a>.
  </p>

  <p style="font-size: 12px; color: #777; max-width: 400px;">
    <sup>†</sup> This wasn't an experiment, just a gentle spoof of Teenage Engineering's 'name your price' sale in June 2025.
  </p>


  
</div>


