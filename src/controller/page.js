const { request, response } = require("express");

const { httpExeption, _validData } = require("../common");

const { User, Book, Page } = require("../models");

const pageGetAll = async (req = request, res = response) => {
    try {
        const { book } = req.params();
        const result = await Page.find({ libro_id: book });
        const data = {
            count: result.length,
            results: result.map((r) => {
                return {
                    id: r._id,
                    libro: r.libro_id,
                    page: r.page,
                    image: r.image,
                    lock: r.lock,
                    request: {
                        type: "GET",
                        url: `http://localhost:4000/api/page/${r._id}`,
                    },
                };
            }),
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const pageCreate = async (req = request, res = response) => {
    try {
        const { libro_id, user_id } = req.body;
        const libro_result = await Book.findById(libro_id);
        if (!libro_result) {
            throw new httpExeption(
                400,
                `No se encontro un libro con el id ${libro_id}.`
            );
        }

        const user_result = await User.findById(user_id);
        if (!user_result) {
            throw new httpExeption(
                400,
                `No se encontro un usuario con el id ${id}.`
            );
        }

        const count_page = await Page.find({ libro_id });
        const page = count_page.length + 1;

        const result = new Page({
            libro_id,
            user_id,
            page,
        });
        await result.save();
        const data = {
            message: `Se registro correctamente.`,
            result: {
                id: result._id,
                libro_id,
                user_id,
                page,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const pageLock = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { lock } = req.body;
        const result = Page.findByIdAndUpdate(
            { _id: id },
            { $set: { lock: !lock } }
        );
        const data = {
            message: "Se actualizo el estado correctamente",
            result: {
                id: result._id,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page/`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const pageUp = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { libro_id, page } = await Page.findById(id);

        const { count_page } = await Book.findById(libro_id);
        if (page <= 0 && page < count_page) {
            throw new httpExeption(
                400,
                "El número de la página no se puede aumentar más."
            );
        }
        const { _id } = await Page.findOne({ page: page + 1, libro_id });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: 0 } });
        await Page.findOneAndUpdate({ _id }, { $set: { page } });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: page + 1 } });
        const data = {
            message: "Se actualizo correctamente los datos.",
            result: {
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const pageDown = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { libro_id, page } = await Page.findById(id);
        if (page <= 1) {
            throw new httpExeption(
                400,
                "El número de la página no se puede reducir más."
            );
        }
        const { _id } = await Page.findOne({ page: page - 1, libro_id });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: 0 } });
        await Page.findOneAndUpdate({ _id }, { $set: { page } });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: page - 1 } });
        const data = {
            message: "Se actualizo correctamente los datos.",
            result: {
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const pageChange = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { npage } = req.body;
        const { libro_id, page } = await Page.findById(id);
        const { _id } = await Page.findOne({ page: npage, libro_id });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: 0 } });
        await Page.findOneAndUpdate({ _id }, { $set: { page } });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: npage } });
        const data = {
            message: "Se actualizo correctamente los datos",
            result: {
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const pagePut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { npage } = req.body;
        const { libro_id, page } = await Page.findById(id);
        if (npage === page) {
            throw new httpExeption(400, "Esta registrado esa página.");
        }
        const results = await Page.find({ libro_id });
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: 0 } });
        if (npage > page) {
            results.map(async (r) => {
                if (r.page < npage && r.page >= page) {
                    await Page.findOneAndUpdate(
                        { _id: r._id },
                        { $set: { page: r.page + 1 } }
                    );
                }
            });
        } else {
            result.map(async (r) => {
                if (r.page > npage && r.page <= page) {
                    await Page.findOneAndUpdate(
                        { _id: r._id },
                        { $set: { page: r.page - 1 } }
                    );
                }
            });
        }
        await Page.findOneAndUpdate({ _id: id }, { $set: { page: npage } });
        const data = {
            message: "Se actualizo correctamente los datos",
            result: {
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/page`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const pageDelete = async (req = request, res = ressponse) => {
    try {
        const { id } = req.params;
        const result = await Page.findByIdAndDelete({ _id: id });
        const data = {
            message: "Se elimino Correctamente.",
            result: {
                id: result._id,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/user/`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    pageCreate,
    pageGetAll,
    pageLock,
    pageUp,
    pageDown,
    pageChange,
    pagePut,
    pageDelete,
};
