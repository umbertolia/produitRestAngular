export class Produit {

  constructor(public id: number, public designation: string, public price: number, public quantite: number) {
  }

  public static fromJson(json: object): Produit {
    const sampleName = 'ECStruct1';
    return new Produit(
      json['id'],
      json['designation'],
      json['price'],
      json['quantite']);
  }


}
