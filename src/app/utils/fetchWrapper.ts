export const fetchWrapper = async (url: string, options: any) => {
  const response = await fetch(
    `https://rln471iuca.execute-api.us-east-1.amazonaws.com/dev${url}`,
    options,
  );
  const data = await response.json();
  return data;
};
