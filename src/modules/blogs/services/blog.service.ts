import Blog from '../models/blog.model';
import { IBlog } from '../types/blog.type';

export class BlogService {
  static async createBlog(data: Partial<IBlog>): Promise<IBlog> {
    const blog = new Blog(data);
    return await blog.save();
  }

  static async getAllBlogs(): Promise<IBlog[]> {
    return await Blog.find()
      .populate('author', 'name email') // customize fields as needed
      .populate('category', 'name');
  }

  static async getBlogById(id: string): Promise<IBlog | null> {
    return await Blog.findById(id)
      .populate('author', 'name email')
      .populate('category', 'name');
  }

  static async updateBlog(
    id: string,
    data: Partial<IBlog>,
  ): Promise<IBlog | null> {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteBlog(id: string): Promise<IBlog | null> {
    return await Blog.findByIdAndDelete(id);
  }
}
