import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

export function FlashingCard(props) {
    const container = useRef(null);
    const title = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        if (container.current && title.current && content.current) {
            container.current.style.height = '100vh';
            container.current.style.width = '100vw';
            container.current.style.border = 'solid 1px black';
            container.current.style.backgroundColor = '';

            title.current.style.color = props.title.color;
            title.current.style.fontSize = props.title.size + 'px';
            
            content.current.style.color = props.content.color;
            content.current.style.fontSize = props.content.size + 'px';

            if(props.flash) {
                flash();
            }
        }
    });

    function flash() {
        switch (props.flash.type) {
            case "blip":
                container.current.style.backgroundColor = props.flash.color;
                setTimeout(() => {
                    container.current.style.transition = 'background-color 1s';
                    container.current.style.backgroundColor = ''
                }, 500);
                container.current.style.transition = '';                
                break;
            case "three":
                break;
            case "none":
                return;
            default:
                break;
        }
    }

    function displayCard() {
        if (props.title && props.content) {
            return (
                <div ref={container}>
                    <p ref={title}>{props.title.text}</p>
                    <p ref={content}>{props.content.text}</p>
                </div>
            );
        }
    }

    return (
        <div>
            {displayCard()}
        </div>
    );

}

export default React.memo(FlashingCard);