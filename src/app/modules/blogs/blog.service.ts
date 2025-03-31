import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlog = async (blog: TBlog) => {
    const result = await Blog.create(blog);
    return result;
  };

  const getAllBlog = async () => {
    const result = await Blog.find();
    return result;
  };

  const getSingleBlog = async (_id: string) => {
    const result = await Blog.findById(_id);
    return result;
  };

  const updateBlog = async (_id: string, blog: TBlog) => {
      const result = await Blog.findByIdAndUpdate(_id, blog, { new: true });
      return result;
    };
  
    const deleteBlog = async (_id: string) => {
      const result = await Blog.findByIdAndDelete(_id);
      return result;
    };
  
  


  export const BlogService={
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
  }
  