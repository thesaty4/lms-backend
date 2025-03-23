import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import Subtopic from '../models/subtopic.model';

export class SubtopicController {
  /** Create a new subtopic */
  static async create(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { topicId, name } = req.body;

      const subtopic = new Subtopic({ topicId, name });
      await subtopic.save();

      apiResponseData = createApiResponse('CREATED', {
        message: 'Subtopic created successfully',
        data: subtopic,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error creating subtopic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Get subtopics by topic */
  static async getByTopic(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { topicId } = req.params;
      const subtopics = await Subtopic.find({ topic: topicId });

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Subtopics fetched successfully',
        data: subtopics,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching subtopics',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }

  /** Delete subtopic */
  static async delete(req: Request, res: Response) {
    let apiResponseData: IApiResponse;
    try {
      const { subtopicId } = req.params;

      const deletedSubtopic = await Subtopic.findByIdAndDelete(subtopicId);

      if (!deletedSubtopic) {
        apiResponseData = createApiResponse('NOT_FOUND', {
          message: 'Subtopic not found',
          data: undefined,
        });
        apiResponse(res, apiResponseData);
        return;
      }

      apiResponseData = createApiResponse('SUCCESS', {
        message: 'Subtopic deleted successfully',
        data: deletedSubtopic,
      });
    } catch (error) {
      apiResponseData = createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error deleting subtopic',
        data: (error as IErrorResponse).message,
      });
    }
    apiResponse(res, apiResponseData);
  }
}
