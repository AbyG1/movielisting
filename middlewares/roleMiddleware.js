const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            res.status(404)
            throw new Error("Access denied")
            
        }
        next()
    }
}

export default authorizeRole  