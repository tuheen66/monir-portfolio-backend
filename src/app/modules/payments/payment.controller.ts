import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";


const createPayment = catchAsync(async(req, res)=>{
    const payment = req.body
    const result = await PaymentServices.createPayment(payment)

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Payment create successfully',
        data: result,
      });
})


export const  PaymentController={
    createPayment
}