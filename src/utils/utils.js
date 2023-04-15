export const catchAsync = (fn) => {
  return function wrappedFn(req, res, next) {
    fn(req, res, next).catch((error) => {
      console.log(error);
      const errorMessage =
        error.message || "Something went wrong! Please try again";

      console.log(error);

      res.status(500).json({ text: errorMessage });
    });
  };
};
