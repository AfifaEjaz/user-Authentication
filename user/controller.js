import dotenv from 'dotenv'
dotenv.config()
import user from './model.js'
import { hash, compare, genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailconfig.js';

export async function registeration(req, res) {
    console.log("post signup chala hai");
    const { name, email, password, password_confirmation, tc } = req.body
    console.log(req.body);

    if (!name || !email || !password || !password_confirmation || !tc) {
        res.status(405).json({ "message": "Missing Required Field" })
    }
    else {
        if (password != password_confirmation) {
            res.json({ "message": "Password does not match confirm password" })
        }
        else {
            const checkExist = await user.findOne({ email: email })
            if (checkExist) {
                res.json({ "message": "User already Exist" })
            }
            else {
                try {
                    const salt = await genSalt(10)
                    const hashPass = await hash(password, salt)
                    const doc = new user({
                        name: name,
                        email: email,
                        password: hashPass,
                        tc: tc
                    })
                    await doc.save()

                    // Generating JWT Token
                    const result = await user.findOne({ email: email })
                    const token = jwt.sign({ userID: result._id },
                        process.env.JWT_SECRET, { expiresIn: '5d' })
                    console.log("User Created")
                    res.status(201).json({
                        message: "Signup Successfully",
                        token: token
                    })
                } catch (error) {
                    console.error("Error during user sign-up:", error);
                    return res.status(500).json({ message: "Internal server error" });
                }
            }
        }
    }
}

export async function login(req, res) {
    console.log("post Login chala hai");
    try {
        const { email, password } = req.body
        const result = await user.findOne({ email: email })

        if (result != null) {
            const decryptPass = await compare(password, result.password)

            if ((result.email === email) && decryptPass) {
                const token = jwt.sign({ userID: result._id },
                    process.env.JWT_SECRET, { expiresIn: '5d' })
                res.status(201).json({
                    "message": "Login Successfully",
                    "token": token
                })
            }
            else {
                res.json("Invalid credentials")
            }
        }
        else {
            res.json("You are not a registered user")
        }
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function updatePass(req, res) {
    console.log(req.user);
    const { password, cn_password } = req.body;

    if (!(password && cn_password)) {
        return res.status(400).json("All fields are required");
    }
    else {
        if (password !== cn_password) {
            return res.status(400).json("Password does not match confirm password");
        }
        else{
            try {
                const salt = await genSalt(10);
                const hashPass = await hash(password, salt);
        
                await user.findByIdAndUpdate(req.user._id, { $set: { password: hashPass } });
                return res.json({
                    "status": "Successfull",
                    "message": "Password Updated"
                });
            } catch (error) {
                console.error("Error updating password:", error);
                return res.status(500).send("An error occurred while updating password");
            }
        }
    }



  
}

export async function getUser(req, res) {
    res.send({ "user": req.user })
}

export async function resetPasswordEmail(req, res) {
    const { email } = req.body
    console.log("chl rha hai");

    try {
        if (email) {
            const userRecord = await user.findOne({ email: email })
            console.log(userRecord);
            if (userRecord) {
                const secret = userRecord._id + process.env.JWT_SECRET
                const token = jwt.sign({ userID: userRecord._id }, secret, { expiresIn: '15m' })
                const link = `${process.env.NODE_VERCEL_URL}/api/user/reset/${userRecord._id}/${token}`
                console.log(link);

                const info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: userRecord.email,
                    subject: "My App - Password Reset Link",
                    html: `<a href=${link}>Click Here!</a> to reset your password`,
                });

                res.json({
                    "message": "Password reset email sent",
                    "info": info
                })
            } else {
                res.json("User is not registered")
            }
        } else {
            res.json("Enter email")
        }
    } catch (error) {
        console.log(error);
    }
}

export async function resetPass(req, res) {
    console.log("reset password chla hai");
    const { password, cn_password } = req.body
    const { id, token } = req.params

    try {
        const userRecord = await user.findById(id)
        const new_secret = userRecord._id + process.env.JWT_SECRET

        jwt.verify(token, new_secret)
        if (password && cn_password) {
            if (password !== cn_password) {
                res.json("Password does not match confirm password")
            } else {
                const salt = await genSalt(10);
                const hashPass = await hash(password, salt);

                await user.findByIdAndUpdate(userRecord._id, { $set: { password: hashPass } });
                res.json({
                    "status": "Successfull",
                    "message": "Password Reset Successfully"
                })
            }
        } else {
            res.json("Required All Fields")
        }
    } catch (error) {
        console.error("Error Reseting Password:", error);
        return res.status(500).json("Invalid token");
    }

}
