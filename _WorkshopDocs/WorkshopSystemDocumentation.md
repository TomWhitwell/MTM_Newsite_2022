---

layout: documentation
output: false
permalink: "/Workshop_Manual/"
page-name: "Main page" 
order: 0
excerpt: "Music Thing Workshop System Manual" 


---

{% include documentation_image_xwide.html filename="/images/header_for_website.png" caption="" %}

&nbsp;  
Welcome to the Music Thing Modular Workshop System.  

It’s a complete analogue modular synth. In a package slightly smaller than a hardback book. With a small computer attached on the left hand side.  

I started designing the Workshop System in August 2023, while planning the [Dyski Sound Maps workshop in Falmouth, Cornwall](https://dyski.co/). The people at the workshop would need a versatile, portable toolkit to make sounds and modify sounds. So I thought maybe I could make one for them.   

It had to be flexible and deep. Flexible enough to be genre neutral, deep enough to stay interesting long after the event. It had to be outward looking, connecting to other devices, rather than trying to replace them. It had to be relatively cheap: a Swiss Army Knife, not a Japanese kitchen knife.   

And at the same time, it should be personal and distinctive. The device you’re looking at, sat there in it’s little black case, has been percolating through my head for forty years. Since I listened to my uncle’s Jean Michelle Jarre cassettes, watched Abba on Saturday morning television, bought a second-hand Korg MS10 and had no idea at all what to do with it.   
 
I always wanted something like this, and now I’ve got one. And so have you.

Tom Whitwell, November 2024   
&nbsp;  


<h2><homepage_body>Contents</homepage_body></h2>

{% assign ordered_pages = site.WorkshopDocs | sort:"order" %} {% for page in ordered_pages -%}  
{%- unless page.page-name == "Main page" -%}
* **[{{page.page-name}}]({{page.url | relative_url }})**  
{% endunless -%}  
{% endfor %} 


