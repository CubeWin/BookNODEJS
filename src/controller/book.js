const { request, response } = require('express');

const { httpExeption, _validData } = require('../common');

const { User, Book } = require('../models');

const bookGetAll = async (req = request, res = response) => {
    try {
        const result = await Book.find();
        const data = {
            count: result.length,
            results: result.map((r) => {
                return {
                    id: r._id,
                    title: r.title,
                    count_page: r.count_page,
                    picture: r.picture,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8080/api/book`,
                    },
                };
            }),
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const createBook = async (req = request, res = response) => {
    try {
        const { user_id, title, count_page } = req.body;
        const user_result = await User.findById(user_id);
        if (!user_result) {
            throw new httpExeption(400, 'No se encontro el usuario.');
        }

        // const picture = await uploadFile(req.files, undefined, 'book');

        const book = new Book({
            user_id,
            title,
            count_page,
        });

        const result = await book.save();
        const data = {
            message: 'Se registro correctamente.',
            result: {
                id: result._id,
                title: result.title,
                count_page: result.count_page,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/book`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const bookUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { title, count_page } = req.body;
        const result = await Book.findOneAndUpdate(
            { _id: id },
            { $set: { title, count_page } },
            { runValidators: true, context: 'query' }
        );
        const data = {
            message: 'Se actualizo correctamente.',
            result: {
                id: result._id,
                title: result.title,
                count_page: result.count_page,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/book/`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

module.exports = { bookGetAll, createBook, bookUpdate };
