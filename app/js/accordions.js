class Accordion{
    constructor($element){

        this.$element = $element;
        this.initTabs();
        this.initClick();
        this.checkOnResize();
    }

    checkOnResize(){
        var that = this;
        $(window).resize(function(){
            var opentabs = that.$element.find(".accordion-section[data-open=true]");
            opentabs.each(function(i,opentab){
                // console.log(opentab);
                that.checkTab($(opentab));
            });
        });
    }

    initTabs(){
        var that = this;
        this.$element.find(".accordion-section").each(function(){
            that.checkTab($(this));
        });
    }

    initClick(){
        var that = this;
        this.$element.find(".accordion-section").click(function(){
            var $tab = $(this);
            var isopen = $tab.attr("data-open");
            isopen = (isopen == (false || "false")) ? true : false;
            $tab.attr("data-open",isopen);
            that.checkTab($(this));
        });
    }
    
    checkTab($tab){

        var isopen = $tab.attr("data-open");
        isopen = (isopen == (false || "false")) ? false : true;
        if(isopen==true){
            var h = $tab.find(".accordion-section-content > .innertxt").height();
            $tab.find(".accordion-section-content").height(h+"px");
        } else {
            $tab.find(".accordion-section-content").height("0px");
        }
        $tab.attr("data-open",isopen);
    }
}

$(document).ready(function(){
    $(".accordion").each(function(){
        new Accordion($(this));
    });
});



