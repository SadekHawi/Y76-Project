"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exampleServices_1 = require("../services/exampleServices");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const message = exampleServices_1.ExampleService.getHelloMessage("User");
    res.send(message);
});
exports.default = router;
