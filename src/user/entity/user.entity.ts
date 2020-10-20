import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  firstname: string;

  @Column()
  password: string;

  @Column()
  img: string;

  @Column({ default: 'USER_ROLE' })
  role?: string;

  @Column({ default: false })
  google?: boolean;
}
