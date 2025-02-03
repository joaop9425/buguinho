import { NgFor } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserCountService } from "../../services/user-count.service";

@Component({
  selector: "app-left-sidebar",
  standalone: true,
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
  imports: [NgFor],
})
export class LeftSidebarComponent implements OnInit, OnDestroy {
  onlineUsers = 5; // Example count, replace with actual logic
  contributors = [
    { name: "Jota", photo: "https://avatars.githubusercontent.com/u/28512659?s=400&u=05920c6ba695a42ab05a41f4a243d397770b9770&v=4" },
    // Add more contributors as needed
  ];
  hours = "00:00:00";
  referenceHours: any;

  constructor(
    private userCountService: UserCountService,
  ) {}

  ngOnInit() {
    this.currentTime();
    this.referenceHours = setInterval(() => {
      this.currentTime();
    }, 1000);

    // this.userCountService.getActiveUsers().subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  ngOnDestroy(): void {
    if (this.referenceHours) {
      clearInterval(this.referenceHours);
    }
  }

  currentTime() {
    const dateNow = new Date();
    let hour = dateNow.getHours();
    let minutes = dateNow.getMinutes();
    let seconds = dateNow.getSeconds();

    this.hours = `${hour < 10 ? `0${hour}` : hour}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}
