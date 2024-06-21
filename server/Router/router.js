import { PrismaClient } from "@prisma/client";
import express from 'express'


const prisma = new PrismaClient();
const router = express.Router();

router.post('/createUserAccDetails',async (req,res) => {
    try {
        const {accountName, currency, currentBalance} = req.body;
        const result = await prisma.userAccount.create ({
            data : {
                accountName:accountName,
                currencyDetail:currency,
                currentBalance:currentBalance
            }
        });
        res.json({result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
})

router.get('/listUserAccdetails', async (req, res) => {
    try {
        const data = await prisma.userAccount.findMany({});
        res.json({
            userAccountList:data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "An error Accurd"});
    }
})



export default router;
