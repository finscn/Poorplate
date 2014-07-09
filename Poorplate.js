"DON'T use strict Mode";

var Poorplate = function(options) {
    for (var p in options) {
        this[p] = options[p];
    }
};

Poorplate.prototype = {
    constructor: Poorplate,

    START: "{{",
    END: "}}",
    SCRIPT: "@",

    cache: {},
    updateDom: function(dom, data, noneValue) {
        var content = dom.innerHTML;
        var key = dom.id || content;
        var compiledTmpl = this.cache[key] || this.compileTemplate(content);
        var newContent = this.runTemplate(compiledTmpl, data, noneValue);
        dom.innerHTML = newContent;
    },

    compileTemplate: function(template) {
        var startLen = this.START.length;
        var endLen = this.END.length;
        var scriptLen = this.SCRIPT.length;

        var compiledTmpl = [];
        var current = 0;
        while (true) {
            var startIdx = template.indexOf(this.START, current);
            var begin = startIdx + startLen;
            var endIdx = template.indexOf(this.END, begin);
            if (begin >= startLen && endIdx > begin) {
                compiledTmpl.push(template.substring(current, startIdx));
                var dynamic = template.substring(begin, endIdx);
                if (dynamic.indexOf(this.SCRIPT) === 0) {
                    compiledTmpl.push({
                        script: dynamic.substring(scriptLen)
                    });
                } else {
                    var deep = dynamic.indexOf(".") > 0;
                    deep && (dynamic = dynamic.split("."));
                    compiledTmpl.push({
                        depth: deep ? dynamic.length : 1,
                        dynamic: dynamic,
                    });
                }
            } else {
                compiledTmpl.push(template.substring(current));
                break;
            }
            current = endIdx + endLen;
        }
        return compiledTmpl;
    },

    runTemplate: function(compiledTmpl, data, noneValue) {
        if (typeof compiledTmpl == "string") {
            compiledTmpl = this.compileTemplate(compiledTmpl);
        }
        data = data || {};
        noneValue = noneValue || noneValue === 0 || noneValue === false ? noneValue : '';
        var rs = [];
        var v;
        for (var i = 0, len = compiledTmpl.length, sIdx = 0; i < len; i++) {
            var f = compiledTmpl[i];
            if (f.dynamic) {
                if (f.depth > 1) {
                    for (var j = 0, v = data; j < f.depth; j++) {
                        v = v[f.dynamic[j]]
                    }
                } else {
                    v = data[f.dynamic];
                }
                rs[i] = v === null || v === undefined ? noneValue : v;
            } else if (f.script) {
                var _s = undefined;
                var script = "with(data){ _s=" + f.script + " }";
                eval(script);
                rs[i] = _s;
            } else {
                rs[i] = f;
            }
        }
        return rs.join('');
    }
}
