import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PRODUCTS } from "../../constants/DBTable";
import { Collection } from "./Collection";
import { Image } from "./Image";

@Entity(PRODUCTS)
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Collection, (collection) => collection.products)
  @JoinColumn({ name: "collectionId" })
  collection: Collection;

  @Column({ nullable: false })
  collectionId: string;

  @ManyToMany(() => Image, (image) => image.products)
  @JoinTable({
    name: "product_image",
    joinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
    },
  })
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
