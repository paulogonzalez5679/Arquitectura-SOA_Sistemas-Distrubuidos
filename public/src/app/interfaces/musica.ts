declare interface Musica {
    track?: Track;    
}
declare interface Hits{
  title?: string,
  subtitle?: string,
  url?: string
  images?:string;
}
declare interface Track{
  hits?: Hits;
}