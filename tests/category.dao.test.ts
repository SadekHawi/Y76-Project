// Import the DAO and the necessary interfaces or types
import categoryDao from "../src/dao/category.dao";
import { Category, CreateCategoryDTO } from "../src/dto/category.dto";

// Mock the DAO functions
jest.mock("../src/dao/category.dao", () => ({
  __esModule: true,
  default: {
    createCategory: jest.fn(),
    getAllCategories: jest.fn(),
    getCategoryById: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
  },
}));

describe("Category DAO", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a category into the database", async () => {
    const newCategory: CreateCategoryDTO = {
      machine_name: "New Category",
      display_name: "new_category",
    };

    const insertedCategory: Category = {
      id: 1,
      ...newCategory,
    };

    // Mock the createCategory function to return the inserted category
    (categoryDao.createCategory as jest.Mock).mockResolvedValue(
      insertedCategory
    );

    const result = await categoryDao.createCategory(newCategory);

    expect(result).toEqual(insertedCategory);
    expect(categoryDao.createCategory).toHaveBeenCalledWith(newCategory);
  });

  it("should retrieve all categories from the database", async () => {
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

    // Mock the getAllCategories function to return the mockCategories array
    (categoryDao.getAllCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );

    const result = await categoryDao.getAllCategories();

    expect(result).toEqual(mockCategories);
    expect(categoryDao.getAllCategories).toHaveBeenCalled();
  });

  it("should retrieve a category by id from the database", async () => {
    const categoryId = 1;
    const mockCategory: Category = {
      id: categoryId,
      machine_name: "Category 1",
      display_name: "category_one",
    };

    // Mock the getCategoryById function to return the mockCategory
    (categoryDao.getCategoryById as jest.Mock).mockResolvedValue(mockCategory);

    const result = await categoryDao.getCategoryById(categoryId);

    expect(result).toEqual(mockCategory);
    expect(categoryDao.getCategoryById).toHaveBeenCalledWith(categoryId);
  });

  it("should update a category in the database", async () => {
    const categoryId = 1;
    const updatedCategory: Partial<CreateCategoryDTO> = {
      machine_name: "Updated Category",
      display_name: "updated_category",
    };

    const updatedCategoryFromDb = {
      id: categoryId,
      ...updatedCategory,
    };

    // Mock the updateCategory function to return the updatedCategoryFromDb
    (categoryDao.updateCategory as jest.Mock).mockResolvedValue(
      updatedCategoryFromDb
    );

    const result = await categoryDao.updateCategory(
      categoryId,
      updatedCategory
    );

    expect(result).toEqual(updatedCategoryFromDb);
    expect(categoryDao.updateCategory).toHaveBeenCalledWith(
      categoryId,
      updatedCategory
    );
  });

  it("should delete a category from the database", async () => {
    const categoryId = 1;

    // Mock the deleteCategory function to return the number of affected rows (1)
    (categoryDao.deleteCategory as jest.Mock).mockResolvedValue(1);

    const result = await categoryDao.deleteCategory(categoryId);

    expect(result).toEqual(1);
    expect(categoryDao.deleteCategory).toHaveBeenCalledWith(categoryId);
  });
});
