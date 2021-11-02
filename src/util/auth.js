export function hasPermission(req, res, next) {
    const unauthorized = new Error("You are not authorized to access this page...");
    let x = 1;

    if (x == 2) {
        // unsuccessful authentication
        return next(unauthorized);
    } else {
        // successful authentication
        return next();
    }
}