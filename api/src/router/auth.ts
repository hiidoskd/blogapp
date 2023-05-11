import { Router } from 'express';
import { login, logout, register } from '../controllers/auth';

export default (router: Router) => {
  /**
   * @openapi
   * components:
   *  schemas:
   *    RegisterUser:
   *      type: object
   *      required:
   *        - email
   *        - username
   *        - password
   *      properties:
   *        email:
   *          type: string
   *          default: username@example.com
   *        username:
   *          type: string
   *          default: username
   *        password:
   *          type: string
   *          default: stringPassword123
   *    RegisterUserResponse:
   *      type: object
   *      properties:
   *        email:
   *          type: string
   *        username:
   *          type: string
   */

  /**
   * @openapi
   * '/api/register':
   *  post:
   *     tags:
   *     - Authorization
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#components/schemas/RegisterUser'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RegisterUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  router.post('/register', register);

  /**
   * @openapi
   * components:
   *  schemas:
   *    Login:
   *      type: object
   *      required:
   *        - username
   *        - password
   *      properties:
   *        username:
   *          type: string
   *          default: username
   *        password:
   *          type: string
   *          default: stringPassword123
   *    LoginResponse:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *        username:
   *          type: string
   *        email:
   *          type: string
   */

  /**
   * @openapi
   * '/api/login':
   *  post:
   *     tags:
   *     - Authorization
   *     summary: Login as user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#components/schemas/Login'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginResponse'
   *      400:
   *        description: Bad request
   */
  router.post('/login', login);

  /**
   * @openapi
   * '/api/logout':
   *  post:
   *     tags:
   *     - Authorization
   *     summary: Logout a user
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */

  router.post('/logout', logout);
};
