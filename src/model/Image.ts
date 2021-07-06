export class Image {
    constructor(
      private id: string,
      private title: string,
      private author: string,
      private date: string,
      private file: string,
      private tags: string,
      private collection: string
    ){}

    getId() {
      return this.id;
    }
    getTitle() {
      return this.title;
    }
  
    getAuthor() {
      return this.author;
    }
  
    getDate() {
      return this.date;
    }
  
    getFile() {
      return this.file;
    }
  
    getTags() {
      return this.tags;
    }
  
    getCollection() {
      return this.collection;
    }

    setDate(newDate: string){
      this.date = newDate
    }
  }

export interface ImageInputDTO{
    title: string,
    file: string,
    tags: string,
    collection: string
}