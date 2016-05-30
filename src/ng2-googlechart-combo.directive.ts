/**
*      This directive will draw a chart from the array of records provided
*
*           Note : the relevant jsapi scripts should be already available
*                  globally in the window.google object (see index.html)
**/

import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CORE_DIRECTIVES } from "@angular/common";


@Directive({
    selector: "combo-chart",
})
export class ComboChartDirective implements OnInit {

    el: HTMLElement;
    w: any;  // To store the window, without generating errors in typescript on window.google

    @Input() data: any[];
    @Input() rowlabels: any[];
    @Input() columnlabels: any[];
    @Input() options: any;
    @Input() charttype: any;

    // Constructor inject a ref to the element
    constructor(elementRef: ElementRef) {
        this.w = window;
        this.el = elementRef.nativeElement; // You cannot use elementRef directly !
        // console.log("Native HTML :", this.el);
        if (!this.w.google) { console.error("Hey ! It seems the needed google script was not loaded ?"); };
    }
    
    ngOnInit() {
        this.comboChartData();
    }

    private comboChartData() {
        let dataTable = new this.w.google.visualization.DataTable();
        let tempData: any[] = new Array();
        if (typeof this.columnlabels !== undefined)
            for (let i = 0; i < this.columnlabels.length; i++) {
                dataTable.addColumn(this.columnlabels[i].type, this.columnlabels[i].value);
            }

        for (let i = 0; i < this.rowlabels.length; i++) {
            let item: any[] = new Array();
            item.push(this.rowlabels[i]);
            for (let j = i; j < this.data.length; j++) {
                for (let k = 0; k < this.data.length; k++)
                    item.push(this.data[k][j]);
                break;
            }
            tempData.push(item);
        }

        (new this.w.google.visualization.ColumnChart(this.el))
            .draw(dataTable, this.options || {});
    }




}