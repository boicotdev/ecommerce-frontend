import { authAxios } from "./actions.api";

//process payment
export const createPayment = (data) => {
  return authAxios.post("payment/process/", data);
};
