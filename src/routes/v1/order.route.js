const express = require('express');
const validate = require('../../middlewares/validate');
const OrderValidation = require('../../validations/order.validation');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderByVendorId,
  getOrderByUserId,
} = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(OrderValidation.createOrder), createOrder)
  .get(validate(OrderValidation.getOrders), getOrders);

router
  .route('/:orderId')
  .get(validate(OrderValidation.getOrder), getOrder)
  .patch(validate(OrderValidation.updateOrder), updateOrder)
  .delete(validate(OrderValidation.deleteOrder), deleteOrder);

router.route('/vendor/:vendorId').get(getOrderByVendorId);
router.route('/user/:userId').get(getOrderByUserId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management and retrieval
 */

/**
 * @swagger
 * /Orders:
 *   post:
 *     summary: Create a Order
 *     description: User can create other Orders.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - vendorId
 *               - items
 *               - status
 *               - amount

 *             properties:
 *               userId:
 *                 type: string
 *               vendorId:
 *                 type: string
 *               items:
 *                 type: Array[string, string]
 *               status:
 *                  type: string
 *               amount:
 *                  type: string

 *             example:
 *               userId: Object(id)
 *               vendorId: Object(id)
 *               items: [string, string, string]
 *               status: "pending or recieved"
 *               amount: 100
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Orders'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Orders
 *     description: Only admins can retrieve all Orders.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Orders name
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
 *         description: Maximum number of Orders
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
 *                   Orders:
 *                     $ref: '#/components/schemas/Orders'
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
 * /Orders/{id}:
 *   get:
 *     summary: Get a Order
 *     description: Logged in users can fetch Order information.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Orders id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Orders'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an Order
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Orders id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: fake name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Orders'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an Order
 *     description: Logged in users can delete only their Orders. Only admins can delete other Orders.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Orders id
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
