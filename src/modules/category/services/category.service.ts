import Category from '../models/category.model';
import { ICategory } from '../types/category.type';

export class CategoryService {
  static async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    const category = new Category(data);
    return await category.save();
  }

  static async getAllCategories(): Promise<ICategory[]> {
    return await Category.find();
  }

  static async getCategoryById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  static async updateCategory(
    id: string,
    data: Partial<ICategory>,
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteCategory(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}
