import categoryService from "../src/services/category.service";
import categoryDao from "../src/dao/category.dao";
import { Category, CreateCategoryDTO } from "../src/dto/category.dto";

jest.mock("../src/dao/category.dao");

describe("Category Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all categories", async () => {
    const mockCategories: Category[] = [
      {
        id: 1,
        machine_name: "Category 1",
        display_name: "category_one",
      },
      {
        id: 2,
        machine_name: "Category 2",
        display_name: "category_two",
      },
    ];
    (categoryDao.getAllCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );

    const categories = await categoryService.getAllCategories();
    expect(categories).toEqual(mockCategories);
  });

  it("should return a category by id", async () => {
    const mockCategory: Category = {
      id: 1,
      machine_name: "Category 1",
      display_name: "category_one",
    };
    (categoryDao.getCategoryById as jest.Mock).mockResolvedValue(mockCategory);

    const category = await categoryService.getCategoryById(1);
    expect(category).toEqual(mockCategory);
  });

  it("should create a new category", async () => {
    const newCategory: CreateCategoryDTO = {
      machine_name: "New Category",
      display_name: "new_category",
    };

    const createdCategory: Category = {
      id: 1,
      ...newCategory,
    };

    (categoryDao.createCategory as jest.Mock).mockResolvedValue(
      createdCategory
    );

    const category = await categoryService.createCategory(newCategory);
    expect(category).toEqual(createdCategory);
  });

  it("should update an existing category", async () => {
    const updatedCategory: Partial<CreateCategoryDTO> = {
      machine_name: "Updated Category",
      display_name: "updated_category",
    };

    const returnedCategory = {
      id: 1,
      ...updatedCategory,
    };

    (categoryDao.updateCategory as jest.Mock).mockResolvedValue(
      returnedCategory
    );

    const category = await categoryService.updateCategory(1, updatedCategory);
    expect(category).toEqual(returnedCategory);
  });

  it("should delete a category by id", async () => {
    (categoryDao.deleteCategory as jest.Mock).mockResolvedValue(1);

    const result = await categoryService.deleteCategory(1);
    expect(result).toBe(1);
  });
});
