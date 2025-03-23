import { IApiResponse, IErrorResponse } from '@shared/types';

import { createApiResponse } from '@shared/constants';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';

export class BlogController {
  static async create(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const blog = await BlogService.createBlog(req.body);
      apiResponseData = createApiResponse('CREATED', {
        message: 'Blog created successfully',
        data: blog,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Blog creation failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async getAll(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const blogs = await BlogService.getAllBlogs();
      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Blogs retrieved successfully',
        data: blogs,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to retrieve blogs',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async getById(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const blog = await BlogService.getBlogById(req.params.id);
      if (!blog) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Blog not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Blog retrieved successfully',
          data: blog,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to retrieve blog',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async update(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const blog = await BlogService.updateBlog(req.params.id, req.body);
      if (!blog) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Blog not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Blog updated successfully',
          data: blog,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Blog update failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async delete(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const blog = await BlogService.deleteBlog(req.params.id);
      if (!blog) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Blog not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Blog deleted successfully',
          data: blog,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to delete blog',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }
}
