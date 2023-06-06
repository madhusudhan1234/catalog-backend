import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SUBCATEGORIES } from "../../constants/DBTable";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity(SUBCATEGORIES)
export class SubCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
