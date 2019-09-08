/* UTILITIES JavaScript File */

function isEven(n) {
    return n % 2 == 0;
 }
 
function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

// Custom modulus operator
var mod = (n, m) => {
    return ((n % m) + m) % m;
}

// function for wrapping text on canvas
var wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var lines = text.split("\n");

    for (var ii = 0; ii < lines.length; ii++) {

        var line = "";
        var words = lines[ii].split(" ");

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth) {
                context.strokeText(line, x, y);
                context.fillText(line, x, y);
                line = words[n] + " ";
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.strokeText(line, x, y);
        context.fillText(line, x, y);
        y += lineHeight;
    }
 }


