import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/users';

export default (router: Router) => {
  /**
   * @openapi
   * components:
   *  schemas:
   *    UsersSchema:
   *      type: object   *
   *      properties:
   *        id:
   *          type: string
   *          default: 1
   *        email:
   *          type: string
   *          default: example@example.com
   *        username:
   *          type: string
   *          default: username
   */

  router.get('/users', getAllUsers);

  /**
   * @openapi
   * '/api/users/{id}':
   *  get:
   *     tags:
   *     - Users
   *     summary: Get user by the id
   *     parameters:
   *      - in: path
   *        name: id
   *        description: The id of the user
   *        schema:
   *            type: integer
   *            minimum: 1
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UsersSchema'
   *       404:
   *         description: User not found
   */
  router.get('/users/:id', getUserById);
};
