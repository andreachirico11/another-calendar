import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  drawerOpened = false;
  drawerMode: MatDrawerMode = 'over';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setupDrawer(window.innerWidth);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupDrawer(window.innerWidth);
    }, 100);
  }

  onToggled() {
    if (this.drawerMode === 'over') {
      this.drawerOpened = !this.drawerOpened;
    }
  }

  private setupDrawer(innerWidth: number) {
    if (innerWidth < 1000) {
      this.drawerMode = 'over';
      this.drawerOpened = false;
    } else {
      this.drawerMode = 'side';
      this.drawerOpened = true;
    }
  }
}
