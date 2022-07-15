var dynamics = require("dynamics.js");

class CoolScrolla {
    constructor() {
        this.$el = null;
        this.ely = null;
        this.Y = null;


        this.initEvents();
    }

    initEvents() {
        var that = this;

        var makescroll = function (e) {

            e.preventDefault();
            //e.stopPropagation();

            var href = this.getAttribute("href");
            that.$el = $(href);
            that.scrollToElement(that.$el);

        }

        $("#mainnav").on("click", ".navitem > a",makescroll );
        $("#mobilemenu").on("click", ".navitem > a",makescroll );
        $("#productsanchor").click(makescroll);

    }


    scrollToElement($el) {
        var that = this;
        this.ely = $el.position().top;
        this.Y = $(document).scrollTop();
        this.dir = this.Y < this.ely ? 1 : -1;

        var aim = {y: this.Y};

        dynamics.animate(aim, {
            y:that.ely
        }, {
            type: dynamics.spring,
            duration: 1262,
            frequency: 30,
            friction: 212,
            change:function(){
                window.scrollTo(0,aim.y);
            }
        })
    }
}

$(document).ready(function(){
    new CoolScrolla();
});



