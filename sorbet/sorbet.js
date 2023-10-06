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