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
import { Image } from "./Image";
import { SubCategory } from "./SubCategory";

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

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  @JoinColumn({ name: "subcategoryId" })
  subCategory: SubCategory;

  @Column({ nullable: false })
  subcategoryId: string;

  // @ManyToMany(() => Image)
  // @JoinTable({ name: "product_image" })
  // images: Image[];

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
