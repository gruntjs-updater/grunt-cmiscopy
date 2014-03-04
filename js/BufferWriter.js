/*
 * grunt-cmiscopy
 * https://github.com/marushkevych/grunt-cmiscopy
 *
 * Copyright (c) 2014 Andrey Marushkevych
 * Licensed under the MIT license.
 */
var Writable = require('stream').Writable;
var util = require('util');


function BufferWriter(){
    // call super constructor
    Writable.call(this);
    
    this.buffer = new Buffer(0);
}

util.inherits(BufferWriter, Writable);

BufferWriter.prototype._write = function(chunk, encoding, callback){
    this.buffer = Buffer.concat([this.buffer, chunk]);
    callback();
};

module.exports = BufferWriter;