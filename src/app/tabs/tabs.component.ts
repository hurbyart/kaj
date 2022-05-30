import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
})
export class TabsComponent implements OnInit {
  tabs:string[] = [];
  selected: FormControl;
  newTabControl: FormControl;
  allTabsFormGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.tabs = JSON.parse(localStorage.getItem('tabs')) == null ? []:JSON.parse(localStorage.getItem('tabs'));
    this.selected = new FormControl(0);
    this.newTabControl = new FormControl("");
    this.allTabsFormGroup = new FormGroup({});
    this.tabs.map((tab) => {
      this.allTabsFormGroup.addControl(tab, new FormControl(tab));
    });
  }

  addTab() {
    const newTabName = this.newTabControl.value;
    newTabName.replace(/\s/g, "");
    if (newTabName !== "") {
      this.allTabsFormGroup.addControl(newTabName, new FormControl(newTabName));
      this.tabs.push(newTabName);
      this.newTabControl.reset();
      localStorage.setItem('tabs',JSON.stringify(this.tabs));
      let temp = JSON.parse(localStorage.getItem("todos"));
      temp = temp === null ? {} : temp;
      let newTab = {};
      newTab["todo"] = [];
      newTab["inProgress"] = [];
      newTab["done"] = [];
      temp[newTabName] = newTab;

      localStorage.setItem("todos",JSON.stringify(temp));
    }
  }

  removeTab(index: number) {
    const tab = this.tabs[index];
    this.tabs.splice(index, 1);
    localStorage.setItem("tabs",JSON.stringify(this.tabs));
    let temp = JSON.parse(localStorage.getItem("todos"));
    delete temp[tab];
    localStorage.setItem("todos",JSON.stringify(temp));
  }
}
