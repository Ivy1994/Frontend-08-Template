import {Component, createElement} from "./framework";

class Carousel extends Component{
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            child.src = record;
            this.root.appendChild(child);
        }

        let position = 0;

        this.root.addEventListener("mousedown", event => {
            let startX = event.clientX;
            let children = this.root.children;

            // clientX  and clientY 代表浏览器中间的整个可渲染区域的坐标

            let move = event => {
                let x = event.clientX - startX;
                let current =  position - ((x - x % 500) / 500);

                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${- pos*500 + offset * 500 + x}px)`;
                
                }
            }
            
            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 500);
                
                for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = offset + position;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = '';
                    children[pos].style.transform = `translateX(${- pos*500 + offset * 500}px)`;
                
                }
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        //Manual Drag


        //FIRST: 实现轮播但是一直往后播的一个状态，当到最后一个图片的时候回一下子向前回到第一个图片        
        // let current = 0;
        // setInterval(()=> {
        //     let children = this.root.children;
        //     ++current;
        //     current = current % children.length;
        //     for (let child of children) {
        //         child.style.transform = `translateX(-${current * 100}%)`;
        //     }

        // }, 3000);

        // Updated: 
        /*let currentIndex = 0;
        setInterval(()=> {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            
            setTimeout(()=> {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${-nextIndex * 100}%)`;

                currentIndex = nextIndex;
            }, 16);

        }, 3000);*/
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]

//document.body.appendChild(a);

let a = <Carousel src={d}/>

a.mountTo(document.body);