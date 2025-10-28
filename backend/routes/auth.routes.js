import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", (req, res, next)=>{
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
        state: req.query.state     //redirectPage passing in state
    })
    (req, res, next);
});


router.get("/google/callback", 
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    async(req, res)=>{
        // console.log(req.user);

        const token = req.user.generateJWT();
        const redirectPage = req.query.state || "/";
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}&redirectPage=${redirectPage}`);        
    }
);


//          // handling user cancel  click
// router.get("/google/callback", async (req, res, next) => {
//   // If user clicked cancel or denied permission
//   if (req.query.error === "access_denied") {
//     const redirectPage = req.query.state || "/";
//     return res.redirect(
//       `${process.env.FRONTEND_URL}/login?error=access_denied&redirectPage=${redirectPage}`
//     );
//   }

//   // Proceed normally for success case
//   passport.authenticate("google", {
//      session: false },
//      async (err, user) => {
//         if (err || !user) {
//         return res.redirect(
//             `${process.env.FRONTEND_URL}/login?error=auth_failed`
//         );
//         }

//         const token = user.generateJWT();
//         const redirectPage = req.query.state || "/";
//         res.redirect(
//         `${process.env.FRONTEND_URL}?token=${token}&redirectPage=${redirectPage}`
//         );
//     })(req, res, next);
// });

export default router;