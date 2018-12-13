function setHtmlFontSize() {
    var DesignWidth = 750;
    var DesignFontSize = 200;
    var CurrentWidth = document.documentElement.clientWidth;

    document.documentElement.style.fontSize = CurrentWidth/(DesignWidth/DesignFontSize) + 'px';
}
setHtmlFontSize();
window.addEventListener('resize',setHtmlFontSize);