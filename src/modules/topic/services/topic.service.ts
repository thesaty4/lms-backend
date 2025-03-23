import { createApiResponse } from '@shared/constants';
import { IApiResponse, IErrorResponse } from '@shared/types';
import Topic from '../models/topic.model';

export class TopicService {
  /** Create a new topic */
  static async create(category: string, name: string): Promise<IApiResponse> {
    try {
      const topic = new Topic({ category, name });
      await topic.save();

      return createApiResponse('CREATED', {
        message: 'Topic created successfully',
        data: topic,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error creating topic',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Get topics by category */
  static async getByCategory(categoryId: string): Promise<IApiResponse> {
    try {
      const topics = await Topic.find({ category: categoryId });

      return createApiResponse('SUCCESS', {
        message: 'Topics fetched successfully',
        data: topics,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching topics',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Get a single topic by ID */
  static async getById(topicId: string): Promise<IApiResponse> {
    try {
      const topic = await Topic.findById(topicId);
      if (!topic) {
        return createApiResponse('NOT_FOUND', {
          message: 'Topic not found',
          data: undefined,
        });
      }

      return createApiResponse('SUCCESS', {
        message: 'Topic fetched successfully',
        data: topic,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error fetching topic',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Update topic */
  static async update(topicId: string, name: string): Promise<IApiResponse> {
    try {
      const updatedTopic = await Topic.findByIdAndUpdate(
        topicId,
        { name },
        { new: true },
      );

      if (!updatedTopic) {
        return createApiResponse('NOT_FOUND', {
          message: 'Topic not found',
          data: undefined,
        });
      }

      return createApiResponse('SUCCESS', {
        message: 'Topic updated successfully',
        data: updatedTopic,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error updating topic',
        data: (error as IErrorResponse).message,
      });
    }
  }

  /** Delete topic */
  static async delete(topicId: string): Promise<IApiResponse> {
    try {
      const deletedTopic = await Topic.findByIdAndDelete(topicId);

      if (!deletedTopic) {
        return createApiResponse('NOT_FOUND', {
          message: 'Topic not found',
          data: undefined,
        });
      }

      return createApiResponse('SUCCESS', {
        message: 'Topic deleted successfully',
        data: undefined,
      });
    } catch (error) {
      return createApiResponse('INTERNAL_SERVER_ERROR', {
        message: 'Error deleting topic',
        data: (error as IErrorResponse).message,
      });
    }
  }
}
