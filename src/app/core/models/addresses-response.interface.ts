export interface IAddressesResponse {
  results: number;
  status: string;
  data: IAddress[];
}

export interface IAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
