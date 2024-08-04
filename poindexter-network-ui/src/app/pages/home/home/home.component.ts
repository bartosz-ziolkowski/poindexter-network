import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  faqs: FAQ[] = [
    {
      question: 'Where can I get this book network?',
      answer:
        'You can join and access our book network directly through our website. Simply visit our homepage, and you’ll find easy steps to sign up and start exploring.',
      isOpen: false,
    },
    {
      question: 'Is there a cost to join?',
      answer:
        'We offer a range of membership options, including both free and paid plans. Explore our pricing page for details on the benefits of each option and choose the one that best fits your needs.',
      isOpen: false,
    },
    {
      question: 'Am I a book lover?',
      answer:
        "Absolutely! If you're here, you definitely share a passion for reading. Our community is full of fellow book enthusiasts, so you’re in the right place to connect, share, and discover new literary adventures.",
      isOpen: false,
    },
  ];

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
