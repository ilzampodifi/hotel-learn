import { Router } from "express";
import user from "@/routes/v1/user";
import admin from "@/routes/v1/admin";

const router = Router();

router.use("/user", user);
router.use("/admin", admin);

export default router;