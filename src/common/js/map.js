export function MP() {
    return new Promise(function(resolve, reject) {

        var es = document.getElementsByTagName('script');
        for (var i = 0; i < es.length; i++) {
            if (es[i]['src'].indexOf("map.baidu.com") != -1) {
                es[i].parentNode.removeChild(es[i]);
            } 
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=u2q54PlLZzz4p4x0kjgluAWu5q6VyakZ&callback=init";
        document.head.appendChild(script);
        window.init = function() {
            resolve(BMap)
        }

    })
}