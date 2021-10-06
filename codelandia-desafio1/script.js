//array-objetos aninhados - valores em objetos pode ser arrays e vice-versa
const notices = [
    {
        date: '02 de jul, 2021',
        title: 'Agora é oficial: o windows 11 está vindo',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omni possimus veniam similique asperiores expedita totam excepturi nihil, perspiciatis ex velit rem numquam dolor dignissimos eius modi soluta iure ducimus ea.'
    },
    {
        date: '02 de jul, 2021',
        title: 'Tim Berners-Lee vai leiloar código-fonte da web',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omni possimus veniam similique asperiores expedita totam excepturi nihil, perspiciatis ex velit rem numquam dolor dignissimos eius modi soluta iure ducimus ea.'
    },
    {
        date: '02 de jul, 2021',
        title: 'Tem Firefox novo no pedaço e você vai querer migrar',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omni possimus veniam similique asperiores expedita totam excepturi nihil, perspiciatis ex velit rem numquam dolor dignissimos eius modi soluta iure ducimus ea.'
    },
    {
        date: '02 de jul, 2021',
        title: 'Tem Firefox novo no pedaço e você vai querer migrarJohn McAfee, criador do antivírus McAfee, morre',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omni possimus veniam similique asperiores expedita totam excepturi nihil, perspiciatis ex velit rem numquam dolor dignissimos eius modi soluta iure ducimus ea.'
    },

]

const addPost = {
    add(post) {
        notices.push(post)
        App.reload()
    }
}

const DOM = {
    listNotices: document.querySelector('#notices'),
    //função - adiciona as notícias
    addNotice(notice) {
        const li = document.createElement('li')
        li.innerHTML = DOM.NoticeInnerHTML(notice)
        DOM.listNotices.appendChild(li)
    },
    //função - adiciona estrutura ao HTML
    NoticeInnerHTML(notice) {
        const html = `
        <div class="box-notice">
            <div class="header-news">
                <p class="news-date">${notice.date}</p>
                <img
                    class="icon-favorite"
                    src="assets/icon-favorite.svg"
                    alt="ícone de coração"
                />
            </div>
            <h3 class="news-title">${notice.title}</h3>
            <p class="news-content">${notice.content}</p>
        </div>
        `
        return html
    }
}
//função seta
notices.forEach((notice) => {
    DOM.addNotice(notice)
})