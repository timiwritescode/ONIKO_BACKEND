import express, { Request, Response } from "express";
import { verifyToken } from "../../middleware/verifyToken.middleware";
import { getUserProfile } from "./user.service";


const router = express.Router();


/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the user and their associated profile data.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile", verifyToken, async (req: Request, res: Response) => {
    // console.log(req.body)
    const userId = req["user"]["user_id"];
    
    const response =  await getUserProfile(userId)
    res.status(200).json(response);
})

export default router;