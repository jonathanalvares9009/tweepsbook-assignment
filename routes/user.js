const { getUserHandler ,createUserHandler, deleteUserHandler, updateUserHandler } = require("../controllers/user");
const { getUserSchema, createUserSchema, deleteUserSchema, updateUserSchema } = require("../schema/user");

const getUserOpts = {
    schema: getUserSchema,
    handler: getUserHandler,
};

const createUserOpts = {
    schema: createUserSchema, 
    handler: createUserHandler, 
};

const deleteUserOpts = {
    schema: deleteUserSchema, 
    handler: deleteUserHandler, 
};

const updateUserOpts = {
    schema: updateUserSchema,
    handler: updateUserHandler
}

const userRouter = (fastify, option, done) => {
    fastify.get('/api/read/:email', getUserOpts);
    fastify.post("/api/create", createUserOpts);
    fastify.delete("/api/delete/:email", deleteUserOpts);
    fastify.patch("/api/update/:email", updateUserOpts);

    done();
}

module.exports = userRouter;