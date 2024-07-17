import categoryDao from "../dao/category.dao";
import { Category, CreateCategoryDTO } from "../dto/category.dto";

async function createCategory(category: CreateCategoryDTO): Promise<Category> {
  return categoryDao.createCategory(category);
}

async function getAllCategories(): Promise<Category[]> {
  return categoryDao.getAllCategories();
}

async function getCategoryById(id: number): Promise<Category | null> {
  return categoryDao.getCategoryById(id);
}

async function updateCategory(
  id: number,
  category: Partial<CreateCategoryDTO>
): Promise<Category> {
  return categoryDao.updateCategory(id, category);
}

async function deleteCategory(id: number): Promise<number> {
  return categoryDao.deleteCategory(id);
}

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
