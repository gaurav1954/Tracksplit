const authRouter = Router();

authRouter.get("/", getAllUsers);
authRouter.post("/signup", validate(signUpValidator), userSignUp);
authRouter.post("/login", validate(loginValidator), userLogIn);
authRouter.get("/auth-status", verifyToken, verifyUser);
export default authRouter;