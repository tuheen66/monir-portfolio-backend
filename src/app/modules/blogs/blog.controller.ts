import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
    const blog = req.body;
    const result = await BlogService.createBlog(blog) ;
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Blog added successfully',
      data: result,
    });
  });

  const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogService.getAllBlog();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog fetched successfully',
      data: result,
    });
  });


const getSingleBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogService.getSingleBlog(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    const Blog = req.body;
    const result = await BlogService.updateBlog(id, Blog)
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog updated successfully',
      data: result,
    });
  });

  const deleteBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await BlogService.deleteBlog(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: result,
    });
  });

  export const BlogController={
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
  }