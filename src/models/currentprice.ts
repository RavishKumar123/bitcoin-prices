export interface CurrentPrice {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    USD: {
      code: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}
