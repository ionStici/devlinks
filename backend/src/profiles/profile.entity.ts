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
    length: 1024,
    default: '',
  })
  image: string;

  @Column({
    type: 'simple-json',
    nullable: false,
    default: '[]',
  })
  links: string[];

  @OneToOne(() => User, (user) => user.profile, { nullable: false })
  user: User;
}
