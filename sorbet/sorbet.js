// Select the root element by its ID
const root = document.getElementById('root')

function create(tag, data) {
    if (tag) {
        let newElement = document.createElement(tag)
        newElement.textContent = data
        return newElement
    }
}

function append(parent, child) {
    parent.appendChild(child)
}

// Create from s3 MD file:
function loadFromMD(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then(markdownContent => {
            // Convert Markdown to HTML and render
            MDel = create("div")
            MDel.innerHTML = marked.parse(markdownContent)
        })
        .catch(error => console.error('Error fetching Markdown file:', error))
    
    append(root, MDel)
}

class Div {
    constructor(data, child) {
        this.data = data
        this.child = child
        console.log(data)
        console.log(child)
    }

    // Setting new Data from Object
    setProps(newProps) {
        for (const key in newProps) {
            if (newProps.hasOwnProperty(key)) {
                this.data[key] = newProps[key]
            }
        }
    }

    addChild(newChild) {
        if(Array.isArray(this.child)) {
            this.child = [...this.child, newChild]
        } else if(this.child){
            this.child = [this.child, newChild]
        } else {
            this.child = newChild
        }
        console.log(this.child)
    }

    // Render Div as HTML String
    render() {
        let result = "<div"
        for (const key in this.data) {
            result += " " + key + "=\"" + this.data[key] + "\""
        }

        result += ">"

        if(this.child) {
            if(Array.isArray(this.child)) {
                for (const childElement in this.child) {
                    if(this.child[childElement] instanceof Div) {
                        result += this.child[childElement].render()
                    } else if (this.child[childElement].constructor === String) {
                        result += this.child[childElement]
                    }
                }
            } else {
                if(this.child instanceof Div) {
                    result += this.child.render()
                } else if (this.child.constructor === String) {
                    result += this.child
                }
            }
        }

        return  result + "</div>"
    }
  
    // Print div
    print() {
        console.log(this.render())
    }

    toElement() {
        let template = document.createElement('template')
        let htmlString = this.render()
        template.innerHTML = htmlString
        return template.content.firstChild
    }

    /*
    toElements() {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes;
    }
    */
}
  
// To create an instance of the class
// const myInstance = new Div(data, child)