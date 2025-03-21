const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(404).json({message: "Access denied"})
        }
        next()
    }
}

export default authorizeRole