"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const users_1 = __importDefault(require("./users"));
const posts_1 = __importDefault(require("./posts"));
const comments_1 = __importDefault(require("./comments"));
const resolvers = [users_1.default, posts_1.default, comments_1.default];
exports.resolvers = resolvers;
