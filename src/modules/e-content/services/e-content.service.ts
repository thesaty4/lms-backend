import Content from '../models/e-content.model';
import { IEContent } from '../types/e-content.type';

export class ContentService {
  /** Create new content */
  static async createContent(data: Partial<IEContent>): Promise<IEContent> {
    const newContent = new Content(data);
    return await newContent.save();
  }

  /** Get content by subTopicId */
  static async getContentBySubTopic(subTopicId: string): Promise<IEContent[]> {
    return await Content.find({ subTopicId });
  }
}
