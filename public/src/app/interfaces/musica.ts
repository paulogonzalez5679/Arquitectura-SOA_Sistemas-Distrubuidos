declare interface Musica {
   track?:Track;
}
declare interface Track{
  subtitle?:string;
  title?: string;
  url?:string;
  images:Images
  
}

declare interface Images{
  coverarthq?:string;
}