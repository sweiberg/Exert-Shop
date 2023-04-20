export class Product {
  name: string;
  finalPrice: number;
  originalPrice: number;
  category: string;
  categoryID?: number;
  tag: string;
  imgURL: string;
  description: string;
  id?: number;
  constructor(name: string, finalPrice: number, originalPrice: number, category: string, tag: string, imgURL: string, description: string, categoryID?: number){
    this.name = name;
    this.finalPrice = finalPrice;
    this.originalPrice = originalPrice;
    this.category = category;
    this.categoryID = categoryID;
    this.tag = tag;
    this.imgURL = imgURL;
    this.description = description;
  }
}
