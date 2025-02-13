import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizClass, QuizType } from '../types/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quiz!:QuizClass;
  @Input() isOdd!:boolean;
  @Input() isEven!:boolean;
  @Input() which!:number;
  quizForEdit:QuizClass = new QuizClass(-1,'','',[],-1);
  quizForDelete:QuizClass = new QuizClass(-1,'','',[],-1);
  @Output() doEditInParent: EventEmitter<{quiz:QuizClass,which:number}>=new EventEmitter();
  @Output() doDeleteInParent: EventEmitter<number>=new EventEmitter<number>();
  answered!:boolean;
  input_answer:number=-1;
  isAnswerRight:boolean=false;
  deleteButton: boolean = false;
  editButton: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onClick():void{
    if(this.input_answer!=-1)
    {
      this.answered=true;
      if(this.input_answer==this.quiz.Right_answer_index)
      {
        this.isAnswerRight=true;
      }
      else{
        this.isAnswerRight=false;
      }
    }
  }
  clickOnDelete(){
    this.deleteButton=true;
  }
  deleteQuiz(choice: boolean){
    this.deleteButton=false;
    if(choice==true)
    {
      this.doDeleteInParent.emit(this.which);
    }
  }
  clickOnEdit(){
    this.editButton=true;
  }
  editQuiz(quiz: QuizClass){
    this.editButton=false;
    let which = this.which;
    this.doEditInParent.emit({quiz,which});
  }
}
