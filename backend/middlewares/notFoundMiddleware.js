export const notFoundMiddleWare = (req, res) => {
  res.status(404).send("<h1>404 not found</h1>")
};
