var jQuery = require("jquery");

(function($) {

    var overlay = {
        $body: null,

        init: function() {
            this.$body = $('body');

            var that = this;

            $('*[data-overlay]').each(function() {
                var $btn = $(this),
                    id = $btn.attr('data-overlay'),
                    $overlay = $('#' + id);

                that.initOverlay($overlay, $btn);
            });

            $('.overlay.overlay-init-open').each(function() {
                var $overlay = $(this);

                if (!$overlay.hasClass('overlay-initialized')) {
                    that.initOverlay($overlay);
                }

                that.open($overlay);
            });
        },

        initOverlay: function($overlay, $btn) {

            var that = this;

            if (typeof($btn) !== 'undefined') {
                $btn.click(function(e) {
                    e.preventDefault();
                    that.open($overlay);
                });
            }

            $overlay.click(function(e) {
                if (e.target === this) {
                    that.close($overlay);
                }
            });

            $overlay.find('.overlay__close a').click(function(e) {
                e.preventDefault();
                that.close($overlay);
            });

            $overlay.addClass('overlay-initialized');
        },

        open: function($overlay) {
            $overlay.addClass('visible');
            this.$body.addClass('has-overlay');
        },

        close: function($overlay) {
            $overlay.removeClass('visible');
            this.$body.removeClass('has-overlay');
        }
    };

    $(function() {
        overlay.init();
    });


})(jQuery);
