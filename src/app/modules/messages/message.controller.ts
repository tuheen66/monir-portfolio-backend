import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageService } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const message = req.body;
  const result = await MessageService.createMessage(message);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Message added successfully',
    data: result,
  });
});


const getAllMessage = catchAsync(async (req, res) => {
    const result = await MessageService.getAllMessage();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Medicines fetched successfully',
      data: result,
    });
  });


   const deleteMessage = catchAsync(async (req, res) => {
      const id = req.params.id;
      const result = await MessageService.deleteMessage(id);
    
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Message deleted successfully',
        data: result,
      });
    });
  

export const MessageController = {
  createMessage,
  getAllMessage,
  deleteMessage
};
