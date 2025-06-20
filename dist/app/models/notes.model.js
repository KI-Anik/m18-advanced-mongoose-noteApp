"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.noteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    category: {
        type: String,
        category: ["personal", "work", "study"],
        default: 'personal'
    },
    pinned: { type: Boolean, default: false },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: 'green' }
    }
}, {
    versionKey: false, //removing _v field
    timestamps: true // add createdAt and updatedAt
});
exports.Note = (0, mongoose_1.model)('Note', exports.noteSchema);
