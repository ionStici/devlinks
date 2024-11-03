import { User } from 'src/users/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn({
    type: 'varchar',
    length: 16,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 125,
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
    default: '{}',
  })
  links: string[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
