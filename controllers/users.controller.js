const teamMember = require('../models/teamMember.model');

const emailRegex = /^[\w-\.]+(@(dispatchhealth|gmail))\.(com)|a(\d{8}|\d{9})(@tec)\.(mx)$/;

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
};

// Match user with database, if not add new user
exports.getUser = async (req, res) =>{
    const userInfo = await req.oidc.fetchUserInfo();
    const newUser = new teamMember({
        email: userInfo.email,
        userName: userInfo.name,
        team: "",
    });
    // Checks whether a user is in database already
    teamMember.fetch_email(userInfo.email)
    .then(([rows, fieldData]) =>{
        if(rows.length === 0) {
            if (userInfo.email.match(emailRegex)) {
                newUser.save()
                .then(([rows, fieldData])=>{
                    res.redirect('/home');
                })
                .catch((error)=>{console.log(error)});
            } else {
                // Create view of not matching 
                // @dispatchhealth.com or @gmail.com
                res.redirect('/login');
            }
        } else {
            res.redirect('/home');
        }
    })
    .catch(error =>{console.log(error)});
};
