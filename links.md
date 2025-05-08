---

layout: default
output: false

permalink: /Link_Page/

---

<style>
  body {
    background-color: #F0F8FF;
  }
</style>

{% assign sorted_links = site.data.links | sort:"order" %} 
{% for item in sorted_links %} 
<p>
	<div class="main">
		<a href="{{item.link | relative_url }}">
			<h1>
				{{item.text}}
			</h1>
			<homepage_body>
				{{item.desc}}&nbsp;➔
			</homepage_body>
		</a>
	</div>
</p>
{% endfor %} 