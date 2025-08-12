import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "From admin" });
});

export default router;