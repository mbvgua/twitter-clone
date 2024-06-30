import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CommentsService } from '../services/comments/comments.service';
import { UsersService } from '../services/users/users.service';
import { allPosts } from '../models/posts';
import { allComments } from '../models/comments';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit, OnChanges{

    constructor( 
      private ps:PostsService,
      private cs:CommentsService,
      private users:UsersService
    ){}

    // alllows properties to be set by parent
    @Input() userIdGotten:string = ''
    @Input() commentIdChild:string = ''
    @Input() id:string = ''
    commentIdGotten: string = ''

    posts:Array<allPosts> = []
    comments:Array<allComments> = []

    ngOnChanges(changes: SimpleChanges): void {
      if( changes['userIdGotten']){
        this.getPosts()
      }
    }

    ngOnInit(): void {
      this.getPosts()
      this.getComments()

    }


    getPosts(): void {
      this.ps.getPosts().subscribe({
        next: (v) => {
          console.log(`displaying userId: ${this.userIdGotten}`)
          this.posts = v.filter((x) => x.userId === +this.userIdGotten)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }

    getComments():void{
      this.cs.getComments().subscribe({
        next: (v) => {
          console.log(`displaying comments for: ${this.userIdGotten}`)
          // this.comments = v.filter((x) => x.postId === this.posts.filter((x)=>x.id)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
      }

}

  

