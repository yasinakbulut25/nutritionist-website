export function withErrorHandler(handler) {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("API ERROR:", error);

      return Response.json(
        {
          success: false,
          message: error.message || "Internal Server Error",
        },
        { status: 500 },
      );
    }
  };
}
