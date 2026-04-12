export const returnErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    return {
      data: null,
      error: {
        name: error.name || "error_unknown",
        message: error.message || "An unknown error occurred",
      },
    };
  }
  return {
    data: null,
    error: {
      name: "error_unknown",
      message: "An unknown error occurred",
    },
  };
};
