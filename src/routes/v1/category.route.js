const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(auth('getUsers'), validate(categoryValidation.getCategories), categoryController.getCategories);

router
  .route('/:categoryId')
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('manageUsers'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth('manageUsers'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categgories management and retrieval
 */
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a category
 *     description: Only admins can create other categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               createdBy:
 *                 type: string
 *             example:
 *               name: Chicken
 *               description: We provide all kind of chickens
 *               createdBy: Object(id)
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Categories'
 *       "400":
 *         $ref: '#/components/responses/DuplicateCategories'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all categories
 *     description: everyone can retrieve all categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: Category name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of categories
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/category'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category
 *     description: Logged in users can fetch all categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Category id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a category
 *     description: Logged in users can only update their own information. Only admins can update other categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category id
 *     requestBody:
 *       required: true
 *       content:
  *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               createdBy:
 *                 type: String
 *               description:
 *                 type: string
 *             example:
 *               name: fake name
 *               createdBy: Object(id)
 *               description: "dssddd"
 
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a category
 *     description: Logged in users(admin/vendors) can delete their categories .
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: CategoryId id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
