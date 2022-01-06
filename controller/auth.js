import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const data = await User.create({
            username,
            password: hashPassword,
        });

        res.status(200).json({
            data,
            status: 'succes',
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({
                status: 'fail',
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            req.session.user = user;
            return res.status(201).send({
                status: 'success',
            });
        }
        return res.status(400).send({
            status: 'fail',
            detail: 'username or password wrong',
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};
