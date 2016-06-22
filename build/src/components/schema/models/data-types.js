"use strict";
var Boolean = (function () {
    function Boolean(data) {
        // convert to correct form
        if (data === 'false') {
            data = false;
        }
        else if (data === 'true') {
            data = true;
        }
        if (data !== false && data !== true) {
            throw new Error('not a boolean');
        }
        this._OneValue = data;
    }
    return Boolean;
}());
exports.Boolean = Boolean;
var DateTime = (function () {
    function DateTime(data) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._OneValue = data;
    }
    return DateTime;
}());
exports.DateTime = DateTime;
var Instant = (function () {
    function Instant(data) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._OneValue = data;
    }
    return Instant;
}());
exports.Instant = Instant;
var String = (function () {
    function String(data) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
    return String;
}());
exports.String = String;
var Id = (function () {
    function Id(data) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
    return Id;
}());
exports.Id = Id;
var Code = (function () {
    function Code(data) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
    return Code;
}());
exports.Code = Code;
var Uri = (function () {
    function Uri(data) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
    return Uri;
}());
exports.Uri = Uri;
var Number = (function () {
    function Number(data) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
    return Number;
}());
exports.Number = Number;
