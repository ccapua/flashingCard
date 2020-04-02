"use strict";

import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;

import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstanceOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FlashingCard } from './component';

export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;
    private dataView: DataView;
    private reactRoot: React.FunctionComponentElement<{}>;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;

        this.reactRoot = React.createElement(FlashingCard, {});
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        if(options.dataViews && options.dataViews[0]) {
            this.dataView = options.dataViews[0];
            this.settings = <VisualSettings>VisualSettings.parse(this.dataView);    
            const card = this.settings.card;

            this.reactRoot = React.createElement(FlashingCard, {
                title: {
                    text: card.titleText,
                    color: card.titleColor,
                    size: card.titleSize
                },
                content: {
                    text: this.dataView.single.value,
                    color: card.contentColor,
                    size: card.contentSize
                },
                flash: {
                    type: card.flashType,
                    color: card.flashColor
                }
            })
            ReactDOM.render(this.reactRoot, this.target);
        }
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstanceOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}