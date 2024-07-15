import { Request, Response, Router } from "express";
import { ExampleService } from "../services/exampleServices";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const message = ExampleService.getHelloMessage("User");
  res.send(message);
});

export default router;
