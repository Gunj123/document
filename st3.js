<script>
    var selectCallback = function (variant, selector) {
        console.log("hello")
        if (variant) {
            var form = jQuery('#' + selector.domIdPrefix).closest('form');
            for (var i = 0, length = variant.options.length; i < length; i++) {
                var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] + '"]');
                if (radioButton.lenght) {
                    radioButton.get(0).checked = true;
                }
            }
        }
        var thumbs = $('.pdp-thumb').find(".product-image-link");
        var custom_thumb = variant.option1.toLowerCase();
        $(".custom-thumb").each(function () {
            if ($(this).attr('alt').toLowerCase() == custom_thumb) {
                console.log('enter', $(this).attr('alt'));
                $(this).closest('.product-image-link')[0].click();
            }
        });
    }

    jQuery(function ($) { new Shopify.OptionSelectors("product-select", { product: {{ product | json }} , onVariantSelected: selectCallback, enableHistoryState: true });

  });

</script>