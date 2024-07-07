const parentSearch = document.getElementById('search')

const searchBox = document.getElementById('search-box')

const resultsBox = document.getElementById('search-suggestions')

const showResult = document.getElementById('render-result')

const mySearch = debouncer(callAPI)

const dummy = ['Result a', 'Result b', 'Result c', 'Result d']
let newResults = dummy.map( val => {
    let node = document.createElement('span')
    node.innerText = val
    return node
});

parentSearch.addEventListener('focusin', (e) => {
    //console.log(resultsBox, newResults, resultsBox.children)
    resultsBox.replaceChildren(...newResults)
    resultsBox.classList.add('show-container')
    childrenEventListerners(resultsBox)
})

searchBox.addEventListener('input' , (e) => {
    if(e.target.value){
        //console.log(e.target.value)
        mySearch(e.target.value)
    }
    else {
        newResults = dummy.map( val => {
            let node = document.createElement('span')
            node.innerText = val
            return node
        });
        resultsBox.replaceChildren(...newResults)
        showResult.innerHTML = 'Some Content Below'
    }
})

resultsBox.addEventListener('click', (e) => {
    resultsBox.classList.add('show-container')
})



document.addEventListener("click", (e) => {
    if(e.target.id !== 'search-box' && e.target.id !== 'search-suggestions'){
        //showResult.innerHTML = 'Some Content Below'
        resultsBox.classList.remove('show-container')
    }
}, true)

function childrenEventListerners(myDiv){
    for (const child of myDiv.children) {
        child.addEventListener('click', (e) => {
          console.log("Clicked on a child element!", e.target.innerHTML);
          showResult.innerHTML = e.target.innerHTML
        });
    }
}


function debouncer(callback, delay=300){
    let timer;
    return function db(...args){
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log('in timeout')
            let result = callback(...args)
            result.then((response) => {
                console.log('api response', response)
                newResults = response.map( val => {
                    let node = document.createElement('span')
                    node.innerText = val
                    return node
                })
                resultsBox.replaceChildren(...newResults)
                childrenEventListerners(resultsBox)
            }).catch(err => console.log(err))
        }, delay)
    }
}

function callAPI(searchText){
    console.log('called', searchText)
    return new Promise((resolve, reject) => {
        let res = searchText.split('')
        setTimeout(() => {
            resolve(res)
        }, 200)
    })
}
