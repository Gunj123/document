
   {% comment %}
  Set the extension of your color files below. Use 'png', 'jpeg', 'jpg' or 'gif'.
{% endcomment %}

{% assign file_extension = 'png' %}

{% if swatch == blank %}
<div class="swatch error">
  <p>You must include the snippet swatch.liquid with the name of a product option.</p> 
  <p>Use: <code>{% raw %}{% include 'swatch' with 'name of your product option here' %}{% endraw %}</code></p>
  <p>Example: <code>{% raw %}{% include 'swatch' with 'Color' %}{% endraw %}</code></p>
</div>
{% else %}

{% assign found_option = false %}
{% assign is_color = false %}
{% assign option_index = 0 %}

{% for option in product.options %}
  {% if option == swatch %}
    {% assign found_option = true %}
    {% assign option_index = forloop.index0 %}
    <style>
      label[for="product-select-option-{{ option_index }}"] { display: none; }
      #product-select-option-{{ option_index }} { display: none; }
      #product-select-option-{{ option_index }} + .custom-style-select-box { display: none !important; }
    </style>
 {% comment %}   <script>$(window).load(function() { $('.selector-wrapper:eq({{ option_index }})').hide(); });</script> {% endcomment %}
    {% assign downcased_option = swatch | downcase %}
    {% if downcased_option contains 'color' or downcased_option contains 'colour' %}
      {% assign is_color = true %}
    {% endif %}
  {% endif %}
{% endfor %}

{% unless found_option %}
<div class="swatch error">
  <p>You included the snippet swatch.liquid with the name of a product option — <code>'{{ swatch }}'</code> — that does not belong to your product.</p>
  <p>Use <code>{% raw %}{% include 'swatch' with 'name of your product option here' %}{% endraw %}</code></p>
  <p>Example: <code>{% raw %}{% include 'swatch' with 'Color' %}{% endraw %}</code></p>
  <p><strong>This is case-sensitive!</strong> Do not put in <code>'color'</code> if your product option name is <code>'Color'</code>.</p>
</div>
{% else %}
<div class="swatch clearfix" data-option-index="{{ option_index }}">
  <div class="header">{{ swatch }}</div>
  {% assign values = '' %}
  {% for variant in product.variants %}
    {% assign value = variant.options[option_index] %}
    {% unless values contains value %}
      {% assign values = values | join: ',' %}
      {% assign values = values | append: ',' | append: value %} 
      {% assign values = values | split: ',' %}
      <div data-value="{{ value | escape }}" class="swatch-element {% if is_color %}color {% endif %}{{ value | handle }} {% if variant.available %}available{% else %}soldout{% endif %}">
        {% if is_color %}
        <div class="tooltip">{{ value }}</div>
        {% endif %}
        <input id="swatch-{{ option_index }}-{{ value | handle }}" type="radio" name="option-{{ option_index }}" value="{{ value | escape }}"{% if forloop.first %} checked{% endif %} {% unless variant.available %}disabled{% endunless %} />
        {% if is_color %}
        <label for="swatch-{{ option_index }}-{{ value | handle }}" style="background-color: {{ value | split: ' ' | last | handle }}; background-image: url({{ value | handle | append: '.' | append: file_extension | asset_url }})">
          <img class="crossed-out" src="{{ 'soldout.png' | asset_url }}" />
        </label>
        {% else %}
        <label for="swatch-{{ option_index }}-{{ value | handle }}">
          {{ value }}
          <img class="crossed-out" src="{{ 'soldout.png' | asset_url }}" />
        </label>
        {% endif %}
      </div>
    {% endunless %}
    {% if variant.available %}
    <script>
      jQuery('.swatch[data-option-index="{{ option_index }}"] .{{ value | handle }}').removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
    </script>
    {% endif %}
  {% endfor %}
</div>

{% endunless %}

{% endif %}


