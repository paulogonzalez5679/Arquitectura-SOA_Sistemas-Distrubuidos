declare interface Musica {
   hits?:Hits;
}
declare interface Hits{
 track?:Track
}
declare interface Track{
  title?: string,
  subtitle?: string,
  url?: string
  images?:string;
}