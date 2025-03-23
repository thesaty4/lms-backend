import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  static async create(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const category = await CategoryService.createCategory(req.body);
      apiResponseData = createApiResponse('CREATED', {
        message: 'Category created successfully',
        data: category,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Category creation failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async getAll(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const categories = await CategoryService.getAllCategories();
      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Categories retrieved successfully',
        data: categories,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to retrieve categories',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async getById(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Category not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Category retrieved successfully',
          data: category,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to retrieve category',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async update(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const category = await CategoryService.updateCategory(
        req.params.id,
        req.body,
      );
      if (!category) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Category not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Category updated successfully',
          data: category,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Category update failed',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }

  static async delete(req: Request, res: Response) {
    let apiResponseData: IApiResponse;

    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      if (!category) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Category not found',
          data: null,
        });
      } else {
        apiResponseData = createApiResponse('SUCCESS', {
          message: 'Category deleted successfully',
          data: category,
        });
      }
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Failed to delete category',
        data: (error as IErrorResponse).message,
      });
    }

    apiResponse(res, apiResponseData);
  }
}
