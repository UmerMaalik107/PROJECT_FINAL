const errorHandler = (err, req, res, next) => {
  console.log("here");
    let error = { ...err };
  
    error.message = err.message;
  
    console.log(err);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  };
  
  module.exports = errorHandler;