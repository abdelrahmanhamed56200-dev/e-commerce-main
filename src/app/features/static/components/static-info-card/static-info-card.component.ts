import { Component, computed, inject, input, Renderer2, signal } from '@angular/core';

interface IArticle {
  title: string;
  icon: string;
  sections: Section[];
}

interface Section {
  title?: string;
  content: string;
}

@Component({
  selector: 'app-static-info-card',
  imports: [],
  templateUrl: './static-info-card.component.html',
  styleUrl: './static-info-card.component.css',
})
export class StaticInfoCardComponent {
  private readonly renderer = inject(Renderer2);
  articleId = input.required<number>();
  article = input.required<any>();

  content = signal('');
  content2 = signal('');
  link = signal('');

  art = computed<IArticle>(() => {
    return this.article() as IArticle;
  });

  getProcessedSection(content: string) {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const match = content.match(emailRegex);

    if (!match) {
      return {
        before: content,
        email: '',
        after: '',
      };
    }

    const email = match[0];
    const parts = content.split(email);

    return {
      before: parts[0],
      email: email,
      after: parts[1] || '',
    };
  }
}
