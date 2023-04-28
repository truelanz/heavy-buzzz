import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import quizz_questions from 'src/assets/data/quizz-questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', 'quizz.content.responsive.css']
})
export class QuizzComponent implements OnInit {

  constructor( private route: ActivatedRoute) { 
    
  }

  title: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionmaxIndex: number = 0

  id: number = 0

  MoreFrequencyAnswer: string = ""

  fineshed: boolean = false

  ngOnInit(): void {

    this.changeResultColor()

    if (quizz_questions) {
      this.fineshed = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionmaxIndex = this.questions.length

      this.id = quizz_questions.questions[0].id
    }
  }

  userChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  //Ir para a próxima pergunta ao escolher uma determinada
  async nextStep() {
    this.questionIndex += 1
    this.id += 1

    if (this.questionmaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.fineshed = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

      /* const showImage = finalAnswer; */

      //ver qual letra/resposta é mais frequente:
      const countAnswer: { [letra: string]: number } = this.answers.reduce(
        (contagem: any, letra: any) => {
          contagem[letra] = (contagem[letra] || 0) + 1;
          return contagem;
        }, {});

      const answersInOrder: string[] = Object.keys(countAnswer).sort(
        (a, b) => countAnswer[b] - countAnswer[a]
      );
      this.MoreFrequencyAnswer = answersInOrder[0];
    }
  }

  //Percorrer arquivo Json para ver qual resposta é a mais frequente, armazenar em um array.
  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
    return result
  }

  //Mostrar a imagem de acordo com a resposta final.
  getImagemUrl(answ: string): string {
    if (answ === 'A') {
      return 'https://cdn.leonardo.ai/users/34eaaf14-adc3-478e-af9b-9d337de28c66/generations/2a9b3f91-8c69-4086-97b4-e096d3bb74fe/Leonardo_Diffusion_Karl_Marx_bust_dark_background_realistic_co_3.jpg';
    } else if (answ === 'C') {
      return 'https://cdn.leonardo.ai/users/34eaaf14-adc3-478e-af9b-9d337de28c66/generations/79f0f4b0-2052-4392-9222-ee42f780088e/Leonardo_Diffusion_john_locke_bust_dark_background_realistic_h_1.jpg';
    } else if (answ === 'E') {
      return 'https://cdn.leonardo.ai/users/34eaaf14-adc3-478e-af9b-9d337de28c66/generations/852fa44e-38b7-4e24-a847-86e50a6ee6ac/Leonardo_Diffusion_Aristteles_bust_dark_background_realistic_h_1.jpg';
    } else if (answ === 'F') {
      return 'https://upload.wikimedia.org/wikipedia/commons/7/72/Murray_Rothbard.jpg'; 
    } else {
      // Caso não haja resultado esperado, retorna uma imagem padrão ou uma string vazia
      return '';
    }
  }

  changeResultColor() {
    const bgStyle: any = document.querySelector(".quizz_results")
    if(this.MoreFrequencyAnswer === 'A') {
      bgStyle.style.boxShadow = "0px 0px 12px red"
      bgStyle.style.border = "1px solid red"
    } else if(this.MoreFrequencyAnswer === 'C') {
      bgStyle.style.boxShadow = "0px 0px 12px orange"
      bgStyle.style.border = "1px solid orange"
    } else if(this.MoreFrequencyAnswer === 'E') {
      bgStyle.style.boxShadow = "0px 0px 12px cyan"
      bgStyle.style.border = "1px solid cyan"
    } else if(this.MoreFrequencyAnswer === 'F') {
      bgStyle.style.boxShadow = "0px 0px 12px yellow"
      bgStyle.style.border = "1px solid yellow"
  } 
  
  }

}
