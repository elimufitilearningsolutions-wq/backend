const userTokens = {}
export const setUserToken = (userId, token) => {
    userTokens[userId] = token;
};

export const getUserToken = (userId) => {
    return userTokens[userId];
};

export const removeUserToken = (userId) => {
    delete userTokens[userId];
};
