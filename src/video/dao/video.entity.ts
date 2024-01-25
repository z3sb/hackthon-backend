import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vidoes')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  video: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
