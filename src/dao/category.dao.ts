import db from "../db/db";
import { Category, CreateCategoryDTO } from "../dto/category.dto";

async function createCategory(category: CreateCategoryDTO): Promise<Category> {
  const [newCategory] = await db("categories").insert(category).returning("*");
  if (!newCategory) {
    throw new Error("Failed to create category");
  }
  return newCategory;
}

async function getAllCategories(): Promise<Category[]> {
  return db("categories").select("*");
}

async function getCategoryById(id: number): Promise<Category | null> {
  const category = await db("categories").where({ id }).first();
  return category || null;
}

async function updateCategory(
  id: number,
  category: Partial<CreateCategoryDTO>
): Promise<Category> {
  const [updatedCategory] = await db("categories")
    .where({ id })
    .update(category)
    .returning("*");
  if (!updatedCategory) {
    throw new Error("Failed to update category");
  }
  return updatedCategory;
}

async function deleteCategory(id: number): Promise<number> {
  const deletedRows = await db("categories").where({ id }).delete();
  if (deletedRows === 0) {
    throw new Error("Failed to delete category");
  }
  return 1;
}

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
