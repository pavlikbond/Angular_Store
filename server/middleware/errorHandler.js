export const errorHandler = (error, req, res, next) => {
  if (error.message === "Invalid ID") {
    return res.status(400).json({ message: "Something went wrong, please try again." });
  }
};
