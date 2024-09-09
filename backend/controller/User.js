const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

const User = require("../model/User")

// register new user
const register = async (req, res) => {

    const { username, email, password, role } = req.body
    // generate salt for hash
    const salt = await bcrypt.genSalt(10);
    const userDoc = await User.create({
        username,
        email,
        role,
        // hash the password + store hashed in db
        password: await bcrypt.hash(password, salt)
    })
        .then((response) => {
            res.json({ status: "From /register [post] , user succesfully registered ", userDoc: response })
        })
        .catch((error) => {
            res.status(400).json({ status: "From /register [post] , user not registered", "error": error.message })
        })
}

// login already existing user
const login = async (req, res) => {
    const { username, password, role } = req.body;
    const userDoc = await User.findOne({ username, role });

    if (userDoc) {
        const passOk = await bcrypt.compare(password, userDoc.password);

        if (passOk) {
            // logged in .. send jwt token  [NO OPTS .. 3rd arg] with payolads id + username + role
            jwt.sign({ username, id: userDoc._id, role, email: userDoc.email }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res
                    .cookie('token', token)
                    .json({
                        status: "From /login [post] , user succesfully logined ",
                        userDoc
                    })
            })
        } else {
            res.status(400).json({ status: "From /login [post] , wrong credentials entered [Password]" });
        }
    }
    else {
        res.status(400).json({ status: "From /login [post] , wrong credentials entered [UserName]" });
    }
}

// to get who is logged in user
const profile = async (req, res) => {
    // from all cookies send by client .. grab token [has our jwt]
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
        if (err) {
            res.status(400).json("JWT ERROR");
            throw err;
        } 
        // info includes our payload sent [username + id]
        res.json({ status: "from /profile [post]", info });
    });
}

// removal of cookie - logout 
const logout = async (req, res) => {
    res.cookie('token', '').json({ status: "From /logout [post] , coookie removed :)" });
}


// search for user based on username
const searchUser = async (req, res) => {
    const { username } = req.body;
    const userDoc = await User.findOne({ username });

    if (userDoc) {
        res.status(200).json({ status: "From /search [post] , Found Matching User", userDoc });
    } else {
        res.status(400).json({ status: "From /search [post] , No User Found" });
    }
}

const mail = async (req, res) => {
    const { emailId, allotedCourse } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: process.env.USER,
        to: emailId,
        subject: 'Seva Satva Grievance Resolved !',
        text: `Your Seva Satva Grievance Has been Resolved. New Course Alloted is : ${allotedCourse}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(404).json({ status: "From /mail [post] , error in sending email", err })
        } else {
            res.json({ status: "From /mail [post] , successfully sent email", info });
        }
    });
}

module.exports = {
    register,
    profile,
    login,
    logout,
    mail , 
    searchUser
}