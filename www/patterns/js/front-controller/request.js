/**
 * Gets and sets properties from the querystring and manages the feedback array
 */
/*global define*/
define([], function () {
    var Request = function () {
        this.properties = {};
        this.feedback = [];
        this.init();
    };

    // Only gets one property right now, should also check for querystring
    // params. It could possibly check events for namespaces etc.
    Request.prototype.init = function () {
        this.setProperty("hash", window.location.hash.replace("#", ""));
    };

    Request.prototype.getProperty = function (key) {
        if (this.properties[key] !== undefined) {
            return this.properties[key];
        }
    };

    Request.prototype.setProperty = function (key, val) {
        this.properties[key] = val;
    };

    Request.prototype.addFeedback = function (msg) {
        this.feedback.push(msg);
    };

    Request.prototype.getFeedback = function () {
        return this.feedback;
    };

    return Request;
});