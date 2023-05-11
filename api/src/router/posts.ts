import { Router } from 'express';

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/posts';

export default (router: Router) => {
  /**
   * @openapi
   * components:
   *  schemas:
   *    PostSchema:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          default: 1
   *        title:
   *          type: string
   *          default: Post Title
   *        description:
   *          type: string
   *          default: Post Content
   *        img:
   *          type: string
   *          default: imgurl.jpg
   *        date:
   *          type: string
   *          default: 2023-05-08 23:45:19.703077
   *        uid:
   *          type: string
   *          default: 10
   *    CreatePostSchema:
   *      type: object
   *      required:
   *        - title
   *        - description
   *        - img
   *      properties:
   *        title:
   *          type: string
   *          default: Post Title
   *        description:
   *          type: string
   *          default: Post Content
   *        img:
   *          type: string
   *          default: imgurl.jpg
   */

  router.get('/posts', getPosts);

  /**
   * @openapi
   * '/api/posts/{id}':
   *  get:
   *     tags:
   *     - Posts
   *     summary: Get post by  id
   *     parameters:
   *      - in: path
   *        name: id
   *        description: The id of the post
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
   *              $ref: '#/components/schemas/PostSchema'
   *       404:
   *         description: Post not found
   */
  router.get('/posts/:id', getPost);
  /**
   * @openapi
   * '/api/posts':
   *  post:
   *     tags:
   *     - Posts
   *     summary: Add post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#components/schemas/CreatePostSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/PostSchema'
   *       404:
   *         description: Post not found
   */
  router.post('/posts', addPost);
  /**
   * @openapi
   * '/api/posts/{id}':
   *   delete:
   *     tags:
   *     - Posts
   *     summary: Delete post by  id
   *     parameters:
   *      - in: path
   *        name: id
   *        description: The id of the post
   *        schema:
   *            type: integer
   *            minimum: 1
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   */
  router.delete('/posts/:id', deletePost);
  /**
   * @openapi
   * '/api/posts/{id}':
   *  put:
   *     tags:
   *     - Posts
   *     summary: Update post
   *     parameters:
   *      - in: path
   *        name: id
   *        description: The id of the post
   *        schema:
   *            type: integer
   *            minimum: 1
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#components/schemas/CreatePostSchema'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/PostSchema'
   *       401:
   *         description: Not authorized
   *       403:
   *         description: Forbidden
   */
  router.put('/posts/:id', updatePost);
};
