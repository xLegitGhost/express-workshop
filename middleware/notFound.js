export const notFoundMiddleware = (req, res, next) => {
    return res.status(404).json({
        code: 404,
        message: "URL no encontrada"
    });
};