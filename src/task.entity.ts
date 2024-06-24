import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Task'})
export class TaskEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text',})
  name: string;

  @Column()
  isCompleted: boolean;
}