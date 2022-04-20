import jwt from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
         isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIN:'30d',
        });
};

export  {signToken};