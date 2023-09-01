export const fetchWrapper = async (url: string, options: any) => {
  const response = await fetch(
    `https://pz14oglr35.execute-api.us-east-1.amazonaws.com/dev${url}`,
    options,
  );
  const data = await response.json();
  return data;
};
