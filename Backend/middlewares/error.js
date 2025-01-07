class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }

}

export const errorMiddleware=(err,res)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    if(err.name==="CastError"){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    if (err.name==="jsonWebTokenError"){
        const message="Json Web Token is invalid";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message="Json Web Token is expired";
        err=new ErrorHandler(message,400);
    }
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        err:err
    })
}

export default ErrorHandler;