export class Product{
  name: string;
  finalPrice: number;
  originalPrice: number;
  category: string;
  tag: string;
  imgURL: string;
  description: string;
  id?: number;
  constructor(name: string, finalPrice: number, originalPrice: number, category: string, tag: string, imgURL: string, description: string){
    this.name = name;
    this.finalPrice = finalPrice;
    this.originalPrice = originalPrice;
    this.category = category;
    this.tag = tag;
    this.imgURL = imgURL;
    this.description = description;
  }
}
