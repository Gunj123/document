<form method="post" action="/cart/add">
    <select id="product-select" name="id">

        {% for variant in sorted_variants %}
        <option {% if variant==product.selected_or_first_available_variant %}
            selected="selected" {% endif %} value="{{ variant.id }}"
            data-inv_qty="{{variant.inventory_quantity}}">
            {{ variant.title }} - {{ variant.price | money }}
        </option>
        {% endfor %}
    </select>


    {% if product.available and product.variants.size > 1 %}
    {% for option in product.options %}
    {% include 'swatch' with option %}
    {% endfor %}
    {% endif %}


    <input type="hidden" name="id" value="{{ product.variants.first.id }}" />
    <input class="btn-bg-border" type="submit" value="Add to cart" class="btn" />
</form>