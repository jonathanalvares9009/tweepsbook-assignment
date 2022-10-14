const typeString = { type: 'string' };
const typeObject = { type: 'object' };

const user = {
    type: 'object',
    properties: {
      email: typeString,
      name: typeString,
    },
};

const getUserSchema = {
    params: {
        email: typeString
    },
    response: {
        200: user,
        404: typeString
    },
};

const createUserSchema = {
    body: {
      type: 'object',
      properties: {
        email: typeString,
        password: typeString,
        name: typeString,
      },
    },
    response: {
      200: { 
        typeObject,
        properties: {
            success: typeString,
            msg: typeString
        }
      },
      400: { 
        typeObject,
        properties: {
            success: typeString,
            msg: typeString
        }
      },
      409: { 
        typeObject,
        properties: {
            success: typeString,
            msg: typeString
        }
      },
      500: { 
        typeObject,
        properties: {
            success: typeString,
            msg: typeString
        }
      },
    },
};

const deleteUserSchema = {
    params: {
        email: typeString
    },
    response: {
        200: typeString,
        404: typeString
    },
};

const updateUserSchema = {
    body: {
        type: 'object',
        properties: {
          password: typeString,
          updateName: typeString,
        },
    },
    params: {
        email: typeString
    },
    response: {
        200: typeString,
        404: typeString
    },
};

module.exports = { getUserSchema, createUserSchema, deleteUserSchema, updateUserSchema };
