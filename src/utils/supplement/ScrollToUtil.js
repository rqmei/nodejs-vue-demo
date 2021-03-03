Math.easeInOutQuad = function(t, b, c, d) {
    // eslint-disable-next-line no-param-reassign
    t /= d / 2;
    if (t < 1) {
        return (c / 2) * t * t + b;
    }
    // eslint-disable-next-line no-param-reassign
    t -= 1;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

const requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
}

function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
// eslint-disable-next-line import/prefer-default-export
export function scrollTo(to, duration, callback) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    const durationObj = typeof duration === "undefined" ? 500 : duration;
    const animateScroll = function() {
        // 增加时间
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, durationObj);
        move(val);
        if (currentTime < durationObj) {
            requestAnimFrame(animateScroll);
        } else if (callback && typeof callback === "function") {
            // 动画完成执行回调
            callback();
        }
    };
    animateScroll();
}
