var $ = require("jquery");

var filelists = function(cb){
    $(document).ready(function () {
        $.get("./public-files/files.info", function (data) {

            var files = data.trim().replace(/\r\n/g, '\n').split("\n");
            var links = [];
            files.forEach(function (file) {
                var f = file.split("#");
                var link = "<a class='autolink' href='./public-files/" + f[1] + "'>" + f[0] + "</a><br>";
                links.push(link);
            });

            var target = $("#fileslist");

            links.forEach(function (link) {
                target.append($(link));
            });

            cb();
        })
    });
}

module.exports = filelists;