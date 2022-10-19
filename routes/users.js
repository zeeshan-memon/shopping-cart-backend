const controller = require("../controllers/users");

module.exports = (router, tokenValidation, decodeBody) =>{
    router.get("/getUser", controller.getUser)
}