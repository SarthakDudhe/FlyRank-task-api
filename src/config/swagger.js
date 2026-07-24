export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FlyRank AI Task API',
    version: '1.0.0',
    description: 'Task Management API for FlyRank AI',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  tags: [
    { name: 'Tasks', description: 'Task management operations' }
  ],
  components: {
    schemas: {
      Task: {
        type: 'object',
        required: ['title', 'description', 'priority', 'assignedTo'],
        properties: {
          id: { type: 'string', description: 'Auto-generated UUID' },
          title: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
          status: { type: 'string', enum: ['Pending', 'In Progress', 'Done'] },
          assignedTo: { type: 'string' },
          completed: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  paths: {
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        description: 'Returns all tasks, optionally filtered by status, priority, assignedTo, or search string',
        parameters: [
          { in: 'query', name: 'status', schema: { type: 'string' }, description: 'Filter by status' },
          { in: 'query', name: 'priority', schema: { type: 'string' }, description: 'Filter by priority' },
          { in: 'query', name: 'assignedTo', schema: { type: 'string' }, description: 'Filter by assigned user' },
          { in: 'query', name: 'search', schema: { type: 'string' }, description: 'Search title or description' },
          { in: 'query', name: 'sortBy', schema: { type: 'string', default: 'createdAt' }, description: 'Sort field (e.g., createdAt, title)' },
          { in: 'query', name: 'order', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' }, description: 'Sort order' },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' },
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Items per page' }
        ],
        responses: {
          '200': { description: 'Successful response' }
        }
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        description: 'Creates a task and returns it',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'priority', 'assignedTo'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                  assignedTo: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Task created successfully' },
          '400': { description: 'Validation errors' }
        }
      }
    },
    '/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Successful response' },
          '404': { description: 'Task not found' }
        }
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update a task completely',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  priority: { type: 'string' },
                  status: { type: 'string' },
                  assignedTo: { type: 'string' },
                  completed: { type: 'boolean' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Task updated successfully' },
          '404': { description: 'Task not found' }
        }
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          '204': { description: 'Task deleted successfully' },
          '404': { description: 'Task not found' }
        }
      }
    },
    '/tasks/{id}/status': {
      patch: {
        tags: ['Tasks'],
        summary: 'Update task status',
        description: 'Partially update only the status of a task',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['Pending', 'In Progress', 'Done'] }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Task status updated successfully' },
          '400': { description: 'Validation errors' },
          '404': { description: 'Task not found' }
        }
      }
    }
  }
};
