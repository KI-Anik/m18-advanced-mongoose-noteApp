"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notes_model_1 = require("../models/notes.model");
exports.notesRoutes = express_1.default.Router();
exports.notesRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // approach 1
    // const myNote = new Note({
    //     title: 'TypeScript',
    //     tags: {
    //         label: 'backend'
    //     }
    // })
    // await myNote.save()
    // approach 2
    const body = req.body;
    const note = yield notes_model_1.Note.create(body);
    res.status(201).json({
        success: true,
        // note: myNote
        NewNote: note
    });
}));
//  get all
exports.notesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_model_1.Note.find();
    res.status(201).send(result);
}));
// single get
exports.notesRoutes.get('/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const result = yield notes_model_1.Note.findById(noteId);
    // const result = await Note.findOne({title : noteId})
    res.status(201).send(result);
}));
exports.notesRoutes.patch('/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const result = yield notes_model_1.Note.findByIdAndUpdate(noteId, updatedBody, { new: true }); //recommended
    // const result = await Note.findOneAndUpdate({_id : noteId}, updatedBody, {new : true})
    // const result = await Note.updateOne({ _id: noteId }, updatedBody)
    res.send(result);
}));
exports.notesRoutes.delete('/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const result = yield notes_model_1.Note.findByIdAndDelete(noteId);
    // const result = await Note.findOneAndDelete({_id : noteId})
    // const result = await Note.deleteOne({_id : noteId})
    res.json({ message: 'deleted', result });
}));
