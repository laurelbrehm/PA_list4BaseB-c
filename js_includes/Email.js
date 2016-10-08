/* This software is licensed under a BSD license; see the LICENSE file for details. */

//
// modified from bits and pieces of other controllers, Laurel Brehm 2016
// 

(function () {

var __Question_callback__ = null;
var __Questions_pix__ = null;

define_ibex_controller({
name: "Email",

jqueryWidget: {
    _init: function () {
        this.cssPrefix = 'e';
        this.utils = this.options._utils;
        this.pix = this.options.as;
        this.leftComment = dget(this.options, "s1");
        this.rightComment = dget(this.options, "s2");
        this.transfer = dget(this.options, "transfer");
        
	    this.resultsLines = [];
	    this.finishedCallback = this.options._finishedCallback
       
		this.xl = $(document.createElement("table"))
           .css("border","1px solid black")
           .css("border-collapse","collapse");
           __Question_pix__ = new Array(this.pix.length);

        for (var i = 0; i < this.pix.length; ++i) {
            var td;
            td = $(document.createElement("td"));
            td.addClass(this.cssPrefix + "td");
            var ans = typeof(this.pix[i]) == "string" ? this.pix[i] : this.pix[i][1];
            ans = "<img src="+ans+"  width=60>"; 
            __Question_pix__[i] = ans;
           this.xl.append(td.append(ans));
           //;
        }
        
       if (this.leftComment) {
            this.xl.append($(document.createElement("td"))
                      .css("vertical-align","middle")
                      .css("border","1px solid black")
                      .css("padding-left","20px")
                      .css("padding-right","20px")
                      .append(this.leftComment));
        }
        
        if (this.rightComment) {
            this.xl.append($(document.createElement("td"))
                      .css("vertical-align","middle")
                      .css("border","1px solid black")
                      .css("padding-left","20px")
                      .css("padding-right","20px")
                      .append(this.rightComment));
        }

		if (this.instructions) {
            this.xl.append($(document.createElement("p"))
                      .css("vertical-align","middle")
                      .css("border","1px solid black")
                      .css("padding-left","20px")
                      .css("padding-right","20px")
                      .text(this.instructions));
        }

        if (! (this.qp === undefined))
            this.element.append(this.qp);

        // Again, using tables to center because IE sucks.
        var table = $("<table" + (conf_centerItems ? " align='center'" : "") + ">");
        var tr = $(document.createElement("tr"));
        var td = $("<td" + (conf_centerItems ? " align='center'" : "") + ">")
        if (conf_centerItems)
            td.attr('align', 'center');
        this.element.append(table.append(tr.append(td.append(this.xl))));
 
        this.utils.setTimeout(this.finishedCallback, this.transfer);
        
    }
 },

properties: {
    obligatory: ["as"],
    htmlDescription: function(opts) {
        return $(document.createElement("div")).text(opts.s || "");
    }
}

});
})();
