export function validator(obj) {
    if (obj.username.trim() === "") {
        return {
            target: "username",
            message: "Username is required",
        };
    }
    if (obj.password.trim() === "") {
        return {
            target: "password",
            message: "Password is required",
        };
    }

    if (obj.confirm_password && obj.password !== obj.confirm_password) {
        return {
            target: "confirm_password",
            message: "Passwords do not match",
        };
    }
    return false;
}