export class Request {
  public id: number;
  public reference: string;
  public object: string;
  public summary: string;
  public dateOfRequest: Date;
  public status: number;
  public quotes: any;
  public purchaseOrders: any;
  public idChannel: number;
  public idPriority: number;
  public idCustomer: number;
  // public purchaseOrders: Array<PurchaseOrder>;
}
