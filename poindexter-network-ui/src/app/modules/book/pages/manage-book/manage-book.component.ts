import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BookRequest } from '../../../../services/models/book-request';
import { BookService } from '../../../../services/services/book.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadBookCoverPicture$Params } from '../../../../services/fn/book/upload-book-cover-picture';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent implements OnInit {
  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService
        .findBookById({
          'book-id': bookId,
        })
        .subscribe({
          next: (book) => {
            this.bookRequest = {
              id: book.id,
              title: book.title as string,
              authorName: book.authorName as string,
              isbn: book.isbn as string,
              synopsis: book.synopsis as string,
              shareable: book.shareable,
            };
            if (book.cover) {
              this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
            }
          },
        });
    }
  }

  saveBook() {
    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (bookId) => {
        if (this.selectedBookCover || this.selectedPicture) {
          const params: UploadBookCoverPicture$Params = {
            'book-id': bookId,
            body: {
              file:
                this.selectedBookCover ||
                this.base64ToBlob(this.selectedPicture),
            },
          };

          // Upload the cover picture
          this.bookService.uploadBookCoverPicture(params).subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            },
            error: (err) => {
              if (err.error.validationErrors) {
                //this.errorMsg.push(err.error.validationErrors);
                this.toastrService.error(err.error.validationErrors);
              } else {
                //this.errorMsg.push(err.error.businessErrorDescription);
                this.toastrService.error(err.error.businessErrorDescription);
              }
            },
          });
        } else {
          this.router.navigate(['/books/my-books']);
        }
      },
      error: (err) => {
        this.toastrService.error('Invalid data');
      },
    });
  }

  base64ToBlob(base64: string | undefined): Blob {
    if (!base64) return new Blob();
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type if necessary
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
