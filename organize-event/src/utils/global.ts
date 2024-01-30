export const convertStringToJson = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log("error-convertStringToJson", error);
  }
};
