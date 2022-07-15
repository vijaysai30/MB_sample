class TabController {
    constructor(name) {
        // $ dom elements
        this.tabsmodule = $("#" + name);
        this.tabsholder = $("#" + name + " > .tabsholder");
        this.tabs = this.tabsmodule.find(".tab");
        this.contentSecs = this.tabsmodule.find(".tabs-content");

        this.pairs = this.makePairs();
        // public attributes
        this.activeTarget = 2;
        //

        this.initEvents();
        this.showState();
    }

    makePairs() {
        var that = this;
        var pairs = {};
        this.tabs.each(function (i, el) {
            var target = $(el).attr("data-target");
            var content = that.contentSecs.filter("[data-target='" + target + "']");
            pairs[target] = {
                tab: el,
                content: content
            }
        });
        return pairs;
    }

    showState() {

        this.tabsmodule.attr("data-active-item", this.activeTarget);
        for (var key in this.pairs) {
            var active = (key == this.activeTarget);
            var tab = this.pairs[key].tab;
            var cont = this.pairs[key].content;



            $(tab).attr("data-active", active);
            $(cont).attr("data-active", active);
        }
    }

    initEvents() {
        var that = this;
        this.tabsholder.on("click", ".tab", function () {
            that.activeTarget = $(this).attr("data-target");
            that.showState.bind(that)();
        });
    }
}

$(document).ready(function(){
    new TabController("product-tab-router");
});

//exports =