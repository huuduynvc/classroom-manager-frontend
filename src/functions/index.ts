export const saveLogin = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  await localStorage.setItem("token", token);
  await localStorage.setItem("refreshToken", refreshToken);
};
