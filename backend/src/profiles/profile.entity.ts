import { User } from 'src/users/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 96,
    default: '',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 96,
    default: '',
  })
  about: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  image: string;

  @Column({
    type: 'varchar',
    array: true,
    default: [],
  })
  links: string[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
