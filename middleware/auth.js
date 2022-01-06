const auth = (req, res, next) => {
    const { user } = req.session;

    if (!user)
        return res
            .status(401)
            .send({ status: 'fail', message: 'unauthorized' });

    req.user = user;

    next();
};

export { auth };
