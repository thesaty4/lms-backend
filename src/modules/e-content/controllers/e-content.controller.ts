import { apiResponseType } from '@shared/constants';
import { IErrorResponse } from '@shared/types';
import apiResponse from '@shared/utils/api-response.util';
import { Request, Response } from 'express';
import { ContentService } from '../services/e-content.service';

export class ContentController {
  /** Create new content */
  static async createContent(req: Request, res: Response): Promise<void> {
    try {
      const content = await ContentService.createContent(req.body);
      apiResponse(res, { ...apiResponseType.SUCCESS, data: content });
    } catch (error) {
      apiResponse(res, {
        ...apiResponseType.INTERNAL_SERVER_ERROR,
        data: { message: (error as IErrorResponse).message },
      });
    }
  }

  /** Get content by subTopicId */
  static async getContentBySubTopic(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { subTopicId } = req.params;
      const content = await ContentService.getContentBySubTopic(subTopicId);
      apiResponse(res, { ...apiResponseType.SUCCESS, data: content });
    } catch (error) {
      apiResponse(res, {
        ...apiResponseType.INTERNAL_SERVER_ERROR,
        data: { message: (error as IErrorResponse).message },
      });
    }
  }
}
