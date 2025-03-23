import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import Topic from '../models/topic.model';

export class TopicController {
  /** Create a new topic */
  static async create(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { categoryId, name } = req.body;

      const topic = new Topic({ categoryId, name });
      await topic.save();

      apiResponseData = createApiResponse('CREATED', {
        message: 'Topic created successfully',
        data: topic,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error creating topic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Get topics by category */
  static async getByCategory(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { categoryId } = req.params;
      const topics = await Topic.find({ category: categoryId });

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Topics fetched successfully',
        data: topics,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching topics',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Get a single topic by ID */
  static async getById(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { topicId } = req.params;
      const topic = await Topic.findById(topicId);

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Topic fetched successfully',
        data: topic,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching topic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Update topic */
  static async update(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { topicId } = req.params;
      const { name } = req.body;

      const updatedTopic = await Topic.findByIdAndUpdate(
        topicId,
        { name },
        { new: true },
      );

      if (!updatedTopic) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Topic not found',
          data: undefined,
        });
        apiResponse(res, apiResponseData);
      }

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Topic updated successfully',
        data: updatedTopic,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error updating topic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Delete topic */
  static async delete(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { topicId } = req.params;

      const deletedTopic = await Topic.findByIdAndDelete(topicId);

      if (!deletedTopic) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Topic not found',
          data: undefined,
        });
        apiResponse(res, apiResponseData);
      }

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Topic deleted successfully',
        data: undefined,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error deleting topic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }
}
