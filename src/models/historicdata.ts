
export interface HistoricPrice {
    [key: string]: number
}

export interface HistoricData {
  bpi: HistoricPrice;
  disclaimer: string;
  time: {
    updated: string;
    updatedISO: string;
  };
}
