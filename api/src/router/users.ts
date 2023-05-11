import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/users';

export default (router: Router) => {
  /**
   * @openapi
   * '/api/users':
   *  get:
   *     tags:
   *     - Users
   *     summary: Get the list of all users
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *       404:
   *         description: Product not found
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

   *       404:
   *         description: Product not found
   */
  router.get('/users/:id', getUserById);
};
