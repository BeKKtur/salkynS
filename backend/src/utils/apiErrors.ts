interface ApiErrors {
  badRequest: (message: string) => Response;
  unauthorized: (message: string) => Response;
  forbidden: (message: string) => Response;
  conflict: (message: string) => Response;
  notFound: (message: string) => Response;
}

interface Response {
  message: string;
  status: number;
}

export const apiErrors: ApiErrors = {
  badRequest: (message) => ({
    message,
    status: 400,
  }),
  forbidden: (message) => ({
    message,
    status: 403,
  }),
  unauthorized: (message) => ({
    message,
    status: 401,
  }),
  conflict: (message) => ({
    message,
    status: 409,
  }),
  notFound: (message) => ({
    message,
    status: 404,
  }),
};
