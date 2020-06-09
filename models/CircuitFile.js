const mongoose = require('mongoose');

const CircuitFileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    circuit: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('CircuitFiles', CircuitFileSchema);