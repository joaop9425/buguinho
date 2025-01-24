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
    { name: "Contributor 1", photo: "assets/imgs/user1.jpg" },
    { name: "Contributor 2", photo: "assets/imgs/user1.jpg" },
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
