import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import Subtopic from '../models/subtopic.model';

export class SubtopicService {
  /** Create a new subtopic */
  static async create(topic: string, name: string): Promise<IApiResponse> {
    try {
      const subtopic = new Subtopic({ topic, name });
      await subtopic.save();

      return createApiResponse('CREATED', {
        message: 'Subtopic created successfully',
        data: subtopic,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error creating subtopic',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Get subtopics by topic */
  static async getByTopic(topicId: string): Promise<IApiResponse> {
    try {
      const subtopics = await Subtopic.find({ topic: topicId });

      return createApiResponse('SUCCESS', {
        message: 'Subtopics fetched successfully',
        data: subtopics,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching subtopics',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Delete subtopic */
  static async delete(subtopicId: string): Promise<IApiResponse> {
    try {
      const deletedSubtopic = await Subtopic.findByIdAndDelete(subtopicId);

      if (!deletedSubtopic) {
        return createApiResponse('NOT_FOUND', {
          message: 'Subtopic not found',
          data: undefined,
        });
      }

      return createApiResponse('SUCCESS', {
        message: 'Subtopic deleted successfully',
        data: undefined,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error deleting subtopic',
        data: (error as IErrorResponse).message,
      });
    }
  }
}
