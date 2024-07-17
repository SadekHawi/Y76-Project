/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - machine_name
 *         - display_name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the category
 *         machine_name:
 *           type: string
 *           description: The machine name of the category
 *         display_name:
 *           type: string
 *           description: The display name of the category
 *       example:
 *         id: 1
 *         machine_name: "work"
 *         display_name: "Work"
 */

export type Category = {
  id: number;
  machine_name: string;
  display_name: string;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryDTO:
 *       type: object
 *       properties:
 *         machine_name:
 *           type: string
 *         display_name:
 *           type: string
 *       required:
 *         - machine_name
 *         - display_name
 */

export type CreateCategoryDTO = {
  machine_name: string;
  display_name: string;
};
