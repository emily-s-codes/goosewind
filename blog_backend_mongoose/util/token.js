import jwt from 'jsonwebtoken'

export const createToken = (user) => {
    return jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '20min' })
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}