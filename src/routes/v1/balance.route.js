const express = require('express');
const validate = require('../../middlewares/validate');
const BalanceValidation = require('../../validations/balance.validation');
const {
  createBalance,
  getBalances,
  getBalance,
  updateBalance,
  deleteBalance,
  getBalanceByUserId,
  getBalanceByVendorId,
} = require('../../controllers/balance.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(BalanceValidation.createBalance), createBalance)
  .get(validate(BalanceValidation.getBalances), getBalances);

router
  .route('/:balanceId')
  .get(validate(BalanceValidation.getBalance), getBalance)
  .patch(validate(BalanceValidation.updateBalance), updateBalance)
  .delete(validate(BalanceValidation.deleteBalance), deleteBalance);

router.route('/user/:userId').get(getBalanceByUserId);
router.route('/vendor/:vendorId').get(getBalanceByVendorId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Balance management and retrieval
 */

/**
 * @swagger
 * /balance:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other balance.
 *     tags: [Balance]
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
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 format: id
 *                 desciption: User unique Id
 *               vendorId:
 *                 type: string
 *                 format: id
 *                 desciption: Vendor unique Id
 *               amount:
 *                 type: number
 *                 format: 1000
 *                 desciption: amount in a number
 *             example:
 *               userId: balanceuniqueid
 *               vendorId: vendoruniqueid
 *               amount: 10000

 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Balance'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all balance
 *     description: Only admins can retrieve all balance.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Balance name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Balance role
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
 *         description: Maximum number of balance records
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
 *                     $ref: '#/components/schemas/Balance'
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
 * /balance/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in balance can fetch only their own user information. Only admins can fetch other balance.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Balance id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Balance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a user
 *     description: Logged in balance can only update their own information. Only admins can update other balance.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Balance id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - vendorId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 format: id
 *                 desciption: User unique Id
 *               vendorId:
 *                 type: string
 *                 format: id
 *                 desciption: Vendor unique Id
 *               amount:
 *                 type: number
 *                 format: 1000
 *                 desciption: amount in a number
 *             example:
 *               userId: balanceuniqueid
 *               vendorId: vendoruniqueid
 *               amount: 10000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Balance'
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
 *     summary: Delete a user
 *     description: Logged in balance can delete only themselves. Only admins can delete other balance.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Balance id
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
