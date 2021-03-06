import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Message } from '../../models/message.model';
import { MessageService } from '../../providers/message/message.service';

import firebase from 'firebase';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public messageService: MessageService,
    public chatService: ChatService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {

    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser: User) => {
      this.sender = currentUser;

      this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
      this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

      if (this.recipient.photo) {
        this.chat1
        .first()
        .subscribe((chat: Chat) => {
          this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo)
            .then((updated: boolean) => {
              console.log("Atualizado: ", updated);
              
            })
        })
      }

      let doSubscription = () => {
        this.messages.subscribe((messages: Message[]) => {
          this.scrollToBottom();
        })
      };

      this.messages = this.messageService
        .getMessages(this.sender.$key, this.recipient.$key);

      this.messages
        .first()
        .subscribe((messages: Message[]) => {

          if (messages.length == 0) {

            this.messages = this.messageService
              .getMessages(this.recipient.$key, this.sender.$key);

            doSubscription();

          } else {
            doSubscription();
          }
        })
    })
  }

  sendMessage(newMessage: string): void {

    if (newMessage) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(new Message(this.sender.$key, newMessage, currentTimestamp), this.messages)
        .then(() => {

          this.chat1.update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })

          this.chat2.update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })
        });

    }

  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }

}
