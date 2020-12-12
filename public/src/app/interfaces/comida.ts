declare interface Comida {
    
    food?: Food;
    
  }
declare interface Nutrients{
  CHOCDF?: string,
  ENERC_KCAL?: string,
  FAT?: string
}
declare interface Food{
  label?: string;
  nutrients?: Nutrients;
  foodContentsLabel?: string;
  image?:string;
}