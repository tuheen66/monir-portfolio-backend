import { TMessage } from './message.interface';
import Message from './message.model';

const createMessage = async (message: TMessage) => {
  const result = await Message.create(message);

  return result;
};

const getAllMessage = async () => {
  const result = await Message.find();
  return result;
};


const deleteMessage = async (_id: string) => {
    const result = await Message.findByIdAndDelete(_id);
    return result;
  };

export const MessageService = {
  createMessage,
  getAllMessage,
  deleteMessage
};
