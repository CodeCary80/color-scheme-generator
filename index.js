const form = document.querySelector('form')
const colorInput = document.getElementById('favcolor')
const modeSelector = document.getElementById('color-scheme-mode')
const container = document.querySelector('.container')

window.addEventListener('load',()=>{
    getColorScheme()
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    getColorScheme()
})



function getColorScheme(){
    const selectedColor = colorInput.value.slice(1)
    const selectedMode = modeSelector.value ? modeSelector.value.toLowerCase() : "Monochrome"

    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`

    fetch(apiUrl)
        .then(res=>res.json())
        .then(data =>{
            render(data.colors)
        })
    
}

function render(colors){
    container.innerHTML = ''

    colors.forEach(color => {
        const colorColumn = document.createElement('div')
        colorColumn.className = 'color-column'

        const colorBox = document.createElement('div')
        colorBox.className = 'color-box'
        colorBox.style.background = color.hex.value

        const hexText = document.createElement('div')
        hexText.className = 'hex-text'
        hexText.textContent = color.hex.value


        colorColumn.addEventListener('click',()=>{
            copyToClipboard(color.hex.value, hexText)
        })

        colorColumn.appendChild(colorBox)
        colorColumn.appendChild(hexText)

        container.appendChild(colorColumn)

    });
}


function copyToClipboard(text,element){
    navigator.clipboard.writeText(text)
    .then(()=>{
        const tooltip = document.createElement('div')
        tooltip.className = 'tooltip'
        tooltip.textContent = 'copied'

        element.appendChild(tooltip)

        setTimeout(()=>{
            tooltip.remove()
        },2000)
    })
}