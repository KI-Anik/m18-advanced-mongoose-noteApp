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
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
exports.usersRoutes = express_1.default.Router();
const createUserZodSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
exports.usersRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // const zodBody = await createUserZodSchema.parseAsync(req.body)
        const newUser = yield user_model_1.User.create(body);
        res.send(newUser);
    }
    catch (error) {
        console.log('error', error);
        res.status(401).json({
            submited: false,
            // message : error.issues.map((i: z.ZodIssue) => i.message)
            message: error.errors
        });
    }
}));
// get single
exports.usersRoutes.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const singleUser = yield user_model_1.User.findById(userId);
    // res.send(singleUser)
    res.status(201).json({
        message: 'Single User retrieved sucessfully',
        singleUser
    });
}));
// get all
exports.usersRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find();
    //  res.send(allUser)
    res.status(201).json({
        message: 'all users retrieved successfully',
        allUsers
    });
}));
exports.usersRoutes.patch('/update/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const result = yield user_model_1.User.findByIdAndUpdate(userId, updatedBody, { new: true });
    res.send(result);
}));
exports.usersRoutes.delete('/delete/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const deletedUser = yield user_model_1.User.findByIdAndDelete(userId);
    // res.send(deleteUser)
    res.status(201).json({
        message: 'deleted',
        deletedUser: deletedUser
    });
}));
